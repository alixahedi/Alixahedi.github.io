// Language System
let currentLanguage = 'en';

// Current detail page info
let currentDetailPage = {
  type: null, // 'project' or 'course'
  id: null    // project or course ID
};

const translations = {
  en: {
    // Page meta
    pageTitle: 'Ali Zahedi',
    pageDescription: 'Electronics & Embedded Systems Engineer.',
    
    // Brand name
    brandName: 'Ali Zahedi',
    
    // Navigation
    navHome: 'Home',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navCourses: 'Courses',
    navContact: 'Contact',
    
    // Hero section
    heroTitle: 'Electronics & Embedded Systems Engineer',
    heroSubtitle: 'IoT • Medical Devices • Computer Vision',
    heroDesc: 'From firmware and PCB to vision software and UI  I build end‑to‑end, reliable systems. Currently focused on digital pathology tooling and smart imaging hardware.',
    
    // Home section
    HomeTitle: 'Home',
    HomeContent: 'Experienced Electronics and Embedded Systems Engineer with a strong background in IoT and medical device development. My work focuses on the design of intelligent embedded and cyber-physical systems, particularly for smart home, smart city, and healthcare applications. I specialize in hardware/software co-design, real-time system integration, and secure communication protocols. Proficient in platforms such as STM32, ESP32, Raspberry Pi, and FPGA, with extensive experience in C/C++, RTOS, and GUI development using LVGL and TouchGFX. I aim to build scalable, intelligent, and adaptive embedded systems for next-generation connected environments.',
    HomeHighlights: {
      years: '7+ years',
      yearsText: 'Embedded & IoT',
      projects: '10+',
      projectsText: 'Production projects',
      domains: '3',
      domainsText: 'Research domains'
    },
    
    // Skills section
    skillsTitle: 'Skills',
    skillGroups: {
      programming: 'Programming',
      platforms: 'Platforms',
      tools: 'Tools & Frameworks',
      protocols: 'Protocols'
    },
    
    // Projects section
    projectsTitle: 'Projects',
    projectTitles: {
      deepstitch: 'DeepStitch — Image Stitching',
      microscope: 'Digital Microscope Camera',
      plasma: 'Carbox Plasma System',
      dali: 'DALI Master Controller',
      poe: 'PoE Network Hub',
      ota: 'Secure OTA System',
      ac: 'Smart AC Remote'
    },
    projectMeta: {
      deepstitch: '2025 · Python · AI',
      microscope: '2024 · Imaging · Embedded',
      plasma: '2024 · Medical · High Voltage',
      dali: '2023 · Smart Lighting · Control',
      poe: '2023 · Network · Power',
      ota: '2023 · Security · IoT',
      ac: '2022 · IoT · Smart Home'
    },
    
    // Courses section
    coursesTitle: 'Courses',
    courseTitles: {
      beginner: 'STM32 Fundamentals',
      advanced: 'STM32 Advanced Development',
      bootloader: 'STM32 Bootloader & OTA'
    },
    courseMeta: {
      beginner: 'Beginner · GPIO to DMA',
      advanced: 'Advanced · FreeRTOS',
      bootloader: 'Expert · Bootloader & OTA'
    },
    
    // Contact section
    contactTitle: 'Contact',
    
    // Aria labels
    ariaLabels: {
      deepstitch: 'DeepStitch — Image Stitching',
      microscope: 'Digital Microscope Camera',
      plasma: 'Carbox Plasma System',
      dali: 'DALI Master Controller',
      poe: 'PoE Network Hub',
      ota: 'Secure OTA System',
      ac: 'Smart AC Remote',
      beginner: 'STM32 Fundamentals - Beginner Course',
      advanced: 'STM32 Advanced Development',
      bootloader: 'STM32 Bootloader & OTA Updates'
    },
    
    // Project details
    projectDetails: {
      deepstitch: {
        title: 'DeepStitch — Image Stitching',
        description: 'Intelligent image stitching system using deep learning algorithms to create high-quality panoramic images from multiple overlapping photos.',
        technologies: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision'],
        features: [
          'Automatic feature detection and matching',
          'Seamless blending of overlapping regions',
          'Support for various image formats',
          'Real-time processing capabilities',
          'High-quality panoramic output'
        ],
        year: '2025',
        category: 'AI & Computer Vision'
      },
      microscope: {
        title: 'Digital Microscope Camera',
        description: 'Advanced imaging system for microscopes with image processing and automatic detection capabilities for medical and research applications.',
        technologies: ['STM32', 'Camera Module', 'Image Processing', 'C++'],
        features: [
          'High-resolution image capture',
          'Real-time image processing',
          'Automatic focus adjustment',
          'Measurement and annotation tools',
          'Data logging and analysis'
        ],
        year: '2024',
        category: 'Medical Devices'
      },
      plasma: {
        title: 'Carbox Plasma System',
        description: 'Plasma generation device for medical and industrial applications with precise parameter control and safety features.',
        technologies: ['High Voltage', 'Control Systems', 'Safety Protocols', 'C++'],
        features: [
          'Precise plasma generation control',
          'Safety monitoring systems',
          'Real-time parameter adjustment',
          'Data logging and reporting',
          'Industrial-grade reliability'
        ],
        year: '2024',
        category: 'Medical & Industrial'
      },
      dali: {
        title: 'DALI Master Controller',
        description: 'Main controller for DALI smart lighting system with comprehensive control and monitoring capabilities.',
        technologies: ['DALI Protocol', 'Smart Lighting', 'Control Systems', 'C++'],
        features: [
          'DALI protocol implementation',
          'Centralized lighting control',
          'Energy monitoring',
          'Scene management',
          'Remote control interface'
        ],
        year: '2023',
        category: 'Smart Lighting'
      },
      poe: {
        title: 'PoE Network Hub',
        description: 'Network hub with Power over Ethernet capability for power supply and network connection in smart building applications.',
        technologies: ['PoE', 'Network Management', 'Power Distribution', 'C++'],
        features: [
          'Power over Ethernet support',
          'Network switching capabilities',
          'Power monitoring',
          'Remote management',
          'Scalable architecture'
        ],
        year: '2023',
        category: 'Network Infrastructure'
      },
      ota: {
        title: 'Secure OTA System',
        description: 'Secure firmware update system for IoT devices with encryption and authentication for reliable over-the-air updates.',
        technologies: ['OTA', 'Security', 'IoT', 'Encryption'],
        features: [
          'Secure firmware updates',
          'Encryption and authentication',
          'Rollback capabilities',
          'Progress monitoring',
          'Multi-device support'
        ],
        year: '2023',
        category: 'IoT Security'
      },
      ac: {
        title: 'Smart AC Remote',
        description: 'Smart air conditioner controller with remote control and scheduling capabilities for home automation systems.',
        technologies: ['IoT', 'Smart Home', 'Remote Control', 'C++'],
        features: [
          'Remote temperature control',
          'Scheduling and automation',
          'Energy monitoring',
          'Mobile app integration',
          'Voice control support'
        ],
        year: '2022',
        category: 'Smart Home'
      }
    },
    
    // Course details
    courseDetails: {
      beginner: {
        title: 'STM32 Fundamentals - Beginner Course',
        description: 'Comprehensive beginner STM32 course covering everything from basic GPIO operations to advanced features like DMA and Watchdog.',
        duration: '40 hours',
        level: 'Beginner',
        platform: 'STM32F4',
        modules: [
          'Introduction to STM32 and ARM Cortex-M',
          'GPIO Configuration and Control',
          'Interrupts and Exception Handling',
          'Timers and PWM Generation',
          'ADC and DAC Operations',
          'Communication Protocols (UART, SPI, I2C)',
          'DMA and Memory Management',
          'Watchdog and Power Management'
        ],
        prerequisites: ['Basic C programming knowledge', 'Understanding of embedded systems concepts'],
        outcomes: [
          'Master STM32 development environment',
          'Implement various peripheral interfaces',
          'Develop efficient embedded applications',
          'Understand ARM Cortex-M architecture'
        ]
      },
      advanced: {
        title: 'STM32 Advanced Development',
        description: 'Advanced STM32 course covering FreeRTOS, memory management, optimization techniques, and complex system design.',
        duration: '50 hours',
        level: 'Advanced',
        platform: 'STM32F4 with FreeRTOS',
        modules: [
          'FreeRTOS Task Management',
          'Memory Management and Optimization',
          'Advanced Interrupt Handling',
          'Real-time System Design',
          'Power Management Strategies',
          'Advanced Communication Protocols',
          'System Integration and Testing',
          'Performance Optimization'
        ],
        prerequisites: ['STM32 Fundamentals course', 'Experience with embedded systems'],
        outcomes: [
          'Design complex real-time systems',
          'Implement efficient memory management',
          'Optimize system performance',
          'Master FreeRTOS concepts'
        ]
      },
      bootloader: {
        title: 'STM32 Bootloader & OTA Updates',
        description: 'Specialized course on implementing bootloaders and over-the-air update systems for STM32 microcontrollers.',
        duration: '30 hours',
        level: 'Expert',
        platform: 'STM32F4 Bootloader',
        modules: [
          'Bootloader Architecture and Design',
          'Flash Memory Management',
          'OTA Update Implementation',
          'Security and Authentication',
          'Error Handling and Recovery',
          'Boot Sequence Optimization',
          'Application Integration',
          'Testing and Validation'
        ],
        prerequisites: ['Advanced STM32 knowledge', 'Understanding of embedded security'],
        outcomes: [
          'Implement custom bootloaders',
          'Design secure OTA systems',
          'Handle update failures gracefully',
          'Optimize boot performance'
        ]
      }
    }
  },
  
  fa: {
    // Page meta
    pageTitle: 'علی زاهدی',
    pageDescription: 'مهندس الکترونیک و سیستم‌های تعبیه‌شده با تخصص در اینترنت اشیا، تجهیزات پزشکی و بینایی کامپیوتر',
    
    // Brand name
    brandName: 'علی زاهدی',
    
    // Navigation
    navHome: 'خانه',
    navSkills: 'مهارت‌ها',
    navProjects: 'پروژه‌ها',
    navCourses: 'دوره‌ها',
    navContact: 'تماس',
    
    // Hero section
    heroTitle: 'مهندس الکترونیک و سیستم‌های تعبیه‌شده',
    heroSubtitle: 'اینترنت اشیا • تجهیزات پزشکی • بینایی کامپیوتر',
    heroDesc: 'از فریم‌ور و PCB تا نرم‌افزار بینایی و رابط کاربری، سیستم‌های قابل اعتماد و کامل می‌سازم. در حال حاضر روی ابزارهای پاتولوژی دیجیتال و سخت‌افزار تصویربرداری هوشمند تمرکز دارم.',
    
    // Home section
    HomeTitle: 'درباره',
    HomeContent: 'مهندس الکترونیک و سیستم‌های تعبیه‌شده با تجربه و پیشینه قوی در توسعه اینترنت اشیا و تجهیزات پزشکی. کار من بر طراحی سیستم‌های تعبیه‌شده هوشمند و سایبر-فیزیکی متمرکز است، به ویژه برای کاربردهای خانه هوشمند، شهر هوشمند و مراقبت‌های بهداشتی. من در طراحی مشترک سخت‌افزار/نرم‌افزار، یکپارچه‌سازی سیستم‌های بلادرنگ و پروتکل‌های ارتباطی امن تخصص دارم. در پلتفرم‌هایی مانند STM32، ESP32، Raspberry Pi و FPGA مهارت دارم و تجربه گسترده‌ای در C/C++، RTOS و توسعه GUI با استفاده از LVGL و TouchGFX دارم. هدف من ساخت سیستم‌های تعبیه‌شده مقیاس‌پذیر، هوشمند و سازگار برای محیط‌های متصل نسل بعدی است.',
    HomeHighlights: {
      years: '7+ سال',
      yearsText: 'تعبیه‌شده و IoT',
      projects: '10+',
      projectsText: 'پروژه‌های تولیدی',
      domains: '3',
      domainsText: 'حوزه‌های تحقیقاتی'
    },
    
    // Skills section
    skillsTitle: 'مهارت‌ها',
    skillGroups: {
      programming: 'برنامه‌نویسی',
      platforms: 'پلتفرم‌ها',
      tools: 'ابزارها و فریم‌ورک‌ها',
      protocols: 'پروتکل‌ها'
    },
    
    // Projects section
    projectsTitle: 'پروژه‌ها',
    projectTitles: {
      deepstitch: 'DeepStitch — اتصال تصاویر',
      microscope: 'دوربین میکروسکوپ دیجیتال',
      plasma: 'سیستم پلاسما Carbox',
      dali: 'کنترلر اصلی DALI',
      poe: 'هاب شبکه PoE',
      ota: 'سیستم OTA امن',
      ac: 'کنترلر هوشمند کولر'
    },
    projectMeta: {
      deepstitch: '2025 · Python · هوش مصنوعی',
      microscope: '2024 · تصویربرداری · تعبیه‌شده',
      plasma: '2024 · پزشکی · ولتاژ بالا',
      dali: '2023 · روشنایی هوشمند · کنترل',
      poe: '2023 · شبکه · برق',
      ota: '2023 · امنیت · IoT',
      ac: '2022 · IoT · خانه هوشمند'
    },
    
    // Courses section
    coursesTitle: 'دوره‌ها',
    courseTitles: {
      beginner: 'مبانی STM32',
      advanced: 'توسعه پیشرفته STM32',
      bootloader: 'Bootloader و OTA STM32'
    },
    courseMeta: {
      beginner: 'مقدماتی · GPIO تا DMA',
      advanced: 'پیشرفته · FreeRTOS',
      bootloader: 'متخصص · Bootloader و OTA'
    },
    
    // Contact section
    contactTitle: 'تماس',
    
    // Aria labels
    ariaLabels: {
      deepstitch: 'DeepStitch — اتصال تصاویر',
      microscope: 'دوربین میکروسکوپ دیجیتال',
      plasma: 'سیستم پلاسما Carbox',
      dali: 'کنترلر اصلی DALI',
      poe: 'هاب شبکه PoE',
      ota: 'سیستم OTA امن',
      ac: 'کنترلر هوشمند کولر',
      beginner: 'مبانی STM32 - دوره مقدماتی',
      advanced: 'توسعه پیشرفته STM32',
      bootloader: 'Bootloader و OTA STM32'
    },
    
    // Project details
    projectDetails: {
      deepstitch: {
        title: 'DeepStitch — اتصال تصاویر',
        description: 'سیستم هوشمند اتصال تصاویر با استفاده از الگوریتم‌های یادگیری عمیق برای ایجاد تصاویر پانوراما با کیفیت بالا از چندین عکس همپوشان.',
        technologies: ['Python', 'OpenCV', 'یادگیری عمیق', 'بینایی کامپیوتر'],
        features: [
          'تشخیص و تطبیق خودکار ویژگی‌ها',
          'ترکیب بی‌درز مناطق همپوشان',
          'پشتیبانی از فرمت‌های مختلف تصویر',
          'قابلیت پردازش بلادرنگ',
          'خروجی پانوراما با کیفیت بالا'
        ],
        year: '2025',
        category: 'هوش مصنوعی و بینایی کامپیوتر'
      },
      microscope: {
        title: 'دوربین میکروسکوپ دیجیتال',
        description: 'سیستم تصویربرداری پیشرفته برای میکروسکوپ با قابلیت پردازش تصویر و تشخیص خودکار برای کاربردهای پزشکی و تحقیقاتی.',
        technologies: ['STM32', 'ماژول دوربین', 'پردازش تصویر', 'C++'],
        features: [
          'ضبط تصویر با وضوح بالا',
          'پردازش تصویر بلادرنگ',
          'تنظیم خودکار فوکوس',
          'ابزارهای اندازه‌گیری و حاشیه‌نویسی',
          'ثبت و تحلیل داده‌ها'
        ],
        year: '2024',
        category: 'تجهیزات پزشکی'
      },
      plasma: {
        title: 'سیستم پلاسما Carbox',
        description: 'دستگاه تولید پلاسما برای کاربردهای پزشکی و صنعتی با کنترل دقیق پارامترها و ویژگی‌های ایمنی.',
        technologies: ['ولتاژ بالا', 'سیستم‌های کنترل', 'پروتکل‌های ایمنی', 'C++'],
        features: [
          'کنترل دقیق تولید پلاسما',
          'سیستم‌های نظارت بر ایمنی',
          'تنظیم پارامترهای بلادرنگ',
          'ثبت و گزارش‌دهی داده‌ها',
          'قابلیت اطمینان در سطح صنعتی'
        ],
        year: '2024',
        category: 'پزشکی و صنعتی'
      },
      dali: {
        title: 'کنترلر اصلی DALI',
        description: 'کنترلر اصلی سیستم روشنایی هوشمند DALI با قابلیت‌های جامع کنترل و نظارت.',
        technologies: ['پروتکل DALI', 'روشنایی هوشمند', 'سیستم‌های کنترل', 'C++'],
        features: [
          'پیاده‌سازی پروتکل DALI',
          'کنترل متمرکز روشنایی',
          'نظارت بر انرژی',
          'مدیریت صحنه‌ها',
          'رابط کنترل از راه دور'
        ],
        year: '2023',
        category: 'روشنایی هوشمند'
      },
      poe: {
        title: 'هاب شبکه PoE',
        description: 'هاب شبکه با قابلیت Power over Ethernet برای تأمین برق و اتصال شبکه در کاربردهای ساختمان هوشمند.',
        technologies: ['PoE', 'مدیریت شبکه', 'توزیع برق', 'C++'],
        features: [
          'پشتیبانی از Power over Ethernet',
          'قابلیت‌های سوئیچینگ شبکه',
          'نظارت بر برق',
          'مدیریت از راه دور',
          'معماری مقیاس‌پذیر'
        ],
        year: '2023',
        category: 'زیرساخت شبکه'
      },
      ota: {
        title: 'سیستم OTA امن',
        description: 'سیستم به‌روزرسانی امن فریم‌ور برای دستگاه‌های IoT با رمزنگاری و احراز هویت برای به‌روزرسانی‌های قابل اعتماد از راه دور.',
        technologies: ['OTA', 'امنیت', 'IoT', 'رمزنگاری'],
        features: [
          'به‌روزرسانی امن فریم‌ور',
          'رمزنگاری و احراز هویت',
          'قابلیت بازگشت',
          'نظارت بر پیشرفت',
          'پشتیبانی از چندین دستگاه'
        ],
        year: '2023',
        category: 'امنیت IoT'
      },
      ac: {
        title: 'کنترلر هوشمند کولر',
        description: 'کنترلر هوشمند کولر گازی با قابلیت کنترل از راه دور و برنامه‌ریزی برای سیستم‌های اتوماسیون خانگی.',
        technologies: ['IoT', 'خانه هوشمند', 'کنترل از راه دور', 'C++'],
        features: [
          'کنترل دمای از راه دور',
          'برنامه‌ریزی و اتوماسیون',
          'نظارت بر انرژی',
          'یکپارچه‌سازی با اپلیکیشن موبایل',
          'پشتیبانی از کنترل صوتی'
        ],
        year: '2022',
        category: 'خانه هوشمند'
      }
    },
    
    // Course details
    courseDetails: {
      beginner: {
        title: 'مبانی STM32 - دوره مقدماتی',
        description: 'دوره جامع مقدماتی STM32 که همه چیز را از عملیات پایه GPIO تا ویژگی‌های پیشرفته مانند DMA و Watchdog پوشش می‌دهد.',
        duration: '40 ساعت',
        level: 'مقدماتی',
        platform: 'STM32F4',
        modules: [
          'معرفی STM32 و ARM Cortex-M',
          'پیکربندی و کنترل GPIO',
          'مدیریت وقفه‌ها و استثناها',
          'تایمرها و تولید PWM',
          'عملیات ADC و DAC',
          'پروتکل‌های ارتباطی (UART, SPI, I2C)',
          'DMA و مدیریت حافظه',
          'Watchdog و مدیریت برق'
        ],
        prerequisites: ['دانش پایه برنامه‌نویسی C', 'درک مفاهیم سیستم‌های تعبیه‌شده'],
        outcomes: [
          'تسلط بر محیط توسعه STM32',
          'پیاده‌سازی رابط‌های مختلف جانبی',
          'توسعه برنامه‌های تعبیه‌شده کارآمد',
          'درک معماری ARM Cortex-M'
        ]
      },
      advanced: {
        title: 'توسعه پیشرفته STM32',
        description: 'دوره پیشرفته STM32 که FreeRTOS، مدیریت حافظه، تکنیک‌های بهینه‌سازی و طراحی سیستم‌های پیچیده را پوشش می‌دهد.',
        duration: '50 ساعت',
        level: 'پیشرفته',
        platform: 'STM32F4 با FreeRTOS',
        modules: [
          'مدیریت وظایف FreeRTOS',
          'مدیریت حافظه و بهینه‌سازی',
          'مدیریت پیشرفته وقفه‌ها',
          'طراحی سیستم‌های بلادرنگ',
          'استراتژی‌های مدیریت برق',
          'پروتکل‌های ارتباطی پیشرفته',
          'یکپارچه‌سازی و تست سیستم',
          'بهینه‌سازی عملکرد'
        ],
        prerequisites: ['دوره مبانی STM32', 'تجربه با سیستم‌های تعبیه‌شده'],
        outcomes: [
          'طراحی سیستم‌های بلادرنگ پیچیده',
          'پیاده‌سازی مدیریت حافظه کارآمد',
          'بهینه‌سازی عملکرد سیستم',
          'تسلط بر مفاهیم FreeRTOS'
        ]
      },
      bootloader: {
        title: 'Bootloader و OTA STM32',
        description: 'دوره تخصصی پیاده‌سازی bootloader و سیستم‌های به‌روزرسانی از راه دور برای میکروکنترلرهای STM32.',
        duration: '30 ساعت',
        level: 'متخصص',
        platform: 'Bootloader STM32F4',
        modules: [
          'معماری و طراحی Bootloader',
          'مدیریت حافظه Flash',
          'پیاده‌سازی به‌روزرسانی OTA',
          'امنیت و احراز هویت',
          'مدیریت خطا و بازیابی',
          'بهینه‌سازی توالی بوت',
          'یکپارچه‌سازی برنامه',
          'تست و اعتبارسنجی'
        ],
        prerequisites: ['دانش پیشرفته STM32', 'درک امنیت تعبیه‌شده'],
        outcomes: [
          'پیاده‌سازی bootloader سفارشی',
          'طراحی سیستم‌های OTA امن',
          'مدیریت شکست‌های به‌روزرسانی',
          'بهینه‌سازی عملکرد بوت'
        ]
      }
    }
  }
};

