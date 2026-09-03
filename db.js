/**
 * ScholarLoop Database Manager (IndexedDB + LocalStorage Fallback)
 * Handles cross-device/session persistence for student accounts, chats, and SOP drafts.
 */

class ScholarLoopDB {
  constructor() {
    this.dbName = 'ScholarLoopDB';
    this.version = 1;
    this.db = null;
    this.isReady = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Students store
        if (!db.objectStoreNames.contains('students')) {
          const studentStore = db.createObjectStore('students', { keyPath: 'id' });
          studentStore.createIndex('email', 'email', { unique: true });
          studentStore.createIndex('accessCode', 'accessCode', { unique: true });
        }

        // Chat Sessions store
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionStore.createIndex('studentId', 'studentId', { unique: false });
        }

        // Messages store
        if (!db.objectStoreNames.contains('messages')) {
          const msgStore = db.createObjectStore('messages', { keyPath: 'id' });
          msgStore.createIndex('sessionId', 'sessionId', { unique: false });
        }

        // SOP Drafts store
        if (!db.objectStoreNames.contains('sop_drafts')) {
          const sopStore = db.createObjectStore('sop_drafts', { keyPath: 'id' });
          sopStore.createIndex('studentId', 'studentId', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        this.seedInitialData();
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.warn('IndexedDB unavailable, falling back to LocalStorage', e);
        resolve(null);
      };
    });
  }

  async seedInitialData() {
    const students = await this.getAll('students');
    if (students.length === 0) {
      // Seed demo student
      const demoStudent = {
        id: 'std_demo_1',
        name: 'أحمد السوداني',
        email: 'ahmed@example.com',
        phone: '+249 96 071 4750',
        targetMajor: 'هندسة البرمجيات / Software Engineering',
        targetCountry: 'ألمانيا / Germany',
        gpa: '3.75 / 4.0',
        accessCode: 'SL-8842',
        createdAt: new Date().toISOString()
      };
      await this.save('students', demoStudent);

      // Seed initial SOP draft
      const demoSop = {
        id: 'sop_demo_1',
        studentId: 'std_demo_1',
        studentName: 'أحمد السوداني',
        major: 'Computer Science & AI',
        accomplishments: 'حاصل على البكالوريوس بمرتبة الشرف، تطوير نظام ذكاء اصطناعي لتحليل البيانات الأكاديمية.',
        reason: 'التميز التكنولوجي في الجامعات الألمانية وتوفر بيئة بحثية متقدمة.',
        futurePlans: 'العودة للمساهمة في بناء بنية تحتية رقمية وتأسيس مركز أبحاث ذكاء اصطناعي.',
        language: 'ar',
        generatedContent: `خطاب النوايا (Statement of Purpose)\n\nإلى لجنة القبول المحترمة،\n\nأكتب إليكم هذه الرسالة للتعبير عن شغفي الشديد للانضمام إلى برنامج علوم الحاسوب والذكاء الاصطناعي...`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await this.save('sop_drafts', demoSop);
    }
  }

  // Generic helper for save
  async save(storeName, item) {
    if (!this.db) {
      const current = JSON.parse(localStorage.getItem(`sl_${storeName}`) || '[]');
      const index = current.findIndex(i => i.id === item.id);
      if (index >= 0) current[index] = item;
      else current.push(item);
      localStorage.setItem(`sl_${storeName}`, JSON.stringify(current));
      return item;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(item);
      req.onerror = (e) => reject(e);
    });
  }

  // Generic helper for get by id
  async get(storeName, id) {
    if (!this.db) {
      const current = JSON.parse(localStorage.getItem(`sl_${storeName}`) || '[]');
      return current.find(i => i.id === id) || null;
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  }

  // Generic helper for getAll
  async getAll(storeName) {
    if (!this.db) {
      return JSON.parse(localStorage.getItem(`sl_${storeName}`) || '[]');
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  // Get messages for session
  async getSessionMessages(sessionId) {
    const allMsgs = await this.getAll('messages');
    return allMsgs
      .filter(m => m.sessionId === sessionId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  // Find student by Access Code (for cross-device login)
  async getStudentByCode(code) {
    const students = await this.getAll('students');
    return students.find(s => s.accessCode.trim().toUpperCase() === code.trim().toUpperCase()) || null;
  }

  // Export full DB backup as JSON
  async exportBackup() {
    const data = {
      students: await this.getAll('students'),
      sessions: await this.getAll('sessions'),
      messages: await this.getAll('messages'),
      sop_drafts: await this.getAll('sop_drafts'),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  // Import DB backup
  async importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.students) for (const s of data.students) await this.save('students', s);
      if (data.sessions) for (const s of data.sessions) await this.save('sessions', s);
      if (data.messages) for (const m of data.messages) await this.save('messages', m);
      if (data.sop_drafts) for (const sop of data.sop_drafts) await this.save('sop_drafts', sop);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  }
}

const db = new ScholarLoopDB();
