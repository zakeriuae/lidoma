/**
 * سیستم دو زبانه لیدوما
 * پیش‌فرض: انگلیسی | اگر IP از آمریکا نباشد: فارسی
 */

const LANG_STORAGE_KEY = 'lidoma_lang';
const AMERICAS_CODES = ['NA', 'SA']; // North America, South America
const ARABIC_CODES = ['AE', 'SA', 'EG', 'IQ', 'KW', 'QA', 'BH', 'OM', 'LB', 'JO']; // Common Arabic speaking countries

const translations = {
    fa: {
        // Nav
        nav_features: 'امکانات',
        nav_consultants: 'مشاوران',
        nav_leads: 'فروشگاه لید',
        nav_about: 'درباره ما',
        nav_contact: 'تماس با ما',
        nav_login: 'ورود به پنل',
        nav_home: 'خانه',
        nav_back: 'بازگشت',

        // Hero
        hero_badge: 'نسل جدید مدیریت کلینیک',
        hero_title_1: 'پلتفرم هوشمند',
        hero_title_2: 'لید مارکتینگ',
        hero_title_3: 'کلینیک‌ها',
        hero_desc: 'لیدوما یک اکوسیستم کامل است. لید را بخرید، مشاور فروش را استخدام کنید و نوبت‌های قطعی را با شفافیت کامل مدیریت کنید.',
        hero_cta_demo: 'درخواست دمو',
        hero_cta_video: 'ویدیو معرفی',

        // Dashboard mockup
        dash_new_leads: 'لیدهای جدید',
        dash_appointments: 'نوبت‌های ثبت‌شده',
        dash_advisor_perf: 'عملکرد مشاوران',
        dash_today: 'امروز',
        dash_success_calls: 'تماس موفق',
        dash_success_calls_15: '۱۵ تماس موفق',
        dash_success_calls_12: '۱۲ تماس موفق',
        dash_leads_num: '+۱۴۵',
        dash_appointments_num: '۳۲',
        dash_advisor_1: 'سارا احمدی',
        dash_advisor_2: 'محمد رضایی',
        dash_advisor_1_init: 'س',
        dash_advisor_2_init: 'م',
        dash_pct_32: '۳۲٪',
        dash_pct_28: '۲۸٪',
        dash_status: 'وضعیت پیگیری',
        dash_completed: 'تکمیل شده',

        // Problem section
        problem_badge: 'مسئله واقعی',
        problem_title: 'چرا با وجود تبلیغات،',
        problem_title_2: 'کلینیک‌ها پر نمی‌شوند؟',
        problem_1: 'لید جذب می‌شود، اما پیگیری منظم ندارد',
        problem_2: 'تماس‌ها ثبت و تحلیل نمی‌شوند',
        problem_3: 'کیفیت مشاور فروش قابل ارزیابی نیست',
        problem_4: 'مشخص نیست کدام کانال واقعاً بیمار می‌آورد',
        problem_5: 'نوبت ثبت می‌شود، اما مراجعه انجام نمی‌شود',
        problem_conclusion: 'مشکل تبلیغ نیست؛',
        problem_conclusion_2: 'مشکل نبود زیرساخت فروش و پیگیری بیمار است.',

        // Solution section
        solution_badge: 'راه حل جامع',
        solution_title: 'زیرساخت یکپارچه فروش',
        feature_lead_title: 'فروشگاه سرنخ و لید',
        feature_lead_desc: 'شماره تماس مشتری بالقوه خوراک اصلی تیم فروشه، اینجا هر چند تا لید (سرنخ) بخوای پیدا میشه.',
        feature_consultant_title: 'استخدام مشاور فروش تلفنی',
        feature_consultant_desc: 'دیگه نگران نیروی فروش حرفه ای نباش! بیش از 100 مشاور فروش تلفنی در حوزه های مختلف در انتظار همکاری با شما هستند.',
        feature_crm_title: 'CRM اختصاصی پزشکی',
        feature_crm_desc: 'پایه و اساس یک تیم فروش یه CRM قدرتمنده که لیدوما بهترینش رو مخصوص حوزه پزشکی دراختیارت گذاشته.',

        // Consultants
        consultants_title: 'مشاوران فروش برتر',
        consultants_subtitle: 'نیروی فروش حرفه‌ای و آموزش‌دیده، آماده شروع کار روی پنل شما.',
        consultants_all: 'همه مشاوران',
        consultant_exp: 'سابقه',
        consultant_age: 'سن',
        consultant_view_resume: 'مشاهده رزومه',
        consultant_hire: 'استخدام مشاور',
        consultant_online: 'آنلاین',
        consultant_offline: 'آفلاین',
        consultant_busy: 'در جلسه',
        consultant_about: 'درباره مشاور',
        consultant_education: 'تحصیلات',
        consultant_work_history: 'سابقه کاری',
        consultant_skills: 'مهارت‌ها',
        consultant_achievements: 'دستاوردها',

        // Leads
        leads_badge: 'فروشگاه لید اختصاصی',
        leads_title: 'خوراک تیم فروش را تأمین کنید',
        leads_price_per: 'قیمت هر لید',
        leads_buy: 'خرید لید',
        leads_location: 'موقعیت',
        leads_available: 'تعداد لید موجود',
        leads_count: 'لید',
        leads_quantity: 'تعداد',
        leads_total: 'جمع کل',
        leads_phone: 'شماره تماس',
        leads_confirm: 'تأیید خرید',
        leads_cancel: 'انصراف',
        currency: 'تومان',

        // CTA
        cta_badge: 'شروع مسیر رشد',
        cta_title_1: 'کلینیک خود را به',
        cta_title_2: 'ماشین فروش',
        cta_title_3: ' تبدیل کنید',
        cta_desc: 'زیرساخت فروش شما آماده است. برای دریافت مشاوره رایگان و مشاهده دمو، همین حالا اقدام کنید.',
        cta_placeholder: 'نام و نام خانوادگی خود را وارد کنید...',
        cta_submit: 'ثبت درخواست',
        cta_or: 'یا ارتباط سریع',
        cta_direct_call: 'مشاوره تلفنی مستقیم:',

        // Footer
        footer_desc: 'اولین پلتفرم تخصصی لید مارکتینگ و مدیریت فروش برای مراکز درمانی و زیبایی در ایران. لیدوما با ارائه راهکارهای نوین دیجیتال مارکتینگ، به کلینیک‌ها و مراکز درمانی کمک می‌کند تا مشتریان بیشتری جذب کرده و فرآیند فروش خود را بهینه‌سازی کنند.',
        footer_licenses: 'مجوزها',
        footer_contact: 'ارتباط با ما',
        footer_rights: '© 1403 لیدوما. تمامی حقوق محفوظ است.',
        footer_address: 'کامرانیه شمالی، خیابان سعیدی (مهماندوست)، خیابان حسینی، خیابان فریبرز متقیان، کوچه امینی متقیان، پلاک ۴',

        // Contact Info
        contact_landline_display: '۰۹۱۲۵۸۷۰۷۱۰',
        contact_landline_href: 'tel:+989125870710',
        contact_mobile_display: '۰۹۱۲۵۸۷۰۷۱۰',
        contact_mobile_href: 'tel:+989125870710',

        // Modals
        modal_demo_title: 'درخواست دمو',
        modal_contact_title: 'تماس با ما',
        modal_video_title: 'ویدیو معرفی لیدوما',
        modal_resume_title: 'رزومه',
        form_name: 'نام و نام خانوادگی',
        form_name_placeholder: 'نام خود را وارد کنید',
        form_phone: 'شماره موبایل',
        form_clinic: 'نام کلینیک',
        form_clinic_placeholder: 'نام کلینیک خود را وارد کنید',
        form_specialty: 'تخصص کلینیک',
        form_select: 'انتخاب کنید',
        form_send: 'ارسال درخواست',
        form_phone_label: 'تلفن',
        form_mobile_label: 'موبایل',
        form_address_label: 'آدرس',

        // Demo form options
        specialty_beauty: 'زیبایی',
        specialty_dental: 'دندانپزشکی',
        specialty_hair: 'کاشت مو',
        specialty_plastic: 'جراحی پلاستیک',
        specialty_other: 'سایر',

        // About page
        about_title: 'درباره ما',
        about_badge: 'درباره لیدوما',
        about_hero_title: 'ما که هستیم؟',
        about_hero_desc: 'لیدوما یک پلتفرم جامع و هوشمند برای مدیریت و فروش لید در حوزه‌های درمانی و زیبایی است',
        about_mission_badge: 'مأموریت ما',
        about_mission_title: 'ایجاد ارتباط بین کلینیک‌ها و مشتریان',
        about_mission_desc: 'ما باور داریم که مشکل اصلی کلینیک‌ها، جذب لید نیست. مشکل اصلی، مدیریت و پیگیری لیدها است. لیدوما با ارائه زیرساخت فروش یکپارچه، این مشکل را حل می‌کند.',
        about_goal_title: 'هدف ما',
        about_goal_desc: 'تبدیل هر کلینیک به یک ماشین فروش کارآمد',
        about_values_title: 'ارزش‌ها',
        about_values_desc: 'شفافیت، کیفیت و تعهد به موفقیت مشتریان',
        about_active_clinics: 'کلینیک فعال',
        about_using_platform: 'در حال استفاده از پلتفرم لیدوما',
        about_why_title: 'چرا لیدوما؟',
        about_why_subtitle: 'ویژگی‌هایی که ما را متمایز می‌کند',
        about_security_title: 'امنیت بالا',
        about_security_desc: 'تمام داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شوند',
        about_speed_title: 'سرعت بالا',
        about_speed_desc: 'سیستم با سرعت بالا عمل می‌کند و تجربه کاربری روان را تضمین می‌کند',
        about_support_title: 'پشتیبانی ۲۴/۷',
        about_support_desc: 'تیم پشتیبانی ما همیشه در دسترس است تا به شما کمک کند',
        about_team_title: 'تیم ما',
        about_team_subtitle: 'افرادی که پشت صحنه لیدوما هستند',
        ceo: 'مدیرعامل',
        sales_manager: 'مدیر فروش',
        customer_manager: 'مدیر امورمشتریان',
        hr_manager: 'مدیر منابع انسانی',
        team_exp_1: 'بیش از ۱۰ سال تجربه',
        team_exp_1b: 'در حوزه فناوری و استارتاپ',
        team_exp_2: 'متخصص در بازاریابی',
        team_exp_2b: 'و فروش خدمات درمانی',
        team_exp_3: 'متخصص در مدیریت روابط مشتری',
        team_exp_3b: 'و خدمات پس از فروش',
        team_exp_4: 'متخصص در مدیریت',
        team_exp_4b: 'و توسعه منابع انسانی',
        team_exp_ceo: 'بیش از ۱۰ سال تجربه در حوزه فناوری و استارتاپ',
        team_exp_sales: 'متخصص در بازاریابی و فروش خدمات درمانی',
        team_exp_customer: 'متخصص در مدیریت روابط مشتری و خدمات پس از فروش',
        team_exp_hr: 'متخصص در مدیریت و توسعه منابع انسانی',

        // Work types
        work_remote: 'دورکاری',
        work_onsite: 'حضوری',
        work_fulltime: 'تمام وقت',
        work_parttime: 'پاره وقت',

        // Alerts
        alert_success: 'درخواست شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.',
        alert_lead_success: 'خرید لید با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.',

        // Lead badges
        badge_vip: 'VIP',
        badge_new: 'جدید',
        badge_cheap: 'ارزان',
        badge_rare: 'کمیاب',
        brand_name: 'لیدوما',
        license_alt: 'مجوز',
    },
    en: {
        // Nav
        nav_features: 'Features',
        nav_consultants: 'Consultants',
        nav_leads: 'Lead Store',
        nav_about: 'About Us',
        nav_contact: 'Contact Us',
        nav_login: 'Login',
        nav_home: 'Home',
        nav_back: 'Back',

        // Hero
        hero_badge: 'Next-Gen Clinic Management',
        hero_title_1: 'Smart',
        hero_title_2: 'Lead Marketing',
        hero_title_3: 'Platform for Clinics',
        hero_desc: 'Lidoma is a complete ecosystem. Buy leads, hire sales consultants, and manage confirmed appointments with full transparency.',
        hero_cta_demo: 'Request Demo',
        hero_cta_video: 'Intro Video',

        // Dashboard mockup
        dash_new_leads: 'New Leads',
        dash_appointments: 'Appointments',
        dash_advisor_perf: 'Advisor Performance',
        dash_today: 'Today',
        dash_success_calls: 'successful calls',
        dash_success_calls_15: '15 successful calls',
        dash_success_calls_12: '12 successful calls',
        dash_leads_num: '+145',
        dash_appointments_num: '32',
        dash_advisor_1: 'Sara Ahmadi',
        dash_advisor_2: 'Mohammad Rezaei',
        dash_advisor_1_init: 'S',
        dash_advisor_2_init: 'M',
        dash_pct_32: '32%',
        dash_pct_28: '28%',
        dash_status: 'Follow-up Status',
        dash_completed: 'Completed',

        // Problem section
        problem_badge: 'The Real Problem',
        problem_title: 'Why don\'t clinics fill up',
        problem_title_2: 'despite advertising?',
        problem_1: 'Leads come in but aren\'t followed up systematically',
        problem_2: 'Calls aren\'t recorded or analyzed',
        problem_3: 'Sales consultant quality can\'t be measured',
        problem_4: 'Unclear which channel actually brings patients',
        problem_5: 'Appointments are booked but patients don\'t show up',
        problem_conclusion: 'The problem isn\'t advertising;',
        problem_conclusion_2: 'it\'s the lack of sales and patient follow-up infrastructure.',

        // Solution section
        solution_badge: 'Complete Solution',
        solution_title: 'Unified Sales Infrastructure',
        feature_lead_title: 'Lead Store',
        feature_lead_desc: 'Contact numbers of potential customers are the fuel for your sales team. Find as many leads as you need here.',
        feature_consultant_title: 'Hire Sales Consultants',
        feature_consultant_desc: 'Stop worrying about professional sales staff. Over 100 phone sales consultants in various fields are ready to work with you.',
        feature_crm_title: 'Medical CRM',
        feature_crm_desc: 'The foundation of a sales team is a powerful CRM. Lidoma provides the best one, tailored for the medical field.',

        // Consultants
        consultants_title: 'Top Sales Consultants',
        consultants_subtitle: 'Professional, trained sales force ready to work on your panel.',
        consultants_all: 'All Consultants',
        consultant_exp: 'Experience',
        consultant_age: 'Age',
        consultant_view_resume: 'View Resume',
        consultant_hire: 'Hire Consultant',
        consultant_online: 'Online',
        consultant_offline: 'Offline',
        consultant_busy: 'In Session',
        consultant_about: 'About Consultant',
        consultant_education: 'Education',
        consultant_work_history: 'Work History',
        consultant_skills: 'Skills',
        consultant_achievements: 'Achievements',

        // Leads
        leads_badge: 'Dedicated Lead Store',
        leads_title: 'Feed Your Sales Team',
        leads_price_per: 'Price per Lead',
        leads_buy: 'Buy Lead',
        leads_location: 'Location',
        leads_available: 'Available Leads',
        leads_count: 'leads',
        leads_quantity: 'Quantity',
        leads_total: 'Total',
        leads_phone: 'Contact Number',
        leads_confirm: 'Confirm Purchase',
        leads_cancel: 'Cancel',
        currency: 'AED',

        // CTA
        cta_badge: 'Start Your Growth',
        cta_title_1: 'Turn Your Clinic Into a',
        cta_title_2: 'Sales Machine',
        cta_title_3: '',
        cta_desc: 'Your sales infrastructure is ready. Request a free consultation and demo now.',
        cta_placeholder: 'Enter your full name...',
        cta_submit: 'Submit',
        cta_or: 'or quick contact',
        cta_direct_call: 'Direct Call:',

        // Footer
        footer_desc: 'Iran\'s first dedicated lead marketing and sales management platform for medical and beauty centers. Lidoma helps clinics attract more customers and optimize their sales process through innovative digital marketing solutions.',
        footer_licenses: 'Licenses',
        footer_contact: 'Contact Us',
        footer_rights: '© 2024 Lidoma. All rights reserved.',
        footer_address: 'Level 24, Boulevard Plaza Tower 2, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',

        // Contact Info
        contact_landline_display: '+971 50 715 8137',
        contact_landline_href: 'tel:+971507158137',
        contact_mobile_display: '+971 50 715 8137',
        contact_mobile_href: 'tel:+971507158137',

        // Modals
        modal_demo_title: 'Request Demo',
        modal_contact_title: 'Contact Us',
        modal_video_title: 'Lidoma Intro Video',
        modal_resume_title: 'Resume',
        form_name: 'Full Name',
        form_name_placeholder: 'Enter your name',
        form_phone: 'Mobile Number',
        form_clinic: 'Clinic Name',
        form_clinic_placeholder: 'Enter your clinic name',
        form_specialty: 'Clinic Specialty',
        form_select: 'Select',
        form_send: 'Submit',
        form_phone_label: 'Phone',
        form_mobile_label: 'Mobile',
        form_address_label: 'Address',

        // Demo form options
        specialty_beauty: 'Beauty',
        specialty_dental: 'Dentistry',
        specialty_hair: 'Hair Transplant',
        specialty_plastic: 'Plastic Surgery',
        specialty_other: 'Other',

        // About page
        about_title: 'About Us',
        about_badge: 'About Lidoma',
        about_hero_title: 'Who We Are',
        about_hero_desc: 'Lidoma is a comprehensive, intelligent platform for lead management and sales in medical and beauty sectors',
        about_mission_badge: 'Our Mission',
        about_mission_title: 'Connecting Clinics with Customers',
        about_mission_desc: 'We believe the main problem for clinics isn\'t lead generation. It\'s lead management and follow-up. Lidoma solves this with unified sales infrastructure.',
        about_goal_title: 'Our Goal',
        about_goal_desc: 'Transform every clinic into an efficient sales machine',
        about_values_title: 'Values',
        about_values_desc: 'Transparency, quality, and commitment to customer success',
        about_active_clinics: 'Active Clinics',
        about_using_platform: 'Using Lidoma Platform',
        about_why_title: 'Why Lidoma?',
        about_why_subtitle: 'What sets us apart',
        about_security_title: 'High Security',
        about_security_desc: 'All your data is protected with the highest security standards',
        about_speed_title: 'High Speed',
        about_speed_desc: 'The system operates at high speed and guarantees a smooth user experience',
        about_support_title: '24/7 Support',
        about_support_desc: 'Our support team is always available to help you',
        about_team_title: 'Our Team',
        about_team_subtitle: 'The people behind Lidoma',
        ceo: 'CEO',
        sales_manager: 'Sales Manager',
        customer_manager: 'Customer Relations Manager',
        hr_manager: 'HR Manager',
        team_exp_1: '10+ years experience',
        team_exp_1b: 'in technology and startups',
        team_exp_2: 'Expert in marketing',
        team_exp_2b: 'and medical services sales',
        team_exp_3: 'Expert in customer relations',
        team_exp_3b: 'and after-sales service',
        team_exp_4: 'Expert in management',
        team_exp_4b: 'and human resource development',
        team_exp_ceo: '10+ years experience in technology and startups',
        team_exp_sales: 'Expert in marketing and medical services sales',
        team_exp_customer: 'Expert in customer relations and after-sales service',
        team_exp_hr: 'Expert in management and HR development',

        // Work types
        work_remote: 'Remote',
        work_onsite: 'On-site',
        work_fulltime: 'Full-time',
        work_parttime: 'Part-time',

        // Alerts
        alert_success: 'Your request has been submitted! We will contact you soon.',
        alert_lead_success: 'Lead purchase confirmed! We will contact you soon.',

        // Lead badges
        badge_vip: 'VIP',
        badge_new: 'New',
        badge_cheap: 'Cheap',
        badge_rare: 'Rare',
        brand_name: 'Lidoma',
        license_alt: 'License',
    },

    ar: {
        // Nav
        nav_features: 'المميزات',
        nav_consultants: 'المستشارون',
        nav_leads: 'متجر العملاء',
        nav_about: 'معلومات عنا',
        nav_contact: 'اتصل بنا',
        nav_login: 'تسجيل الدخول',
        nav_home: 'الرئيسية',
        nav_back: 'رجوع',

        // Hero
        hero_badge: 'الجيل القادم لإدارة العيادات',
        hero_title_1: 'نظام ذكي',
        hero_title_2: 'تسويق العملاء',
        hero_title_3: 'للعيادات والمراكز',
        hero_desc: 'ليدوما نظام متكامل. اشترِ عملاء محتملين، وظف مستشاري مبيعات، وأدر المواعيد المؤكدة بكل شفافية.',
        hero_cta_demo: 'طلب عرض توضيحي',
        hero_cta_video: 'فيديو تعريفي',

        // Dashboard mockup
        dash_new_leads: 'عملاء جدد',
        dash_appointments: 'مواعيد محجوزة',
        dash_advisor_perf: 'أداء المستشارين',
        dash_today: 'اليوم',
        dash_success_calls: 'مكالمات ناجحة',
        dash_success_calls_15: '١٥ مكالمة ناجحة',
        dash_success_calls_12: '١٢ مكالمة ناجحة',
        dash_leads_num: '+١٤٥',
        dash_appointments_num: '٣٢',
        dash_advisor_1: 'سارة أحمد',
        dash_advisor_2: 'محمد رضا',
        dash_advisor_1_init: 'س',
        dash_advisor_2_init: 'م',
        dash_pct_32: '٣٢٪',
        dash_pct_28: '٢٨٪',
        dash_status: 'حالة المتابعة',
        dash_completed: 'مكتمل',

        // Problem section
        problem_badge: 'المشكلة الحقيقية',
        problem_title: 'لماذا لا تمتلئ العيادات',
        problem_title_2: 'رغم الإعلانات؟',
        problem_1: 'يأتي العملاء ولكن لا تتم متابعتهم بانتظام',
        problem_2: 'لا يتم تسجيل المكالمات أو تحليلها',
        problem_3: 'لا يمكن قياس جودة مستشار المبيعات',
        problem_4: 'غير واضح أي قناة تجلب المرضى فعلياً',
        problem_5: 'يتم حجز المواعيد ولكن لا يحضر المرضى',
        problem_conclusion: 'المشكلة ليست في الإعلان؛',
        problem_conclusion_2: 'بل في نقص البنية التحتية للمبيعات ومتابعة المرضى.',

        // Solution section
        solution_badge: 'الحل الشامل',
        solution_title: 'بنية تحتية موحدة للمبيعات',
        feature_lead_title: 'متجر العملاء المحتملين',
        feature_lead_desc: 'أرقام هواتف العملاء المحتملين هي وقود فريق مبيعاتك. اعثر على العدد الذي تحتاجه هنا.',
        feature_consultant_title: 'توظيف مستشاري مبيعات',
        feature_consultant_desc: 'لا تقلق بشأن موظفي المبيعات المحترفين. أكثر من 100 مستشار مبيعات هاتفي في مجالات مختلفة جاهزون للعمل معك.',
        feature_crm_title: 'نظام إدارة علاقات المرضى',
        feature_crm_desc: 'أساس فريق المبيعات هو نظام إدارة علاقات عملاء قوي. ليدوما توفر الأفضل والمخصص للمجال الطبي.',

        // Consultants
        consultants_title: 'أفضل مستشاري المبيعات',
        consultants_subtitle: 'قوة مبيعات محترفة ومدربة، جاهزة للعمل على لوحتك.',
        consultants_all: 'كل المستشارين',
        consultant_exp: 'الخبرة',
        consultant_age: 'العمر',
        consultant_view_resume: 'عرض السيرة الذاتية',
        consultant_hire: 'تواصل مع المستشار',
        consultant_online: 'متصل',
        consultant_offline: 'غير متصل',
        consultant_busy: 'مشغول',
        consultant_about: 'عن المستشار',
        consultant_education: 'التعليم',
        consultant_work_history: 'تاريخ العمل',
        consultant_skills: 'المهارات',
        consultant_achievements: 'الإنجازات',

        // Leads
        leads_badge: 'متجر عملاء مخصص',
        leads_title: 'زوّد فريق مبيعاتك بالعملاء',
        leads_price_per: 'سعر العميل',
        leads_buy: 'شراء العميل',
        leads_location: 'الموقع',
        leads_available: 'العملاء المتاحين',
        leads_count: 'عميل',
        leads_quantity: 'الكمية',
        leads_total: 'الإجمالي',
        leads_phone: 'رقم الهاتف',
        leads_confirm: 'تأكيد الشراء',
        leads_cancel: 'إلغاء',
        currency: 'درهم',

        // CTA
        cta_badge: 'ابدأ نموك',
        cta_title_1: 'حوّل عيادتك إلى',
        cta_title_2: 'ماكينة مبيعات',
        cta_title_3: '',
        cta_desc: 'بنيتك التحتية للمبيعات جاهزة. اطلب استشارة مجانية وعرضاً توضيحياً الآن.',
        cta_placeholder: 'أدخل اسمك الكامل...',
        cta_submit: 'إرسال الطلب',
        cta_or: 'أو تواصل سريع',
        cta_direct_call: 'اتصال مباشر:',

        // Footer
        footer_desc: 'أول منصة متخصصة في تسويق العملاء وإدارة المبيعات للمراكز الطبية والتجميلية. تساعد ليدوما العيادات على جذب المزيد من العملاء وتحسين عملية المبيعات من خلال حلول التسويق الرقمي المبتكرة.',
        footer_licenses: 'التراخيص',
        footer_contact: 'اتصل بنا',
        footer_rights: '© ٢٠٢٤ ليدوما. جميع الحقوق محفوظة.',
        footer_address: 'الطابق ٢٤، برج بوليفارد بلازا ٢، بوليفارد الشيخ محمد بن راشد، وسط مدينة دبي، الإمارات العربية المتحدة',

        // Contact Info
        contact_landline_display: '+971 50 715 8137',
        contact_landline_href: 'tel:+971507158137',
        contact_mobile_display: '+971 50 715 8137',
        contact_mobile_href: 'tel:+971507158137',

        // Modals
        modal_demo_title: 'طلب عرض توضيحي',
        modal_contact_title: 'اتصل بنا',
        modal_video_title: 'فيديو تعريفي ليدوما',
        modal_resume_title: 'السيرة الذاتية',
        form_name: 'الاسم الكامل',
        form_name_placeholder: 'أدخل اسمك',
        form_phone: 'رقم الجوال',
        form_clinic: 'اسم العيادة',
        form_clinic_placeholder: 'أدخل اسم عيادتك',
        form_specialty: 'تخصص العيادة',
        form_select: 'اختر',
        form_send: 'إرسال الطلب',
        form_phone_label: 'هاتف',
        form_mobile_label: 'جوال',
        form_address_label: 'العنوان',

        // Demo form options
        specialty_beauty: 'تجميل',
        specialty_dental: 'طب أسنان',
        specialty_hair: 'زراعة شعر',
        specialty_plastic: 'جراحة تجميلية',
        specialty_other: 'أخرى',

        // About page
        about_title: 'معلومات عنا',
        about_badge: 'عن ليدوما',
        about_hero_title: 'من نحن',
        about_hero_desc: 'ليدوما هي منصة شاملة وذكية لإدارة العملاء والمبيعات في القطاعات الطبية والتجميلية',
        about_mission_badge: 'مهمتنا',
        about_mission_title: 'ربط العيادات بالعملاء',
        about_mission_desc: 'نؤمن أن المشكلة الرئيسية للعيادات ليست جذب العملاء، بل إدارتهم ومتابعتهم. ليدوما تحل هذه المشكلة من خلال بنية تحتية موحدة للمبيعات.',
        about_goal_title: 'هدفنا',
        about_goal_desc: 'تحويل كل عيادة إلى آلة مبيعات فعالة',
        about_values_title: 'قيمنا',
        about_values_desc: 'الشفافية، الجودة، والالتزام بنجاح العملاء',
        about_active_clinics: 'عيادة نشطة',
        about_using_platform: 'يستخدمون منصة ليدوما',
        about_why_title: 'لماذا ليدوما؟',
        about_why_subtitle: 'ما يميزنا',
        about_security_title: 'أمان عالي',
        about_security_desc: 'جميع بياناتك محمية بأعلى معايير الأمان',
        about_speed_title: 'سرعة عالية',
        about_speed_desc: 'يعمل النظام بسرعة عالية ويضمن تجربة مستخدم سلسة',
        about_support_title: 'دعم ٢٤/٧',
        about_support_desc: 'فريق الدعم لدينا متاح دائماً لمساعدتك',
        about_team_title: 'فريقنا',
        about_team_subtitle: 'الأشخاص خلف ليدوما',
        ceo: 'المدير التنفيذي',
        sales_manager: 'مدير المبيعات',
        customer_manager: 'مدير علاقات العملاء',
        hr_manager: 'مدير الموارد البشرية',
        team_exp_1: 'خبرة تزيد عن 10 سنوات',
        team_exp_1b: 'في التكنولوجيا والشركات الناشئة',
        team_exp_2: 'خبير في التسويق',
        team_exp_2b: 'ومبيعات الخدمات الطبية',
        team_exp_3: 'خبير في علاقات العملاء',
        team_exp_3b: 'وخدمات ما بعد البيع',
        team_exp_4: 'خبير في الإدارة',
        team_exp_4b: 'وتطوير الموارد البشرية',
        team_exp_ceo: 'خبرة تزيد عن 10 سنوات في التكنولوجيا والشركات الناشئة',
        team_exp_sales: 'خبير في التسويق ومبيعات الخدمات الطبية',
        team_exp_customer: 'خبير في علاقات العملاء وخدمات ما بعد البيع',
        team_exp_hr: 'خبير في الإدارة وتطوير الموارد البشرية',

        // Work types
        work_remote: 'عن بعد',
        work_onsite: 'حضوري',
        work_fulltime: 'دوام كامل',
        work_parttime: 'دوام جزئي',

        // Alerts
        alert_success: 'تم استلام طلبك! سنتصل بك قريباً.',
        alert_lead_success: 'تم تأكيد شراء العميل! سنتصل بك قريباً.',

        // Lead badges
        badge_vip: 'VIP',
        badge_new: 'جديد',
        badge_cheap: 'رخيص',
        badge_rare: 'نادر',
        brand_name: 'ليدوما',
        license_alt: 'رخصة',
    }
};

