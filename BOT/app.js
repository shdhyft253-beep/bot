/**
 * ScholarLoop Main UI Application & Event Orchestrator
 */

class ScholarLoopApp {
  constructor() {
    this.currentStudent = null;
    this.currentSessionId = null;
    this.isChatOpen = false;
    this.init();
  }

  async init() {
    await db.isReady;
    
    // Check or restore session
    const savedStudentId = localStorage.getItem('sl_active_student_id');
    if (savedStudentId) {
      this.currentStudent = await db.get('students', savedStudentId);
    }

    if (!this.currentStudent) {
      // Create guest student session
      const accessCode = 'SL-' + Math.floor(1000 + Math.random() * 9000);
      this.currentStudent = {
        id: 'std_' + Date.now(),
        name: 'طالب زائر',
        accessCode: accessCode,
        createdAt: new Date().toISOString()
      };
      await db.save('students', this.currentStudent);
      localStorage.setItem('sl_active_student_id', this.currentStudent.id);
    }

    // Load active or new session
    await this.initChatSession();
  }

  async generateSOPContent() {
    const letterTypeEl = document.getElementById('sopLetterType');
    if (!letterTypeEl) return;

    const params = {
      letterType: letterTypeEl.value,
      studentName: document.getElementById('sopStudentName')?.value || '',
      major: document.getElementById('sopMajor')?.value || '',
      targetUniversity: document.getElementById('sopTargetUniversity')?.value || '',
      degreeLevel: document.getElementById('sopDegreeLevel')?.value || '',
      recommenderTitle: document.getElementById('sopRecommenderTitle')?.value || '',
      accomplishments: document.getElementById('sopAccomplishments')?.value || '',
      reason: document.getElementById('sopReason')?.value || '',
      futurePlans: document.getElementById('sopFuturePlans')?.value || '',
      language: document.getElementById('sopLanguage')?.value || 'ar'
    };

    const text = await adminApp.generateLetter(params, false);
    const textarea = document.getElementById('sopOutputTextarea');
    if (textarea) {
      textarea.value = text;
    }
  }

  async initChatSession() {
    const sessions = await db.getAll('sessions');
    let activeSession = sessions.find(s => s.studentId === this.currentStudent.id);

    if (!activeSession) {
      activeSession = {
        id: 'sess_' + Date.now(),
        studentId: this.currentStudent.id,
        title: 'محادثة إرشاد المنح',
        updatedAt: new Date().toISOString()
      };
      await db.save('sessions', activeSession);
    }

    this.currentSessionId = activeSession.id;
    await this.renderChatMessages();
  }