// Language toggle function
function toggleLanguage() {
  // Only allow language toggle on home page
  const main = document.querySelector('main');
  const isDetailPage = main.hasAttribute('data-original-content');
  
  if (isDetailPage) {
    return; // Don't allow language toggle on detail pages
  }
  
  currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';
  updateLanguage();
}

// Update language function
function updateLanguage() {
  const lang = translations[currentLanguage];
  
  // Update HTML attributes
  document.getElementById('htmlElement').lang = currentLanguage;
  document.getElementById('htmlElement').dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
  
  // Update page meta
  document.getElementById('pageTitle').textContent = lang.pageTitle;
  document.getElementById('pageDescription').content = lang.pageDescription;
  
  // Update brand name
  document.getElementById('brandName').textContent = lang.brandName;
  
  // Update navigation
  document.getElementById('navHome').textContent = lang.navHome;
  document.getElementById('navSkills').textContent = lang.navSkills;
  document.getElementById('navProjects').textContent = lang.navProjects;
  document.getElementById('navCourses').textContent = lang.navCourses;
  document.getElementById('navContact').textContent = lang.navContact;
  
  // Update hero section
  document.getElementById('heroTitle').textContent = lang.heroTitle;
  document.getElementById('heroSubtitle').textContent = lang.heroSubtitle;
  document.getElementById('heroDesc').textContent = lang.heroDesc;
  
   // Update Home section
   const homeTitle = document.getElementById('homeTitle');
   const homeContent = document.getElementById('homeContent');
   const yearsNum = document.getElementById('yearsNum');
   const yearsText = document.getElementById('yearsText');
   const projectsNum = document.getElementById('projectsNum');
   const projectsText = document.getElementById('projectsText');
   const domainsNum = document.getElementById('domainsNum');
   const domainsText = document.getElementById('domainsText');
   
   if (homeTitle) homeTitle.textContent = lang.HomeTitle;
   if (homeContent) homeContent.textContent = lang.HomeContent;
   if (yearsNum) yearsNum.textContent = lang.HomeHighlights.years;
   if (yearsText) yearsText.textContent = lang.HomeHighlights.yearsText;
   if (projectsNum) projectsNum.textContent = lang.HomeHighlights.projects;
   if (projectsText) projectsText.textContent = lang.HomeHighlights.projectsText;
   if (domainsNum) domainsNum.textContent = lang.HomeHighlights.domains;
   if (domainsText) domainsText.textContent = lang.HomeHighlights.domainsText;
  
  // Update skills section
  const skillsTitle = document.getElementById('skillsTitle');
  const programmingGroup = document.getElementById('programmingGroup');
  const platformsGroup = document.getElementById('platformsGroup');
  const toolsGroup = document.getElementById('toolsGroup');
  const protocolsGroup = document.getElementById('protocolsGroup');
  
  if (skillsTitle) skillsTitle.textContent = lang.skillsTitle;
  if (programmingGroup) programmingGroup.textContent = lang.skillGroups.programming;
  if (platformsGroup) platformsGroup.textContent = lang.skillGroups.platforms;
  if (toolsGroup) toolsGroup.textContent = lang.skillGroups.tools;
  if (protocolsGroup) protocolsGroup.textContent = lang.skillGroups.protocols;
  
  // Update projects section
  const projectsTitle = document.getElementById('projectsTitle');
  if (projectsTitle) projectsTitle.textContent = lang.projectsTitle;
  
  // Update project titles
  const projectTitle1 = document.getElementById('projectTitle1');
  const projectTitle2 = document.getElementById('projectTitle2');
  const projectTitle3 = document.getElementById('projectTitle3');
  const projectTitle4 = document.getElementById('projectTitle4');
  const projectTitle5 = document.getElementById('projectTitle5');
  const projectTitle6 = document.getElementById('projectTitle6');
  const projectTitle7 = document.getElementById('projectTitle7');
  
  if (projectTitle1) projectTitle1.textContent = lang.projectTitles.deepstitch;
  if (projectTitle2) projectTitle2.textContent = lang.projectTitles.microscope;
  if (projectTitle3) projectTitle3.textContent = lang.projectTitles.plasma;
  if (projectTitle4) projectTitle4.textContent = lang.projectTitles.dali;
  if (projectTitle5) projectTitle5.textContent = lang.projectTitles.poe;
  if (projectTitle6) projectTitle6.textContent = lang.projectTitles.ota;
  if (projectTitle7) projectTitle7.textContent = lang.projectTitles.ac;
  
  // Update courses section
  const coursesTitle = document.getElementById('coursesTitle');
  if (coursesTitle) coursesTitle.textContent = lang.coursesTitle;
  
  // Update course titles
  const courseTitle1 = document.getElementById('courseTitle1');
  const courseTitle2 = document.getElementById('courseTitle2');
  const courseTitle3 = document.getElementById('courseTitle3');
  
  if (courseTitle1) courseTitle1.textContent = lang.courseTitles.beginner;
  if (courseTitle2) courseTitle2.textContent = lang.courseTitles.advanced;
  if (courseTitle3) courseTitle3.textContent = lang.courseTitles.bootloader;
  
  // Update contact section
  const contactTitle = document.getElementById('contactTitle');
  if (contactTitle) contactTitle.textContent = lang.contactTitle;
  
  // Update language toggle button
  const langToggle = document.getElementById('langToggle');
  langToggle.textContent = currentLanguage === 'en' ? 'فا' : 'EN';
  langToggle.title = currentLanguage === 'en' ? 'Switch to Farsi' : 'Switch to English';
  
  // Update close button
  document.getElementById('closeBtn').ariaLabel = currentLanguage === 'en' ? 'Close menu' : 'بستن منو';
  
  // Update menu button
  document.getElementById('menuBtn').ariaLabel = currentLanguage === 'en' ? 'Menu' : 'منو';
}