let currentLang = 'fa';

function t(key) {
    const dict = translations[currentLang] || translations.fa;
    return dict[key] ?? translations.fa[key] ?? key;
}

function setLang(lang) {
    currentLang = lang;
    try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) { }
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'fa' || lang === 'ar') ? 'rtl' : 'ltr';
    document.body.classList.toggle('font-fa', lang === 'fa' || lang === 'ar');
    document.body.classList.toggle('font-en', lang === 'en');
}

async function detectLangByIP() {
    try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        const country = data.country_code || '';
        const continent = data.continent_code || '';
        const isAmericas = AMERICAS_CODES.includes(continent);
        const isArabic = ARABIC_CODES.includes(country);

        if (isAmericas) return 'en';
        if (isArabic) return 'ar';
        return 'fa'; // Default to Persian for others (mainly Iran)
    } catch (e) {
        return 'fa'; // Default on error
    }
}

async function initLang() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && ['fa', 'en', 'ar'].includes(saved)) {
        setLang(saved);
        applyTranslations();
        initLangSwitcher();
        return;
    }
    const detected = await detectLangByIP();
    setLang(detected);
    applyTranslations();
    initLangSwitcher();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.placeholder = t(key);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (key) el.alt = t(key);
    });
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const key = el.getAttribute('data-i18n-href');
        const translation = t(key);
        if (translation) el.href = translation;
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        const text = (translation === undefined || translation === null) ? '' : String(translation);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (!el.hasAttribute('data-i18n-placeholder')) el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const translation = t(key);
        if (translation) el.innerHTML = translation;
    });
    document.querySelectorAll('[data-show-langs]').forEach(el => {
        const langs = el.getAttribute('data-show-langs').split(',').map(l => l.trim());
        if (langs.includes(currentLang)) {
            el.style.display = '';
            el.classList.remove('hidden');
        } else {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    if (typeof window.onLangChanged === 'function') {
        window.onLangChanged(currentLang);
    }
}

function initLangSwitcher() {
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang-switch');
            setLang(lang);
            applyTranslations();
            updateLangSwitcherUI();
            if (typeof window.onLangChanged === 'function') {
                window.onLangChanged(currentLang);
            }
        });
    });
    updateLangSwitcherUI();
}

function updateLangSwitcherUI() {
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
        const lang = btn.getAttribute('data-lang-switch');
        btn.classList.toggle('font-bold', currentLang === lang);
        btn.classList.toggle('text-white', currentLang === lang);
        btn.classList.toggle('text-slate-400', currentLang !== lang);
    });
}

window.i18n = {
    t,
    setLang,
    getLang: () => currentLang,
    init: initLang,
    apply: applyTranslations
};
window.t = t;
