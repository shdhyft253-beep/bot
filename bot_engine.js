/**
 * ScholarLoop Advanced AI Engine (Semantic NLP & Comprehensive Scholarship Knowledge Base)
 * Smart intent analyzer, multi-entity extractor, dynamic answer generator, and intelligent WhatsApp router (+249960714750)
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;
    
    // Build Knowledge Base Matrix
    this.initKnowledgeBase();
  }

  initKnowledgeBase() {
    // Extensive Knowledge Entities
    this.scholarshipsData = {
      saudi: {
        name: 'منحة المملكة العربية السعودية (منصة أدرس في السعودية)',
        aliases: ['سعودية', 'السعودية', 'أدرس في السعودية', 'ادرس في السعودية', 'saudi', 'ksa'],
        quotas: 'تقبل المملكة أعداداً كبيرة جداً سنوياً (عشرات الآلاف من الطلاب الدوليين من أكثر من 160 دولة)، وتعد من أكبر المنح في الطاقة الاستيعابية.',
        stipend: 'راتب شهري منتظم (حوالي 840 إلى 1000 ريال سعودي شهرياً حسب المرحلة)، بالإضافة إلى بدل تجهيز ومكافأة تفوق.',
        housing: 'سكن جامعي مؤثث ومجاني بالكامل شامل المرافق والانترنت.',
        tickets: 'تذاكر طيران مجانية سنوياً (ذهاب وإياب لبلدك الأصلي).',
        language: 'لا تشترط اللغة الإنجليزية لجميع التخصصات؛ حيث تتوفر معاهد لغة عربية مجانية للطلاب غير الناطقين بها، وبرامج إنجليزية للتخصصات العلمية والهندسية.',
        acceptance: 'نسب قبول مرتفعة جداً؛ 80% فأعلى للكليات النظرية وإدارة الأعمال، 85% فأعلى للهندسة والحاسوب، و90% فأعلى للطب والمختبرات.',
        age: 'البكالوريوس (17 - 25 سنة)، الماجستير (أقل من 30 سنة)، الدكتوراه (أقل من 35 سنة).'
      },
      turkey: {
        name: 'المنحة التركية الحكومية (Türkiye Bursları)',
        aliases: ['تركيا', 'التركية', 'تركية', 'turkey', 'burslari'],
        quotas: 'تقبل المنحة التركية حوالي 5,000 طالب سنوياً من أصل أكثر من 160,000 متقدم حول العالم، والمنافسة قوية وتعتمد على الملف الشامل.',
        stipend: 'راتب شهري (1700 ليرة للبكالوريوس، 2400 ليرة للماجستير، 3000 ليرة للدكتوراه - قابلة للتحديث).',
        housing: 'سكن طلابي حكومي (KYK) مجاني شامل الوجبات الفطور والعشاء.',
        tickets: 'تذكرة طيران مجانية عند القدوم لأول مرة وتذكرة عودة بعد التخرج.',
        language: 'لا تشترط الإنجليزية أو التركية مسبقاً للقبول؛ حيث تمنح جميع المقبولين سنة تحضيرية مجانية لتعلم اللغة التركية (TÖMER).',
        acceptance: 'الحد الأدنى: 70% للتخصصات الأدبية والإدارية، 75% للهندسة والعلوم، و90% للطب والسيادلة والأسنان.',
        age: 'البكالوريوس (أقل من 21 سنة)، الماجستير (أقل من 30 سنة)، الدكتوراه (أقل من 35 سنة).'
      },
      germany: {
        name: 'منح وقبولات ألمانيا (DAAD & Public Universities)',
        aliases: ['المانيا', 'ألمانيا', 'داد', 'daad', 'germany'],
        quotas: 'الجامعات الألمانية الحكومية شبه مجانية لجميع الطلاب، ومنح DAAD تقدم آلاف الفرص سنوياً للدراسات العليا.',
        stipend: 'منحة DAAD تقدم راتباً شهرياً ممتازاً (حوالي 934 يورو للماجستير و1200 يورو للدكتوراه) شامل التأمين الصحي.',
        housing: 'تتولى السكن الجامعي المكتسب عبر مكاتب الطلاب (Studentenwerk) بسعر رمزي، أو بدعم من المنحة.',
        tickets: 'بدل سفر وتذاكر طيران لمقبولي منحة DAAD.',
        language: 'تشترط الألمانية (B2/C1) للبرامج المعتمدة بالألمانية، أو الإنجليزية (IELTS 6.5+) للبرامج الدولية المعتمدة بالإنجليزية.',
        acceptance: 'البكالوريوس يتطلب سنة تحضيرية (Studienkolleg) للشهادات الثانوية غير المعادلة، والماجستير يتطلب GPA 3.0+.',
        age: 'لا يوجد حد صارم للعمر في ألمانيا، لكن يفضل تقارب السن مع المرحلة الدراسية.'
      },
      hungary: {
        name: 'منحة الحكومة الهنغارية (Stipendium Hungaricum)',
        aliases: ['هنغاريا', 'المجر', 'مجر', 'hungary', 'stipendium'],
        quotas: 'تمنح أكثر من 5,000 منحة سنوياً لطلاب أكثر من 90 دولة شريكة.',
        stipend: 'راتب شهري، مع إعفاء كامل من الرسوم الدراسية وتأمين صحي.',
        housing: 'سكن جامعي مجاني أو بدل سكن شهري.',
        tickets: 'تعتمد التذاكر على الدولة الشريكة.',
        language: 'تتوفر معظم البرامج باللغة الإنجليزية بالكامل، ولا تشترط شهادة IELTS إذا كان إثبات اللغة من المدرسة/الجامعة مسبقاً أو عبر اختبار الجامعة الداخلي.',
        acceptance: '70% فأعلى لمعظم التخصصات مع التقييم في المقابلة الشخصية عبر الإنترنت.'
      },
      egypt: {
        name: 'منحة ومنصة إدرس في مصر (الوافدين)',
        aliases: ['مصر', 'المصرية', 'ادرس في مصر', 'إدرس في مصر', 'egypt'],
        quotas: 'طاقة استيعابية ضخمة جداً وتسهيلات خاصة وحسومات كبيرة للطلاب السودانيين والجنسيات العربية.',
        stipend: 'رسوم دراسية مخفضة وتسهيلات في السداد ومنح جزئية وكاملة.',
        housing: 'سكن جامعي في المدن الجامعية التابعة لجامعات القاهرة وأين شمس والإسكندرية وغيرها.',
        language: 'الدراسة باللغة العربية أو الإنجليزية حسب الكلية والتخصص.'
      }
    };
  }

  /**
   * Process natural language inputs dynamically using semantic intent extraction
   */
  async processQuery(userInput, lang = 'auto') {
    const rawText = userInput.trim();
    if (!rawText) return null;

    const isEnglish = /[a-zA-Z]/.test(rawText) && !/[\u0600-\u06FF]/.test(rawText);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;
    const cleanText = rawText.toLowerCase();

    // Extract Entities & Numerical values
    const percentMatch = rawText.match(/(\d{2,3})\s*[%٪]?/);
    const percentage = percentMatch ? parseInt(percentMatch[1], 10) : null;

    // Detect matched country / scholarship program
    let matchedCountryKey = null;
    for (const [key, data] of Object.entries(this.scholarshipsData)) {
      if (data.aliases.some(alias => cleanText.includes(alias))) {
        matchedCountryKey = key;
        break;
      }
    }

    const countryObj = matchedCountryKey ? this.scholarshipsData[matchedCountryKey] : null;

    // Intent Classifiers
    const isAskingNumbersOrQuota = /(أعداد|اعداد|عدد|طاقة|كبيرة|كبيره|سعة|كم يقبلون|تنافس|الفرص|quota|capacity|numbers)/i.test(cleanText);
    const isAskingStipendOrMoney = /(راتب|مكافأة|مكافاه|مصاريف|مالية|فلوس|تمويل|راتب شهري|stipend|allowance|salary|money)/i.test(cleanText);
    const isAskingHousing = /(سكن|إقامة|اقامة|معيشة|سكن جامعي|غرفة|dorm|housing|accommodation)/i.test(cleanText);
    const isAskingLanguage = /(لغة|لغه|شهادة لغة|آيلتس|توفل|توفل|انجليزي|ألماني|تركي|ielts|toefl|language|english)/i.test(cleanText);
    const isAskingAge = /(عمر|سن|العمر|السن|حد العمر|age|age limit)/i.test(cleanText);
    const isAskingDeadline = /(موعد|مواعيد|تاريخ|أخر موعد|اخر موعد|متى ينتهي|متى يفتح|deadline|dates)/i.test(cleanText);
    const isAskingDocuments = /(مستند|مستندات|أوراق|اوراق|شهادة|توصية|توصيات|دوافع|نوايا|وثائق|documents|docs|passport)/i.test(cleanText);
    const isAskingSudanCert = /(سودانية|السودانية|الشهادة السودانية|سوداني)/i.test(cleanText);

    // -------------------------------------------------------------------
    // SCENARIO 1: Intent Query about Capacity/Quota ("هل تقبل أعداد كبيرة؟")
    // -------------------------------------------------------------------
    if (isAskingNumbersOrQuota) {
      if (countryObj) {
        return {
          reply: chosenLang === 'ar'
            ? `📊 **عن الأعداد والطاقة الاستيعابية في ${countryObj.name}:**\n\n` +
              `${countryObj.quotas}\n\n` +
              `💡 **كيف تضمن قبولك؟**\n` +
              `رغم كثرة الأعداد، فإن تميز خطاب النوايا (SOP) واكتمل ملف المستندات المصدقة هو الفارق الأساسي بين المتقدمين.\n\n` +
              `هل ترغب في معرفة شروط النسبة أو المستندات لهذه المنحة؟`
            : `📊 **Acceptance Capacity for ${countryObj.name}:**\n\n${countryObj.quotas}`,
          lowConfidence: false,
          suggestions: ['ما هي الشروط والنسبة؟', 'تفاصيل السكن والراتب', 'تواصل مع المستشار 📲']
        };
      }

      return {
        reply: chosenLang === 'ar'
          ? `📊 **الأعداد والطاقة الاستيعابية للمنح الدراسية العالمية:**\n\n` +
            `• 🇸🇦 **منح المملكة العربية السعودية (منصة أدرس في السعودية):** تعتبر من الأكثر إتاحة للأعداد؛ حيث تتيح عشرات الآلاف من المقاعد سنوياً بمختلف التخصصات.\n` +
            `• 🇹🇷 **المنحة التركية الحكومية:** تقبل حوالي 5,000 طالب سنوياً من مختلف دول العالم.\n` +
            `• 🇭🇺 **منحة الحكومة الهنغارية:** تقبل أكثر من 5,000 طالب سنوياً من الدول الشريكة.\n` +
            `• 🇪🇬 **منصة إدرس في مصر:** طاقة استيعابية واسعة جداً للطلاب السودانيين والعرب.\n\n` +
            `حدد لي الدولة أو نسبتك الأكاديمية لأخبرك بفرصة قبولك بالضبط!`
          : `📊 **Global Scholarship Quotas:**\nSaudi Arabia and Egypt offer the highest annual quotas, followed by Turkey and Hungary.`,
        lowConfidence: false,
        suggestions: ['منح السعودية أدرس في السعودية', 'المنحة التركية', 'نسبتي 80 في الشهادة السودانية']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 2: Language Requirements Intent ("هل تتطلب شهادة لغة؟")
    // -------------------------------------------------------------------
    if (isAskingLanguage) {
      if (countryObj) {
        return {
          reply: chosenLang === 'ar'
            ? `🗣️ **متطلبات اللغة في ${countryObj.name}:**\n\n` +
              `${countryObj.language}\n\n` +
              `📌 **ملاحظة عامة:** حتى إن لم تكن تملك شهادة IELTS أو TOEFL، فإن العديد من المنح توفر سنة لغة تحضيرية مجانية أو تقبل إثبات الدراسة باللغة الإنجليزية!`
            : `🗣️ **Language Requirements for ${countryObj.name}:**\n\n${countryObj.language}`,
          lowConfidence: false,
          suggestions: ['المستندات الأخرى المطلوبة', 'تفاصيل السكن والراتب', 'تواصل مع المستشار 📲']
        };
      }

      return {
        reply: chosenLang === 'ar'
          ? `🗣️ **هل جميع المنح تتطلب شهادة لغة (IELTS / TOEFL)؟**\n\n` +
            `**الإجابة: لا! هناك منح عديدة لا تشترط شهادة لغة مسبقة:**\n\n` +
            `1. 🇸🇦 **منح السعودية:** توفر برامج لغة عربية وإنجليزية دون اشتراط IELTS مسبقاً لأغلب البرامج.\n` +
            `2. 🇹🇷 **المنحة التركية:** تمنح جميع المقبولين **سنة لغة تركية مجانية (TÖMER)** بغض النظر عن لغتك الحالية.\n` +
            `3. 🇭🇺 **منحة هنغاريا:** تقبل خطابات إثبات اللغة الصادرة من مدرستك/جامعتك أو التقييم في المقابلة.\n` +
            `4. 🇩🇪 **ألمانيا:** تشترط الإنجليزية للبرامج الدولية أو الألمانية للبرامج المعتمدة هناك.\n\n` +
            `أخبرني بالدولة التي تهتم بها لأعطيك شرط اللغة الخاص بها!`
          : `🗣️ **Do all scholarships require language certificates?**\nNo! Saudi Arabia and Turkey provide free 1-year language prep courses regardless of your current language level.`,
        lowConfidence: false,
        suggestions: ['المنحة السعودية', 'المنحة التركية', 'تواصل مع المستشار 📲']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 3: Housing & Stipend Intent ("تفاصيل السكن والمرتبات")
    // -------------------------------------------------------------------
    if (isAskingHousing || isAskingStipendOrMoney) {
      if (countryObj) {
        return {
          reply: chosenLang === 'ar'
            ? `🏠💰 **تفاصيل السكن والمكافأة المالية في ${countryObj.name}:**\n\n` +
              `• **الراتب والمكافأة:** ${countryObj.stipend}\n` +
              `• **السكن والإقامة:** ${countryObj.housing}\n` +
              `${countryObj.tickets ? `• **تذاكر الطيران:** ${countryObj.tickets}\n` : ''}\n` +
              `✨ المنحة تعتبر ممولة بالكامل وتغطي تكاليف الدراسة والمعيشة.`
            : `🏠💰 **Housing & Stipend for ${countryObj.name}:**\n\nStipend: ${countryObj.stipend}\nHousing: ${countryObj.housing}`,
          lowConfidence: false,
          suggestions: ['شروط القبول والنسبة', 'المستندات المطلوبة', 'تواصل مع المستشار 📲']
        };
      }

      return {
        reply: chosenLang === 'ar'
          ? `🏠💰 **المميزات المالية والسكنية في المنح الممولة بالكامل:**\n\n` +
            `تتضمن المنح الكاملة (مثل السعودية، تركيا، هنغاريا، والداد الألماني):\n` +
            `1. **إعفاء كامل 100% من الرسوم الدراسية.**\n` +
            `2. **راتب شهري منتظم** يدفع للطالب لإغفال مصاريفه الشخصية.\n` +
            `3. **سكن جامعي مجاني مؤثث** بالكامل شامل الخدمات.\n` +
            `4. **تأمين صحي شامل وتذاكر طيران سنوية.**\n\n` +
            `ما هي المنحة التي تود معرفة تفاصيل مرتباتها وسكنها؟`
          : `Fully funded scholarships cover 100% tuition, free university housing, monthly stipends, health insurance, and return flight tickets.`,
        lowConfidence: false,
        suggestions: ['منح السعودية', 'منح تركيا', 'منح هنغاريا']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 4: Specific Certificate & Percentage (Sudanese Certificate 80%, etc.)
    // -------------------------------------------------------------------
    if (percentage || isAskingSudanCert) {
      const scoreText = percentage ? `بنسبة **${percentage}%**` : '';
      const certText = isAskingSudanCert ? 'في الشهادة السودانية' : 'في الثانوية العامة';

      if (matchedCountryKey === 'saudi' || cleanText.includes('سعودية')) {
        return {
          reply: chosenLang === 'ar'
            ? `🇸🇦 **فرص القبول في منح السعودية ${scoreText} ${certText}:**\n\n` +
              `**نعم، فرصة قبولك ممتازة جداً!** 🌟\n\n` +
              `• **الكليات النظرية، الإدارية، والتجارية (80% فأعلى):** تضمن لك منافسة قوية جداً في منصة (أدرس في السعودية).\n` +
              `• **كليات الهندسة وتقنية المعلومات (85% فأعلى):** ${percentage >= 85 ? 'نسبتك تتيح لك التقديم المباشر على الهندسة والحاسوب!' : 'يفضل التقديم أيضاً على علوم الحاسوب ونظم المعلومات'}.\n` +
              `• **المميزات:** راتب شهري، سكن مجاني، تذاكر طيران سنوياً، ورعاية صحية شاملة.\n\n` +
              `هل ترغب في أن يتولى المستشار الأكاديمي تجهيز ملفك والتقديم لك رسمياً؟`
            : `With ${percentage || 80}% in high school, you are highly eligible for fully funded Saudi Arabia scholarships!`,
          lowConfidence: false,
          suggestions: ['تواصل مع المستشار للتقديم 📲', 'المستندات المطلوبة للسعودية', 'المنحة التركية']
        };
      }

      return {
        reply: chosenLang === 'ar'
          ? `🎓 **تقييم الأهلية والفرص ${scoreText} ${certText}:**\n\n` +
            `نسبتك تفتح لك أبواب التقديم في عدة منح عالمية ممتازة:\n` +
            `1. 🇸🇦 **منح المملكة العربية السعودية:** قبول قوي للنسب من 80% فما فوق لكليات التجارة والعلوم والنظرية.\n` +
            `2. 🇹🇷 **المنحة التركية الحكومية:** تقبل من 70% للعلوم الإنسانية و75% للهندسة.\n` +
            `3. 🇭🇺 **منحة هنغاريا الحكومية:** تقبل التقديم بنسبتك مع إثبات كفاءة لغوية.\n` +
            `4. 🇪🇬 **منحة إدرس في مصر:** قبول مباشر بتسهيلات ورسوم مخفضة.\n\n` +
            `راسل المستشار الأكاديمي لمراجعة ملفك وتحديد المنحة الأضمن لك!`
          : `Your high school score qualifies you for Saudi Arabia, Turkey, Hungary, and Egypt scholarship programs.`,
        lowConfidence: false,
        suggestions: ['منحة السعودية', 'المنحة التركية', 'تواصل مع المستشار عبر واتساب 📲']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 5: Country Specific Matches (General)
    // -------------------------------------------------------------------
    if (countryObj) {
      return {
        reply: chosenLang === 'ar'
          ? `🌍 **دليل التقديم الشامل لـ ${countryObj.name}:**\n\n` +
            `• **الأعداد والتنافس:** ${countryObj.quotas}\n` +
            `• **النسب القبول:** ${countryObj.acceptance}\n` +
            `• **متطلبات اللغة:** ${countryObj.language}\n` +
            `• **المميزات والراتب:** ${countryObj.stipend}\n` +
            `• **السكن الإقامة:** ${countryObj.housing}\n\n` +
            `أخبرني إذا كنت تود استفساراً محدداً أو التواصل مع المستشار للتقديم!`
          : `🌍 **Scholarship Guide for ${countryObj.name}:**\nRequirements: ${countryObj.acceptance}\nLanguage: ${countryObj.language}\nStipend & Housing included.`,
        lowConfidence: false,
        suggestions: ['هل تتطلب شهادة لغة؟', 'هل تقبل أعداداً كبيرة؟', 'تواصل مع المستشار 📲']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 6: Documents FAQs
    // -------------------------------------------------------------------
    if (isAskingDocuments) {
      return {
        reply: chosenLang === 'ar'
          ? `📋 **المستندات الرسمية الشاملة للتقديم على المنح:**\n\n` +
            `1. **الشهادة الثانوية/الجامعية وكشف الدرجات:** مترجمة ومصدقة من الخارجية والتعليم.\n` +
            `2. **خطاب النوايا والدافع (SOP):** مخصص للتخصص والجامعة.\n` +
            `3. **خطابات التوصية (Recommendation Letters):** 2 خطابات من أساتذة أو مشرفين.\n` +
            `4. **السيرة الذاتية (CV):** بالصياغة الأكاديمية الأوروبية.\n` +
            `5. **جواز سفر ساري المفعول وصورة شخصية.**\n\n` +
            `💡 يمكنك استخدام **أداة المسؤول** في المنصة لصياغة وتجهيز كافة الخطابات الرسمية بلمسة زر!`
          : `📋 **Required Documents:** Certified Certificates, Transcripts, SOP, 2 Recommendation Letters, CV, Passport.`,
        lowConfidence: false,
        suggestions: ['صياغة خطاب النوايا', 'صياغة خطابات التوصية', 'تواصل مع المستشار 📲']
      };
    }

    // -------------------------------------------------------------------
    // SCENARIO 7: Intelligent Flexible Fallback (Niche / Uncovered Questions)
    // -------------------------------------------------------------------
    return {
      reply: chosenLang === 'ar'
        ? `أهلاً بك! بالنسبة للاستفسار الخاص بـ: ("${rawText}") 🎓\n\n` +
          `تتطلب الإجابة الدقيقة على هذا السؤال مراجعة حالة ملفك الأكاديمي والاشتراطات المحدثة للسنة الدراسية الحالية.\n\n` +
          `💡 **قواعد عامة مفيدة:**\n` +
          `• تشترط معظم المنح الحكومية وجود مستندات مصدقة وخطاب نوايا احترافي.\n` +
          `• تتوفر فرص ممولة بالكامل تشمل السكن والراتب والتذاكر مجاناً.\n\n` +
          `يمكنك التواصل المباشر مع **المستشار الأكاديمي لـ ScholarLoop** لتقييم ملفك وإجابتك بدقة تامة:`
        : `Regarding your query ("${rawText}"): 🎓\n\n` +
          `Requirements vary dynamically based on academic year and university rules.\n\n` +
          `Please contact our **ScholarLoop Academic Advisor** directly on WhatsApp for tailored evaluation:`,
      lowConfidence: true,
      whatsappLink: this.advisorWhatsappLink,
      whatsappPhone: '+249 96 071 4750',
      suggestions: chosenLang === 'ar'
        ? ['تواصل مع المستشار عبر واتساب 📲', 'نسبتي 80 في الشهادة السودانية', 'هل تتطلب شهادة لغة؟']
        : ['Contact WhatsApp 📲', 'Saudi Scholarships', 'Language Requirements']
    };
  }
}

const botEngine = new ScholarLoopBotEngine();