// Mobile menu functionality
function toggleMobileMenu() {
  const navlinks = document.getElementById('navlinks');
  navlinks.classList.toggle('active');
}

function closeMobileMenu() {
  const navlinks = document.getElementById('navlinks');
  navlinks.classList.remove('active');
}

// Show project detail page
function showProjectDetail(projectId) {
  const lang = translations[currentLanguage];
  const project = lang.projectDetails[projectId];
  
  if (!project) return;
  
  // Store current detail page info
  currentDetailPage.type = 'project';
  currentDetailPage.id = projectId;
  
  // Hide main content and show project detail
  const main = document.querySelector('main');
  const originalContent = main.innerHTML;
  
  // Store original content for restoration
  main.setAttribute('data-original-content', originalContent);
  
  // Hide language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.style.display = 'none';
  }
  
  main.innerHTML = `
    <div class="container">
      <div class="project-detail">
        <div class="project-header">
          <h1>${project.title}</h1>
          <div class="project-meta">
            <span class="year">${project.year}</span>
            <span class="category">${project.category}</span>
          </div>
        </div>
        
        <div class="project-content">
          <div class="project-description">
            <h2>${currentLanguage === 'en' ? 'Description' : 'توضیحات'}</h2>
            <p>${project.description}</p>
          </div>
          
          <div class="project-technologies">
            <h2>${currentLanguage === 'en' ? 'Technologies' : 'فناوری‌ها'}</h2>
            <div class="tech-tags">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
          
          <div class="project-features">
            <h2>${currentLanguage === 'en' ? 'Key Features' : 'ویژگی‌های کلیدی'}</h2>
            <ul>
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Update page title
  document.getElementById('pageTitle').textContent = `${project.title} - ${lang.pageTitle}`;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show course detail page
function showCourseDetail(courseId) {
  const lang = translations[currentLanguage];
  const course = lang.courseDetails[courseId];
  
  if (!course) return;
  
  // Store current detail page info
  currentDetailPage.type = 'course';
  currentDetailPage.id = courseId;
  
  // Hide main content and show course detail
  const main = document.querySelector('main');
  const originalContent = main.innerHTML;
  
  // Store original content for restoration
  main.setAttribute('data-original-content', originalContent);
  
  // Hide language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.style.display = 'none';
  }
  
  main.innerHTML = `
    <div class="container">
      <div class="course-detail">
        <div class="course-header">
          <h1>${course.title}</h1>
          <div class="course-meta">
            <span class="duration">${course.duration}</span>
            <span class="level">${course.level}</span>
            <span class="platform">${course.platform}</span>
          </div>
        </div>
        
        <div class="course-content">
          <div class="course-description">
            <h2>${currentLanguage === 'en' ? 'Description' : 'توضیحات'}</h2>
            <p>${course.description}</p>
          </div>
          
          <div class="course-modules">
            <h2>${currentLanguage === 'en' ? 'Course Modules' : 'سرفصل‌های دوره'}</h2>
            <ul>
              ${course.modules.map(module => `<li>${module}</li>`).join('')}
            </ul>
          </div>
          
          <div class="course-prerequisites">
            <h2>${currentLanguage === 'en' ? 'Prerequisites' : 'پیش‌نیازها'}</h2>
            <ul>
              ${course.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
            </ul>
          </div>
          
          <div class="course-outcomes">
            <h2>${currentLanguage === 'en' ? 'Learning Outcomes' : 'نتایج یادگیری'}</h2>
            <ul>
              ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Update page title
  document.getElementById('pageTitle').textContent = `${course.title} - ${lang.pageTitle}`;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Show home page
function showHomePage() {
  const main = document.querySelector('main');
  const originalContent = main.getAttribute('data-original-content');
  
  if (originalContent) {
    main.innerHTML = originalContent;
    main.removeAttribute('data-original-content');
    
    // Clear current detail page info
    currentDetailPage.type = null;
    currentDetailPage.id = null;
    
    // Show language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.style.display = 'block';
    }
    
    // Update page title
    const lang = translations[currentLanguage];
    document.getElementById('pageTitle').textContent = lang.pageTitle;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-initialize skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill .bar span');
          progressBars.forEach(bar => {
            const width = bar.style.getPropertyValue('--val');
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    });
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  } else {
    location.reload();
  }
}

// Initialize navigation functionality
let navigationInitialized = false;

function initializeNavigation() {
  if (navigationInitialized) return;
  navigationInitialized = true;
  
  // Use event delegation for navigation links
  document.addEventListener('click', function(e) {
    // Check if clicked element is a navigation link
    if (e.target.matches('.navlinks a')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        
        // Check if we're in a detail page
        const main = document.querySelector('main');
        const isDetailPage = main.hasAttribute('data-original-content');
        
        if (isDetailPage) {
          // If in detail page, go back to home first
          showHomePage();
          // Then scroll to target after a short delay
          setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          // If in home page, just scroll to target
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    }
    
    // Check if clicked element is menu button
    if (e.target.matches('#menuBtn')) {
      toggleMobileMenu();
    }
    
    // Check if clicked element is close button
    if (e.target.matches('#closeBtn')) {
      closeMobileMenu();
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation
  initializeNavigation();
  
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Language toggle event listener
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  

  // Skill bars animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill .bar span');
        progressBars.forEach(bar => {
          const width = bar.style.getPropertyValue('--val');
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  });

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});