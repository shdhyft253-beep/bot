/**
 * ScholarLoop AI Chat Engine (Powered by Google Gemini API & Multi-turn RAG)
 * Features:
 * 1. Real Gemini AI model integration (gemini-1.5-flash / gemini-2.5-flash).
 * 2. System prompt with comprehensive scholarship knowledge base — DIRECT answers always.
 * 3. Multi-turn conversation context memory.
 * 4. Strict language matching (100% Arabic / 100% English).
 * 5. Out-of-scope domain restriction & polite refusal.
 * 6. High-availability fallback engine when offline or key unconfigured.
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;

    // ----------------------------------------------------------------
    // SYSTEM PROMPT — Knowledge Base with strict direct-answer mandate
    // ----------------------------------------------------------------
    this.systemPrompt = `أنت "مساعد ScholarLoop الذكي" — مستشار أكاديمي واحترافي متخصص حصرياً في المنح الدراسية والقبولات الجامعية لمنصة ScholarLoop.

═══════════════ قواعد صارمة ونهائية ═══════════════

1. مطابقة اللغة 100%: رد بالعربية الكاملة إذا كتب المستخدم بالعربية، وبالإنجليزية الكاملة إذا كتب بالإنجليزية. لا تخلط.

2. الإجابة المباشرة من قاعدة المعرفة — دائماً وأبداً:
   ⚡ لأي سؤال يتعلق بالمنح الدراسية (شروط، نسب قبول، مميزات، مواعيد تقديم، مستندات، أي دولة، أي تساؤل عام) اجب مباشرةً وبالتفصيل من قاعدة المعرفة أدناه.
   ❌ لا تُحيل المستخدم للمستشار البشري أبداً إلا في حالتين حصراً:
      • الحالة (أ): إذا طلب الطالب صراحةً التواصل مع مستشار بشري.
      • الحالة (ب): إذا احتاج مراجعة ملفه الشخصي المحدد فعلياً (مستندات خاصة به هو).
   ✅ أي استفسار عام — حتى لو بدأ بـ "أريد استفسار" أو "أسأل عن" أو "ما هي تفاصيل" — يستحق إجابة مباشرة شاملة، لا إحالة.

3. نطاق المنح حصراً: إذا كان السؤال خارج المنح تماماً (طبخ، رياضة، ترفيه، طقس) اعتذر بلطف واقترح أسئلة متعلقة بالمنح.

═══════════════ قاعدة المعرفة التفصيلية ═══════════════

🇸🇦 منحة (أدرس في السعودية) — التقديم إلكتروني عبر المنصة الرسمية:
• الحالة: مفتوحة حالياً ومستمرة.
• المزايا الكاملة: تمويل 100% | راتب شهري منتظم | سكن مؤثث مجاني (كهرباء + إنترنت) | تذاكر طيران سنوية مجانية | سنة لغة عربية تحضيرية مجانية.
• نسب القبول: 80%+ للكليات النظرية وإدارة الأعمال | 85%-90% للهندسة والعلوم الصحية.
• الشهادة السودانية والثانوية: مقبولة بفرص تنافسية عالية جداً للحاصلين على 80%+.
• شهادة اللغة: غير مطلوبة مسبقاً، توفر سنة لغة مجانية.

🇹🇷 المنحة التركية (Türkiye Bursları):
• الحالة: تفتح سنوياً 10 يناير – 20 فبراير.
• المزايا: رسوم دراسية مجانية | راتب شهري | سكن جامعي | سنة لغة تركية مجانية | تذاكر طيران.
• الحد الأدنى: 70% للتخصصات العامة | 90% للطب البشري وطب الأسنان.
• شهادة اللغة: غير مطلوبة مسبقاً.

🇭🇺 منحة هنغاريا (Stipendium Hungaricum):
• الحالة: تفتح نوفمبر – يناير سنوياً.
• المزايا: دراسة مجانية | بدل سكن | راتب شهري | تأمين صحي.
• الدراسة بالإنجليزية في معظم التخصصات.

🇩🇪 منح ألمانيا (DAAD و Deutschlandstipendium):
• الجامعات الحكومية: مجانية الرسوم في معظمها.
• تتطلب حساباً بنكياً مغلقاً (Blocked Account) لمصاريف المعيشة.
• تشترط IELTS 6.5+ للبرامج الإنجليزية أو B2/C1 للألمانية.

🇪🇬 منحة إدرس في مصر:
• طاقة استيعابية واسعة جداً | تسهيلات وحسومات خاصة للطلاب السودانيين والعرب.
• التقديم مرن طوال موسم الصيف.

📋 المستندات المطلوبة للتقديم:
1. شهادة التخرج وكشف الدرجات المصدّق.
2. خطاب النوايا والدافع (Statement of Purpose — SOP).
3. خطابات توصية أكاديمية (2-3 خطابات).
4. السيرة الذاتية الأكاديمية (CV) وجواز سفر ساري المفعول.
5. شهادة لغة إن طُلبت (أو الاستفادة من السنة التحضيرية المجانية).

🛠️ منصة ScholarLoop: لوحة المسؤول تُولّد خطابات النوايا والتوصية وCover Letter لجميع الطلاب بأسلوب أكاديمي متكامل.

📞 المستشار الأكاديمي (+249 96 071 4750): يُوجَّه إليه الطالب فقط عند طلبه صراحةً أو لمراجعة ملف شخصي محدد.`;
  }

  /**
   * Get Gemini API Key from localStorage
   */
  getApiKey() {
    return localStorage.getItem('sl_gemini_api_key') || '';
  }

  /**
   * Main query processor — Gemini API with smart local RAG fallback
   */
  async processQuery(userInput, chatHistory = [], lang = 'auto') {
    const rawText = userInput.trim();
    if (!rawText) return null;

    const isEnglish = /[a-zA-Z]/.test(rawText) && !/[\u0600-\u06FF]/.test(rawText);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;

    // Normalize Arabic text for pattern matching
    const cleanText = rawText.toLowerCase()
      .replace(/[إأآا]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/[؟?.,!،]/g, '')
      .trim();

    // Pure greeting handler
    const isPureGreeting = /^(السلام عليكم|وعليكم السلام|اهلا|مرحبا|هلا|مرحبتين|صباح الخير|مساء الخير|سلام|hello|hi|hey|greetings)$/i.test(cleanText);
    if (isPureGreeting) {
      return {
        reply: chosenLang === 'ar'
          ? `وعليكم السلام ورحمة الله وبركاته! 🎓\nأهلاً بك في مساعد **ScholarLoop** الذكي للمنح الدراسية. كيف يمكنني مساعدتك اليوم؟`
          : `Hello and welcome to **ScholarLoop** AI Scholarship Assistant! 🎓\nHow can I help you today regarding scholarships?`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية', 'ما هي شروط المنحة التركية؟', 'المستندات المطلوبة للمنح']
          : ['Is Saudi scholarship open?', 'Sudanese Certificate evaluation', 'Turkiye Burslari details', 'Required documents']
      };
    }

    // Try Gemini API if key is configured
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
        console.warn('Gemini API call failed, using local RAG fallback:', err);
      }
    }

    // Local RAG fallback
    return this.processQueryLocalFallback(rawText, cleanText, chosenLang);
  }

  /**
   * Call Google Gemini API
   */
  async callGeminiAPI(userInput, chatHistory, apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const contents = [];
    const recentHistory = chatHistory.slice(-8);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const bodyData = {
      contents,
      systemInstruction: { parts: [{ text: this.systemPrompt }] },
      generationConfig: { temperature: 0.35, topP: 0.95, maxOutputTokens: 1200 }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  /**
   * Smart Local RAG Fallback Engine
   * Handles all scholarship queries directly — never routes to advisor for general questions.
   */
  processQueryLocalFallback(rawText, cleanText, chosenLang) {
    // Extract percentage if present
    const percentMatch = rawText.match(/(\d{2,3})\s*[%٪]?/);
    const percentage = percentMatch ? parseInt(percentMatch[1], 10) : null;

    // ---------------------------------------------------------------
    // DOMAIN CHECK: Is this even about scholarships?
    // ---------------------------------------------------------------
    const isDomainRelated = /(منح|منحه|دراسه|دراس|جامعه|قبول|سعوديه|سعودي|تركيا|المانيا|مصر|هنغاريا|شروط|مستند|راتب|سكن|شهاده|معدل|نسبه|تخصص|ماجستير|بكالوريوس|دكتوراه|سودانيه|ايلتس|توفل|توصيه|نوايا|استفسار|sop|scholarship|university|apply|gpa|admission|study|grant|fellowship)/i.test(cleanText);

    if (!isDomainRelated) {
      return {
        reply: chosenLang === 'ar'
          ? `عذراً، أنا **مساعد ScholarLoop الذكي** المتخصص في **المنح الدراسية والقبولات الجامعية** حصرياً. 🎓\n\nيسعدني إجابتك على أي سؤال بخصوص **المنح المتاحة (السعودية، تركيا، ألمانيا، هنغاريا، مصر)، شروط القبول، المميزات، أو الأوراق المطلوبة**!`
          : `I am **ScholarLoop AI**, specialized in **scholarships and university admissions**. 🎓\n\nAsk me about available scholarships, requirements, deadlines, or documents!`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['هل منحة ادرس في السعودية مفتوحة؟', 'نسبتي 80 في الشهادة السودانية', 'ما المنح المتاحة الآن؟', 'المستندات المطلوبة']
          : ['Is Saudi scholarship open?', 'Sudanese Certificate evaluation', 'Available scholarships', 'Required documents']
      };
    }

    // ---------------------------------------------------------------
    // ADVISOR CONTACT: Only if explicitly requested
    // ---------------------------------------------------------------
    const wantsAdvisor = /(تواصل مع المستشار|اتصل بالمستشار|ارسل للمستشار|contact advisor|whatsapp|واتساب|اريد التواصل|تواصل مباشر)/i.test(cleanText);
    if (wantsAdvisor) {
      return {
        reply: chosenLang === 'ar'
          ? `📲 **التواصل مع المستشار الأكاديمي لمنصة ScholarLoop:**\n\nيسعدنا توصيلك بالمستشار الأكاديمي مباشرة للتقييم الشخصي ومتابعة ملف تقديمك رسمياً.\n\n**الرقم:** +249 96 071 4750`
          : `📲 **Contact ScholarLoop Academic Advisor:**\n\nConnect directly for personalized file review and official application follow-up.\n\n**WhatsApp:** +249 96 071 4750`,
        lowConfidence: true,
        whatsappLink: this.advisorWhatsappLink,
        whatsappPhone: '+249 96 071 4750',
        suggestions: ['هل منحة ادرس في السعودية مفتوحة؟', 'المستندات المطلوبة', 'مواعيد التقديم على المنح ⏰']
      };
    }

    // ---------------------------------------------------------------
    // SAUDI ARABIA — broad detection (any mention of Saudi/أدرس/سعودية)
    // ---------------------------------------------------------------
    const isSaudi = cleanText.includes('سعوديه') ||
                    cleanText.includes('سعودي') ||
                    cleanText.includes('ادرس في السعوديه') ||
                    cleanText.includes('ادرس في السعودي') ||
                    /saudi|ksa|kingdom/i.test(cleanText);

    if (isSaudi) {
      return {
        reply: chosenLang === 'ar'
          ? `🇸🇦 **منحة (أدرس في السعودية) — التفاصيل الكاملة:**\n\n` +
            `🟢 **الحالة:** التقديم مفتوح حالياً عبر المنصة الرسمية للطلاب الدوليين.\n\n` +
            `✨ **المزايا الكاملة (تمويل 100%):**\n` +
            `• راتب شهري منتظم لمصاريف الطالب الشخصية.\n` +
            `• سكن جامعي مؤثث مجاني (يشمل الكهرباء والإنترنت).\n` +
            `• تذاكر طيران سنوية مجانية (ذهاباً وإياباً).\n` +
            `• سنة لغة عربية تحضيرية مجانية.\n` +
            `• تغطية الرسوم الدراسية كاملاً.\n\n` +
            `📊 **نسب القبول:**\n` +
            `• **80%+ للكليات النظرية وإدارة الأعمال** (شريعة، علوم إنسانية، إدارة، حاسوب).\n` +
            `• **85%-90% للهندسة والعلوم الصحية والطب.**\n\n` +
            `📋 **الشهادة السودانية والثانوية العامة:** مقبولة بفرص تنافسية عالية جداً.\n` +
            `🗣️ **شهادة اللغة:** غير مطلوبة مسبقاً — المنحة توفر سنة لغة مجانية!\n\n` +
            `هل تريد معرفة المستندات المطلوبة، أو معرفة خياراتك بناءً على نسبتك الأكاديمية؟`
          : `🇸🇦 **Study in Saudi Arabia Scholarship — Full Details:**\n\n` +
            `🟢 **Status:** Applications are currently OPEN.\n\n` +
            `✨ **Benefits (Fully Funded 100%):** Monthly stipend | Free furnished housing | Annual return flights | Free Arabic language prep year | Full tuition coverage.\n\n` +
            `📊 **GPA Requirements:** 80%+ for humanities/business/IT | 85-90%+ for engineering/health sciences.\n\n` +
            `No prior language certificate required — a free Arabic prep year is provided!`,
        lowConfidence: false,
        suggestions: ['ما المستندات المطلوبة للسعودية؟', 'نسبتي 80 في الشهادة السودانية', 'مقارنة منح السعودية وتركيا', 'مواعيد التقديم ⏰']
      };
    }

    // ---------------------------------------------------------------
    // TURKEY
    // ---------------------------------------------------------------
    if (cleanText.includes('تركيا') || cleanText.includes('التركيه') || cleanText.includes('تركيه') || /turk|bursl/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `🇹🇷 **المنحة التركية (Türkiye Bursları) — التفاصيل الكاملة:**\n\n` +
            `📅 **موعد التقديم السنوي:** 10 يناير – 20 فبراير (موعد ثابت كل عام).\n\n` +
            `✨ **المزايا:**\n• رسوم دراسية مجانية | راتب شهري | سكن جامعي | سنة لغة تركية مجانية | تذاكر طيران.\n\n` +
            `📊 **الحد الأدنى للقبول:**\n• 70% للتخصصات العامة | 90% للطب البشري وطب الأسنان.\n\n` +
            `💡 **نصيحة:** ابدأ بتجهيز خطاب النوايا (SOP) والتوصيات الآن قبل فتح البوابة!`
          : `🇹🇷 **Türkiye Bursları — Full Details:**\n\nApplication: Jan 10 – Feb 20 annually.\nBenefits: Full tuition waiver, monthly stipend, housing, 1-year Turkish prep, return flights.\nMinimum: 70% general / 90% medicine.`,
        lowConfidence: false,
        suggestions: ['تذكير بموعد منحة تركيا ⏰', 'ما المستندات المطلوبة؟', 'مقارنة السعودية وتركيا']
      };
    }

    // ---------------------------------------------------------------
    // SUDANESE CERTIFICATE EVALUATION
    // ---------------------------------------------------------------
    if (cleanText.includes('سودانيه') || cleanText.includes('الشهاده السودانيه') || (cleanText.includes('شهاده') && cleanText.includes('سودان'))) {
      const p = percentage || 80;
      return {
        reply: chosenLang === 'ar'
          ? `🟢 **نسبتك (${p}%) في الشهادة السودانية — تحليل الفرص:**\n\n` +
            `🇸🇦 **منحة السعودية:** ${p >= 85 ? '✅ تتيح لك التنافس المباشر على هندسة، حاسوب، وإدارة الأعمال.' : p >= 80 ? '✅ تتيح لك التقديم على الكليات النظرية والإدارية والحاسوب بفرص عالية.' : '⚠️ الحد الأدنى 80% للكليات النظرية — يُنصح بالتحقق من تخصصك.'}\n` +
            `🇹🇷 **المنحة التركية:** ${p >= 70 ? '✅ مؤهل للتقديم على جميع التخصصات.' : '⚠️ الحد الأدنى 70%.'}\n` +
            `🇪🇬 **إدرس في مصر:** ✅ متاحة بتسهيلات خاصة للطلاب السودانيين.\n\n` +
            `📋 هل تريد معرفة المستندات المطلوبة أو المنحة الأنسب لتخصصك؟`
          : `🟢 **Your ${p}% in Sudanese Certificate — Opportunity Analysis:**\n\n🇸🇦 Saudi: ${p >= 80 ? '✅ Eligible' : '⚠️ Below minimum'} | 🇹🇷 Turkey: ${p >= 70 ? '✅ Eligible' : '⚠️ Check'} | 🇪🇬 Egypt: ✅ Available`,
        lowConfidence: false,
        suggestions: ['التقديم على منحة السعودية', 'المستندات المطلوبة', 'مواعيد التقديم ⏰']
      };
    }

    // ---------------------------------------------------------------
    // LANGUAGE CERTIFICATE
    // ---------------------------------------------------------------
    if (cleanText.includes('لغه') || cleanText.includes('ايلتس') || cleanText.includes('توفل') || /ielts|toefl|language/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `🔵 **شهادة اللغة والمنح الدراسية:**\n\n` +
            `• 🇸🇦 **السعودية:** ❌ لا تشترط — توفر سنة لغة عربية مجانية.\n` +
            `• 🇹🇷 **تركيا:** ❌ لا تشترط — توفر سنة لغة تركية مجانية.\n` +
            `• 🇭🇺 **هنغاريا:** يُكتفى أحياناً باختبار داخلي.\n` +
            `• 🇩🇪 **ألمانيا:** ✅ تشترط IELTS 6.5+ للبرامج الإنجليزية أو B2/C1 ألماني.`
          : `🔵 **Language Certificate Requirements:**\n\n🇸🇦 Saudi: Not required (free Arabic prep) | 🇹🇷 Turkey: Not required (free Turkish prep) | 🇩🇪 Germany: IELTS 6.5+ for English programs.`,
        lowConfidence: false,
        suggestions: ['منحة السعودية', 'المنحة التركية', 'منح ألمانيا']
      };
    }

    // ---------------------------------------------------------------
    // HOUSING & STIPENDS
    // ---------------------------------------------------------------
    if (cleanText.includes('سكن') || cleanText.includes('راتب') || cleanText.includes('مكافاه') || cleanText.includes('مصاريف') || cleanText.includes('تمويل')) {
      return {
        reply: chosenLang === 'ar'
          ? `🏠 **السكن والراتب والمزايا المالية في المنح الممولة:**\n\n` +
            `🇸🇦 **السعودية:** راتب شهري + سكن جامعي مؤثث مجاني (كهرباء + إنترنت) + تذاكر طيران سنوية.\n` +
            `🇹🇷 **تركيا:** راتب شهري + سكن جامعي مجاني + تذاكر طيران.\n` +
            `🇭🇺 **هنغاريا:** بدل سكن شهري + راتب + تأمين صحي.\n\n` +
            `✅ جميع هذه المنح ممولة بالكامل ولا تتطلب أي رسوم دراسية.`
          : `🏠 **Housing & Stipends in Fully Funded Scholarships:**\n\n🇸🇦 Saudi: Monthly stipend + free furnished housing + annual flights.\n🇹🇷 Turkey: Monthly stipend + free dormitory + flights.\n🇭🇺 Hungary: Monthly housing allowance + stipend + health insurance.`,
        lowConfidence: false,
        suggestions: ['منحة السعودية كاملة', 'المنحة التركية', 'المستندات المطلوبة']
      };
    }

    // ---------------------------------------------------------------
    // DOCUMENTS REQUIRED
    // ---------------------------------------------------------------
    if (cleanText.includes('مستند') || cleanText.includes('اوراق') || cleanText.includes('وثائق') || cleanText.includes('توصيه') || /document|papers|sop|letter/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `📋 **المستندات الأساسية المطلوبة للتقديم على المنح:**\n\n` +
            `1. **شهادة التخرج وكشف الدرجات المصدّق** (ثانوية أو بكالوريوس).\n` +
            `2. **خطاب النوايا والدافع (SOP)** — يمكن لمسؤول المنصة صياغته لك.\n` +
            `3. **خطابات توصية أكاديمية** (2-3 خطابات من أساتذة أو مشرفين).\n` +
            `4. **السيرة الذاتية (CV) الأكاديمية** وجواز سفر ساري الصلاحية.\n` +
            `5. **شهادة لغة** (إن طُلبت) أو الاستفادة من السنة التحضيرية المجانية.\n\n` +
            `💡 لوحة المسؤول في المنصة تُنتج SOP وخطابات التوصية وCover Letter تلقائياً!`
          : `📋 **Required Application Documents:**\n\n1. Certified academic transcript.\n2. Statement of Purpose (SOP) — our admin panel can generate it.\n3. 2-3 Academic Recommendation Letters.\n4. Academic CV + valid passport.\n5. Language certificate (if required) or benefit from the free prep year.`,
        lowConfidence: false,
        suggestions: ['هل منحة السعودية مفتوحة؟', 'خطاب النوايا كيف أكتبه؟', 'مواعيد التقديم ⏰']
      };
    }

    // ---------------------------------------------------------------
    // HUNGARY
    // ---------------------------------------------------------------
    if (cleanText.includes('هنغاريا') || /hungary|stipendium/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `🇭🇺 **منحة هنغاريا (Stipendium Hungaricum):**\n\n` +
            `📅 **موعد التقديم:** نوفمبر – 15 يناير سنوياً.\n` +
            `✨ **المزايا:** دراسة مجانية | بدل سكن شهري | راتب شهري | تأمين صحي.\n` +
            `🌐 **اللغة:** معظم البرامج بالإنجليزية.\n\n` +
            `تُعدّ من المنح الأوروبية الممتازة المتاحة للطلاب العرب!`
          : `🇭🇺 **Hungary Stipendium Hungaricum Scholarship:**\n\nDeadline: Nov – Jan annually.\nBenefits: Free tuition | Housing allowance | Monthly stipend | Health insurance.\nLanguage: Mostly English.`,
        lowConfidence: false,
        suggestions: ['ما المستندات المطلوبة لهنغاريا؟', 'منح أوروبا الأخرى', 'منحة السعودية']
      };
    }

    // ---------------------------------------------------------------
    // GERMANY
    // ---------------------------------------------------------------
    if (cleanText.includes('المانيا') || cleanText.includes('المانيه') || /germany|daad|deutsch/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `🇩🇪 **منح ألمانيا (DAAD):**\n\n` +
            `🎓 **الجامعات الحكومية:** مجانية الرسوم في معظمها.\n` +
            `💶 **المعيشة:** تتطلب حساباً بنكياً مغلقاً (Blocked Account) حوالي 11,208 يورو/سنة.\n` +
            `🗣️ **اللغة:** IELTS 6.5+ للبرامج الإنجليزية | B2-C1 للبرامج الألمانية.\n` +
            `📅 **مواعيد DAAD:** أكتوبر – ديسمبر لمعظم برامج الماجستير والدكتوراه.`
          : `🇩🇪 **Germany Scholarships (DAAD):**\n\nPublic universities: Mostly free tuition.\nLiving: Blocked Account ~€11,208/year.\nLanguage: IELTS 6.5+ (English) or B2/C1 (German).\nDeadline: Oct – Dec for most Master/PhD programs.`,
        lowConfidence: false,
        suggestions: ['ما المستندات المطلوبة؟', 'ما الفرق بين ألمانيا والسعودية؟', 'منح أوروبا']
      };
    }

    // ---------------------------------------------------------------
    // COMPARISON QUESTIONS (مقارنة)
    // ---------------------------------------------------------------
    if (cleanText.includes('مقارنه') || cleanText.includes('الافضل') || cleanText.includes('انسب') || /compare|best|which/i.test(cleanText)) {
      return {
        reply: chosenLang === 'ar'
          ? `⚖️ **مقارنة المنح الدراسية المتاحة:**\n\n` +
            `| المنحة | التمويل | المعدل | موعد التقديم |\n` +
            `|---|---|---|---|\n` +
            `| 🇸🇦 السعودية | ✅ كامل + راتب | 80%+ | مفتوح الآن |\n` +
            `| 🇹🇷 تركيا | ✅ كامل + راتب | 70%+ | يناير-فبراير |\n` +
            `| 🇭🇺 هنغاريا | ✅ كامل + راتب | متغير | نوفمبر-يناير |\n` +
            `| 🇩🇪 ألمانيا | ✅ رسوم مجانية | متغير | أكتوبر-ديسمبر |\n` +
            `| 🇪🇬 مصر | 🔸 خصومات | متغير | مستمر |\n\n` +
            `💡 **الأنسب للطلاب السودانيين:** السعودية وتركيا الأوسع قبولاً وأكثر تمويلاً.`
          : `⚖️ **Scholarship Comparison:**\n\n🇸🇦 Saudi: Fully funded, 80%+, open now\n🇹🇷 Turkey: Fully funded, 70%+, Jan-Feb\n🇭🇺 Hungary: Fully funded, Nov-Jan\n🇩🇪 Germany: Free tuition, Oct-Dec\n\n💡 Saudi & Turkey are the most accessible for Sudanese students.`,
        lowConfidence: false,
        suggestions: ['تفاصيل منحة السعودية', 'تفاصيل المنحة التركية', 'المستندات المطلوبة', 'مواعيد التقديم ⏰']
      };
    }

    // ---------------------------------------------------------------
    // GENERAL SCHOLARSHIP OVERVIEW — For any broad domain question
    // This is the CORRECT default: full info, NOT advisor routing.
    // ---------------------------------------------------------------
    return {
      reply: chosenLang === 'ar'
        ? `🎓 **منح دراسية متاحة عبر منصة ScholarLoop:**\n\n` +
          `🇸🇦 **السعودية (مفتوحة الآن):** تمويل كامل، راتب، سكن، تذاكر طيران، وسنة لغة. تقبل 80%+ للكليات النظرية.\n\n` +
          `🇹🇷 **تركيا (يناير-فبراير):** تمويل كامل، راتب، سكن، وسنة لغة تركية. تقبل 70%+ للتخصصات العامة.\n\n` +
          `🇭🇺 **هنغاريا (نوفمبر-يناير):** دراسة مجانية، بدل سكن، راتب، وتأمين صحي.\n\n` +
          `🇩🇪 **ألمانيا:** جامعات حكومية مجانية الرسوم مع منح DAAD للمتفوقين.\n\n` +
          `🇪🇬 **مصر:** تسهيلات وحسومات خاصة للطلاب السودانيين والعرب.\n\n` +
          `**أيّ منحة تريد تفاصيلها؟ أو أخبرني بنسبتك الأكاديمية لأرشدك للأنسب!**`
        : `🎓 **Available Scholarships via ScholarLoop:**\n\n🇸🇦 Saudi (OPEN NOW): Fully funded, 80%+ GPA\n🇹🇷 Turkey (Jan-Feb): Fully funded, 70%+\n🇭🇺 Hungary (Nov-Jan): Fully funded, English programs\n🇩🇪 Germany: Free tuition + DAAD grants\n🇪🇬 Egypt: Discounted fees for Arabs\n\nWhich scholarship do you want details about?`,
      lowConfidence: false,
      suggestions: chosenLang === 'ar'
        ? ['تفاصيل منحة السعودية 🇸🇦', 'تفاصيل المنحة التركية 🇹🇷', 'المستندات المطلوبة 📋', 'مواعيد التقديم ⏰']
        : ['Saudi Scholarship details', 'Turkey Scholarship details', 'Required documents', 'Application deadlines ⏰']
    };
  }

  generateDynamicSuggestions(text, lang) {
    if (lang === 'en') {
      return ['Saudi scholarship details', 'Turkiye Burslari info', 'Required documents', 'Contact Advisor 📲'];
    }
    return ['تفاصيل منحة السعودية 🇸🇦', 'المنحة التركية 🇹🇷', 'مواعيد التقديم ⏰', 'المستندات المطلوبة 📋'];
  }
}

const botEngine = new ScholarLoopBotEngine();
