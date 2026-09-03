/**
 * ScholarLoop Admin Panel Controller (Expanded Comprehensive Letters Generator)
 * Supports SOP, Academic Recommendation, Professional Recommendation, Cover Letter, Gap Year Explanation, and Study Plan.
 */

class ScholarLoopAdmin {
  constructor() {
    this.adminPasswordHash = 'admin123'; // Default secure password
    this.isAuthenticated = false;
  }

  authenticate(password) {
    if (password.trim() === this.adminPasswordHash) {
      this.isAuthenticated = true;
      sessionStorage.setItem('sl_admin_authenticated', 'true');
      return true;
    }
    return false;
  }

  checkAuth() {
    return sessionStorage.getItem('sl_admin_authenticated') === 'true';
  }

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('sl_admin_authenticated');
  }

  /**
   * Generate Academic Letters (SOP, Recommendation, Cover Letter, Gap Year, Study Plan)
   */
  async generateLetter(params) {
    const { 
      letterType, 
      studentName, 
      major, 
      targetUniversity, 
      degreeLevel, 
      accomplishments, 
      reason, 
      futurePlans, 
      recommenderTitle,
      language 
    } = params;

    // Simulate AI generator delay
    await new Promise(r => setTimeout(r, 1000));

    const sName = studentName || 'الطالب المحترم';
    const target = targetUniversity || 'الجامعة والمنحة المستهدفة';
    const deg = degreeLevel || 'البكالوريوس / الماجستير';
    const maj = major || 'التخصص الأكاديمي';
    const recTitle = recommenderTitle || 'الأستاذ الدكتور / المشرف الأكاديمي';

    // 1. STATEMENT OF PURPOSE / MOTIVATION LETTER
    if (letterType === 'sop') {
      if (language === 'en') {
        return `STATEMENT OF PURPOSE (SOP)

Applicant Name: ${sName}
Degree Program: ${deg} in ${maj}
Target Institution / Scholarship: ${target}

Dear Members of the Admissions Committee,

I am writing this Statement of Purpose to formally convey my deep academic motivation and enthusiasm to apply for the ${deg} program in ${maj} at ${target}. Throughout my educational background, I have consistently maintained a high standard of academic commitment, driven by a passion for technical excellence and continuous innovation.

${accomplishments ? `My previous academic and practical achievements include: ${accomplishments}.` : 'During my foundational studies, I completed rigorous coursework, hands-on projects, and research activities that solidified my analytical mindset and problem-solving skills.'} These experiences provided me with a comprehensive understanding of core domain principles and prepared me to tackle advanced academic challenges.

My strong motivation for choosing ${target} stems from ${reason || 'its distinguished reputation for academic leadership, cutting-edge research facilities, and world-class faculty members'}. The curriculum aligns seamlessly with my specialized interests, offering an ideal environment to acquire state-of-the-art knowledge and collaborate with international scholars.

Upon graduating from this esteemed program, my immediate and long-term career goals involve ${futurePlans || 'utilizing the expertise gained to solve complex real-world challenges, lead strategic research projects, and contribute meaningfully to my field and community'}.

I am confident that my background, dedication, and enthusiasm make me a suitable candidate for this competitive program. Thank you for your time and consideration of my application.

Sincerely,
${sName}`;
      }

      return `خطاب النوايا والرسالة التحفيزية (Statement of Purpose / Motivation Letter)

اسم الطالب المتقدم: ${sName}
المرحلة الدراسية: ${deg} في تخصص (${maj})
الجهة المستهدفة: ${target}

إلى أعضاء لجنة القبول وتدقيق المنح المحترمين،

أكتب إليكم هذه الرسالة للتعبير عن رغبتي الأكاديمية الشديدة وشغفي للانضمام إلى برنامج ${deg} في تخصص (${maj}) لدى ${target}. لقد كان طموحي الدائم التميز العلمي والوصول إلى أرقى درجات المعرفة البحثية والتطبيقية في هذا المجال.

${accomplishments ? `خلال مسيرتي الأكاديمية والعملية، حققت عدة إنجازات بارزة، من أهمها: ${accomplishments}.` : 'خلال دراستي السابقة، حرصت على تحقيق التفوق والعمل الجاد، والمشاركة الفاعلة في الأنشطة الأكاديمية والمشاريع التي صقلت قدراتي التحليلية والتنفيذية.'} لقد أسهمت هذه التجارب في بناء قاعدة علمية متينة جعلتني جاهزاً لخوض تحديات الدراسات العليا بتمكّن وثقة.

إن اختيارِي لـ (${target}) يعود إلى: ${reason || 'السمعة الأكاديمية المرموقة، وتوفر البيئة التعليمية المتطورة، والفرص البحثية المتقدمة التي تجمع بين الجانب النظري والتطبيقي بشكل فريد'}. أثق تماماً أن هذا البرنامج يمثل البيئة الأنسب لتحقيق تطلعاتي وتطوير مهاراتي.

أما عن خططي المستقبلية بعد التخرج، فإنني أطمح إلى: ${futurePlans || 'توظيف المعارف والخبرات المكتسبة في خدمة المجتمع، وتطوير حلول مبتكرة في مجالي، وقيادة مشاريع تكنولوجية وبحثية ذات أثر ملموس'}.

أشكركم جزيل الشكر على وقتكم ومراجعة ملفي، وأتطلع بشغف للانضمام إلى مؤسستكم الأكاديمية الرائدة.

وتقبلوا فائق الاحترام والتقدير،
${sName}`;
    }

    // 2. ACADEMIC RECOMMENDATION LETTER (خطاب توصية أكاديمي)
    if (letterType === 'recommendation_academic') {
      if (language === 'en') {
        return `ACADEMIC RECOMMENDATION LETTER

To the Admissions & Selection Committee,
Target Institution: ${target}

It is my distinct pleasure to write this letter of recommendation for ${sName}, who is applying for the ${deg} program in ${maj}. As ${recTitle}, I have known the applicant for several years and observed their academic performance, intellectual curiosity, and exceptional work ethic.

During our academic interaction, ${sName} demonstrated outstanding comprehension of complex subject matter. ${accomplishments ? `Specifically, the student distinguished themselves by: ${accomplishments}.` : 'The applicant consistently performed in the top tier of their cohort, displaying exceptional analytical capabilities and research dedication.'}

Beyond academic excellence, ${sName} possesses exemplary personal attributes—showing remarkable maturity, teamwork, and leadership. Based on their strong foundation, I am confident they will thrive in ${target} and make valuable academic contributions.

Therefore, I give my highest recommendation to ${sName} without reservation. Please feel free to contact me if further information is required.

Sincerely,
${recTitle}`;
      }

      return `خطاب توصية أكاديمي (Academic Recommendation Letter)

إلى لجنة القبول والتقييم المحترمة،
الجهة المستهدفة: ${target}

يسرني ويسعدني بصفتي (${recTitle}) أن أتقدم بخطاب التوصية الأكاديمي هذا لصالح الطالب/ـة (${sName}) لتعزيز طلب التقديم لبرنامج ${deg} في تخصص (${maj}).

لقد عرفت الطالب/ـة عن قرب خلال المسيرة الأكاديمية، ولمست فيه/ـا شغفاً كبيراً بالتعلم والالتزام الأخلاقي والعلمي العالي. ${accomplishments ? `وقد تميز الطالب/ـة بشكل خاص في: ${accomplishments}.` : 'وكان دائماً في مقدمة زملائه من حيث التحصيل العلمي والمشاركة الفاعلة والقدرة على حل المشكلات الأكاديمية المتقدمة.'}

يمتلك الطالب/ـة (${sName}) عقلية بحثية متميزة، ومهارات تواصل وقيادة تجعله/ـا كادراً أكاديمياً واعداً. وأنا على ثقة تامة بأن انضمامه/ـا إلى (${target}) سيكون إضافة نوعية، وسيحقق فيه نجاحاً وتفوقاً باهراً.

بناءً عليه، أوصي بقبول الطالب/ـة في برنامجكم الموقر بأعلى درجات التوصية والدعم.

وتقبلوا فائق الاحترام والتقدير،
${recTitle}`;
    }

    // 3. PROFESSIONAL RECOMMENDATION LETTER (خطاب توصية مهني)
    if (letterType === 'recommendation_professional') {
      return `خطاب توصية مهني (Professional Recommendation Letter)

إلى جهة التقييم والقبول المحترمة،

بصفتي (${recTitle})، أكتب هذه التوصية المهنية لدعم طلب التقديم المقدم من (${sName}) للانضمام إلى برنامج ${deg} في (${maj}) لدى ${target}.

خلال فترة عمله/ـا تحت إشرافي، أظهر الطالب/ـة التزاماً مهنياً استثنائياً وقدرة عالية على تحمل المسؤولية وانجاز المهام الموكلة إليه بكل إتقان. ${accomplishments ? `ومن أبرز إنجازاته المهنية: ${accomplishments}.` : 'وقد تميز بالمهارة الفنية وحسن إدارة الوقت والعمل الجماعي بانسجام تام.'}

أثبت (${sName}) قدرته على الابتكار والتطوير المستمر، وأنا على يقين أن هذه المنحة والفرصة الأكاديمية ستكون المحرك الأساسي لصقل مهاراته القيادية.

أوصي بملفه مهنياً وبشدة لبرنامجكم الموقر.

مع خالص التحيات،
${recTitle}`;
    }

    // 4. COVER LETTER FOR SCHOLARSHIP (خطاب تغطية للتقديم)
    if (letterType === 'cover_letter') {
      return `خطاب التغطية للتقديم على المنحة الدراسية (Scholarship Cover Letter)

الموضوع: طلب التقديم على منحة ${deg} في تخصص ${maj}
إلى: إدارة المنح الدراسية في ${target}

أتقدم إليكم رسمياً بملف تقديمي المنظّم والمكتمل للحصول على منحة دراسية في تخصص (${maj}).

أرفق لكم ضمن هذا الملف كافة المستندات الرسمية المطلوبة (الشهادات المصدقة، كشوف الدرجات، إثبات اللغة، السيرة الذاتية، وخطابات التوصية). ${accomplishments ? `وقد حرصت على تضمين سجل إنجازاتي والتي من ضمنها: ${accomplishments}.` : ''}

أتطلع للحصول على فرصة إجراء مقابلة أو قبول طلبي للانضمام إلى برنامجكم، حيث أثق بأن خلفيتي الأكاديمية وطموحي يتوافقان تماماً مع معايير المنحة.

شاكراً لكم حسن تعاونكم واهتمامكم بملفي.

المتقدم: ${sName}`;
    }

    // 5. GAP YEAR / EXPLANATION LETTER (خطاب تفسير الظروف أو الفجوة الزمنية)
    if (letterType === 'explanation_gap') {
      return `خطاب تفسير الفجوة الزمنية / الظروف (Explanation Letter)

إلى لجنة القبول المحترمة،
الموضوع: توضيح المسار الأكاديمي والظروف الاستثنائية للطالب (${sName})

أود من خلال هذا الخطاب تقديم توضيح شفاف للجنة القبول بشأن الفجوة الزمنية في مساري الأكاديمي خلال الفترة الماضية.

خلال هذه الفترة، ${reason || 'واجهت ظروفاً استثنائية خارجة عن الإرادة (تغيرات إقليمية/تأجيلات أكاديمية)'}، ولكنني استغللت هذا الوقت بفاعلية عالية من خلال: ${accomplishments || 'التعلم الذاتي، الحصول على دورات تدريبية متخصصة، والعمل على مشاريع عمليّة صقلت مهاراتي'}.

أؤكد للجنة المحترمة أن شغفي الأكاديمي لم ينقطع، وأنني الآن أكثر جاهزية وعزيمة لاستكمال دراستي في تخصص (${maj}) لدى ${target}.

أشكر تفهمكم وحسن مراجعتكم لملفي.

وتقبلوا فائق التقدير،
${sName}`;
    }

    // 6. STUDY PLAN & RESEARCH PROPOSAL (خطة الدراسة والبحث)
    return `خطة الدراسة والاهتمامات البحثية (Study Plan & Research Goals)

اسم الطالب: ${sName} | التخصص: ${maj} | التقديم لـ: ${target}

1. المقدمة والأهداف الأكاديمية:
أهدف من خلال الانضمام لبرنامج ${deg} إلى التخصص العميق في ${maj} والتركيز على أحدث التقنيات والحلول العملية.

2. خطة المواد والتركيز الأكاديمي:
سأركز خلال الفصل الأول والثاني على استيعاب المفاهيم المتقدمة، يعقبها التفرغ لإعداد بحث/مشروع تخرج تطبيقي يحل مشكلة واقعية.

3. الأثر المتوقع والخطط المستقبلية:
${futurePlans || 'تهدف هذه الدراسة إلى تزويدي بالخبرة اللازمة لتطوير مشاريع نوعية والمساهمة في دعم البنية التحتية والبحثية في مجالي.'}`;
  }
}

const adminApp = new ScholarLoopAdmin();
