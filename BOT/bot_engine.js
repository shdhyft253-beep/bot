/**
 * ScholarLoop AI Chat Engine (Powered by Google Gemini API & Multi-turn RAG)
 * Features:
 * 1. Real Gemini AI model integration (gemini-2.5-flash / gemini-1.5-flash).
 * 2. System prompt with comprehensive scholarship knowledge base.
 * 3. Multi-turn conversation context memory.
 * 4. Strict language matching (100% Arabic / 100% English).
 * 5. Out-of-scope domain restriction & polite refusal.
 * 6. High-availability fallback engine when offline or key unconfigured.
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;
    
    // Knowledge Base System Prompt
    this.systemPrompt = `أنت "مساعد ScholarLoop الذكي" - مستشار أكاديمي متكافئ واحترافي متخصص حصرياً في المنح الدراسية والقبولات الجامعية لمنصة ScholarLoop.

قواعد واستراتيجيات الإجابة الملتزم بها:
1. مطابقة اللغة بنسبة 100%: إذا تحدث المستخدم بالعربية تجيب بالكامل باللغة العربية. إذا تحدث بالإنجليزي تجيب بالكامل بالإنجليزي. لا تخلط بين اللغات بشكل غير مبرر.
2. النطاق التخصصي الحصري: أنت متخصص فقط في المنح الدراسية، الشروط، المستندات، التخصصات، التقويمات الأكاديمية، والقبولات. إذا كان سؤال المستخدم خارج نطاق المنح والدراسة تماماً (مثل الطبخ، الرياضة، البرمجة العامة، الطقس)، اعتذر بلطف ووضّح بأسلوب مهذب أنك متخصص فقط في المنح الدراسية والأكاديمية، ثم اقترح عليه أسئلة متعلقة بالمنح.
3. الدقة والإيجاز والوضوح: قدم إجابة مباشرة ودقيقة مع استخدام التنسيق الجذاب (نقاط، خط عريض، رموز تعبيرية 🎓).

قاعدة معرفة المنح المتاحة لديك (مرجع الإجابات):
- **منحة (أدرس في السعودية) - التقديم إلكتروني عبر المنصة الرسمية للطلاب الدوليين**:
  - مفتوحة حالياً.
  - مميزاتها: تمويل كامل 100%، راتب شهري منتظم، سكن مؤثث مجاني شامل الكهرباء والإنترنت، تذاكر طيران سنوية مجانية، سنة تحضيرية مجانية للغة العربية.
  - معدلات القبول: 80% فأعلى للكليات النظرية وإدارة الأعمال، 85% - 90% للهندسة والعلوم الصحية.
  - الشهادة السودانية والثانوية العامة: تقبل بفرص تنافسية عالية جداً وخاصة الحاصلين على 80% فأعلى.

- **المنحة التركية (Türkiye Bursları)**:
  - تفتح سنوياً في الفترة الموحدة بين 10 يناير حتى 20 فبراير.
  - مميزاتها: تغطية الرسوم الدراسية بالكامل، راتب شهري، سكن جامعي، سنة لغة تركية مجانية، تذاكر طيران.
  - الشروط: الحد الأدنى للمعدل 70% للتخصصات العادية، 90% للطب البشري وطب الأسنان.

- **منحة هنغاريا (Stipendium Hungaricum)**:
  - تفتح التقديم بين نوفمبر وتناير سنوياً.
  - مميزاتها: دراسة مجانية، بدل سكن، راتب شهري، وتأمين صحي. البرامج تدرس باللغة الإنجليزية غالباً.

- **منح ألمانيا (DAAD و Deutschlandstipendium)**:
  - الجامعات الحكومية مجانية الرسوم غالباً، ولكن تتطلب حساباً بنكياً مغلقاً (Blocked Account) لمصاريف المعيشة أو منحة DAAD للمتفوقين والدراسات العليا.
  - تتطلب عادة شهادة لغة (IELTS 6.5+ للإنجليزي أو B2/C1 للألماني).

- **منحة (إدرس في مصر)**:
  - طاقة استيعابية واسعة جداً، حسومات وتسهيلات خاصة للطلاب السودانيين والعرب، تقديم مرن طوال موسم الصيف.

- **المستندات المطلوبة للتقديم**:
  1. شهادة التخرج وكشف الدرجات المصدّق.
  2. خطاب النوايا والدافع (Statement of Purpose - SOP).
  3. خطابات توصية أكاديمية (Recommendation Letters) عدد 2 إلى 3.
  4. السيرة الذاتية الأكاديمية (CV) وجواز سفر ساري المفعول.
  5. شهادات اللغة (إن وجدت) مثل IELTS/TOEFL أو الاستفادة من السنة التحضيرية المجانية.

- **أداة المسؤول المتاحة على المنصة**:
  - يحتوي الموقع على لوحة صانع الخطابات الأكاديمية (خاص بالمسؤول) لتوليد كافة خطابات النوايا (SOP)، التوصيات، وCover Letter للطلاب بأسلوب أكاديمي رفيع.

- **المستشار الأكاديمي المباشر**:
  - عند حاجة الطالب لمراجعة شخصية مخصصة أو تقديم مباشر، يمكنك توجيهه للتواصل مع المستشار الأكاديمي منصة ScholarLoop عبر الواتساب على الرقم: +249 96 071 4750.`;
  }

  /**
   * Get API Key from localStorage or default
   */
  getApiKey() {
    return localStorage.getItem('sl_gemini_api_key') || '';
  }

  /**
   * Main query processor supporting Gemini API with fallback RAG
   */
  async processQuery(userInput, chatHistory = [], lang = 'auto') {
    const rawText = userInput.trim();
    if (!rawText) return null;

    const isEnglish = /[a-zA-Z]/.test(rawText) && !/[\u0600-\u06FF]/.test(rawText);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;

    // Check for pure greetings first
    const cleanText = rawText.toLowerCase().replace(/[إأآا]/g, 'ا').replace(/ة/g, 'ه').replace(/[؟?.,!]/g, '').trim();
    const isPureGreeting = /^(السلام عليكم|وعليكم السلام|اهلا|مرحبا|هلا|مرحبتين|صباح الخير|مساء الخير|سلام|hello|hi|hey|greetings)$/i.test(cleanText);

    if (isPureGreeting) {
      return {
        reply: chosenLang === 'ar'
          ? `وعليكم السلام ورحمة الله وبركاته! 🎓\nأهلاً بك في مساعد **ScholarLoop** الذكي للمنح الدراسية. كيف يمكنني مساعدتك اليوم بخصوص التقديم أو شروط المنح؟`
          : `Hello and welcome to **ScholarLoop** AI Scholarship Assistant! 🎓\nHow can I help you today regarding scholarship applications and requirements?`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية هل أقدم للسعودية؟', 'ما هي شروط المنحة التركية؟', 'تواصل مع المستشار 📲']
          : ['Is Saudi scholarship open?', 'Sudanese Certificate evaluation', 'Turkiye Burslari details', 'Contact Advisor 📲']
      };
    }

    // Try Gemini API if key is available
    const apiKey = this.getApiKey();
    if (apiKey) {
      try {
        const geminiRes = await this.callGeminiAPI(rawText, chatHistory, apiKey);
        if (geminiRes) {
          return {
            reply: geminiRes,
            lowConfidence: false,
            suggestions: this.generateDynamicSuggestions(rawText, chosenLang)
          };
        }
      } catch (err) {
        console.warn('Gemini API call failed, using intelligent local RAG fallback:', err);
      }
    }

    // Fallback: Smart Local RAG Engine
    return this.processQueryLocalFallback(rawText, chosenLang);
  }

  /**
   * Call Google Gemini API (gemini-2.5-flash / gemini-1.5-flash)
   */
  async callGeminiAPI(userInput, chatHistory, apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Format context history for Gemini
    const contents = [];
    
    // Add history items (last 8 messages for context window efficiency)
    const recentHistory = chatHistory.slice(-8);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: userInput }]
    });

    const bodyData = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: this.systemPrompt }]
      },
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText || null;
  }

  /**
   * High quality local RAG engine fallback
   */
  processQueryLocalFallback(rawText, chosenLang) {
    const lowerText = rawText.toLowerCase();
    const cleanText = lowerText.replace(/[إأآا]/g, 'ا').replace(/ة/g, 'ه').replace(/[؟?.,!]/g, '').trim();

    // Check numerical percentages (e.g. 80%, 85%, 90%)
    const percentMatch = rawText.match(/(\d{2,3})\s*[%٪]?/);
    const percentage = percentMatch ? parseInt(percentMatch[1], 10) : null;

    // Domain check
    const isDomainRelated = /(منح|منحه|دراسه|جامعه|قبول|سعوديه|تركيا|المانيا|مصر|هنغاريا|شروط|مستند|راتب|سكن|شهاده|معدل|نسبه|تخصص|ماجستير|بكالوريوس|دكتوراه|سودانيه|ايلتس|توفل|توصيه|نوايا|sop|scholarship|university|apply|gpa|admission)/i.test(cleanText);

    if (!isDomainRelated) {
      return {
        reply: chosenLang === 'ar'
          ? `عذراً، أنا **مساعد ScholarLoop الذكي** المتخصص في **المنح الدراسية والقبولات الجامعية** حصرياً. 🎓\n\n` +
            `يسعدني إجابتك على أي سؤال بخصوص **المنح المتاحة (السعودية، تركيا، ألمانيا، هنغاريا، مصر)، شروط القبول، أو الأوراق المطلوبة**!`
          : `I am **ScholarLoop AI**, specialized strictly in **scholarships and university admissions**. 🎓\n\n` +
            `I would be glad to help you with questions about scholarship deadlines, requirements, or documents!`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية', 'المستندات المطلوبة للمنح', 'تواصل مع المستشار 📲']
          : ['Is Saudi scholarship open?', 'Sudanese Cert evaluation', 'Required documents', 'Contact Advisor 📲']
      };
    }

    // Saudi Arabia query
    if (cleanText.includes('سعوديه') || cleanText.includes('ادرس في السعوديه')) {
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نعم، التقديم على منحة (أدرس في السعودية) مفتوح حالياً عبر المنصة الرسمية للطلاب الدوليين.**\n\n` +
            `📌 **أهم التفاصيل والشروط:**\n` +
            `• **النسبة المطلوبة:** 80% فأعلى للتخصصات الإدارية والنظرية، و85% - 90% للهندسة والعلوم الصحية.\n` +
            `• **المميزات:** تمويل كامل 100%، راتب شهري، سكن مؤثث مجاني، تذاكر طيران سنوية، وسنة لغة عربية مجانية.\n` +
            `• **الشهادة السودانية:** تقبل وتتمتع بفرص تنافسية عالية جداً.`
          : `🟢 **Yes, applications for (Study in Saudi Arabia) are open.**\n\nRequires 80%+ for humanities/business, fully funded with monthly stipend, free housing, and annual flights.`,
        lowConfidence: false,
        suggestions: ['المستندات المطلوبة للسعودية', 'نسبتي 80 في الشهادة السودانية', 'تواصل مع المستشار 📲']
      };
    }

    // Turkey Scholarship query
    if (cleanText.includes('تركيا') || cleanText.includes('التركيه')) {
      return {
        reply: chosenLang === 'ar'
          ? `ℹ️ **مواعيد وشروط المنحة التركية (Türkiye Bursları):**\n\n` +
            `• **موعد التقديم:** تفتح سنوياً بين **10 يناير و20 فبراير**.\n` +
            `• **المعدل المطلوب:** 70% للتخصصات العامة، و90% للطب البشري وطب الأسنان.\n` +
            `• **المميزات:** سكن مجاني، راتب شهري، تغطية الرسوم الدراسية، وسنة لغة تركية مجانية.\n` +
            `💡 ينصح بتجهيز خطاب النوايا (SOP) والتوصيات من الآن!`
          : `ℹ️ **Turkiye Burslari opens annually Jan 10 - Feb 20.** Fully funded with tuition waiver, stipend, housing, and 1-year Turkish prep course.`,
        lowConfidence: false,
        suggestions: ['تذكير بموعد منحة تركيا ⏰', 'صياغة خطاب النوايا لتركيا', 'تواصل مع المستشار 📲']
      };
    }

    // Sudanese cert evaluation
    if (cleanText.includes('سودانيه') || cleanText.includes('الشهاده السودانيه')) {
      const p = percentage || 80;
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نسبتك (${p}%) في الشهادة السودانية تمنحك فرصة تنافسية قوية جداً!**\n\n` +
            `• **منحة السعودية:** ${p >= 85 ? 'تتيح لك المنافسة المباشرة على الهندسة وإدارة الأعمال والحاسوب.' : 'تتيح لك التقديم المباشر على التخصصات النظرية والإدارية والحاسوب.'}\n` +
            `• **المنحة التركية:** تتيح لك التقديم على كافة التخصصات المتاحة لمرحلة البكالوريوس.\n` +
            `• **مصر:** تتيح لك التسجيل في منصة إدرس في مصر والاستفادة من الحسومات للطلاب السودانيين.`
          : `🟢 **Your score (${p}%) in Sudanese Secondary Certificate makes you strongly eligible for Saudi & Turkish scholarships!**`,
        lowConfidence: false,
        suggestions: ['التقديم على منحة السعودية', 'المستندات المطلوبة', 'تواصل مع المستشار للتقديم 📲']
      };
    }

    // Language certificate
    if (cleanText.includes('لغه') || cleanText.includes('ايلتس') || cleanText.includes('توفل')) {
      return {
        reply: chosenLang === 'ar'
          ? `🔵 **ليس من الضروري وجود شهادة لغة (IELTS/TOEFL) لجميع المنح:**\n\n` +
            `• **منح السعودية وتركيا:** لا تشترط شهادة لغة مسبقاً وتوفر سنة تحضيرية مجانية للغة.\n` +
            `• **منحة هنغاريا:** تكتفي أحياناً باختبار الجامعة الداخلي أو إثبات لغة الدراسة السابق.\n` +
            `• **ألمانيا وبريطانيا:** تشترط عادة IELTS 6.5+ للبرامج المعتمدة باللغة الإنجليزية.`
          : `🔵 **No, language certificates are not always mandatory.** Saudi Arabia & Turkey provide a free 1-year language prep year.`,
        lowConfidence: false,
        suggestions: ['منحة السعودية', 'المنحة التركية', 'تواصل مع المستشار 📲']
      };
    }

    // Default specialized response with advisor link
    return {
      reply: chosenLang === 'ar'
        ? `حول استفسارك الأكاديمي المخصص: ("${rawText}") 🎓\n\n` +
          `يسعدني إفادتك بأن ملفك مؤهل للمنافسة! للحصول على تقييم دقيق لنسبتك وتخصصك ومتابعة التقديم رسمياً، يمكنك التواصل المباشر مع المستشار الأكاديمي منصة ScholarLoop:`
        : `Regarding your inquiry ("${rawText}"): 🎓\n\nFor custom evaluation and direct application assistance, please contact our ScholarLoop Academic Advisor directly:`,
      lowConfidence: true,
      whatsappLink: this.advisorWhatsappLink,
      whatsappPhone: '+249 96 071 4750',
      suggestions: ['تواصل مع المستشار عبر واتساب 📲', 'مواعيد التقديم على المنح ⏰', 'المستندات المطلوبة']
    };
  }

  generateDynamicSuggestions(text, lang) {
    if (lang === 'en') {
      return ['Is Saudi scholarship open?', 'Turkiye Burslari details', 'Required documents', 'Contact Advisor 📲'];
    }
    return ['هل منحة ادرس في السعودية مفتوحة؟', 'مواعيد التقديم على المنح ⏰', 'نسبتي 80 في الشهادة السودانية', 'تواصل مع المستشار 📲'];
  }
}

const botEngine = new ScholarLoopBotEngine();

