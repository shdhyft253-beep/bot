/**
 * ScholarLoop Admin Panel Controller (Expanded Comprehensive Letters Generator)
 * Supports SOP, Academic Recommendation, Professional Recommendation, Cover Letter, Gap Year Explanation, and Study Plan.
 */

class ScholarLoopAdmin {
  constructor() {
    this.adminPasswordHash = 'admin123'; // Default secure password
  }

  authenticate(password) {
    if (password && password.trim() === this.adminPasswordHash) {
      sessionStorage.setItem('sl_admin_authenticated', 'true');
      return true;
    }
    return false;
  }

  checkAuth() {
    return sessionStorage.getItem('sl_admin_authenticated') === 'true';
  }

  logout() {
    sessionStorage.removeItem('sl_admin_authenticated');
  }

  /**
   * Generate Academic Letters (SOP, Recommendation, Cover Letter, Gap Year, Study Plan)
   */
  async generateLetter(params, instant = false) {
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

    // Optional delay when clicking generate button manually
    if (!instant) {
      await new Promise(r => setTimeout(r, 400));
    }

    const sName = (studentName && studentName.trim()) ? studentName.trim() : '[اسم الطالب/ـة]';
    const target = (targetUniversity && targetUniversity.trim()) ? targetUniversity.trim() : '[الجامعة / المنحة والدولة المستهدفة]';
    const deg = (degreeLevel && degreeLevel.trim()) ? degreeLevel.trim() : 'البكالوريوس / الماجستير';
    const maj = (major && major.trim()) ? major.trim() : '[التخصص الأكاديمي]';
    const recTitle = (recommenderTitle && recommenderTitle.trim()) ? recommenderTitle.trim() : 'الأستاذ الدكتور / المشرف الأكاديمي';
    const isEnglish = language === 'en';

    // 1. STATEMENT OF PURPOSE / MOTIVATION LETTER (SOP)
    if (letterType === 'sop') {
      if (isEnglish) {
        return `STATEMENT OF PURPOSE (SOP)

Applicant Name: ${sName}
Degree Program: ${deg} in ${maj}
Target Institution / Scholarship: ${target}

Dear Members of the Admissions & Scholarship Selection Committee,

I am writing this Statement of Purpose to formally convey my strong academic motivation and enthusiasm to apply for the ${deg} program in ${maj} at ${target}. Throughout my educational journey, I have maintained a high standard of academic commitment, driven by a deep passion for research excellence, innovation, and practical problem-solving.

${accomplishments ? `My key academic and practical accomplishments include: ${accomplishments}.` : 'During my foundational studies, I completed rigorous academic coursework, hands-on projects, and research activities that solidified my analytical mindset and domain knowledge.'} These experiences have equipped me with a strong theoretical base and practical skills necessary to excel in advanced academic studies.

My decision to apply to ${target} stems from ${reason || 'its distinguished reputation for academic leadership, world-class faculty, and innovative research ecosystem'}. The structured curriculum and research environment offered by your institution align perfectly with my aspirations to gain specialized knowledge and contribute to impactful research.

Upon completing this program, my immediate and long-term goals involve ${futurePlans || 'applying the expertise and skills acquired to solve complex real-world challenges, lead innovative projects, and contribute meaningfully to my field'}.

I am confident that my academic background, dedication, and enthusiasm make me a strong candidate for this competitive program. Thank you for considering my application.

Sincerely,
${sName}`;
      }

      return `خطاب النوايا والرسالة التحفيزية (Statement of Purpose / Motivation Letter)

اسم الطالب المتقدم: ${sName}
المرحلة الدراسية: ${deg} في تخصص (${maj})
الجهة المستهدفة: ${target}

إلى أعضاء لجنة القبول وتدقيق المنح المحترمين،

أكتب إليكم هذه الرسالة للتعبير عن رغبتي الأكاديمية الشديدة وشغفي الكبير للانضمام إلى برنامج ${deg} في تخصص (${maj}) لدى ${target}. لقد كان طموحي الدائم التميز العلمي والوصول إلى أعلى درجات المعرفة البحثية والتطبيقية في هذا التخصص الواعد.

${accomplishments ? `خلال مسيرتي الأكاديمية والعملية، حققت عدة إنجازات بارزة، من أهمها: ${accomplishments}.` : 'خلال دراستي السابقة، حرصت على تحقيق التفوق والعمل الجاد، والمشاركة الفاعلة في الأنشطة الأكاديمية والمشاريع التي صقلت قدراتي التحليلية والتنفيذية.'} لقد أسهمت هذه التجارب في بناء قاعدة علمية متينة جعلتني جاهزاً تماماً لخوض تحديات الدراسات العليا بتمكّن وثقة.

إن اختيارِي لـ (${target}) يعود إلى: ${reason || 'السمعة الأكاديمية المرموقة، وتوفر البيئة التعليمية المتطورة، والفرص البحثية المتقدمة التي تجمع بين الجانب النظري والتطبيقي بشكل فريد'}. أثق تماماً أن هذا البرنامج يمثل البيئة الأنسب لتحقيق تطلعاتي وتطوير مهاراتي.

أما عن خططي المستقبلية بعد التخرج، فإنني أطمح إلى: ${futurePlans || 'توظيف المعارف والخبرات المكتسبة في خدمة المجتمع، وتطوير حلول مبتكرة في مجالي، وقيادة مشاريع تكنولوجية وبحثية ذات أثر ملموس'}.

أشكركم جزيل الشكر على وقتكم ومراجعة ملفي، وأتطلع بشغف للانضمام إلى مؤسستكم الأكاديمية الرائدة.

وتقبلوا فائق الاحترام والتقدير،
${sName}`;
    }

    // 2. ACADEMIC RECOMMENDATION LETTER (خطاب توصية أكاديمي)
    if (letterType === 'recommendation_academic') {
      if (isEnglish) {
        return `ACADEMIC RECOMMENDATION LETTER

To the Admissions & Selection Committee,
Target Institution / Scholarship: ${target}

It is my distinct pleasure to write this letter of recommendation for ${sName}, who is applying for the ${deg} program in ${maj} at ${target}. As ${recTitle}, I have known the candidate throughout their academic trajectory and observed their outstanding intellectual capacity, academic commitment, and integrity.

During our academic interaction, ${sName} demonstrated exceptional comprehension of advanced domain concepts. ${accomplishments ? `Specifically, the student distinguished themselves through: ${accomplishments}.` : 'The applicant consistently ranked among the top performers in their class, displaying remarkable analytical thinking and dedication to academic quality.'}

In addition to academic brilliance, ${sName} possesses outstanding personal qualities, including strong communication skills, initiative, and team collaboration. I am fully confident that they will thrive at ${target} and make significant contributions to your academic community.

I give my highest recommendation to ${sName} without reservation. Please feel free to contact me for any further details.

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
      if (isEnglish) {
        return `PROFESSIONAL RECOMMENDATION LETTER

To the Scholarship Selection Committee,
Target Institution: ${target}

As ${recTitle}, I am pleased to write this professional letter of recommendation in support of ${sName} for the ${deg} program in ${maj}.

Having supervised ${sName}, I have been consistently impressed by their professional ethics, technical efficiency, and reliability. ${accomplishments ? `Among their key professional achievements: ${accomplishments}.` : 'They demonstrated excellent leadership, problem-solving skills, and the ability to work under high pressure.'}

I strongly endorse ${sName} for this scholarship program at ${target}, confident that this milestone will further elevate their career capabilities.

Best Regards,
${recTitle}`;
      }

      return `خطاب توصية مهني (Professional Recommendation Letter)

إلى جهة التقييم والقبول المحترمة،
الجهة المستهدفة: ${target}

بصفتي (${recTitle})، أكتب هذه التوصية المهنية لدعم طلب التقديم المقدم من (${sName}) للانضمام إلى برنامج ${deg} في (${maj}) لدى ${target}.

خلال فترة عمله/ـا تحت إشرافي، أظهر الطالب/ـة التزاماً مهنياً استثنائياً وقدرة عالية على تحمل المسؤولية وإنجاز المهام الموكلة إليه بكل إتقان. ${accomplishments ? `ومن أبرز إنجازاته المهنية: ${accomplishments}.` : 'وقد تميز بالمهارة الفنية وحسن إدارة الوقت والعمل الجماعي بانسجام تام.'}

أثبت (${sName}) قدرته على الابتكار والتطوير المستمر، وأنا على يقين أن هذه المنحة والفرصة الأكاديمية ستكون المحرك الأساسي لصقل مهاراته القيادية.

أوصي بملفه مهنياً وبشدة لبرنامجكم الموقر.

مع خالص التحيات،
${recTitle}`;
    }

    // 4. COVER LETTER FOR SCHOLARSHIP (خطاب تغطية للتقديم)
    if (letterType === 'cover_letter') {
      if (isEnglish) {
        return `SCHOLARSHIP COVER LETTER

Subject: Application for ${deg} Scholarship in ${maj}
To: Admissions & Financial Aid Office, ${target}

Dear Committee Members,

I am submitting my application packet for the ${deg} scholarship in ${maj} at ${target}.

I have enclosed all required documentation, including certified academic transcripts, certificates, recommendations, and personal statement. ${accomplishments ? `My file highlights notable achievements such as: ${accomplishments}.` : ''}

Thank you for reviewing my application. I look forward to the opportunity to contribute to your university.

Sincerely,
${sName}`;
      }

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
      if (isEnglish) {
        return `EXPLANATION LETTER / GAP YEAR STATEMENT

To the Admissions Committee,
Target Institution: ${target}

Subject: Explanation of Academic Pathway for ${sName}

I am writing to provide transparent context regarding the gap period in my academic timeline.

During this period, ${reason || 'I navigated exceptional circumstances while actively focusing on self-development'} and engaged in productive activities including: ${accomplishments || 'online courses, practical projects, and skills enhancement'}.

I assure the committee of my unwavering academic focus and readiness to pursue ${deg} in ${maj} at ${target}.

Sincerely,
${sName}`;
      }

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
    if (isEnglish) {
      return `STUDY PLAN & RESEARCH GOALS

Applicant: ${sName} | Major: ${maj} | Institution: ${target}

1. Academic Goals & Focus:
My goal in pursuing ${deg} in ${maj} is to acquire advanced technical expertise and engage in practical research.

2. Study Schedule & Milestones:
During the initial terms, I will focus on mastering core subjects, followed by dedicated thesis/project work addressing real-world problems.

3. Expected Impact & Future Plans:
${futurePlans || 'Upon completion, I aim to apply this knowledge to foster innovation and contribute to development in my field.'}`;
    }

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

