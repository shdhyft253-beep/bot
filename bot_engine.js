/**
 * ScholarLoop Advanced AI Chat Engine
 * Handles bilingual scholarship queries, specific certificate evaluations (e.g. الشهادة السودانية 80%), 
 * country-specific rules (Saudi Arabia, Turkey, Germany, Hungary, Egypt, etc.), document guidance, 
 * and fallback to WhatsApp (+249960714750)
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;
  }

  /**
   * Process incoming student query with intelligent intent parsing
   */
  async processQuery(userInput, lang = 'auto') {
    const text = userInput.trim();
    if (!text) return null;

    const lowerText = text.toLowerCase();
    const isEnglish = /[a-zA-Z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;

    // Extract numbers/percentages if present
    const percentMatch = text.match(/(\d{2,3})\s*[%٪]?/);
    const percentage = percentMatch ? parseInt(percentMatch[1], 10) : null;

    // -------------------------------------------------------------
    // 1. SPECIFIC COUNTRY & PERCENTAGE EVALUATIONS (e.g. الشهادة السودانية + السعودية)
    // -------------------------------------------------------------
    
    // Saudi Arabia (ادرس في السعودية / منح السعودية)
    if (lowerText.includes('سعودية') || lowerText.includes('السعودية') || lowerText.includes('ادرس في السعودية') || lowerText.includes('أدرس في السعودية')) {
      if (percentage) {
        if (percentage >= 80) {
          return {
            reply: chosenLang === 'ar'
              ? `🇸🇦 **فرص القبول في منح المملكة العربية السعودية (منصة أدرس في السعودية):**\n\n` +
                `بنسبة **${percentage}%** (خاصة في الشهادة السودانية أو الثانوية العامة)، **نعم، يمكنك التقديم والظفر بمنحة دراسية ممولة!** 🎉\n\n` +
                `📌 **تفاصيل الأهلية حسب التخصص:**\n` +
                `• **الكليات النظرية والأدبية وإدارة الأعمال (80% فأعلى):** فرصة قبولك مرتفعة جداً في معظم الجامعات (مثل جامعة الملك سعود، جامعة أم القرى، جامعة الإمام).\n` +
                `• **كليات الهندسة وعلوم الحاسوب (${percentage >= 85 ? 'متاحة لك بقوة' : 'تتطلب غلباً 85% فأعلى'}):** ${percentage >= 85 ? 'نسبتك تتيح لك التنافس المباشر!' : 'يفضل التقديم أيضاً على تخصصات تقنية المعلومات والتجارة الرقمية'}.\n` +
                `• **الكليات الطبية والصحية:** تشترط عادة 90% فأعلى.\n\n` +
                `🎁 **مميزات المنحة السعودية:**\n` +
                `- تذاكر طيران سنوية مجانية.\n` +
                `- سكن جامعي مجاني وراتب شهري ممتاز.\n` +
                `- تأمين صحي شامل وفرص أداء العمرة والحج.\n\n` +
                `💡 **شرط العمر:** أن يكون عمر المتقدم للبكالوريوس بين 17 و25 سنة.\n\n` +
                `هل ترغب في أن يراجع المستشار الأكاديمي ملفك ويساعدك في التقديم عبر منصة (أدرس في السعودية)؟`
              : `🇸🇦 **Saudi Arabia Scholarships Eligibility (Study in Saudi Platform):**\n\n` +
                `With a score of **${percentage}%**, **YES, you are eligible to apply for fully funded Saudi scholarships!** 🎉\n\n` +
                `• **Arts, Business & Social Sciences (80%+):** High chance of acceptance in top universities (King Saud Univ, Umm Al-Qura, etc.).\n` +
                `• **Engineering & IT (85%+):** ${percentage >= 85 ? 'Your score makes you strong candidate!' : 'Recommended to also target IT & Commerce fields'}.\n` +
                `• **Fully Funded Perks:** Free tuition, monthly stipend, university housing, free annual return flight tickets & health insurance.\n\n` +
                `Would you like our academic advisor to review your files and manage your application?`,
            lowConfidence: false,
            suggestions: ['ما هي المستندات المطلوبة للسعودية؟', 'تواصل مع المستشار للتقديم 📲', 'منح تركيا', 'منح هنغاريا']
          };
        } else {
          return {
            reply: chosenLang === 'ar'
              ? `🇸🇦 **التقديم على منح السعودية بنسبة ${percentage}%:**\n\n` +
                `تشترط المنح الحكومية السعودية للبكالوريوس نسبة 80% كحد أدنى لأغلب الكليات. ولكن بنسبة **${percentage}%** يمكنك النظر في:\n` +
                `1. التقديم على بعض برامج الدبلوم أو المنح الجزئية والبرامج الخاصة.\n` +
                `2. التقديم على دول أخرى تقبل نسباً أقل مع تقديم ملف قوي (مثل المنحة التركية أو منحة حكومة مصر).\n\n` +
                `تواصل مع المستشار الأكاديمي لبحث أفضل الخيارات المتاحة لنسبتك بالضبط!`
              : `Saudi scholarships generally require a minimum of 80% for bachelor degrees. With **${percentage}%**, we recommend exploring specialized diploma programs or target alternative destinations like Turkey or Egypt.`,
            lowConfidence: false,
            suggestions: ['تواصل مع المستشار عبر واتساب 📲', 'ما هي المنح المناسبة لنسبتي؟']
          };
        }
      }

      // General Saudi Arabia info
      return {
        reply: chosenLang === 'ar'
          ? `🇸🇦 **دليل التقديم على منح المملكة العربية السعودية (منصة أدرس في السعودية):**\n\n` +
            `تعتبر المنح السعودية من أقوى المنح الممولة بالكامل عالمياً. \n\n` +
            `📋 **الشروط الأساسية:**\n` +
            `1. **الشهادة الثانوية:** (الشهادة السودانية، الثانوية العامة، أو ما يعادلها) بنسبة لا تقل عن 80% للكليات النظرية و85%-90% للهندسة والطب.\n` +
            `2. **العمر:** من 17 إلى 25 سنة لمرحلة البكالوريوس، وأقل من 30 سنة للماجستير.\n` +
            `3. **المستندات:** الشهادة وكشف الدرجات المصدّق، جواز سفر ساري، خلو طرف أمني/شهادة سكن، وتوصيات.\n\n` +
            `🎁 **المميزات:** راتب شهري، سكن مجاني، تذاكر طيران سنوياً، ورعاية صحية كاملة.\n\n` +
            `أخبرني بنسبتك أو تخصصك لأعطيك تقييماً دقيقاً!`
          : `🇸🇦 **Saudi Arabia Scholarships Overview:**\n` +
            `Requires minimum 80% high school percentage, valid passport, and certified transcripts. Fully funded including monthly stipend, housing, and annual flights.`,
        lowConfidence: false,
        suggestions: ['نسبتي 80 في الشهادة السودانية', 'المستندات المطلوبة للسعودية', 'تواصل مع المستشار']
      };
    }

    // Turkey (المنحة التركية / Turkiye Burslari)
    if (lowerText.includes('تركيا') || lowerText.includes('التركية') || lowerText.includes('turkey') || lowerText.includes('burslari')) {
      return {
        reply: chosenLang === 'ar'
          ? `🇹🇷 **دليل المنحة التركية الحكومية (Türkiye Bursları):**\n\n` +
            `منحة ممولة بالكامل لجميع المراحل (بكالوريوس، ماجستير، دكتوراه).\n\n` +
            `📊 **معايير النسبة الأكاديمية:**\n` +
            `• **التخصصات الطبية:** تشترط 90% فأعلى.\n` +
            `• **الهندسة والعلوم:** تشترط 75% فأعلى.\n` +
            `• **التخصصات الأدبية والإدارية:** تشترط 70% فأعلى.\n\n` +
            `🎂 **شرط العمر:**\n` +
            `• البكالوريوس: أقل من 21 سنة.\n` +
            `• الماجستير: أقل من 30 سنة.\n` +
            `• الدكتوراه: أقل من 35 سنة.\n\n` +
            `✨ تشمل المنحة: السكن، راتباً شهرياً، التذاكر، وسنة لغة تركية مجانية (TÖMER).`
          : `🇹🇷 **Turkiye Burslari Scholarship Guide:**\n` +
            `Requires 70%+ for Humanities, 75%+ for Engineering, 90%+ for Medicine. Age limit under 21 for Bachelors. Fully funded with free Turkish language year.`,
        lowConfidence: false,
        suggestions: ['المستندات المطلوبة لتركيا', 'خطاب النوايا لتركيا', 'تواصل مع المستشار']
      };
    }

    // Germany (ألمانيا / DAAD)
    if (lowerText.includes('المانيا') || lowerText.includes('ألمانيا') || lowerText.includes('داد') || lowerText.includes('daad') || lowerText.includes('germany')) {
      return {
        reply: chosenLang === 'ar'
          ? `🇩🇪 **الدراسة والمنح في ألمانيا (DAAD & Public Universities):**\n\n` +
            `• **لحملة الشهادة الثانوية (مثل السودانية/العربية):** تتطلب سنة تحضيرية (Studienkolleg) واختبار Feststellungsprüfung، أو إتمام سنة جامعية في بلدك.\n` +
            `• **للماجستير والدكتوراه (منح DAAD):** تشترط تقدير جيد جداً (GPA 3.0+) وخبرة عمل أو بحثية لا تقل عن سنتين لأغلب البرامج.\n` +
            `• **اللغة:** إثبات إنجليزية (IELTS 6.5+) أو ألمانية (B2/C1 TestDaF).\n\n` +
            `هل ترغب في إعداد خطاب دوافع (Motivation Letter) مخصص للجامعات الألمانية؟`
          : `🇩🇪 **Germany Studies & DAAD Scholarships:**\n` +
            `Requires Studienkolleg for High School certificates, or GPA 3.0+ with 2 years experience for Master's DAAD scholarships.`,
        lowConfidence: false,
        suggestions: ['صياغة خطاب النوايا لألمانيا', 'تواصل مع المستشار', 'شروط الألمانية']
      };
    }

    // High School Certificate general evaluation (الشهادة السودانية / الثانوية العامة)
    if (lowerText.includes('سودانية') || lowerText.includes('الشهادة السودانية') || lowerText.includes('ثانوية') || lowerText.includes('الثانوية')) {
      if (percentage) {
        return {
          reply: chosenLang === 'ar'
            ? `🎓 **تقييم الشهادة الثانوية / السودانية بنسبة (${percentage}%):**\n\n` +
              `نبارك لك هذه النسبة! إليك أفضل فرص المنح المتاحة لك بحسب نسبتك:\n\n` +
              `1. 🇸🇦 **منح المملكة العربية السعودية (منصة أدرس في السعودية):** ${percentage >= 80 ? 'ممتازة جداً للتنافس على الكليات النظرية والهندسية!' : 'تتطلب 80% كحد أدنى'}.\n` +
              `2. 🇹🇷 **المنحة التركية الحكومية:** ${percentage >= 70 ? 'تتيح لك التقديم على كافة التخصصات النظرية والهندسية.' : 'تتطلب 70% كحد أدنى'}.\n` +
              `3. 🇭🇺 **منحة الحكومة الهنغارية (Stipendium Hungaricum):** تقبل نسبتك مع إثبات لغة إنجليزية.\n` +
              `4. 🇪🇬 **منح الحكومة المصرية (إدرس في مصر):** تقبل التقديم المباشر بنسبتك مع خصومات وتسهيلات للطلاب السودانيين والعرب.\n\n` +
              `💡 يمكنك طلب مراجعة ملفك مجاناً عبر المستشار الأكاديمي لاختيار المنحة الأضمن لك!`
            : `🎓 **High School Evaluation for ${percentage}%:**\n` +
              `Your score qualifies you for top fully funded options in Saudi Arabia, Turkey, Hungary, and Egypt. Contact our academic advisor for direct guidance!`,
          lowConfidence: false,
          suggestions: ['التقديم على منحة السعودية', 'التقديم على منحة تركيا', 'تواصل مع المستشار عبر واتساب 📲']
        };
      }
    }

    // Greetings
    if (/^(مرحبا|اهلين|أهلا|سلام|مرحبتين|هلا|hello|hi|hey|greetings)/i.test(lowerText)) {
      return {
        reply: chosenLang === 'ar' 
          ? `أهلاً بك في منصة **ScholarLoop**! 🎓\nأنا مساعدك الأكاديمي الذكي. يمكنني إجابتك عن أي سؤال يخص المنح الدراسية (السعودية، تركيا، ألمانيا، هنغاريا، مصر وغيرها)، تقييم نسبتك الأكاديمية (مثل الشهادة السودانية)، المستندات المطلوبة، أو صياغة الخطابات!`
          : `Welcome to **ScholarLoop**! 🎓\nI am your intelligent scholarship assistant. Ask me anything about scholarships (Saudi Arabia, Turkey, Germany, Hungary, Egypt), certificate evaluation, documents, or recommendation letters!`,
        lowConfidence: false,
        suggestions: ['نسبتي 80 في الشهادة السودانية هل أقدم للسعودية؟', 'ما هي المستندات المطلوبة؟', 'صياغة خطاب النوايا', 'تواصل مع المستشار 📲']
      };
    }

    // Document FAQs
    if (lowerText.includes('مستند') || lowerText.includes('اوراق') || lowerText.includes('وثائق') || lowerText.includes('شهادة') || lowerText.includes('توصية') || lowerText.includes('documents')) {
      return {
        reply: chosenLang === 'ar'
          ? `📋 **المستندات الشاملة للتقديم على المنح الدراسية:**\n\n` +
            `1. **الشهادة الأكاديمية وكشف الدرجات:** (الشهادة السودانية/الثانوية أو البكالوريوس) مترجمة ومصدقة من وزارة الخارجية والتعليم.\n` +
            `2. **إثبات اللغة:** (IELTS / TOEFL للإنجليزية، أو شهادة كفاءة لغوية من مدرستك/جامعتك في بعض المنح).\n` +
            `3. **خطاب النوايا / الدافع (SOP):** يوضح سبب اختيارك للتخصص والدولة وخبراتك.\n` +
            `4. **خطابات التوصية (Recommendation Letters):** خطابين من أساتذتك الأكاديميين.\n` +
            `5. **السيرة الذاتية (CV):** بالنظام الأكاديمي الأوروبي.\n` +
            `6. **جواز سفر ساري المفعول** وصورة شخصية خلفية بيضاء.\n\n` +
            `💡 يمكنك استخدام **أداة المسؤول** في المنصة لصياغة وتجهيز كافة الخطابات الرسمية بنقرة زر!`
          : `📋 **Complete Required Documents List:**\n` +
            `Certificates, Transcripts, Proof of Language, SOP/Motivation Letter, 2 Recommendation Letters, Academic CV, and valid Passport.`,
        lowConfidence: false,
        suggestions: ['صياغة خطاب التوصية', 'صياغة خطاب النوايا', 'تواصل مع المستشار']
      };
    }

    // Recommendation Letters & SOP FAQs
    if (lowerText.includes('خطاب') || lowerText.includes('توصية') || lowerText.includes('نوايا') || lowerText.includes('دافع') || lowerText.includes('sop') || lowerText.includes('recommendation')) {
      return {
        reply: chosenLang === 'ar'
          ? `✍️ **الخطابات الأكاديمية والتحفيزية في ScholarLoop:**\n\n` +
            `توفر منصتنا أداة إدارية ذكية لتوليد وصياغة كافة أنواع الخطابات الرسمية للطلاب:\n` +
            `1. **خطاب النوايا / الدافع (Statement of Purpose / SOP)**\n` +
            `2. **خطاب التوصية الأكاديمي (Academic Recommendation Letter)**\n` +
            `3. **خطاب التوصية المهني (Professional Recommendation Letter)**\n` +
            `4. **خطاب التغطية للتقديم (Cover Letter)**\n` +
            `5. **خطاب تفسير سنة الفجوة / الظروف (Gap Year Explanation Letter)**\n\n` +
            `راسل المستشار الأكاديمي أو افتح (لوحة المسؤول) لصياغة مسودة مخصصة لملفك فورا!`
          : `✍️ **Academic Letters Drafting:**\n` +
            `ScholarLoop admin tool generates SOPs, Academic Recommendation Letters, Professional Recommendations, Cover Letters, and Gap Year Explanation letters.`,
        lowConfidence: false,
        suggestions: ['تواصل مع المستشار للصياغة 📲', 'شروط التقديم العامة']
      };
    }

    // General Fallback with intelligent direct guidance + WhatsApp trigger
    return {
      reply: chosenLang === 'ar'
        ? `بناءً على استفسارك المخصص، المنح الدراسية تختلف في شروطها الدقيقة بحسب السنة والتخصص المطلوبة. 🎓\n\n` +
          `يمكن للمستشار الأكاديمي لمنصة **ScholarLoop** تقييم مؤهلاتك وتوجيهك لأفضل المنح المتاحة وتجهيز ملفك كاملاً:`
        : `For your specific inquiry, scholarship requirements vary based on target major and academic year. 🎓\n\n` +
          `Our **ScholarLoop Academic Advisor** can review your documents and select the ideal scholarship for your profile:`,
      lowConfidence: true,
      whatsappLink: this.advisorWhatsappLink,
      whatsappPhone: '+249 96 071 4750',
      suggestions: chosenLang === 'ar'
        ? ['تواصل مع المستشار عبر واتساب 📲', 'نسبتي 80 في الشهادة السودانية', 'المستندات المطلوبة']
        : ['Contact WhatsApp 📲', 'Saudi Arabia Scholarships', 'Required Documents']
    };
  }
}

const botEngine = new ScholarLoopBotEngine();
