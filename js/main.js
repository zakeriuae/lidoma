/**
 * اسکریپت اصلی سایت لیدوما
 */

// راه‌اندازی آیکون‌های Lucide
document.addEventListener('DOMContentLoaded', async () => {
    if (window.i18n && typeof window.i18n.init === 'function') {
        await i18n.init();
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();

    initDefaultModals();
    initAnimations();
    initConsultants();
    initLeads();
    initFloatingNumbers();
    initCtaForm();

    window.onLangChanged = function () {
        const cg = document.getElementById('consultant-grid');
        const lg = document.getElementById('lead-grid');
        if (cg) { cg.innerHTML = ''; }
        if (lg) { lg.innerHTML = ''; }
        if (modalManager.clearAllModals) modalManager.clearAllModals();
        initDefaultModals();
        initConsultants();
        initLeads();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };
});

/**
 * راه‌اندازی مودال‌های پیش‌فرض
 */
function initDefaultModals() {
    const T = (key) => (window.t || (() => key))(key);
    modalManager.create('demo-request', T('modal_demo_title'), `
        <form id="demo-form" class="space-y-6">
            <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">${T('form_name')}</label>
                <input type="text" required 
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="${T('form_name_placeholder')}">
            </div>
            <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">${T('form_phone')}</label>
                <input type="tel" required 
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="09123456789">
            </div>
            <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">${T('form_clinic')}</label>
                <input type="text" required 
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="${T('form_clinic_placeholder')}">
            </div>
            <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">${T('form_specialty')}</label>
                <select required 
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20">
                    <option value="">${T('form_select')}</option>
                    <option value="beauty">${T('specialty_beauty')}</option>
                    <option value="dental">${T('specialty_dental')}</option>
                    <option value="hair">${T('specialty_hair')}</option>
                    <option value="plastic">${T('specialty_plastic')}</option>
                    <option value="other">${T('specialty_other')}</option>
                </select>
            </div>
        </form>
    `, {
        footer: `
            <button onclick="modalManager.close('demo-request')" class="btn-secondary">${T('leads_cancel')}</button>
            <button onclick="submitDemoForm()" class="btn-primary">${T('form_send')}</button>
        `
    });

    modalManager.create('contact', T('modal_contact_title'), `
        <div class="space-y-6">
            <div class="glass-panel p-4 rounded-xl border border-white/10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400">
                        <i data-lucide="phone" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <div class="text-xs text-slate-400">${T('form_phone_label')}</div>
                        <div class="text-white font-bold" dir="ltr">${T('contact_landline_display')}</div>
                    </div>
                </div>
            </div>
            <div class="glass-panel p-4 rounded-xl border border-white/10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400">
                        <i data-lucide="phone" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <div class="text-xs text-slate-400">${T('form_mobile_label')}</div>
                        <div class="text-white font-bold" dir="ltr">${T('contact_mobile_display')}</div>
                    </div>
                </div>
            </div>
            <div class="glass-panel p-4 rounded-xl border border-white/10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400">
                        <i data-lucide="map-pin" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <div class="text-xs text-slate-400">${T('form_address_label')}</div>
                        <div class="text-white font-bold">${T('footer_address')}</div>
                    </div>
                </div>
            </div>
        </div>
    `);

    modalManager.create('video', T('modal_video_title'), `
        <div class="aspect-video bg-black/50 rounded-xl overflow-hidden">
            <iframe class="w-full h-full" 
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `, {
        width: '900px'
    });

    // اضافه کردن event listener برای دکمه‌های باز کردن مودال
    document.addEventListener('click', (e) => {
        const demoBtn = e.target.closest('[data-modal="demo-request"]');
        const contactBtn = e.target.closest('[data-modal="contact"]');
        const videoBtn = e.target.closest('[data-modal="video"]');

        if (demoBtn) {
            e.preventDefault();
            modalManager.open('demo-request');
        }

        if (contactBtn) {
            e.preventDefault();
            modalManager.open('contact');
        }

        if (videoBtn) {
            e.preventDefault();
            modalManager.open('video');
        }
    });

    // به‌روزرسانی آیکون‌ها بعد از باز شدن مودال
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new MutationObserver(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

/**
 * ارسال فرم دمو
 */
function submitDemoForm() {
    const form = document.getElementById('demo-form');
    if (!form || !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // اینجا می‌توانید درخواست را به سرور ارسال کنید
    alert((window.t || (k => k))('alert_success'));
    modalManager.close('demo-request');
    form.reset();
}

/**
 * فرم CTA — ارسال اسم به تلگرام
 */
function initCtaForm() {
    const btn = document.getElementById('cta-submit-btn');
    const input = document.getElementById('cta-name-input');
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) {
            input.focus();
            input.style.borderColor = 'rgba(239,68,68,0.6)';
            setTimeout(() => input.style.borderColor = '', 1200);
            return;
        }
        const lang = window.i18n ? i18n.getLang() : 'fa';
        // شماره واتس‌اپ بر اساس زبان
        const waNumber = (lang === 'fa') ? '989125870710' : '971507158137';
        let msg = '';
        if (lang === 'fa') {
            msg = `سلام، من ${name} هستم و می‌خواهم بیشتر درباره لیدوما بدانم.`;
        } else if (lang === 'ar') {
            msg = `مرحباً، أنا ${name} وأريد معرفة المزيد عن ليدوما.`;
        } else {
            msg = `Hi, I'm ${name} and I'd like to learn more about Lidoma.`;
        }
        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        input.value = '';
    });

    // Enter key support
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

/**
 * راه‌اندازی انیمیشن‌ها
 */
function initAnimations() {
    // Counter Animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currency = (window.t || (k => k))('currency');
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + ' <span class="text-xs text-slate-500 font-sans">' + currency + '</span>';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer for price counters
    const leadSection = document.getElementById('leads');
    if (leadSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.price-counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (target && !counter.classList.contains('animated')) {
                            animateValue(counter, 0, target, 2000);
                            counter.classList.add('animated');
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(leadSection);
    }
}

/**
 * راه‌اندازی بخش مشاوران
 */
function initConsultants() {
    const T = (key) => (window.t || (() => key))(key);
    const isEn = window.i18n && i18n.getLang() === 'en';
    const isAr = window.i18n && i18n.getLang() === 'ar';
    const consultants = [
        {
            name: "سارا خدیوی",
            nameEn: "Sara Khadivi",
            nameAr: "سارة خديوي",
            role: "مشاور دندانپزشکی",
            roleEn: "Dental Consultant",
            roleAr: "استشارية طب أسنان",
            exp: "4 سال",
            expEn: "4 years",
            expAr: "٤ سنوات",
            age: "29 سال",
            ageEn: "29 years",
            ageAr: "٢٩ سنة",
            experienceDomain: "دندانپزشکی زیبایی و ایمپلنت",
            experienceDomainEn: "Aesthetic dentistry and implants",
            experienceDomainAr: "تجميل الأسنان وزراعة الأسنان",
            workType: ["دورکاری", "تمام وقت"],
            workTypeEn: ["Remote", "Full-time"],
            workTypeAr: ["عن بعد", "دوام كامل"],
            img: "assets/images/Picture3.png",
            status: "آنلاین",
            statusEn: "Online",
            statusAr: "متصل",
            resume: {
                education: { degree: "کارشناسی مدیریت بازرگانی", degreeEn: "B.A. Business Management", degreeAr: "بكالوريوس إدارة أعمال", university: "دانشگاه تهران", universityEn: "University of Tehran", universityAr: "جامعة طهران", year: "1394-1398" },
                workHistory: [
                    { company: "کلینیک تخصصی دندانپزشکی رایا", companyEn: "Raya Dental Clinic", companyAr: "عيادة رايا لطب الأسنان", position: "مشاور فروش و بازاریابی", positionEn: "Sales & Marketing Consultant", positionAr: "مستشار مبيعات وتسويق", period: "1400-1403", description: "مدیریت تیم فروش تلفنی، افزایش 45% نرخ تبدیل مشتریان", descriptionEn: "Phone sales team management, 45% conversion rate increase", descriptionAr: "إدارة فريق المبيعات الهاتفية، زيادة معدل التحويل بنسبة ٤٥٪" },
                    { company: "مرکز خدمات دندانپزشکی آریانا", companyEn: "Ariana Dental Center", companyAr: "مركز أريانا لطب الأسنان", position: "مشاور فروش", positionEn: "Sales Consultant", positionAr: "مستشار مبيعات", period: "1399-1400", description: "مشاوره و هدایت بیماران، مدیریت نوبت‌دهی", descriptionEn: "Patient consulting, appointment management", descriptionAr: "استشارات المرضى، إدارة المواعيد" }
                ],
                skills: ["مهارت‌های ارتباطی عالی", "CRM", "تحلیل داده‌های فروش", "بازاریابی دیجیتال"],
                skillsEn: ["Excellent communication", "CRM", "Sales analytics", "Digital marketing"],
                skillsAr: ["مهارات تواصل ممتازة", "CRM", "تحليل المبيعات", "التسويق الرقمي"],
                achievements: ["افزایش 45% نرخ تبدیل در 2 سال", "مدیریت تیم 5 نفره فروش", "رتبه برتر مشاور فروش 1402"],
                achievementsEn: ["45% conversion increase in 2 years", "Managed 5-person sales team", "Top consultant 2023"],
                achievementsAr: ["زيادة التحويل ٤٥٪ في سنتين", "إدارة فريق من ٥ أشخاص", "أفضل مستشار ٢٠٢٣"]
            }
        },
        {
            name: "علی رضایی",
            nameEn: "Ali Rezaei",
            nameAr: "علي رضائي",
            role: "مشاور کاشت مو",
            roleEn: "Hair Transplant Consultant",
            roleAr: "مستشار زراعة الشعر",
            exp: "6 سال",
            expEn: "6 years",
            expAr: "٦ سنوات",
            age: "34 سال",
            ageEn: "34 years",
            ageAr: "٣٤ سنة",
            experienceDomain: "کاشت مو و جراحی پلاستیک",
            experienceDomainEn: "Hair transplant and plastic surgery",
            experienceDomainAr: "زراعة الشعر والجراحة التجميلية",
            workType: ["حضوری", "تمام وقت"],
            workTypeEn: ["On-site", "Full-time"],
            workTypeAr: ["حضوري", "دوام كامل"],
            img: "assets/images/photo_2021-10-08_09-52-04.jpg",
            status: "در جلسه",
            statusEn: "In Session",
            statusAr: "مشغول",
            resume: {
                education: { degree: "کارشناسی روانشناسی", degreeEn: "B.A. Psychology", degreeAr: "بكالوريوس علم نفس", university: "دانشگاه شهید بهشتی", universityEn: "Shahid Beheshti University", universityAr: "جامعة شهيد بهشتي", year: "1388-1392" },
                workHistory: [
                    { company: "کلینیک کاشت مو تهران", companyEn: "Tehran Hair Clinic", companyAr: "عيادة طهران لزراعة الشعر", position: "مشاور ارشد فروش و بازاریابی", positionEn: "Senior Sales & Marketing Consultant", positionAr: "كبير مستشاري المبيعات", period: "1398-1403", description: "راه‌اندازی بخش فروش از صفر", descriptionEn: "Built sales department from scratch", descriptionAr: "تأسيس قسم المبيعات من الصفر" },
                    { company: "مرکز جراحی پلاستیک زیبا", companyEn: "Ziba Plastic Surgery Center", companyAr: "مركز زيبا للجراحة التجميلية", position: "مشاور فروش", positionEn: "Sales Consultant", positionAr: "مستشار مبيعات", period: "1395-1398", description: "مشاوره تخصصی بیماران", descriptionEn: "Specialized patient consulting", descriptionAr: "استشارات متخصصة للمرضى" }
                ],
                skills: ["مشاوره کاشت مو", "مدیریت پروژه", "بازاریابی بین‌المللی"],
                skillsEn: ["Hair transplant consulting", "Project management", "International marketing"],
                skillsAr: ["استشارات زراعة الشعر", "إدارة المشاريع", "التسويق الدولي"],
                achievements: ["افزایش 60% فروش در 3 سال", "مدیریت 200+ پروژه کاشت مو", "رضایت 95% مشتریان"],
                achievementsEn: ["60% sales increase in 3 years", "Managed 200+ hair projects", "95% customer satisfaction"],
                achievementsAr: ["زيادة المبيعات ٦٠٪ في ٣ سنوات", "إدارة ٢٠٠+ مشروع", "رضا العملاء ٩٥٪"]
            }
        },
        {
            name: "آرزو نامدار",
            nameEn: "Arezoo Namdar",
            nameAr: "أريزو نامدار",
            role: "مشاور زیبایی",
            roleEn: "Beauty Consultant",
            roleAr: "مستشارة تجميل",
            exp: "5 سال",
            expEn: "5 years",
            expAr: "٥ سنوات",
            age: "27 سال",
            ageEn: "27 years",
            ageAr: "٢٧ سنة",
            experienceDomain: "زیبایی و پوست و مو",
            experienceDomainEn: "Beauty, skin and hair",
            experienceDomainAr: "تجميل، بشرة وشعر",
            workType: ["دورکاری", "پاره وقت"],
            workTypeEn: ["Remote", "Part-time"],
            workTypeAr: ["عن بعد", "دوام جزئي"],
            img: "assets/images/Picture2.png",
            status: "آنلاین",
            statusEn: "Online",
            statusAr: "متصل",
            resume: {
                education: { degree: "کارشناسی ارشد بازاریابی", degreeEn: "M.A. Marketing", degreeAr: "ماجستير تسويق", university: "دانشگاه علامه طباطبایی", universityEn: "Allameh Tabataba'i University", universityAr: "جامعة العلامة الطباطبائي", year: "1395-1397" },
                workHistory: [
                    { company: "مرکز زیبایی و پوست نیلوفر", companyEn: "Niloufar Beauty Center", companyAr: "مركز نيلوفر للتجميل", position: "مشاور بازاریابی و فروش", positionEn: "Marketing & Sales Consultant", positionAr: "مستشار مبيعات وتسويق", period: "1401-1403", description: "بازاریابی دیجیتال، مدیریت محتوا", descriptionEn: "Digital marketing, content management", descriptionAr: "التسويق الرقمي، إدارة المحتوى" },
                    { company: "سالن زیبایی طلایی", companyEn: "Talaee Beauty Salon", companyAr: "صالون طلايي للتجميل", position: "مشاور فروش", positionEn: "Sales Consultant", positionAr: "مستشار مبيعات", period: "1399-1401", description: "مشاوره خدمات زیبایی", descriptionEn: "Beauty services consulting", descriptionAr: "استشارات خدمات التجميل" }
                ],
                skills: ["بازاریابی دیجیتال", "مدیریت محتوا", "SEO", "مشاوره زیبایی"],
                skillsEn: ["Digital marketing", "Content management", "SEO", "Beauty consulting"],
                skillsAr: ["التسويق الرقمي", "إدارة المحتوى", "تحسين محركات البحث", "استشارات التجميل"],
                achievements: ["افزایش 80% فالور اینستاگرام", "200+ مشتری جدید", "رتبه برتر مشاور آنلاین"],
                achievementsEn: ["80% Instagram growth", "200+ new customers", "Top online consultant"],
                achievementsAr: ["نمو إنستغرام ٨٠٪", "٢٠٠+ عميل جديد", "أفضل مستشار عبر الإنترنت"]
            }
        },
        {
            name: "محمدرضا مظفری",
            nameEn: "Mohammadreza Mozaffari",
            nameAr: "محمد رضا مظفري",
            role: "مشاور دندانپزشکی",
            roleEn: "Dental Consultant",
            roleAr: "استشارية طب أسنان",
            exp: "3 سال",
            expEn: "3 years",
            expAr: "٣ سنوات",
            age: "26 سال",
            ageEn: "26 years",
            ageAr: "٢٦ سنة",
            experienceDomain: "دندانپزشکی عمومی و ترمیمی",
            experienceDomainEn: "General and restorative dentistry",
            experienceDomainAr: "طب الأسنان العام والترميمي",
            workType: ["حضوری", "پاره وقت"],
            workTypeEn: ["On-site", "Part-time"],
            workTypeAr: ["حضوري", "دوام جزئي"],
            img: "assets/images/photo_2024-05-16_10-55-18.jpg",
            status: "آفلاین",
            statusEn: "Offline",
            statusAr: "غير متصل",
            resume: {
                education: { degree: "کارشناسی مدیریت", degreeEn: "B.A. Management", degreeAr: "بكالوريوس إدارة", university: "دانشگاه امیرکبیر", universityEn: "Amirkabir University", universityAr: "جامعة أمير كبير", year: "1396-1400" },
                workHistory: [
                    { company: "کلینیک دندانپزشکی پارسیان", companyEn: "Parsian Dental Clinic", companyAr: "عيادة بارسيان لطب الأسنان", position: "مشاور فروش و پذیرش", positionEn: "Sales & Reception Consultant", positionAr: "مستشار مبيعات واستقبال", period: "1401-1403", description: "مشاوره بیماران، مدیریت نوبت‌دهی", descriptionEn: "Patient consulting, appointment management", descriptionAr: "استشارات المرضى، إدارة المواعيد" },
                    { company: "مطب دندانپزشکی دکتر احمدی", companyEn: "Dr. Ahmadi Dental Office", companyAr: "عيادة الدكتور أحمدي", position: "منشی و مشاور", positionEn: "Receptionist & Consultant", positionAr: "سكرتير ومستشار", period: "1400-1401", description: "پذیرش بیماران، پاسخگویی تلفنی", descriptionEn: "Patient reception, phone support", descriptionAr: "استقبال المرضى، الدعم الهاتفي" }
                ],
                skills: ["مهارت ارتباطی", "مدیریت زمان", "نوبت‌دهی", "کار تیمی"],
                skillsEn: ["Communication", "Time management", "Scheduling", "Teamwork"],
                skillsAr: ["مهارات تواصل", "إدارة الوقت", "جدولة المواعيد", "العمل الجماعي"],
                achievements: ["رضایت 90% بیماران", "100+ نوبت روزانه", "بهبود 30% فرآیند"],
                achievementsEn: ["90% patient satisfaction", "100+ daily appointments", "30% process improvement"],
                achievementsAr: ["رضا المرضى ٩٠٪", "١٠٠+ موعد يومي", "تحسين العملية ٣٠٪"]
            }
        },
    ];

    const container = document.getElementById('consultant-grid');
    if (!container) return;
    container.innerHTML = ''; // Clear previous content

    const name = (c) => isEn ? (c.nameEn || c.name) : (isAr ? (c.nameAr || c.name) : c.name);
    const status = (c) => isEn ? (c.statusEn || c.status) : (isAr ? (c.statusAr || c.status) : c.status);
    const role = (c) => isEn ? (c.roleEn || c.role) : (isAr ? (c.roleAr || c.role) : c.role);
    const exp = (c) => isEn ? (c.expEn || c.exp) : (isAr ? (c.expAr || c.exp) : c.exp);
    const age = (c) => isEn ? (c.ageEn || c.age) : (isAr ? (c.ageAr || c.age) : c.age);
    const domain = (c) => isEn ? (c.experienceDomainEn || c.experienceDomain) : (isAr ? (c.experienceDomainAr || c.experienceDomain) : c.experienceDomain);
    const workTypes = (c) => isEn ? (c.workTypeEn || c.workType) : (isAr ? (c.workTypeAr || c.workType) : c.workType);

    consultants.forEach(c => {
        const st = status(c);
        const statusColor = (c.status === "آنلاین" || st === "Online")
            ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            : ((c.status === "آفلاین" || st === "Offline") ? "bg-slate-500" : "bg-accent-500");

        container.innerHTML += `
            <div class="glass-card p-6 rounded-3xl group relative hover:bg-white/5 transition duration-500">
                <div class="absolute top-5 left-5 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md z-10">
                    <span class="w-2 h-2 rounded-full ${statusColor} animate-pulse"></span>
                    <span class="text-[11px] text-slate-300 font-medium">${st}</span>
                </div>
                
                <div class="flex flex-col items-center text-center mt-2">
                    <div class="relative mb-5 group-hover:scale-105 transition duration-500">
                        <div class="absolute -inset-1 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-70 transition"></div>
                        <img src="${c.img}" class="relative w-24 h-24 rounded-full border-2 border-white/10 object-cover" alt="${c.name}">
                    </div>
                    

                    
                    <h4 class="text-white font-bold text-xl mb-1">${name(c)}</h4>
                    <p class="text-brand-400 text-sm mb-1 font-medium">${role(c)}</p>
                    <p class="text-brand-400 text-xs mb-4 font-medium">${domain(c)}</p>
                    
                    <div class="w-full mb-4">
                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div class="flex items-center justify-center gap-1">
                                <span class="text-slate-400">${T('consultant_exp')}</span>
                                <span class="text-white font-bold">${exp(c)}</span>
                            </div>
                            <div class="flex items-center justify-center gap-1">
                                <span class="text-slate-400">${T('consultant_age')}</span>
                                <span class="text-white font-bold">${age(c)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="w-full flex flex-wrap gap-2 mb-4 justify-center">
                        ${workTypes(c).map(type => {
            const colorClass = ["دورکاری", "Remote"].includes(type) ? "bg-purple-500/20 border-purple-500/30 text-purple-300" :
                ["حضوری", "On-site"].includes(type) ? "bg-blue-500/20 border-blue-500/30 text-blue-300" :
                    ["تمام وقت", "Full-time"].includes(type) ? "bg-green-500/20 border-green-500/30 text-green-300" :
                        "bg-accent-500/20 border-accent-500/30 text-accent-300";
            return `<span class="px-2 py-1 rounded-lg text-xs font-bold border ${colorClass}">${type}</span>`;
        }).join('')}
                    </div>
                    
                    <button class="w-full py-3 rounded-xl bg-white/5 hover:bg-brand-600 hover:text-white text-slate-300 text-sm font-bold transition border border-white/10 hover:border-brand-500 shadow-lg group-hover:shadow-glow-brand" data-modal="consultant-${c.name}">
                        ${T('consultant_view_resume')}
                    </button>
                </div>
            </div>
        `;
    });

    consultants.forEach(c => {
        const resume = c.resume || {};
        const edu = resume.education || {};
        const eduDegree = isEn ? (edu.degreeEn || edu.degree) : (isAr ? (edu.degreeAr || edu.degree) : edu.degree);
        const eduUni = isEn ? (edu.universityEn || edu.university) : (isAr ? (edu.universityAr || edu.university) : edu.university);
        const jobPos = (j) => isEn ? (j.positionEn || j.position) : (isAr ? (j.positionAr || j.position) : j.position);
        const jobCo = (j) => isEn ? (j.companyEn || j.company) : (isAr ? (j.companyAr || j.company) : j.company);
        const jobDesc = (j) => isEn ? (j.descriptionEn || j.description) : (isAr ? (j.descriptionAr || j.description) : j.description);
        const skillsList = isEn ? (resume.skillsEn || resume.skills || []) : (isAr ? (resume.skillsAr || resume.skills || []) : (resume.skills || []));
        const achievementsList = isEn ? (resume.achievementsEn || resume.achievements || []) : (isAr ? (resume.achievementsAr || resume.achievements || []) : (resume.achievements || []));
        modalManager.create(`consultant-${c.name}`, `${T('modal_resume_title')} ${name(c)}`, `
            <div class="space-y-5 max-h-[80vh] overflow-y-auto">
                <!-- اطلاعات شخصی -->
                <div class="flex items-center gap-4 pb-4 border-b border-white/10">
                    <img src="${c.img}" class="w-24 h-24 rounded-full border-2 border-brand-500/30 flex-shrink-0" alt="${c.name}">
                    <div class="flex-1">
                        <h3 class="text-2xl font-black text-white mb-1">${name(c)}</h3>
                        <p class="text-brand-400 font-bold mb-2">${role(c)}</p>
                        <div class="flex flex-wrap gap-3 text-xs">
                            <span class="text-slate-400">${T('consultant_exp')}: <span class="text-white font-bold">${exp(c)}</span></span>
                            <span class="text-slate-400">${T('consultant_age')}: <span class="text-white font-bold">${age(c)}</span></span>
                            <span class="text-slate-400">${isEn ? 'Specialty' : (isAr ? 'التخصص' : 'تخصص')}: <span class="text-white font-medium">${domain(c)}</span></span>
                        </div>
                        <div class="flex flex-wrap gap-2 mt-2">
                            ${workTypes(c).map(type => {
            const colorClass = ["دورکاری", "Remote"].includes(type) ? "bg-purple-500/20 border-purple-500/30 text-purple-300" :
                ["حضوری", "On-site"].includes(type) ? "bg-blue-500/20 border-blue-500/30 text-blue-300" :
                    ["تمام وقت", "Full-time"].includes(type) ? "bg-green-500/20 border-green-500/30 text-green-300" :
                        "bg-accent-500/20 border-accent-500/30 text-accent-300";
            return `<span class="px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass}">${type}</span>`;
        }).join('')}
                        </div>
                    </div>
                </div>

                <!-- تحصیلات -->
                ${resume.education ? `
                <div class="glass-panel p-4 rounded-xl">
                    <h4 class="text-white font-bold mb-3 flex items-center justify-between">
                        <span class="flex items-center gap-2">
                            <i data-lucide="graduation-cap" class="w-5 h-5 text-brand-400"></i>
                            ${T('consultant_education')}
                        </span>
                        <span class="text-brand-400 text-xs font-bold bg-brand-500/10 px-2 py-1 rounded">${resume.education.year}</span>
                    </h4>
                    <div class="space-y-2">
                        <div>
                            <p class="text-white font-bold text-sm">${eduDegree}</p>
                            <p class="text-slate-400 text-xs mt-1">${eduUni}</p>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- سابقه کاری -->
                ${resume.workHistory && resume.workHistory.length > 0 ? `
                <div class="glass-panel p-4 rounded-xl">
                    <h4 class="text-white font-bold mb-4 flex items-center gap-2">
                        <i data-lucide="briefcase" class="w-5 h-5 text-brand-400"></i>
                        ${T('consultant_work_history')}
                    </h4>
                    <div class="space-y-4">
                        ${resume.workHistory.map(job => `
                            <div class="border-r-2 border-brand-500/30 pr-4 relative">
                                <div class="absolute -right-[5px] top-2 w-2 h-2 rounded-full bg-brand-500"></div>
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex-1">
                                        <p class="text-white font-bold text-sm mb-1">${jobPos(job)}</p>
                                        <p class="text-brand-400 text-xs mb-2">${jobCo(job)}</p>
                                        <p class="text-slate-400 text-xs">${jobDesc(job)}</p>
                                    </div>
                                    <span class="text-accent-400 text-xs font-bold bg-accent-500/10 px-2 py-1 rounded whitespace-nowrap mr-3">${job.period}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- درباره مشاور -->
                <div class="glass-panel p-4 rounded-xl">
                    <h4 class="text-white font-bold mb-3 flex items-center gap-2">
                        <i data-lucide="user" class="w-5 h-5 text-brand-400"></i>
                        ${T('consultant_about')}
                    </h4>
                    </h4>
                    <p class="text-slate-300 leading-relaxed text-sm">
                        ${isAr ? `
                        ${name(c)} لديه ${exp(c)} خبرة في ${role(c)}. أحد أفضل مستشاري المبيعات عبر الهاتف. متخصص في ${domain(c)} وجاهز لمساعدة عملك على النمو.
                        ` : `
                        ${name(c)} ${isEn ? 'has' : 'با'} ${exp(c)} ${isEn ? 'experience in' : 'سال سابقه در زمینه'} ${role(c)}. ${isEn ? 'One of the top phone sales consultants. Specialized in' : 'یکی از برترین مشاوران فروش تلفنی است. تخصص در'} ${domain(c)}${isEn ? '.' : ' و آماده کمک به رشد کسب‌وکار شماست.'}
                        `}
                    </p>
                </div>

                <!-- مهارت‌ها و دستاوردها -->
                <div class="grid md:grid-cols-2 gap-4">
                    <!-- مهارت‌ها -->
                    ${skillsList.length > 0 ? `
                    <div class="glass-panel p-4 rounded-xl">
                        <h4 class="text-white font-bold mb-3 flex items-center gap-2">
                            <i data-lucide="award" class="w-5 h-5 text-brand-400"></i>
                            ${T('consultant_skills')}
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${skillsList.map(skill => `
                                <span class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- دستاوردها -->
                    ${achievementsList.length > 0 ? `
                    <div class="glass-panel p-4 rounded-xl">
                        <h4 class="text-white font-bold mb-3 flex items-center gap-2">
                            <i data-lucide="trophy" class="w-5 h-5 text-brand-400"></i>
                            ${T('consultant_achievements')}
                        </h4>
                        <ul class="space-y-2">
                            ${achievementsList.map(achievement => `
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <i data-lucide="check-circle" class="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"></i>
                                    <span>${achievement}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>

                <button class="w-full btn-primary mt-4" onclick="modalManager.close('consultant-${c.name}'); modalManager.open('demo-request');">
                    ${T('consultant_hire')}
                </button>
            </div>
        `, { width: '800px' });
    });

    // Event listener برای دکمه‌های مشاهده رزومه
    document.addEventListener('click', (e) => {
        const btn = e.target.closest(`[data-modal^="consultant-"]`);
        if (btn) {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            modalManager.open(modalId);
        }
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * راه‌اندازی بخش لیدها
 */
function initLeads() {
    const T = (key) => (window.t || (() => key))(key);
    const isEn = window.i18n && i18n.getLang() === 'en';
    const isAr = window.i18n && i18n.getLang() === 'ar';
    const leads = [
        {
            title: "کاشت مو",
            titleEn: "Hair Transplant",
            titleAr: "زراعة الشعر",
            loc: ["تهران", "اصفهان", "شیراز", "مشهد"],
            locEn: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
            locAr: ["دبي", "أبو ظبي", "الشارقة", "عجمان"],
            price: 350000,
            priceEn: 210,
            count: "50",
            svg: `<img src="assets/images/0111.png" alt="کاشت مو" class="w-full h-full object-contain">`,
            badge: "VIP",
            badgeEn: "VIP",
            badgeAr: "VIP"
        },
        {
            title: "ایمپلنت",
            titleEn: "Implant",
            titleAr: "زراعة الأسنان",
            loc: ["تهران", "مشهد", "تبریز", "کرج"],
            locEn: ["Abu Dhabi", "Dubai", "Al Ain", "Fujairah"],
            locAr: ["أبو ظبي", "دبي", "العين", "الفجيرة"],
            price: 280000,
            priceEn: 168,
            count: "20",
            svg: `<img src="assets/images/0222.png" alt="ایمپلنت" class="w-full h-full object-contain">`,
            badge: "جدید",
            badgeEn: "New",
            badgeAr: "جديد"
        },
        {
            title: "ابدومینوپلاستی",
            titleEn: "Abdominoplasty",
            titleAr: "شد البطن",
            loc: ["تهران", "کرج", "قم", "رشت"],
            locEn: ["Sharjah", "Dubai", "Ras Al Khaimah", "Umm Al Quwain"],
            locAr: ["الشارقة", "دبي", "رأس الخيمة", "أم القيوين"],
            price: 392000,
            priceEn: 252,
            count: "100",
            svg: `<img src="assets/images/0333.png" alt="ابدومینوپلاستی" class="w-full h-full object-contain">`,
            badge: "ارزان",
            badgeEn: "Cheap",
            badgeAr: "رخيص"
        },
        {
            title: "جراحی بینی",
            titleEn: "Rhinoplasty",
            titleAr: "تجميل الأنف",
            loc: ["تهران", "کرمانشاه", "اهواز", "یزد"],
            locEn: ["Dubai", "Al Ain", "Fujairah", "Sharjah"],
            locAr: ["دبي", "العين", "الفجيرة", "الشارقة"],
            price: 420000,
            priceEn: 280,
            count: "15",
            svg: `<img src="assets/images/0444.png" alt="جراحی بینی" class="w-full h-full object-contain">`,
            badge: "کمیاب",
            badgeEn: "Rare",
            badgeAr: "نادر"
        },
    ];

    const container = document.getElementById('lead-grid');
    if (!container) return;
    container.innerHTML = ''; // Clear previous content

    const leadTitle = (l) => isEn ? (l.titleEn || l.title) : (isAr ? (l.titleAr || l.title) : l.title);
    const leadBadge = (l) => isEn ? (l.badgeEn || l.badge) : (isAr ? (l.badgeAr || l.badge) : l.badge);
    const leadLoc = (l) => isEn ? (l.locEn || l.loc) : (isAr ? (l.locAr || l.loc) : l.loc);
    const leadPrice = (l) => isEn ? (l.priceEn || l.price) : l.price;

    leads.forEach(l => {
        const badge = leadBadge(l);
        const badgeColor = badge === "VIP"
            ? "bg-accent-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            : "bg-white/10 text-white border border-white/10";

        container.innerHTML += `
            <div class="glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-500 group border border-white/5 z-10 relative">
                <div class="h-40 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 group-hover:from-brand-900/20 group-hover:to-brand-800/20 transition duration-500">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div class="w-28 h-28 text-brand-400/50 group-hover:text-brand-400 group-hover:scale-110 transition duration-500 relative z-10" style="filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 40px rgba(245, 158, 11, 0.3));">
                        ${l.svg}
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent"></div>
                    <div class="absolute top-4 right-4 ${badgeColor} backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-lg z-20">
                        ${badge}
                    </div>
                    <div class="absolute bottom-4 right-4 text-white font-bold text-lg drop-shadow-md z-20">
                        ${leadTitle(l)}
                    </div>
                </div>
                    <div class="p-6 pt-2">
                    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6">
                        ${Array.isArray(leadLoc(l)) ? leadLoc(l).map(city => `<span class="bg-white/5 px-2 py-1 rounded border border-white/5">${city}</span>`).join('') : `<span class="bg-white/5 px-2 py-1 rounded border border-white/5">${leadLoc(l)}</span>`}
                    </div>
                    <div class="flex items-end justify-between border-t border-white/5 pt-4">
                        <div>
                            <div class="text-[10px] text-slate-500 mb-1">${T('leads_price_per')}</div>
                            <div class="text-accent-400 font-bold font-mono text-xl price-counter" data-target="${leadPrice(l)}">0 <span class="text-xs text-slate-500 font-sans">${T('currency')}</span></div>
                        </div>
                        <button class="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-brand-400 hover:text-white transition shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-glow-brand" data-modal="lead-${l.title}">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // ایجاد مودال برای هر لید
    leads.forEach(l => {
        const lt = leadTitle(l);
        modalManager.create(`lead-${l.title}`, `${T('leads_buy')} ${lt}`, `
            <div class="space-y-6">
                <div class="glass-panel p-6 rounded-xl">
                    <h3 class="text-xl font-bold text-white mb-4">${lt}</h3>
                    <div class="mb-4">
                        <div>
                            <div class="text-xs text-slate-400 mb-2">${T('leads_location')}</div>
                            <div class="flex flex-wrap gap-2">
                                ${Array.isArray(leadLoc(l)) ? leadLoc(l).map(city => `<span class="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-white text-sm">${city}</span>`).join('') : `<span class="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-white text-sm">${leadLoc(l)}</span>`}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs text-slate-400 mb-1">${T('leads_available')}</div>
                        <div class="text-2xl font-bold text-brand-400">${l.count} ${T('leads_count')}</div>
                    </div>
                </div>
                <div class="glass-panel p-6 rounded-xl">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-slate-300">${T('leads_price_per')}</span>
                        <span class="text-2xl font-bold text-accent-400">${leadPrice(l).toLocaleString()} ${T('currency')}</span>
                    </div>
                    <div class="flex gap-2 items-center">
                        <label class="text-sm text-slate-300">${T('leads_quantity')}:</label>
                        <input type="number" min="1" max="${l.count}" value="1" 
                            class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white w-20 text-center focus:outline-none focus:border-brand-500">
                        <span class="text-sm text-slate-400">${T('leads_count')}</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-300 font-bold">${T('leads_total')}:</span>
                            <span class="text-2xl font-bold text-white" id="total-price-${l.title}">${leadPrice(l).toLocaleString()} ${T('currency')}</span>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="mb-4">
                        <label class="block text-sm font-bold text-slate-300 mb-2">${T('leads_phone')}</label>
                        <input type="tel" required 
                            class="w-full bg-white/15 border-2 border-brand-400/50 rounded-xl px-4 py-3 text-brand-400 font-black text-2xl tracking-wider placeholder-slate-500 focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-400/40 focus:bg-white/20 shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                    </div>
                </form>
            </div>
        `, {
            footer: `
                <button onclick="modalManager.close('lead-${l.title}')" class="btn-secondary">${T('leads_cancel')}</button>
                <button onclick="purchaseLead('${l.title}')" class="btn-primary">${T('leads_confirm')}</button>
            `
        });

        // محاسبه قیمت کل
        const modal = document.getElementById(`modal-lead-${l.title}`);
        if (modal) {
            const quantityInput = modal.querySelector('input[type="number"]');
            const totalPriceEl = modal.querySelector(`#total-price-${l.title}`);

            if (quantityInput && totalPriceEl) {
                quantityInput.addEventListener('input', (e) => {
                    const quantity = parseInt(e.target.value) || 1;
                    const total = l.price * quantity;
                    totalPriceEl.textContent = total.toLocaleString() + ' ' + (window.t || (k => k))('currency');
                });
            }
        }
    });

    // Event listener برای دکمه افزودن لید
    document.addEventListener('click', (e) => {
        const btn = e.target.closest(`[data-modal^="lead-"]`);
        if (btn) {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            modalManager.open(modalId);
        }
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * خرید لید
 */
function purchaseLead(leadTitle) {
    alert((window.t || (k => k))('alert_lead_success'));
    modalManager.close(`lead-${leadTitle}`);
}

/**
 * راه‌اندازی اعداد شناور
 */
function initFloatingNumbers() {
    const numbersContainer = document.getElementById('floating-numbers-container');
    if (!numbersContainer) return;

    const otherPrefixes = ['0935', '0936', '0933', '0902', '0919', '0912'];
    const otherPrefixesEn = ['050', '055', '052', '056', '054', '058'];
    const otherPrefixesAr = ['٠٥٠', '٠٥٥', '٠٥٢', '٠٥٦', '٠٥٤', '٠٥٨'];

    const isEn = window.i18n && i18n.getLang() === 'en';
    const isAr = window.i18n && i18n.getLang() === 'ar';

    for (let i = 0; i < 45; i++) {
        const el = document.createElement('div');
        const isNear = Math.random() > 0.70;
        el.className = `floating-number ${isNear ? 'near' : 'far'}`;

        let phoneNumber = '';
        if (isNear) {
            const rest = Math.floor(1000000 + Math.random() * 9000000);
            if (isEn) {
                phoneNumber = '+97150' + rest;
            } else if (isAr) {
                phoneNumber = '٠٥٠' + rest.toLocaleString('ar-EG').replace(/٬/g, '');
            } else {
                phoneNumber = '0912' + rest;
            }
        } else {
            const rest = Math.floor(1000000 + Math.random() * 9000000);
            if (isEn) {
                const prefix = otherPrefixesEn[Math.floor(Math.random() * otherPrefixesEn.length)];
                phoneNumber = '+971' + prefix.substring(1) + rest;
            } else if (isAr) {
                const prefix = otherPrefixesAr[Math.floor(Math.random() * otherPrefixesAr.length)];
                phoneNumber = prefix + rest.toLocaleString('ar-EG').replace(/٬/g, '');
            } else {
                const prefix = otherPrefixes[Math.floor(Math.random() * otherPrefixes.length)];
                phoneNumber = prefix + rest;
            }
        }

        el.innerText = phoneNumber;
        el.style.left = Math.floor(Math.random() * 100) + '%';

        const duration = isNear ? (12 + Math.random() * 8) : (20 + Math.random() * 20);
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `-${Math.random() * duration}s`;

        if (isNear) {
            el.style.setProperty('--scale', (1.0 + Math.random() * 0.5).toFixed(2));
            el.style.setProperty('--opacity', (0.2 + Math.random() * 0.2).toFixed(2));
        } else {
            el.style.setProperty('--scale', (0.6 + Math.random() * 0.4).toFixed(2));
            el.style.setProperty('--opacity', (0.1 + Math.random() * 0.15).toFixed(2));
        }

        numbersContainer.appendChild(el);
    }
}

// Handle language change
window.onLangChanged = (lang) => {
    // Re-init dynamic sections
    initConsultants();
    initLeads();
    initFloatingNumbers();
    // Update direction-specific styles if any (e.g. alignment)
    const isRtl = lang === 'fa' || lang === 'ar';
    document.querySelectorAll('.text-start').forEach(el => {
        el.style.textAlign = isRtl ? 'right' : 'left';
    });
};
