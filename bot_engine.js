/**
 * ScholarLoop AI Chat Engine
 * Handles bilingual scholarship queries, document guidance, and fallback to WhatsApp (+249960714750)
 */

class ScholarLoopBotEngine {
  constructor() {
    this.advisorPhone = '249960714750';
    this.advisorWhatsappLink = `https://wa.me/${this.advisorPhone}?text=${encodeURIComponent('أهلاً، أود الاستفسار والتواصل مع المستشار الأكاديمي لمنصة ScholarLoop')}`;
    
    // Knowledge Base Data
    this.kb = {
      documents: {
        keywords: ['مستند', 'مستندات', 'اوراق', 'أوراق', 'وثائق', 'شهادة', 'توصية', 'سيرة', 'documents', 'docs', 'passport', 'recommendation', 'sop', 'transcript'],
        ar: `📋 **المستندات الأساسية المطلوبة للتقديم على أغلب المنح الدراسية:**
1. **شهادة التخرج وكشف الدرجات:** مترجمة ومصدقة رسمياً.
2. **إثبات مستوى اللغة:** (IELTS أو TOEFL للإنجليزية، أو شهادة مثل Göethe للألمانية حسب لغة البرنامج).
3. **خطاب النوايا / الرسالة التحفيزية (SOP):** يوضح أهدافك وإنجازاتك وسبب اختيارك للتخصص.
4. **خطابات التوصية (2-3):** من أساتذة أكاديميين أو مشرفين عمل سابقين.
5. **السيرة الذاتية (CV):** بالنظام الأوروبي (Europass) أو الأكاديمي الموحد.
6. **جواز سفر ساري المفعول** وصور شخصية بخلفية بيضاء.

💡 *نصيحة:* يمكنك طلب مساعدة المستشار الأكاديمي لمراجعة وتنسيق أوراقك قبل التقديم!`,
        en: `📋 **Essential Required Documents for Most Scholarships:**
1. **Graduation Certificate & Official Transcripts:** Translated and officially certified.
2. **Language Proficiency Proof:** (IELTS/TOEFL for English, or Göethe/TestDaF for German depending on the program).
3. **Statement of Purpose (SOP) / Motivation Letter:** Outlining your goals, accomplishments, and choice of study.
4. **Letters of Recommendation (2-3):** From academic professors or professional supervisors.
5. **Curriculum Vitae (CV):** Europass or academic standard format.
6. **Valid Passport** and recent passport photographs.

💡 *Tip:* You can request expert review from our academic advisor before submitting!`
      },

      requirements: {
        keywords: ['شروط', 'متطلبات', 'معدل', 'عمر', 'شروط التقديم', 'قبول', 'معايير', 'requirements', 'eligibility', 'gpa', 'age', 'criteria'],
        ar: `🎓 **الشروط العامة للتقديم على المنح الدراسية:**
- **المعدل الأكاديمي:** يفضل ألا يقل عن 75% أو GPA 3.0/4.0 للمنافسة القوية.
- **حد العمر:** يختلف حسب المنحة (عادة أقل من 30 سنة للبكلاريوس، وأقل من 35 للمالجستير، وأقل من 40 للدكتوراه).
- **التخصص والأهلية:** أن يكون المؤهل السابق متوافقاً مع التخصص المطلوب.
- **الأنشطة والخبرات:** الأنشطة التطوعية والبحثية تزيد من فرص قبولك بشكل كبير.

هل ترغب في معرفة شروط منحة محددة (مثل: التركية، داد الألمانية، تشيفنينج)؟`,
        en: `🎓 **General Scholarship Eligibility Requirements:**
- **Academic GPA:** Minimum 75% or GPA 3.0/4.0 recommended for high competitiveness.
- **Age Limit:** Varies by program (typically under 30 for Bachelor's, under 35 for Master's, under 40 for PhD).
- **Field Match:** Your previous degree must align with the target program.
- **Extracurriculars & Research:** Volunteering and publications significantly boost your profile.

Would you like specific criteria for a particular scholarship (e.g., DAAD, Chevening, Turkiye Burslari)?`
      },

      advisor: {
        keywords: ['مستشار', 'تواصل', 'واتس', 'واتساب', 'تلفون', 'رقم', 'استشارة', 'شخصي', 'advisor', 'contact', 'whatsapp', 'counselor', 'phone', 'call', 'human'],
        ar: `👨‍🎓 **تواصل مع المستشار الأكاديمي لمنصة ScholarLoop:**
يمكنك التواصل مباشرة مع المستشار عبر واتساب للحصول على:
- تقييم شمول ومباشر لملفك الأكاديمي.
- صياغة ومراجعة خطاب النوايا (SOP).
- التقديم المباشر على المنح ورعاية ملفك.

📲 **الرقم الرسمي على واتساب:** [249960714750](https://wa.me/249960714750)
اضغط على الزر أدناه للانتقال للمحادثة المباشرة!`,
        en: `👨‍🎓 **Connect with ScholarLoop Academic Advisor:**
Reach out directly via WhatsApp for:
- Personalized academic profile evaluation.
- Statement of Purpose (SOP) drafting and refinement.
- Direct scholarship application management.

📲 **Official WhatsApp Number:** [249960714750](https://wa.me/249960714750)`
      },

      scholarships: {
        keywords: ['منح', 'انواع المنح', 'منحة', 'تركيا', 'التركية', 'المانيا', 'داد', 'بريطانيا', 'تشيفنينج', 'مجر', 'فلبرايت', 'scholarship', 'chevening', 'daad', 'turkey', 'stipendium'],
        ar: `🌍 **أشهر المنح الدراسية الممولة بالكامل:**
1. **المنحة التركية (Turkiye Burslari):** تغطي السكن، الراتب، التذاكر، وسنة لغة تركية مجانية.
2. **منحة DAAD الألمانية:** للماجستير والدكتوراه، تشمل راتباً شهرياً وتأميناً صحياً.
3. **منحة تشيفنينج (Chevening):** للماجستير في المملكة المتحدة وتغطي كافة المصاريف.
4. **منحة الحكومة الهنغارية (Stipendium Hungaricum):** تغطي رسوم الدراسة والسكن وراتباً.
5. **منحة إراسموس موندوس (Erasmus Mundus):** للدراسة في عدة دول أوربية بنفس البرنامج.

أخبرني بأي دولة أو تخصص تهتم ليتم توجيهك بالخطوات!`,
        en: `🌍 **Top Fully Funded Scholarship Programs:**
1. **Turkiye Burslari (Turkey):** Covers accommodation, stipend, flight tickets, and 1-year language prep.
2. **DAAD Scholarships (Germany):** For Master's & PhD, providing monthly allowance & health insurance.
3. **Chevening Scholarships (UK):** Master's degree in top UK universities fully covered.
4. **Stipendium Hungaricum (Hungary):** Free tuition, accommodation allowance, and stipend.
5. **Erasmus Mundus (Europe):** Multi-country European master's degree experience.

Tell me which destination or major interests you!`
      },

      sop: {
        keywords: ['خطاب', 'نوايا', 'دوافع', 'رسالة تحفيزية', 'sop', 'motivation', 'statement of purpose', 'letter'],
        ar: `✍️ **خطاب النوايا (Statement of Purpose / SOP):**
هو أهم مستند في الملف! يجب أن يشمل 4 محاور رئيسية:
1. مقدمة عن شغفك الأكاديمي.
2. إنجازاتك وخبراتك السابقة.
3. سبب اختيار التخصص والجامعة والدولة.
4. خطتك المستقبية وكيف ستستفيد وتفيد مجتمعك.

⚠️ *ملاحظة:* توفر منصة ScholarLoop خدمة كتابة وصياغة مسودة احترافية لخطاب النوايا عبر مسؤول الموقع والمستشار الأكاديمي!`,
        en: `✍️ **Statement of Purpose (SOP):**
The single most decisive document in your application! It should address:
1. Your academic motivation & passion.
2. Relevant accomplishments and background.
3. Why this university, program, and destination.
4. Future career goals and impact.

⚠️ *Note:* ScholarLoop provides specialized SOP drafting services under academic advisor supervision!`
      }
    };
  }