  // Toggle AI Chat Drawer
  toggleChat() {
    const drawer = document.getElementById('chatDrawer');
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      drawer.classList.add('active');
      document.getElementById('chatInput').focus();
    } else {
      drawer.classList.remove('active');
    }
  }

  // Render chat messages from DB
  async renderChatMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const messages = await db.getSessionMessages(this.currentSessionId);
    
    if (messages.length === 0) {
      // Seed welcome message
      const welcomeMsg = {
        id: 'msg_welcome_' + Date.now(),
        sessionId: this.currentSessionId,
        sender: 'bot',
        content: `أهلاً بك في منصة **ScholarLoop**! 🎓\nأنا مساعدك الذكي المخصص للمنح الدراسية. يمكنك سؤالي عن نسبتك الأكاديمية (مثل الشهادة السودانية)، منح السعودية وتركيا وألمانيا، المستندات المطلوبة، أو طلب صياغة الخطابات!`,
        timestamp: new Date().toISOString()
      };
      await db.save('messages', welcomeMsg);
      messages.push(welcomeMsg);
    }

    container.innerHTML = messages.map(msg => this.formatMessageHTML(msg)).join('');
    container.scrollTop = container.scrollHeight;
  }

  formatMessageHTML(msg) {
    const isBot = msg.sender === 'bot';

    // Formatted text parsing
    let formattedText = msg.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--gold-bright); text-decoration: underline;">$1</a>')
      .replace(/\n/g, '<br>');

    let extraHTML = '';
    if (msg.lowConfidence) {
      extraHTML = `
        <div class="whatsapp-fallback-card">
          <div style="font-size: 0.88rem; color: #D1FAE5;">
            💡 لتحصيل إجابة دقيقة وتقييم كامل لملفك، تواصل الآن مع المستشار الأكاديمي مباشرة:
          </div>
          <a href="https://wa.me/249960714750?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}" target="_blank" class="whatsapp-fallback-btn">
            📲 تواصل عبر واتساب (+249 96 071 4750)
          </a>
        </div>
      `;
    }

    return `
      <div class="chat-bubble ${isBot ? 'bot' : 'user'}">
        <div>${formattedText}</div>
        ${extraHTML}
        <div style="font-size: 0.7rem; opacity: 0.6; margin-top: 4px; text-align: left;">
          ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    `;
  }

  // User message submit
  async handleUserSend(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Fetch previous session messages for multi-turn AI context
    const previousMessages = await db.getSessionMessages(this.currentSessionId);

    // Save user message
    const userMsg = {
      id: 'msg_' + Date.now(),
      sessionId: this.currentSessionId,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    await db.save('messages', userMsg);
    await this.renderChatMessages();

    // Show typing state
    this.showTypingIndicator();

    // Process via Bot Engine with full chat history
    const botRes = await botEngine.processQuery(text, previousMessages);
    this.hideTypingIndicator();

    if (botRes) {
      const botMsg = {
        id: 'msg_' + (Date.now() + 1),
        sessionId: this.currentSessionId,
        sender: 'bot',
        content: botRes.reply,
        lowConfidence: botRes.lowConfidence,
        timestamp: new Date().toISOString()
      };
      await db.save('messages', botMsg);
      await this.renderChatMessages();
    }
  }

  sendQuickQuery(text) {
    document.getElementById('chatInput').value = text;
    this.handleUserSend();
  }

  // -------------------------------------------------------------
  // NEW FEATURE 1: Export Chat History to PDF / Print Format
  // -------------------------------------------------------------
  async exportChatToPDF() {
    const messages = await db.getSessionMessages(this.currentSessionId);
    if (!messages || messages.length === 0) {
      alert('لا توجد محادثة لتصديرها حالياً!');
      return;
    }

    const studentName = this.currentStudent ? this.currentStudent.name : 'طالب ScholarLoop';
    const dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

    let printHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>سجل محادثة ScholarLoop - ${studentName}</title>
        <style>
          body { font-family: 'Tajawal', system-ui, sans-serif; padding: 2rem; background: #fff; color: #1E293B; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 1rem; margin-bottom: 1.5rem; }
          .logo { font-size: 1.8rem; font-weight: bold; color: #0A1128; }
          .meta { font-size: 0.9rem; color: #64748B; margin-top: 4px; }
          .msg-box { margin-bottom: 1.2rem; padding: 1rem; border-radius: 8px; font-size: 0.95rem; }
          .user-msg { background: #F1F5F9; border-right: 4px solid #3B82F6; }
          .bot-msg { background: #FEF9C3; border-right: 4px solid #D4AF37; }
          .sender { font-weight: bold; margin-bottom: 6px; font-size: 0.85rem; color: #0F172A; }
          .footer { text-align: center; margin-top: 2rem; border-top: 1px solid #E2E8F0; padding-top: 1rem; font-size: 0.8rem; color: #94A3B8; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎓 ScholarLoop — تقرير محادثة الإرشاد الأكاديمي</div>
          <div class="meta">اسم الطالب: ${studentName} | التاريخ: ${dateStr}</div>
        </div>
        <div>
          ${messages.map(m => `
            <div class="msg-box ${m.sender === 'user' ? 'user-msg' : 'bot-msg'}">
              <div class="sender">${m.sender === 'user' ? '👤 ' + studentName : '🤖 مساعد ScholarLoop الذكي'} (${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</div>
              <div>${m.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
            </div>
          `).join('')}
        </div>
        <div class="footer">
          تاريخ الطباعة: ${new Date().toLocaleString()} • ScholarLoop منصة إرشاد المنح الدراسية (+249 96 071 4750)
        </div>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(printHTML);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
      }, 500);
    } else {
      alert('يرجى السماح بالنوافذ المنبثقة لتصدير المحادثة PDF!');
    }
  }

  // -------------------------------------------------------------
  // NEW FEATURE 2: Scholarship Deadline Reminders & Calendar
  // -------------------------------------------------------------
  openDeadlineReminders() {
    const modal = document.getElementById('deadlineRemindersModal');
    if (modal) modal.classList.add('active');
  }

  closeDeadlineReminders() {
    const modal = document.getElementById('deadlineRemindersModal');
    if (modal) modal.classList.remove('active');
  }

  downloadIcsCalendar(title, startDateStr, endDateStr, description) {
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ScholarLoop//Scholarship Deadline//AR
BEGIN:VEVENT
SUMMARY:🎓 ${title} - موعد تقديم منحة ScholarLoop
DESCRIPTION:${description}
DTSTART:${startDateStr}
DTEND:${endDateStr}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ScholarLoop_Deadline_${title.replace(/\s+/g, '_')}.ics`;
    link.click();
    alert(`تم تحميل ملف التذكير بالتقويم (.ics) لمنحة (${title}) بنجاح! 📅`);
  }

  // -------------------------------------------------------------
  // NEW FEATURE 3: Custom Gemini API Key Settings Modal
  // -------------------------------------------------------------
  openApiKeyModal() {
    const modal = document.getElementById('apiKeyModal');
    if (!modal) return;
    const input = document.getElementById('geminiApiKeyInput');
    if (input) {
      input.value = localStorage.getItem('sl_gemini_api_key') || '';
    }
    modal.classList.add('active');
  }

  closeApiKeyModal() {
    const modal = document.getElementById('apiKeyModal');
    if (modal) modal.classList.remove('active');
  }

  saveApiKey(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('geminiApiKeyInput');
    const key = input ? input.value.trim() : '';
    if (key) {
      localStorage.setItem('sl_gemini_api_key', key);
      alert('✅ تم حفظ مفتاح Google Gemini API بنجاح! سيتجاوب البوت الآن بالذكاء الاصطناعي الكامل.');
    } else {
      localStorage.removeItem('sl_gemini_api_key');
      alert('ℹ️ تم إزالة المفتاح، سيعمل البوت بمحرك الذكاء الاصطناعي الافتراضي.');
    }
    this.closeApiKeyModal();
  }

  // -------------------------------------------------------------
  // NEW FEATURE 4: Direct Academic Advisor WhatsApp Contact
  // -------------------------------------------------------------
  contactAdvisor(customText = '') {
    const defaultText = customText || 'أهلاً، أود الاستفسار والتواصل المباشر مع المستشار الأكاديمي لمنصة ScholarLoop بخصوص ملف المنح.';
    const link = `https://wa.me/249960714750?text=${encodeURIComponent(defaultText)}`;
    window.open(link, '_blank');
  }

  showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.className = 'chat-bubble bot';
    typing.innerHTML = `
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  hideTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  async clearChatSession() {
    if (confirm('هل ترغب في بدء محادثة جديدة وتصفير السجل الحالى؟')) {
      const activeSession = {
        id: 'sess_' + Date.now(),
        studentId: this.currentStudent.id,
        title: 'محادثة جديدة',
        updatedAt: new Date().toISOString()
      };
      await db.save('sessions', activeSession);
      this.currentSessionId = activeSession.id;
      await this.renderChatMessages();
    }
  }

  // Student Login / Register Modal
  openStudentModal() {
    document.getElementById('studentAuthModal').classList.add('active');
    if (this.currentStudent) {
      document.getElementById('studentNameLogin').value = this.currentStudent.name || '';
      document.getElementById('studentCodeLogin').value = this.currentStudent.accessCode || '';
    }
  }

  closeStudentModal() {
    document.getElementById('studentAuthModal').classList.remove('active');
  }

  async handleStudentLogin(e) {
    e.preventDefault();
    const name = document.getElementById('studentNameLogin').value.trim();
    const code = document.getElementById('studentCodeLogin').value.trim();

    let student = null;
    if (code) {
      student = await db.getStudentByCode(code);
    }

    if (!student) {
      student = {
        id: 'std_' + Date.now(),
        name: name || 'طالب ScholarLoop',
        accessCode: code || ('SL-' + Math.floor(1000 + Math.random() * 9000)),
        createdAt: new Date().toISOString()
      };
      await db.save('students', student);
    }

    this.currentStudent = student;
    localStorage.setItem('sl_active_student_id', student.id);
    await this.initChatSession();
    this.closeStudentModal();
    alert(`أهلاً بك ${student.name}! كود الوصول الخاص بك هو: [ ${student.accessCode} ] يمكنك استخدامه لاسترجاع محادثاتك من أي جهاز.`);
  }

  // Admin Modal Methods
  openAdminModal() {
    document.getElementById('adminModal').classList.add('active');
    const pwdInput = document.getElementById('adminPasswordInput');
    if (pwdInput) pwdInput.value = '';

    if (adminApp.checkAuth()) {
      document.getElementById('adminLoginView').style.display = 'none';
      document.getElementById('adminAuthView').style.display = 'flex';
      this.loadAdminStudentsTable();
    } else {
      document.getElementById('adminLoginView').style.display = 'block';
      document.getElementById('adminAuthView').style.display = 'none';
      if (pwdInput) pwdInput.focus();
    }
  }

  closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
  }

  handleAdminLogin(e) {
    if (e) e.preventDefault();
    const pwdInput = document.getElementById('adminPasswordInput');
    const pwd = pwdInput ? pwdInput.value : '';
    if (adminApp.authenticate(pwd)) {
      if (pwdInput) pwdInput.value = '';
      document.getElementById('adminLoginView').style.display = 'none';
      document.getElementById('adminAuthView').style.display = 'flex';
      this.loadAdminStudentsTable();
    } else {
      alert('كلمة المرور غير صحيحة! كلمة المرور الافتراضية هي: admin123');
      if (pwdInput) {
        pwdInput.value = '';
        pwdInput.focus();
      }
    }
  }

  adminLogout() {
    adminApp.logout();
    this.openAdminModal();
  }

  switchAdminTab(tab) {
    if (tab === 'sop') {
      document.getElementById('tabSopGenerator').style.display = 'block';
      document.getElementById('tabStudents').style.display = 'none';
    } else {
      document.getElementById('tabSopGenerator').style.display = 'none';
      document.getElementById('tabStudents').style.display = 'block';
      this.loadAdminStudentsTable();
    }
  }

  async handleGenerateSOP(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('btnGenerateSOP');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '⏳ جاري صياغة وتوليد الخطاب الأكاديمي...';
      btn.disabled = true;
    }

    await this.generateSOPContent();

    if (btn) {
      btn.innerHTML = '✨ توليد الخطاب الآن (Generate Letter)';
      btn.disabled = false;
    }

    // On mobile, smooth scroll to result text area
    if (window.innerWidth <= 768) {
      document.getElementById('sopOutputTextarea')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async copySOPText() {
    const area = document.getElementById('sopOutputTextarea');
    if (!area || !area.value.trim()) return alert('لا توجد مسودة لنسخها بعد!');
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(area.value);
      } else {
        area.select();
        document.execCommand('copy');
      }
      
      const copyBtn = document.getElementById('btnCopySOP');
      if (copyBtn) {
        const origText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ تم نسخ النص!';
        copyBtn.style.borderColor = '#10B981';
        copyBtn.style.color = '#10B981';
        setTimeout(() => {
          copyBtn.innerHTML = origText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      } else {
        alert('تم نسخ الخطاب بنجاح للحافظة! 📋');
      }
    } catch (err) {
      area.select();
      document.execCommand('copy');
      alert('تم نسخ الخطاب بنجاح للحافظة! 📋');
    }
  }

  async saveSOPToDB() {
    const text = document.getElementById('sopOutputTextarea').value;
    if (!text) return alert('الرجاء توليد المسودة أولاً قبل الحفظ!');

    const studentName = document.getElementById('sopStudentName').value || 'طالب';
    const letterType = document.getElementById('sopLetterType').value;
    const sopRecord = {
      id: 'sop_' + Date.now(),
      studentName: studentName,
      letterType: letterType,
      major: document.getElementById('sopMajor').value,
      content: text,
      createdAt: new Date().toISOString()
    };

    await db.save('sop_drafts', sopRecord);
    alert(`تم حفظ مسودة الخطاب للطالب (${studentName}) في قاعدة البيانات بنجاح!`);
  }

  downloadSOPFile() {
    const text = document.getElementById('sopOutputTextarea').value;
    if (!text) return alert('لا توجد مسودة لتنزيلها!');

    const letterType = document.getElementById('sopLetterType').value || 'Letter';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ScholarLoop_${letterType}_${Date.now()}.txt`;
    link.click();
  }

  async loadAdminStudentsTable() {
    const tableDiv = document.getElementById('studentsListTable');
    const students = await db.getAll('students');
    const sops = await db.getAll('sop_drafts');

    if (students.length === 0) {
      tableDiv.innerHTML = '<div style="color: var(--text-muted);">لا يوجد طلاب مسجلين حتى الآن.</div>';
      return;
    }

    tableDiv.innerHTML = `
      <table style="width: 100%; text-align: right; border-collapse: collapse; color: white;">
        <thead>
          <tr style="border-bottom: 1px solid var(--gold-border); color: var(--gold-bright);">
            <th style="padding: 10px;">الاسم</th>
            <th style="padding: 10px;">كود الوصول</th>
            <th style="padding: 10px;">التاريخ</th>
            <th style="padding: 10px;">الخطابات المولّدة</th>
          </tr>
        </thead>
        <tbody>
          ${students.map(s => {
            const studentSops = sops.filter(sop => sop.studentName === s.name);
            return `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px;"><strong>${s.name}</strong></td>
                <td style="padding: 10px;"><code style="background: rgba(212,175,55,0.15); padding: 2px 8px; border-radius: 4px; color: var(--gold-light);">${s.accessCode || 'N/A'}</code></td>
                <td style="padding: 10px; font-size: 0.85rem; color: var(--text-muted);">${new Date(s.createdAt).toLocaleDateString()}</td>
                <td style="padding: 10px;">${studentSops.length > 0 ? `✅ (${studentSops.length} خطاب)` : '⏳ لا يوجد'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  async exportDatabaseBackup() {
    const jsonStr = await db.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ScholarLoop_DB_Backup_${Date.now()}.json`;
    link.click();
  }
}

const app = new ScholarLoopApp();
