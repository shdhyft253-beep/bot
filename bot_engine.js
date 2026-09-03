/**
 * ScholarLoop Advanced AI Chat Engine
 * Strict Logic Architecture:
 * 1. Exclusive Greeting Response for Hello/Greetings.
 * 2. Direct-First Precision Answers (Yes/No + Brief Answer FIRST) for direct questions.
 * 3. Strict Scope & Polite Rephrase Request for Out-of-Domain / Unclear queries.
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;
  }

  /**
   * Process query with strict logic rules
   */
  async processQuery(userInput, lang = 'auto') {
    const rawText = userInput.trim();
    if (!rawText) return null;

    const lowerText = rawText.toLowerCase();
    const isEnglish = /[a-zA-Z]/.test(rawText) && !/[\u0600-\u06FF]/.test(rawText);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;

    // Normalize text for clean matching
    const cleanText = lowerText
      .replace(/[إأآا]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/[؟?.,!]/g, '')
      .trim();

    // -------------------------------------------------------------
    // RULE 1: EXCLUSIVE GREETINGS HANDLING
    // If the input is purely a greeting or short hello phrase
    // -------------------------------------------------------------
    const isPureGreeting = /^(السلام عليكم|وعليكم السلام|اهلا|مرحبا|هلا|مرحبتين|صباح الخير|مساء الخير|سلام|hello|hi|hey|greetings)$/i.test(cleanText);
    
    if (isPureGreeting) {
      return {
        reply: chosenLang === 'ar'
          ? `وعليكم السلام ورحمة الله وبركاته! 🎓\nأهلاً بك في مساعد **ScholarLoop** للمنح الدراسية. كيف يمكنني مساعدتك اليوم بخصوص المنح والشروط؟`
          : `Hello and welcome to **ScholarLoop** Scholarship Assistant! 🎓\nHow can I help you today regarding scholarship applications and requirements?`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية هل أقدم للسعودية؟', 'هل تقبل أعداداً كبيرة؟', 'تواصل مع المستشار 📲']
          : ['Is Saudi scholarship open?', 'High school evaluation', 'Quotas & Housing', 'Contact Advisor 📲']
      };
    }

    // -------------------------------------------------------------
    // RULE 2: DIRECT PRECISION ANSWERS (Yes/No + Direct Answer First)
    // -------------------------------------------------------------

    // Check numerical percentages (e.g. 80%, 85%, 90%, 70%)
    const percentMatch = rawText.match(/(\d{2,3})\s*[%٪]?/);
    const percentage = percentMatch ? parseInt(percentMatch[1], 10) : null;

    // Question: Is Saudi Arabia Scholarship Open? (هل منحة ادرس في السعودية مفتوحة؟)
    if (cleanText.includes('سعوديه') || cleanText.includes('السعوديه') || cleanText.includes('ادرس في السعوديه')) {
      if (cleanText.includes('مفتوحه') || cleanText.includes('مواعيد') || cleanText.includes('متى تفتح') || cleanText.includes('فتح')) {
        return {
          reply: chosenLang === 'ar'
            ? `🟢 **نعم، التقديم على منحة (أدرس في السعودية) مفتوح حالياً عبر المنصة الرسمية للطلاب الدوليين.**\n\n` +
              `📌 **التفاصيل الأساسية:**\n` +
              `• **طريقة التقديم:** إلكترونياً عبر منصة (أدرس في السعودية).\n` +
              `• **النسب المطلوب:** 80% فأعلى للكليات النظرية وإدارة الأعمال، و85% - 90% للهندسة والعلوم الصحية.\n` +
              `• **المميزات:** راتب شهري منتظم، سكن مؤثث مجاني، وتذاكر طيران سنوية.\n\n` +
              `هل ترغب في أن يساعدك المستشار الأكاديمي في تقديم ملفك رسمياً؟`
            : `🟢 **Yes, applications for the (Study in Saudi Arabia) scholarship platform are currently open.**\n\n` +
              `Requires 80%+ for business/humanities, fully funded with monthly stipend, free housing, and annual flights.`,
          lowConfidence: false,
          suggestions: ['المستندات المطلوبة للسعودية', 'نسبتي 80 في الشهادة السودانية', 'تواصل مع المستشار 📲']
        };
      }
    }

    // Question: Is Turkey Scholarship Open? (هل المنحة التركية مفتوحة؟)
    if (cleanText.includes('تركيا') || cleanText.includes('التركيه') || cleanText.includes('تركيه')) {
      if (cleanText.includes('مفتوحه') || cleanText.includes('متى تفتح') || cleanText.includes('مواعيد')) {
        return {
          reply: chosenLang === 'ar'
            ? `ℹ️ **مواعيد التقديم على المنحة التركية (Türkiye Bursları):**\n\n` +
              `تفتح المنحة التركية باب التقديم السنوي الموحد عادة في الفترة بين **10 يناير حتى 20 فبراير** من كل عام.\n\n` +
              `📌 **الاستعداد المطلوب الآن:**\n` +
              `• تجهيز الشهادات وكشوف الدرجات المصدقة.\n` +
              `• كتابة خطاب النوايا (SOP) واختيار التوصيات.\n\n` +
              `يمكن لمسؤول الموقع تجهيز كافة خطابات التوصية والنوايا الخاصة بك من الآن!`
            : `ℹ️ Turkiye Burslari opens annually between January 10th and February 20th.`,
          lowConfidence: false,
          suggestions: ['صياغة خطاب النوايا لتركيا', 'شروط التقديم لتركيا', 'تواصل مع المستشار 📲']
        };
      }
    }

    // Question: Does it accept large quotas/numbers? (هل تقبل أعداداً كبيرة؟)
    if (cleanText.includes('اعداد') || cleanText.includes('كبيره') || cleanText.includes('سعه') || cleanText.includes('طاقه')) {
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نعم، تقبل المنحة السعودية ومنصة إدرس في مصر والمنحة التركية أعداداً كبيرة جداً سنوياً.**\n\n` +
            `• **المملكة العربية السعودية:** تتيح عشرات الآلاف من المقاعد للطلاب الدوليين من أكثر من 160 دولة.\n` +
            `• **مصر:** طاقة استيعابية واسعة جداً بتسهيلات وحسومات خاصة للطلاب السودانيين والعرب.\n` +
            `• **تركيا:** تمنح أكثر من 5,000 مقعد سنوياً.\n\n` +
            `لكن الفارق الأساسي في القبول هو اكتمال الملف وجودة خطاب النوايا (SOP).`
          : `🟢 **Yes, Saudi Arabia and Egypt offer very large annual quotas for international students.**`,
        lowConfidence: false,
        suggestions: ['التقديم على منحة السعودية', 'تواصل مع المستشار للتقديم 📲']
      };
    }

    // Question: Sudanese Certificate 80% Saudi evaluation (نسبتي 80 في الشهادة السودانية هل أقدم للسعودية؟)
    if (cleanText.includes('سودانيه') || cleanText.includes('الشهاده السودانيه')) {
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نعم، نسبة ${percentage || 80}% في الشهادة السودانية تمكنك من التقديم والمنافسة القوية على منحة (أدرس في السعودية)!**\n\n` +
            `📌 **تفاصيل القبول لنسبتك:**\n` +
            `• **الكليات النظرية والأدبية وإدارة الأعمال (80% فأعلى):** فرصة قبولك مرتفعة جداً.\n` +
            `• **كليات الهندسة وتقنية المعلومات (85% فأعلى):** ${percentage >= 85 ? 'نسبتك تتيح لك التنافس المباشر!' : 'يفضل التقديم أيضاً على تخصصات الحاسوب ونظم المعلومات'}.\n` +
            `• **المميزات:** راتب شهري، سكن مؤثث مجاني، وتذاكر طيران سنوية.\n\n` +
            `هل تريد أن يراجع المستشار الأكاديمي أوراقك ويقدم لك؟`
          : `🟢 **Yes, 80% in Sudanese Secondary Certificate makes you strongly eligible for Saudi scholarships!**`,
        lowConfidence: false,
        suggestions: ['المستندات المطلوبة للسعودية', 'تواصل مع المستشار للتقديم 📲']
      };
    }

    // Question: Language certificate required? (هل تتطلب شهادة لغة؟)
    if (cleanText.includes('لغه') || cleanText.includes('ايلتس') || cleanText.includes('توفل') || cleanText.includes('انجليزي')) {
      return {
        reply: chosenLang === 'ar'
          ? `🔵 **لا، ليست كل المنح تتطلب شهادة لغة (IELTS/TOEFL) مسبقاً.**\n\n` +
            `• **منح السعودية وتركيا:** لا تشترط شهادة لغة مسبقاً لغالبية التخصصات، وتوفر سنة تحضيرية مجانية للغة.\n` +
            `• **منحة هنغاريا:** تقبل إثبات اللغة الصادر من المدرسة/الجامعة أو الاختبار الداخلي.\n` +
            `• **منح ألمانيا وبريطانيا:** تشترط عادة IELTS 6.5+ للبرامج المعتمدة بالإنجليزية.`
          : `🔵 **No, not all scholarships require language certificates.** Saudi Arabia and Turkey offer free 1-year language prep courses.`,
        lowConfidence: false,
        suggestions: ['منحة السعودية', 'المنحة التركية', 'تواصل مع المستشار 📲']
      };
    }

    // Question: Housing & Stipends (تفاصيل السكن والراتب)
    if (cleanText.includes('سكن') || cleanText.includes('راتب') || cleanText.includes('مكافاه') || cleanText.includes('مصاريف')) {
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نعم، جميع المنح الحكومية الممولة بالكامل تغطي السكن والراتب الشهري 100%.**\n\n` +
            `• **الراتب الشهري:** يدفع شهرياً للطالب لمصاريفه الشخصية.\n` +
            `• **السكن:** سكن جامعي مؤثث مجاني شامل الكهرباء والإنترنت.\n` +
            `• **التذاكر والعلاج:** تذاكر طيران سنوية ورعاية صحية شاملة مجاناً.`
          : `🟢 **Yes, fully funded scholarships cover 100% tuition, free housing, and monthly stipends.**`,
        lowConfidence: false,
        suggestions: ['منح السعودية', 'منح تركيا', 'تواصل مع المستشار 📲']
      };
    }

    // General Documents Question
    if (cleanText.includes('مستند') || cleanText.includes('اوراق') || cleanText.includes('وثائق') || cleanText.includes('شهاده') || cleanText.includes('توصيه')) {
      return {
        reply: chosenLang === 'ar'
          ? `📋 **المستندات الأساسية المطلوبة للتقديم على المنح:**\n\n` +
            `1. **الشهادة الأكاديمية وكشف الدرجات المصدّق.**\n` +
            `2. **خطاب النوايا والدافع (SOP).**\n` +
            `3. **خطابات توصية أكاديمية (2).**\n` +
            `4. **السيرة الذاتية (CV) وجواز السفر.**\n\n` +
            `💡 يمكن لمسؤول المنصة صياغة كافة خطابات النوايا والتوصيات لملفك من خلال لوحة المسؤول!`
          : `📋 **Required Documents:** Transcripts, SOP, 2 Recommendation Letters, Academic CV, Passport.`,
        lowConfidence: false,
        suggestions: ['صياغة خطاب النوايا', 'تواصل مع المستشار 📲']
      };
    }

    // -------------------------------------------------------------
    // RULE 3: PREVENT HALLUCINATIONS / OUT-OF-SCOPE REPHRASE REQUEST
    // If query is completely outside domain or nonsensical
    // -------------------------------------------------------------
    const isDomainRelated = /(منح|منحه|دراسه|جامعه|قبول|سعوديه|تركيا|المانيا|مصر|هنغاريا|شروط|مستند|راتب|سكن|شهاده|معدل|نسبه|تخصص|ماجستير|بكالوريوس|دكتوراه|سودانيه|ايلتس|توفل|توصيه|نوايا|sop|scholarship|university|apply|gpa|admission)/i.test(cleanText);

    if (!isDomainRelated) {
      return {
        reply: chosenLang === 'ar'
          ? `عذراً، لم أفهم استفسارك بشكل واضح بخصوص المنح الدراسية. 🎓\n\n` +
            `يرجى إعادة صياغة سؤالك حول **المنح الدراسية، شروط القبول، المستندات المطلوبة، أو نسب القبول** لأتمكن من إجابتك بدقة تامة!`
          : `I am sorry, I didn't quite catch your scholarship-related question. 🎓\n\nPlease rephrase your query regarding scholarships, admissions, requirements, or documents so I can assist you accurately!`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية', 'المستندات المطلوبة للمنح', 'تواصل مع المستشار 📲']
          : ['Is Saudi scholarship open?', 'High school evaluation', 'Required documents', 'Contact Advisor 📲']
      };
    }

    // Domain related but custom / needs human advisor evaluation
    return {
      reply: chosenLang === 'ar'
        ? `حول استفسارك الأكاديمي المخصص: ("${rawText}") 🎓\n\n` +
          `يتطلب هذا الاستفسار مراجعة حالة ملفك الأكاديمي المباشر من قبل المستشار الأكاديمي لضمان إجابة دقيقة 100%:\n\n` +
          `يمكنك التواصل المباشر مع **المستشار الأكاديمي منصة ScholarLoop** عبر واتساب:`
        : `Regarding your inquiry ("${rawText}"): 🎓\n\nPlease contact our **ScholarLoop Academic Advisor** directly on WhatsApp for tailored evaluation:`,
      lowConfidence: true,
      whatsappLink: this.advisorWhatsappLink,
      whatsappPhone: '+249 96 071 4750',
      suggestions: ['تواصل مع المستشار عبر واتساب 📲', 'هل منحة ادرس في السعودية مفتوحة؟', 'المستندات المطلوبة']
    };
  }
}

const botEngine = new ScholarLoopBotEngine();