  /**
   * Process incoming student query and generate smart response
   */
  async processQuery(userInput, lang = 'auto') {
    const text = userInput.trim();
    if (!text) return null;

    const lowerText = text.toLowerCase();

    // Detect language if auto
    const isEnglish = /[a-zA-Z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
    const chosenLang = lang === 'auto' ? (isEnglish ? 'en' : 'ar') : lang;

    // Check greeting
    if (/^(مرحبا|اهلين|أهلا|سلام|مرحبتين|هلا|hello|hi|hey|greetings)/i.test(lowerText)) {
      return {
        reply: chosenLang === 'ar' 
          ? `أهلاً بك في منصة **ScholarLoop**! 🎓\nأنا مساعدك الذكي المخصص للمنح الدراسية. كيف يمكنني مساعدتك اليوم؟ يمكنك السؤال عن الشروط، المستندات، المنح المتاحة، أو التواصل مع المستشار الأكاديمي.`
          : `Welcome to **ScholarLoop**! 🎓\nI am your AI scholarship assistant. How can I help you today? Ask me about required documents, eligibility, available scholarships, or reaching the academic advisor.`,
        lowConfidence: false,
        suggestions: chosenLang === 'ar' 
          ? ['ما هي المستندات المطلوبة؟', 'ما هي شروط التقديم؟', 'أشهر المنح المتاحة', 'تواصل مع المستشار']
          : ['Required documents?', 'Eligibility criteria?', 'Top scholarships', 'Contact Advisor']
      };
    }

    // Keyword matching
    let bestMatch = null;
    let highestScore = 0;

    for (const [key, category] of Object.entries(this.kb)) {
      let score = 0;
      for (const kw of category.keywords) {
        if (lowerText.includes(kw.toLowerCase())) {
          score += 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = category;
      }
    }

    // High confidence response
    if (bestMatch && highestScore > 0) {
      return {
        reply: bestMatch[chosenLang],
        lowConfidence: false,
        suggestions: chosenLang === 'ar'
          ? ['المستندات المطلوبة', 'شروط التقديم', 'صياغة خطاب النوايا', 'تواصل عبر واتساب']
          : ['Required documents', 'Eligibility requirements', 'SOP Drafting', 'Contact via WhatsApp']
      };
    }

    // Low confidence / Complex evaluation query router -> Trigger WhatsApp Fallback
    return {
      reply: chosenLang === 'ar'
        ? `عذراً، لم أستطع الإجابة على سؤالك بثقة تامة نظراً لاحتياجه لمراجعة وتقييم خاص بملفك الأكاديمي. 🎓\n\nيمكِنك التواصل مباشرة مع **المستشار الأكاديمي** عبر واتساب للحصول على إجابة دقيقة ودعم مباشر لملفك:`
        : `I apologize, I cannot answer this specific question with 100% certainty as it requires personalized academic evaluation. 🎓\n\nPlease reach out directly to our **Academic Advisor** via WhatsApp for tailored assistance:`,
      lowConfidence: true,
      whatsappLink: this.advisorWhatsappLink,
      whatsappPhone: '+249 96 071 4750',
      suggestions: chosenLang === 'ar'
        ? ['تواصل عبر واتساب 📲', 'ما هي المستندات الأساسية؟', 'شروط التقديم العامة']
        : ['Contact WhatsApp 📲', 'Essential documents', 'General requirements']
    };
  }
}

const botEngine = new ScholarLoopBotEngine();
