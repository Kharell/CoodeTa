// Loading Screen Animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 3000);
});

// FAQ Toggle Function
function toggleFAQ(id) {
    const answer = document.getElementById('answer-' + id);
    const icon = document.getElementById('icon-' + id);
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.textContent = '−';
    } else {
        answer.classList.add('hidden');
        icon.textContent = '+';
    }
}

// Smooth Scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Get actual navbar height dynamically
            const navbar = document.querySelector('nav');
            let navbarHeight = navbar ? navbar.offsetHeight : 88;
            
            // Adjust for mobile - MAKSIMAL RAPAT
            if (window.innerWidth <= 768) {
                navbarHeight = 52; // Maksimal rapat untuk mobile
            }
            if (window.innerWidth <= 480) {
                navbarHeight = 50; // Maksimal rapat untuk extra small
            }
            
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Close mobile menu when clicking menu items
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Update icon based on mode
function updateDarkModeIcon() {
    const sunIcon = `
        <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
    `;
    
    const moonIcon = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    `;
    
    // Update desktop icon
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDarkMode ? sunIcon : moonIcon;
    }
    
    // Update mobile icon
    const mobileDarkModeIcon = document.getElementById('mobileDarkModeIcon');
    if (mobileDarkModeIcon) {
        mobileDarkModeIcon.innerHTML = isDarkMode ? sunIcon : moonIcon;
    }
}

// Apply dark mode on page load
function applyDarkMode() {
    const body = document.body;
    
    if (isDarkMode) {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#e5e5e5';
        
        // Update all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.backgroundColor = '#2d2d2d';
        });
        
        // Update specific gradient sections
        document.querySelectorAll('.bg-gradient-to-br').forEach(section => {
            section.style.background = 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)';
        });
        
        // Update navbar
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.backgroundColor = '#2d2d2d';
            nav.style.borderBottom = '1px solid #404040';
        }
        
        // Update all text colors
        document.querySelectorAll('.text-gray-800, .text-gray-700, h1, h2, h3, h4').forEach(el => {
            el.style.color = '#e5e5e5';
        });
        
        document.querySelectorAll('.text-gray-600, .text-gray-500, p').forEach(el => {
            if (!el.classList.contains('text-blue-600') && !el.classList.contains('text-orange-600')) {
                el.style.color = '#b0b0b0';
            }
        });
        
        // Update all white backgrounds
        document.querySelectorAll('.bg-white').forEach(card => {
            card.style.backgroundColor = '#2d2d2d';
            card.style.borderColor = '#404040';
        });
        
        // Update gray backgrounds
        document.querySelectorAll('.bg-gray-50, .bg-gray-100').forEach(el => {
            el.style.backgroundColor = '#1a1a1a';
        });
        
        // Update FAQ items
        document.querySelectorAll('#faq .bg-gray-50').forEach(el => {
            el.style.backgroundColor = '#2d2d2d';
        });
        
        // Update Portfolio cards (gray background)
        document.querySelectorAll('#portfolio .bg-gray-100').forEach(card => {
            card.style.backgroundColor = '#2d2d2d';
        });
        
        // Update Portfolio card gradients
        document.querySelectorAll('#portfolio .bg-gradient-to-br').forEach(gradient => {
            gradient.style.background = 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)';
        });
        
        // Update Process section - Web (blue gradient)
        document.querySelectorAll('.from-blue-50').forEach(card => {
            card.style.background = 'linear-gradient(to bottom right, #1e3a5f, #2d2d2d)';
        });
        
        // Update Process section - Design (purple gradient)
        document.querySelectorAll('.from-purple-50').forEach(card => {
            card.style.background = 'linear-gradient(to bottom right, #4a1e5f, #2d2d2d)';
        });
        
        // Update footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.backgroundColor = '#0a0a0a';
        }
        
        // Update mobile menu
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.style.backgroundColor = '#2d2d2d';
        }
        
    } else {
        // Reset to light mode
        body.style.backgroundColor = '';
        body.style.color = '';
        
        document.querySelectorAll('section').forEach(section => {
            section.style.backgroundColor = '';
            section.style.background = '';
        });
        
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.backgroundColor = '';
            nav.style.borderBottom = '';
        }
        
        document.querySelectorAll('.text-gray-800, .text-gray-700, .text-gray-600, .text-gray-500, h1, h2, h3, h4, p').forEach(el => {
            el.style.color = '';
        });
        
        document.querySelectorAll('.bg-white, .bg-gray-50, .bg-gray-100').forEach(card => {
            card.style.backgroundColor = '';
            card.style.borderColor = '';
        });
        
        // Reset Portfolio cards
        document.querySelectorAll('#portfolio .bg-gray-100').forEach(card => {
            card.style.backgroundColor = '';
        });
        
        document.querySelectorAll('#portfolio .bg-gradient-to-br').forEach(gradient => {
            gradient.style.background = '';
        });
        
        // Reset Process section cards
        document.querySelectorAll('.from-blue-50').forEach(card => {
            card.style.background = '';
        });
        
        document.querySelectorAll('.from-purple-50').forEach(card => {
            card.style.background = '';
        });
        
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.backgroundColor = '';
        }
        
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.style.backgroundColor = '';
        }
    }
    
    updateDarkModeIcon();
}

// Apply on page load
applyDarkMode();

// Toggle dark mode function
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    applyDarkMode();
}

// Desktop dark mode toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Mobile dark mode toggle
const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
if (mobileDarkModeToggle) {
    mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
}

// Portfolio slide-in animation from left to right
const portfolioObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100); // Delay bertahap untuk setiap item
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Observe portfolio items
document.querySelectorAll('#portfolioCarousel > div').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease-out';
    portfolioObserver.observe(item);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Language Switcher
let currentLang = localStorage.getItem('language') || 'id';

const translations = {
    id: {
        // Navbar
        home: 'Home',
        services: 'Layanan',
        features: 'Keunggulan',
        portfolio: 'Portfolio',
        pricing: 'Harga',
        faq: 'FAQ',
        
        // Portfolio Section Details
        portfolioTitle: 'Portfolio Kami',
        portfolioWebTitle: 'Portfolio Web',
        portfolioDesignTitle: 'Portfolio Desain',
        portfolio1Title: 'E-Commerce Store',
        portfolio1Desc: 'Toko online dengan sistem pembayaran terintegrasi.',
        portfolio2Title: 'Mobile App Landing',
        portfolio2Desc: 'Landing page untuk promosi aplikasi mobile.',
        portfolio3Title: 'Hotel Booking System',
        portfolio3Desc: 'Sistem reservasi hotel dengan dashboard admin.',
        portfolio4Title: 'Logo Branding',
        portfolio4Desc: 'Desain logo profesional untuk identitas brand.',
        portfolio5Title: 'Banner & Pamflet',
        portfolio5Desc: 'Desain promosi untuk media cetak dan digital.',
        portfolio6Title: 'Sablon Kaos',
        portfolio6Desc: 'Desain custom untuk sablon kaos dan merchandise.',
        
        // Hero Section
        heroTitle: 'Jasa Pembuatan Website Profesional',
        heroDesc1: 'Bangun website profesional Anda hari ini bersama',
        heroDesc2: 'KODE nya KITA Bersama',
        heroDesc3: 'Kami siap membantu mewujudkan website',
        heroDesc4: 'modern, cepat, dan terjangkau',
        heroDesc5: 'untuk bisnis Anda.',
        heroDesc6: 'Tidak hanya website, kami juga menyediakan',
        heroDesc7: 'Jasa Desain Grafis',
        heroDesc8: 'untuk kebutuhan branding Anda! Mulai dari',
        heroDesc9: 'desain logo, banner, pamflet, hingga sablon kaos',
        heroDesc10: 'semua dikerjakan dengan',
        heroDesc11: 'kreatif dan profesional',
        heroDesc12: 'Jangan tunda lagi, konsultasi',
        heroDesc13: 'GRATIS',
        heroDesc14: 'hanya dengan sekali klik! Mulai dari ide hingga website Anda online,',
        heroDesc15: 'semua bisa kami tangani tanpa ribet',
        heroDesc16: 'Hubungi kami sekarang',
        heroDesc17: 'dan wujudkan website impian Anda!',
        heroCTA: 'Pesan Sekarang via WhatsApp',
        
        // Services Section
        servicesTitle: 'Layanan Kami',
        service1Title: 'Website Company Profile',
        service1Desc: 'Website profesional untuk memperkenalkan perusahaan Anda ke dunia digital.',
        service2Title: 'Website Portofolio',
        service2Desc: 'Tampilkan karya terbaik Anda dengan desain yang menarik dan modern.',
        service3Title: 'Website UMKM / Landing Page',
        service3Desc: 'Solusi website untuk UMKM dengan harga terjangkau dan fitur lengkap.',
        service4Title: 'Web App Custom',
        service4Desc: 'Aplikasi web sesuai kebutuhan bisnis Anda dengan fitur khusus.',
        service5Title: 'Desain UI/UX',
        service5Desc: 'Desain antarmuka yang user-friendly dan estetik untuk website Anda.',
        service6Title: 'Desain Grafis',
        service6Desc: 'Melayani desain logo, banner dan pamflet, sablon kaos, spanduk untuk kebutuhan branding Anda.',
        
        // Features Section
        featuresTitle: 'Keunggulan Code Ta',
        feature1Title: 'Harga Terjangkau',
        feature1Desc: 'Paket harga yang fleksibel sesuai budget Anda tanpa mengurangi kualitas.',
        feature2Title: 'Pengerjaan Cepat',
        feature2Desc: 'Website Anda siap dalam waktu singkat tanpa mengorbankan kualitas.',
        feature3Title: 'Desain Modern Responsif',
        feature3Desc: 'Tampilan optimal di semua perangkat, dari desktop hingga smartphone.',
        feature4Title: 'After-service Support',
        feature4Desc: 'Dukungan teknis setelah website online untuk memastikan kelancaran.',
        feature5Title: 'Gratis Domain & Hosting',
        feature5Desc: 'Bonus domain dan hosting untuk paket tertentu (syarat & ketentuan berlaku).',
        feature6Title: 'Desain Kreatif & Profesional',
        feature6Desc: 'Tim desainer berpengalaman siap mewujudkan identitas visual brand Anda dengan hasil berkualitas tinggi.',
        
        // Pricing Section
        pricingTitle: 'Paket Harga',
        promoText: 'Paket Promo Tersedia!',
        promoDesc1: 'Segera hubungi admin untuk mendapatkan harga promo spesial',
        promoDesc2: 'Atau ingin',
        promoDesc3: 'REQUEST',
        promoDesc4: 'harga 😊',
        promoCTA: 'Tanya Promo Sekarang',
        webPackagesTitle: 'Paket Website',
        designPackagesTitle: 'Paket Desain Grafis',
        selectPackage: 'Pilih Paket',
        askPrice: 'Tanya Harga',
        comingSoon: 'Coming Soon',
        popularBadge: 'POPULER',
        recommendedBadge: 'REKOMENDASI',
        
        // Package Names
        basicPackage: 'Basic',
        standardPackage: 'Standard',
        premiumPackage: 'Premium',
        designBasicPackage: 'Desain Basic',
        designPremiumPackage: 'Desain Premium',
        
        // Basic Package Features
        basicFeature1: 'Landing Page / UMKM',
        basicFeature2: 'Desain Responsif',
        basicFeature3: 'Maksimal 5 Halaman',
        basicFeature4: 'Gratis Revisi 1x',
        basicFeature5: 'Pengerjaan 7-10 Hari',
        basicFeature6: 'Support 1 Bulan',
        
        // Standard Package Features
        standardFeature1: 'Company Profile / Portfolio',
        standardFeature2: 'Desain Responsif Premium',
        standardFeature3: 'Maksimal 10 Halaman',
        standardFeature4: 'Gratis Revisi 2x',
        standardFeature5: 'Pengerjaan 10-14 Hari',
        standardFeature6: 'Support 3 Bulan',
        standardFeature7: 'Gratis Domain .com (1 tahun)',
        standardFeature8: 'SEO Basic',
        
        // Premium Package Features
        premiumFeature1: 'Web App Custom',
        premiumFeature2: 'Desain UI/UX Custom',
        premiumFeature3: 'Halaman Unlimited',
        premiumFeature4: 'Gratis Revisi 3x',
        premiumFeature5: 'Pengerjaan Sesuai Kompleksitas',
        premiumFeature6: 'Support 6 Bulan',
        premiumFeature7: 'Gratis Domain & Hosting (1 tahun)',
        premiumFeature8: 'SEO Advanced',
        premiumFeature9: 'Database & Backend',
        
        // Design Basic Package Features
        designBasicFeature1: 'Desain Logo (2 Konsep)',
        designBasicFeature2: 'Banner / Pamflet (1 Desain)',
        designBasicFeature3: 'File PNG & JPG',
        designBasicFeature4: 'Revisi 2x',
        designBasicFeature5: 'Pengerjaan 3-5 Hari',
        
        // Design Premium Package Features
        designPremiumFeature1: 'Desain Logo (5 Konsep)',
        designPremiumFeature2: 'Banner, Pamflet, Spanduk',
        designPremiumFeature3: 'Desain Sablon Kaos',
        designPremiumFeature4: 'File PNG, JPG, PDF, AI',
        designPremiumFeature5: 'Revisi Unlimited',
        designPremiumFeature6: 'Pengerjaan 5-7 Hari',
        designPremiumFeature7: 'Brand Guidelines',
        
        // Process Section
        processTitle: 'Proses Pengerjaan',
        processWebTitle: 'Proses Pembuatan Website',
        processDesignTitle: 'Proses Desain Grafis',
        processWeb1Title: 'Hubungi via WhatsApp',
        processWeb1Desc: 'Ceritakan kebutuhan website Anda.',
        processWeb2Title: 'Diskusi Kebutuhan',
        processWeb2Desc: 'Diskusi detail fitur, desain, dan timeline.',
        processWeb3Title: 'Buat Mockup',
        processWeb3Desc: 'Mockup desain untuk persetujuan Anda.',
        processWeb4Title: 'Development',
        processWeb4Desc: 'Tim developer mulai coding website.',
        processWeb5Title: 'Revisi',
        processWeb5Desc: 'Revisi sesuai paket yang dipilih.',
        processWeb6Title: 'Website Online',
        processWeb6Desc: 'Website siap diakses publik!',
        processDesign1Title: 'Konsultasi Desain',
        processDesign1Desc: 'Sampaikan konsep dan ide desain Anda.',
        processDesign2Title: 'Brief & Riset',
        processDesign2Desc: 'Riset target audience dan kompetitor.',
        processDesign3Title: 'Sketsa Konsep',
        processDesign3Desc: 'Buat sketsa awal untuk approval.',
        processDesign4Title: 'Desain Final',
        processDesign4Desc: 'Eksekusi desain dengan detail lengkap.',
        processDesign5Title: 'Revisi',
        processDesign5Desc: 'Penyesuaian sesuai feedback Anda.',
        processDesign6Title: 'File Siap Pakai',
        processDesign6Desc: 'Terima file dalam berbagai format!',
        
        // Testimonials Section
        testimonialsTitle: 'Testimoni Klien',
        
        // FAQ Section
        faqTitle: 'Pertanyaan Umum (FAQ)',
        faq1Q: 'Berapa lama proses pembuatan website?',
        faq1A: 'Tergantung paket yang dipilih. Paket Basic 7-10 hari, Standard 10-14 hari, dan Premium disesuaikan dengan kompleksitas proyek.',
        faq2Q: 'Apakah bisa request fitur khusus?',
        faq2A: 'Tentu! Kami menerima request fitur khusus terutama untuk paket Premium. Silakan diskusikan kebutuhan Anda dengan tim kami.',
        faq3Q: 'Apakah website bisa diupdate sendiri?',
        faq3A: 'Ya, kami bisa buatkan website dengan CMS (Content Management System) sehingga Anda bisa update konten sendiri tanpa coding.',
        faq4Q: 'Bagaimana sistem pembayaran?',
        faq4A: 'Pembayaran bisa dilakukan dengan sistem DP 50% di awal dan pelunasan 50% setelah website selesai. Kami terima transfer bank dan e-wallet.',
        faq5Q: 'Apakah ada garansi?',
        faq5A: 'Ya, kami memberikan garansi bug fixing dan support sesuai dengan paket yang Anda pilih (1-6 bulan).',
        
        // CTA Section
        ctaTitle: 'Siap Buat Website Impianmu?',
        ctaDesc: 'Konsultasi Gratis! Hubungi kami sekarang dan wujudkan website profesional untuk bisnis Anda.',
        ctaCTA: 'Hubungi via WhatsApp',
        
        // Footer
        footerAboutDesc: 'Kode Ta Bersama - Solusi Website Modern, Cepat, dan Terjangkau',
        footerNavigation: 'Navigasi',
        footerServices: 'Layanan',
        footerSocialMedia: 'Social Media',
        footerService1: 'Company Profile',
        footerService2: 'Portfolio Website',
        footerService3: 'UMKM / Landing Page',
        footerService4: 'Web App Custom',
        footerService5: 'UI/UX Design',
        footerRights: 'All rights reserved.',
        
        // Back to Top
        backToTop: 'Kembali ke Atas'
    },
    en: {
        // Navbar
        home: 'Home',
        services: 'Services',
        features: 'Features',
        portfolio: 'Portfolio',
        pricing: 'Pricing',
        faq: 'FAQ',
        
        // Portfolio Section Details
        portfolioTitle: 'Our Portfolio',
        portfolioWebTitle: 'Web Portfolio',
        portfolioDesignTitle: 'Design Portfolio',
        portfolio1Title: 'E-Commerce Store',
        portfolio1Desc: 'Online store with integrated payment system.',
        portfolio2Title: 'Mobile App Landing',
        portfolio2Desc: 'Landing page for mobile app promotion.',
        portfolio3Title: 'Hotel Booking System',
        portfolio3Desc: 'Hotel reservation system with admin dashboard.',
        portfolio4Title: 'Logo Branding',
        portfolio4Desc: 'Professional logo design for brand identity.',
        portfolio5Title: 'Banner & Flyer',
        portfolio5Desc: 'Promotional design for print and digital media.',
        portfolio6Title: 'T-Shirt Printing',
        portfolio6Desc: 'Custom design for t-shirt printing and merchandise.',
        
        // Hero Section
        heroTitle: 'Professional Website Development Services',
        heroDesc1: 'Build your professional website today with',
        heroDesc2: 'CODE Together with US',
        heroDesc3: 'We are ready to help you create a',
        heroDesc4: 'modern, fast, and affordable',
        heroDesc5: 'website for your business.',
        heroDesc6: 'Not just websites, we also provide',
        heroDesc7: 'Graphic Design Services',
        heroDesc8: 'for your branding needs! From',
        heroDesc9: 'logo design, banners, flyers, to t-shirt printing',
        heroDesc10: 'all done with',
        heroDesc11: 'creativity and professionalism',
        heroDesc12: 'Don\'t wait any longer, get a',
        heroDesc13: 'FREE',
        heroDesc14: 'consultation with just one click! From idea to your website going live,',
        heroDesc15: 'we can handle everything hassle-free',
        heroDesc16: 'Contact us now',
        heroDesc17: 'and bring your dream website to life!',
        heroCTA: 'Order Now via WhatsApp',
        
        // Services Section
        servicesTitle: 'Our Services',
        service1Title: 'Company Profile Website',
        service1Desc: 'Professional website to introduce your company to the digital world.',
        service2Title: 'Portfolio Website',
        service2Desc: 'Showcase your best work with attractive and modern design.',
        service3Title: 'SME Website / Landing Page',
        service3Desc: 'Website solution for SMEs with affordable prices and complete features.',
        service4Title: 'Custom Web App',
        service4Desc: 'Web application tailored to your business needs with special features.',
        service5Title: 'UI/UX Design',
        service5Desc: 'User-friendly and aesthetic interface design for your website.',
        service6Title: 'Graphic Design',
        service6Desc: 'We provide logo design, banners and flyers, t-shirt printing, banners for your branding needs.',
        
        // Features Section
        featuresTitle: 'Code Ta Advantages',
        feature1Title: 'Affordable Prices',
        feature1Desc: 'Flexible pricing packages according to your budget without compromising quality.',
        feature2Title: 'Fast Delivery',
        feature2Desc: 'Your website ready in a short time without sacrificing quality.',
        feature3Title: 'Modern Responsive Design',
        feature3Desc: 'Optimal display on all devices, from desktop to smartphone.',
        feature4Title: 'After-service Support',
        feature4Desc: 'Technical support after website goes live to ensure smooth operation.',
        feature5Title: 'Free Domain & Hosting',
        feature5Desc: 'Bonus domain and hosting for certain packages (terms & conditions apply).',
        feature6Title: 'Creative & Professional Design',
        feature6Desc: 'Experienced design team ready to realize your brand visual identity with high-quality results.',
        
        // Pricing Section
        pricingTitle: 'Pricing Packages',
        promoText: 'Promo Packages Available!',
        promoDesc1: 'Contact admin immediately to get special promo prices',
        promoDesc2: 'Or want to',
        promoDesc3: 'REQUEST',
        promoDesc4: 'a price 😊',
        promoCTA: 'Ask About Promo Now',
        webPackagesTitle: 'Website Packages',
        designPackagesTitle: 'Graphic Design Packages',
        selectPackage: 'Select Package',
        askPrice: 'Ask Price',
        comingSoon: 'Coming Soon',
        popularBadge: 'POPULAR',
        recommendedBadge: 'RECOMMENDED',
        
        // Package Names
        basicPackage: 'Basic',
        standardPackage: 'Standard',
        premiumPackage: 'Premium',
        designBasicPackage: 'Design Basic',
        designPremiumPackage: 'Design Premium',
        
        // Basic Package Features
        basicFeature1: 'Landing Page / SME',
        basicFeature2: 'Responsive Design',
        basicFeature3: 'Maximum 5 Pages',
        basicFeature4: 'Free 1x Revision',
        basicFeature5: 'Completion 7-10 Days',
        basicFeature6: '1 Month Support',
        
        // Standard Package Features
        standardFeature1: 'Company Profile / Portfolio',
        standardFeature2: 'Premium Responsive Design',
        standardFeature3: 'Maximum 10 Pages',
        standardFeature4: 'Free 2x Revisions',
        standardFeature5: 'Completion 10-14 Days',
        standardFeature6: '3 Months Support',
        standardFeature7: 'Free .com Domain (1 year)',
        standardFeature8: 'Basic SEO',
        
        // Premium Package Features
        premiumFeature1: 'Custom Web App',
        premiumFeature2: 'Custom UI/UX Design',
        premiumFeature3: 'Unlimited Pages',
        premiumFeature4: 'Free 3x Revisions',
        premiumFeature5: 'Completion Based on Complexity',
        premiumFeature6: '6 Months Support',
        premiumFeature7: 'Free Domain & Hosting (1 year)',
        premiumFeature8: 'Advanced SEO',
        premiumFeature9: 'Database & Backend',
        
        // Design Basic Package Features
        designBasicFeature1: 'Logo Design (2 Concepts)',
        designBasicFeature2: 'Banner / Flyer (1 Design)',
        designBasicFeature3: 'PNG & JPG Files',
        designBasicFeature4: '2x Revisions',
        designBasicFeature5: 'Completion 3-5 Days',
        
        // Design Premium Package Features
        designPremiumFeature1: 'Logo Design (5 Concepts)',
        designPremiumFeature2: 'Banner, Flyer, Signage',
        designPremiumFeature3: 'T-Shirt Printing Design',
        designPremiumFeature4: 'PNG, JPG, PDF, AI Files',
        designPremiumFeature5: 'Unlimited Revisions',
        designPremiumFeature6: 'Completion 5-7 Days',
        designPremiumFeature7: 'Brand Guidelines',
        
        // Process Section
        processTitle: 'Work Process',
        processWebTitle: 'Website Development Process',
        processDesignTitle: 'Graphic Design Process',
        processWeb1Title: 'Contact via WhatsApp',
        processWeb1Desc: 'Tell us your website needs.',
        processWeb2Title: 'Requirements Discussion',
        processWeb2Desc: 'Discuss features, design, and timeline details.',
        processWeb3Title: 'Create Mockup',
        processWeb3Desc: 'Design mockup for your approval.',
        processWeb4Title: 'Development',
        processWeb4Desc: 'Developer team starts coding the website.',
        processWeb5Title: 'Revision',
        processWeb5Desc: 'Revisions according to selected package.',
        processWeb6Title: 'Website Live',
        processWeb6Desc: 'Website ready to be accessed publicly!',
        processDesign1Title: 'Design Consultation',
        processDesign1Desc: 'Share your design concept and ideas.',
        processDesign2Title: 'Brief & Research',
        processDesign2Desc: 'Research target audience and competitors.',
        processDesign3Title: 'Concept Sketch',
        processDesign3Desc: 'Create initial sketch for approval.',
        processDesign4Title: 'Final Design',
        processDesign4Desc: 'Execute design with complete details.',
        processDesign5Title: 'Revision',
        processDesign5Desc: 'Adjustments based on your feedback.',
        processDesign6Title: 'Ready-to-Use Files',
        processDesign6Desc: 'Receive files in various formats!',
        
        // Testimonials Section
        testimonialsTitle: 'Client Testimonials',
        
        // FAQ Section
        faqTitle: 'Frequently Asked Questions (FAQ)',
        faq1Q: 'How long does the website development process take?',
        faq1A: 'Depends on the selected package. Basic package 7-10 days, Standard 10-14 days, and Premium adjusted to project complexity.',
        faq2Q: 'Can I request special features?',
        faq2A: 'Of course! We accept special feature requests especially for Premium packages. Please discuss your needs with our team.',
        faq3Q: 'Can the website be updated by myself?',
        faq3A: 'Yes, we can create a website with CMS (Content Management System) so you can update content yourself without coding.',
        faq4Q: 'How is the payment system?',
        faq4A: 'Payment can be made with a 50% down payment at the beginning and 50% settlement after the website is completed. We accept bank transfers and e-wallets.',
        faq5Q: 'Is there a warranty?',
        faq5A: 'Yes, we provide bug fixing warranty and support according to the package you choose (1-6 months).',
        
        // CTA Section
        ctaTitle: 'Ready to Build Your Dream Website?',
        ctaDesc: 'Free Consultation! Contact us now and create a professional website for your business.',
        ctaCTA: 'Contact via WhatsApp',
        
        // Footer
        footerAboutDesc: 'Code Together - Modern, Fast, and Affordable Website Solutions',
        footerNavigation: 'Navigation',
        footerServices: 'Services',
        footerSocialMedia: 'Social Media',
        footerService1: 'Company Profile',
        footerService2: 'Portfolio Website',
        footerService3: 'SME / Landing Page',
        footerService4: 'Custom Web App',
        footerService5: 'UI/UX Design',
        footerRights: 'All rights reserved.',
        
        // Back to Top
        backToTop: 'Back to Top'
    }
};

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    const t = translations[lang];
    
    // Update navbar
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks[0].textContent = t.home;
    navLinks[1].textContent = t.services;
    navLinks[2].textContent = t.features;
    navLinks[3].textContent = t.portfolio;
    navLinks[4].textContent = t.pricing;
    navLinks[5].textContent = t.faq;
    
    // Update mobile menu
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks[0].textContent = t.home;
    mobileLinks[1].textContent = t.services;
    mobileLinks[2].textContent = t.features;
    mobileLinks[3].textContent = t.portfolio;
    mobileLinks[4].textContent = t.pricing;
    mobileLinks[5].textContent = t.faq;
    
    // Update Hero Section
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    
    const heroDesc = document.querySelector('#home p');
    if (heroDesc) {
        heroDesc.innerHTML = `
            ${t.heroDesc1} <span class="font-bold text-blue-600">Code Ta</span> — <span class="font-bold">${t.heroDesc2}</span>. 
            ${t.heroDesc3} <span class="font-semibold">${t.heroDesc4}</span> ${t.heroDesc5}
            <br><br>
            ${t.heroDesc6} <span class="font-bold text-purple-600">${t.heroDesc7}</span> ${t.heroDesc8} 
            <span class="font-semibold">${t.heroDesc9}</span> — <span class="font-semibold">${t.heroDesc10}</span> ${t.heroDesc11}.
            <br><br>
            ${t.heroDesc12} <span class="font-bold text-orange-600">${t.heroDesc13}</span> ${t.heroDesc14} 
            <span class="font-semibold">${t.heroDesc15}</span>.
            <br><br>
            <span class="font-bold">${t.heroDesc16}</span> ${t.heroDesc17}
        `;
    }
    
    const heroCTA = document.querySelector('#home a.bg-blue-600');
    if (heroCTA) heroCTA.textContent = t.heroCTA;
    
    // Update Services Section
    const servicesTitle = document.querySelector('#layanan h2');
    if (servicesTitle) servicesTitle.textContent = t.servicesTitle;
    
    const serviceCards = document.querySelectorAll('#layanan .grid > div');
    if (serviceCards.length >= 6) {
        serviceCards[0].querySelector('h3').textContent = t.service1Title;
        serviceCards[0].querySelector('p').textContent = t.service1Desc;
        serviceCards[1].querySelector('h3').textContent = t.service2Title;
        serviceCards[1].querySelector('p').textContent = t.service2Desc;
        serviceCards[2].querySelector('h3').textContent = t.service3Title;
        serviceCards[2].querySelector('p').textContent = t.service3Desc;
        serviceCards[3].querySelector('h3').textContent = t.service4Title;
        serviceCards[3].querySelector('p').textContent = t.service4Desc;
        serviceCards[4].querySelector('h3').textContent = t.service5Title;
        serviceCards[4].querySelector('p').textContent = t.service5Desc;
        serviceCards[5].querySelector('h3').textContent = t.service6Title;
        serviceCards[5].querySelector('p').textContent = t.service6Desc;
    }
    
    // Update Features Section
    const featuresTitle = document.querySelector('#keunggulan h2');
    if (featuresTitle) featuresTitle.textContent = t.featuresTitle;
    
    const featureCards = document.querySelectorAll('#keunggulan .grid > div');
    if (featureCards.length >= 6) {
        featureCards[0].querySelector('h3').textContent = t.feature1Title;
        featureCards[0].querySelector('p').textContent = t.feature1Desc;
        featureCards[1].querySelector('h3').textContent = t.feature2Title;
        featureCards[1].querySelector('p').textContent = t.feature2Desc;
        featureCards[2].querySelector('h3').textContent = t.feature3Title;
        featureCards[2].querySelector('p').textContent = t.feature3Desc;
        featureCards[3].querySelector('h3').textContent = t.feature4Title;
        featureCards[3].querySelector('p').textContent = t.feature4Desc;
        featureCards[4].querySelector('h3').textContent = t.feature5Title;
        featureCards[4].querySelector('p').textContent = t.feature5Desc;
        featureCards[5].querySelector('h3').textContent = t.feature6Title;
        featureCards[5].querySelector('p').textContent = t.feature6Desc;
    }
    
    // Update Portfolio Section
    const portfolioTitle = document.querySelector('#portfolio h2');
    if (portfolioTitle) portfolioTitle.textContent = t.portfolioTitle;
    
    // Update Portfolio Web Title
    const portfolioWebH3 = document.querySelector('#portfolio .mb-16 h3');
    if (portfolioWebH3) {
        const iconSpan = portfolioWebH3.querySelector('span');
        portfolioWebH3.innerHTML = '';
        if (iconSpan) portfolioWebH3.appendChild(iconSpan);
        portfolioWebH3.appendChild(document.createTextNode(t.portfolioWebTitle));
    }
    
    // Update Portfolio Design Title - find by text content
    const allPortfolioH3 = document.querySelectorAll('#portfolio h3');
    allPortfolioH3.forEach(h3 => {
        const text = h3.textContent.trim();
        if (text.includes('Portfolio Desain') || text.includes('Design Portfolio')) {
            const iconSpan = h3.querySelector('span');
            h3.innerHTML = '';
            if (iconSpan) h3.appendChild(iconSpan);
            h3.appendChild(document.createTextNode(t.portfolioDesignTitle));
        }
    });
    
    // Update Portfolio Items
    const portfolioItems = document.querySelectorAll('#portfolio .p-6');
    if (portfolioItems.length >= 6) {
        portfolioItems[0].querySelector('h3').textContent = t.portfolio1Title;
        portfolioItems[0].querySelector('p').textContent = t.portfolio1Desc;
        portfolioItems[1].querySelector('h3').textContent = t.portfolio2Title;
        portfolioItems[1].querySelector('p').textContent = t.portfolio2Desc;
        portfolioItems[2].querySelector('h3').textContent = t.portfolio3Title;
        portfolioItems[2].querySelector('p').textContent = t.portfolio3Desc;
        portfolioItems[3].querySelector('h3').textContent = t.portfolio4Title;
        portfolioItems[3].querySelector('p').textContent = t.portfolio4Desc;
        portfolioItems[4].querySelector('h3').textContent = t.portfolio5Title;
        portfolioItems[4].querySelector('p').textContent = t.portfolio5Desc;
        portfolioItems[5].querySelector('h3').textContent = t.portfolio6Title;
        portfolioItems[5].querySelector('p').textContent = t.portfolio6Desc;
    }
    
    // Update Pricing Section
    const pricingTitle = document.querySelector('#pricing h2');
    if (pricingTitle) pricingTitle.textContent = t.pricingTitle;
    
    const promoTextEl = document.querySelector('#pricing .text-blue-600');
    if (promoTextEl) promoTextEl.textContent = t.promoText;
    
    const promoDescEls = document.querySelectorAll('#pricing .text-center.mb-12 p');
    if (promoDescEls.length >= 3) {
        promoDescEls[1].textContent = t.promoDesc1;
        promoDescEls[2].innerHTML = `${t.promoDesc2} <u><b>${t.promoDesc3}</b></u> ${t.promoDesc4}`;
    }
    
    const promoCTA = document.querySelector('#pricing .bg-gradient-to-r');
    if (promoCTA) promoCTA.textContent = t.promoCTA;
    
    // Update Web Packages Title
    const webPackagesDiv = document.querySelector('#pricing .mb-16');
    if (webPackagesDiv) {
        const webH3 = webPackagesDiv.querySelector('h3');
        if (webH3) {
            const iconSpan = webH3.querySelector('span');
            webH3.innerHTML = '';
            if (iconSpan) webH3.appendChild(iconSpan);
            webH3.appendChild(document.createTextNode(t.webPackagesTitle));
        }
    }
    
    // Update Design Packages Title - find by text content
    const allPricingH3 = document.querySelectorAll('#pricing h3');
    allPricingH3.forEach(h3 => {
        const text = h3.textContent.trim();
        if (text.includes('Paket Desain Grafis') || text.includes('Graphic Design Packages')) {
            const iconSpan = h3.querySelector('span');
            h3.innerHTML = '';
            if (iconSpan) h3.appendChild(iconSpan);
            h3.appendChild(document.createTextNode(t.designPackagesTitle));
        }
    });
    
    // Update package buttons
    const selectButtons = document.querySelectorAll('#pricing a.bg-blue-600');
    selectButtons.forEach(btn => {
        btn.textContent = t.selectPackage;
    });
    
    const askPriceButtons = document.querySelectorAll('#pricing a.bg-purple-600');
    askPriceButtons.forEach(btn => {
        btn.textContent = t.askPrice;
    });
    
    // Update Coming Soon text
    const comingSoonEls = document.querySelectorAll('#pricing .text-purple-600');
    comingSoonEls.forEach(el => {
        if (el.textContent.trim() === 'Coming Soon') {
            el.textContent = t.comingSoon;
        }
    });
    
    // Update badges
    const badges = document.querySelectorAll('#pricing .absolute.top-0.right-0');
    badges.forEach(badge => {
        if (badge.textContent.includes('POPULER') || badge.textContent.includes('POPULAR')) {
            badge.textContent = t.popularBadge;
        }
        if (badge.textContent.includes('REKOMENDASI') || badge.textContent.includes('RECOMMENDED')) {
            badge.textContent = t.recommendedBadge;
        }
    });
    
    // Update Package Features
    const pricingCards = document.querySelectorAll('#pricing .grid > div');
    
    // Basic Package (index 0)
    if (pricingCards[0]) {
        const basicFeatures = pricingCards[0].querySelectorAll('ul li span.text-gray-600');
        if (basicFeatures.length >= 6) {
            basicFeatures[0].textContent = t.basicFeature1;
            basicFeatures[1].textContent = t.basicFeature2;
            basicFeatures[2].textContent = t.basicFeature3;
            basicFeatures[3].textContent = t.basicFeature4;
            basicFeatures[4].textContent = t.basicFeature5;
            basicFeatures[5].textContent = t.basicFeature6;
        }
    }
    
    // Standard Package (index 1)
    if (pricingCards[1]) {
        const standardFeatures = pricingCards[1].querySelectorAll('ul li span.text-gray-600');
        if (standardFeatures.length >= 8) {
            standardFeatures[0].textContent = t.standardFeature1;
            standardFeatures[1].textContent = t.standardFeature2;
            standardFeatures[2].textContent = t.standardFeature3;
            standardFeatures[3].textContent = t.standardFeature4;
            standardFeatures[4].textContent = t.standardFeature5;
            standardFeatures[5].textContent = t.standardFeature6;
            standardFeatures[6].textContent = t.standardFeature7;
            standardFeatures[7].textContent = t.standardFeature8;
        }
    }
    
    // Premium Package (index 2)
    if (pricingCards[2]) {
        const premiumFeatures = pricingCards[2].querySelectorAll('ul li span.text-gray-600');
        if (premiumFeatures.length >= 9) {
            premiumFeatures[0].textContent = t.premiumFeature1;
            premiumFeatures[1].textContent = t.premiumFeature2;
            premiumFeatures[2].textContent = t.premiumFeature3;
            premiumFeatures[3].textContent = t.premiumFeature4;
            premiumFeatures[4].textContent = t.premiumFeature5;
            premiumFeatures[5].textContent = t.premiumFeature6;
            premiumFeatures[6].textContent = t.premiumFeature7;
            premiumFeatures[7].textContent = t.premiumFeature8;
            premiumFeatures[8].textContent = t.premiumFeature9;
        }
    }
    
    // Design Packages
    const designCards = document.querySelectorAll('#pricing .max-w-4xl > div');
    
    // Design Basic (index 0)
    if (designCards[0]) {
        const designBasicFeatures = designCards[0].querySelectorAll('ul li span.text-gray-600');
        if (designBasicFeatures.length >= 5) {
            designBasicFeatures[0].textContent = t.designBasicFeature1;
            designBasicFeatures[1].textContent = t.designBasicFeature2;
            designBasicFeatures[2].textContent = t.designBasicFeature3;
            designBasicFeatures[3].textContent = t.designBasicFeature4;
            designBasicFeatures[4].textContent = t.designBasicFeature5;
        }
    }
    
    // Design Premium (index 1)
    if (designCards[1]) {
        const designPremiumFeatures = designCards[1].querySelectorAll('ul li span.text-gray-600');
        if (designPremiumFeatures.length >= 7) {
            designPremiumFeatures[0].textContent = t.designPremiumFeature1;
            designPremiumFeatures[1].textContent = t.designPremiumFeature2;
            designPremiumFeatures[2].textContent = t.designPremiumFeature3;
            designPremiumFeatures[3].textContent = t.designPremiumFeature4;
            designPremiumFeatures[4].textContent = t.designPremiumFeature5;
            designPremiumFeatures[5].textContent = t.designPremiumFeature6;
            designPremiumFeatures[6].textContent = t.designPremiumFeature7;
        }
    }
    
    // Update Process Section
    const processSections = document.querySelectorAll('section');
    processSections.forEach(section => {
        const h2 = section.querySelector('h2');
        if (h2 && (h2.textContent.includes('Proses Pengerjaan') || h2.textContent.includes('Work Process'))) {
            h2.textContent = t.processTitle;
            
            // Update process web section
            const processWebDiv = section.querySelector('.from-blue-50');
            if (processWebDiv) {
                const webH3 = processWebDiv.querySelector('h3');
                if (webH3) {
                    const iconSpan = webH3.querySelector('span');
                    webH3.innerHTML = '';
                    if (iconSpan) webH3.appendChild(iconSpan);
                    webH3.appendChild(document.createTextNode(t.processWebTitle));
                }
                
                const webSteps = processWebDiv.querySelectorAll('.space-y-6 > div');
                if (webSteps.length >= 6) {
                    webSteps[0].querySelector('h4').textContent = t.processWeb1Title;
                    webSteps[0].querySelector('p').textContent = t.processWeb1Desc;
                    webSteps[1].querySelector('h4').textContent = t.processWeb2Title;
                    webSteps[1].querySelector('p').textContent = t.processWeb2Desc;
                    webSteps[2].querySelector('h4').textContent = t.processWeb3Title;
                    webSteps[2].querySelector('p').textContent = t.processWeb3Desc;
                    webSteps[3].querySelector('h4').textContent = t.processWeb4Title;
                    webSteps[3].querySelector('p').textContent = t.processWeb4Desc;
                    webSteps[4].querySelector('h4').textContent = t.processWeb5Title;
                    webSteps[4].querySelector('p').textContent = t.processWeb5Desc;
                    webSteps[5].querySelector('h4').textContent = t.processWeb6Title;
                    webSteps[5].querySelector('p').textContent = t.processWeb6Desc;
                }
            }
            
            // Update process design section
            const processDesignDiv = section.querySelector('.from-purple-50');
            if (processDesignDiv) {
                const designH3 = processDesignDiv.querySelector('h3');
                if (designH3) {
                    const iconSpan = designH3.querySelector('span');
                    designH3.innerHTML = '';
                    if (iconSpan) designH3.appendChild(iconSpan);
                    designH3.appendChild(document.createTextNode(t.processDesignTitle));
                }
                
                const designSteps = processDesignDiv.querySelectorAll('.space-y-6 > div');
                if (designSteps.length >= 6) {
                    designSteps[0].querySelector('h4').textContent = t.processDesign1Title;
                    designSteps[0].querySelector('p').textContent = t.processDesign1Desc;
                    designSteps[1].querySelector('h4').textContent = t.processDesign2Title;
                    designSteps[1].querySelector('p').textContent = t.processDesign2Desc;
                    designSteps[2].querySelector('h4').textContent = t.processDesign3Title;
                    designSteps[2].querySelector('p').textContent = t.processDesign3Desc;
                    designSteps[3].querySelector('h4').textContent = t.processDesign4Title;
                    designSteps[3].querySelector('p').textContent = t.processDesign4Desc;
                    designSteps[4].querySelector('h4').textContent = t.processDesign5Title;
                    designSteps[4].querySelector('p').textContent = t.processDesign5Desc;
                    designSteps[5].querySelector('h4').textContent = t.processDesign6Title;
                    designSteps[5].querySelector('p').textContent = t.processDesign6Desc;
                }
            }
        }
        
        // Update Testimonials Section
        if (h2 && (h2.textContent.includes('Testimoni') || h2.textContent.includes('Testimonial'))) {
            h2.textContent = t.testimonialsTitle;
        }
        
        // Update FAQ Section
        if (h2 && (h2.textContent.includes('Pertanyaan') || h2.textContent.includes('Frequently'))) {
            h2.textContent = t.faqTitle;
            
            // Update FAQ items
            const faqItems = section.querySelectorAll('.max-w-3xl > div');
            if (faqItems.length >= 5) {
                faqItems[0].querySelector('h3').textContent = t.faq1Q;
                faqItems[0].querySelector('div[id^="answer"]').textContent = t.faq1A;
                faqItems[1].querySelector('h3').textContent = t.faq2Q;
                faqItems[1].querySelector('div[id^="answer"]').textContent = t.faq2A;
                faqItems[2].querySelector('h3').textContent = t.faq3Q;
                faqItems[2].querySelector('div[id^="answer"]').textContent = t.faq3A;
                faqItems[3].querySelector('h3').textContent = t.faq4Q;
                faqItems[3].querySelector('div[id^="answer"]').textContent = t.faq4A;
                faqItems[4].querySelector('h3').textContent = t.faq5Q;
                faqItems[4].querySelector('div[id^="answer"]').textContent = t.faq5A;
            }
        }
        
        // Update CTA Section
        if (h2 && (h2.textContent.includes('Siap Buat') || h2.textContent.includes('Ready to Build'))) {
            h2.textContent = t.ctaTitle;
            const ctaDesc = section.querySelector('p');
            if (ctaDesc) ctaDesc.textContent = t.ctaDesc;
            const ctaButton = section.querySelector('a');
            if (ctaButton) ctaButton.textContent = t.ctaCTA;
        }
    });
    
    // Update Footer
    const footer = document.querySelector('footer');
    if (footer) {
        const footerH3 = footer.querySelector('h3');
        if (footerH3) footerH3.textContent = 'Code Ta';
        
        const footerDesc = footer.querySelector('p');
        if (footerDesc && !footerDesc.textContent.includes('©')) {
            footerDesc.textContent = t.footerAboutDesc;
        }
        
        const footerH4s = footer.querySelectorAll('h4');
        if (footerH4s.length >= 3) {
            footerH4s[0].textContent = t.footerNavigation;
            footerH4s[1].textContent = t.footerServices;
            footerH4s[2].textContent = t.footerSocialMedia;
        }
        
        // Update footer navigation links
        const footerNavLinks = footer.querySelectorAll('div:nth-child(2) ul li a');
        if (footerNavLinks.length >= 5) {
            footerNavLinks[0].textContent = t.services;
            footerNavLinks[1].textContent = t.features;
            footerNavLinks[2].textContent = t.portfolio;
            footerNavLinks[3].textContent = t.pricing;
            footerNavLinks[4].textContent = t.faq;
        }
        
        // Update footer services list
        const footerServicesList = footer.querySelectorAll('div:nth-child(3) ul li');
        if (footerServicesList.length >= 5) {
            footerServicesList[0].textContent = t.footerService1;
            footerServicesList[1].textContent = t.footerService2;
            footerServicesList[2].textContent = t.footerService3;
            footerServicesList[3].textContent = t.footerService4;
            footerServicesList[4].textContent = t.footerService5;
        }
        
        const footerRights = footer.querySelector('.border-t p');
        if (footerRights) {
            footerRights.innerHTML = `&copy; 2025 Code Ta. ${t.footerRights}`;
        }
    }
    
    // Update Back to Top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) backToTopBtn.setAttribute('title', t.backToTop);
    
    // Update language button styles
    updateLanguageButtons(lang);
}

function updateLanguageButtons(lang) {
    // Desktop buttons
    const langIndo = document.getElementById('langIndo');
    const langEnglish = document.getElementById('langEnglish');
    
    if (langIndo && langEnglish) {
        if (lang === 'id') {
            langIndo.classList.add('text-blue-600', 'font-semibold');
            langIndo.classList.remove('text-gray-500');
            langEnglish.classList.add('text-gray-500');
            langEnglish.classList.remove('text-blue-600', 'font-semibold');
        } else {
            langEnglish.classList.add('text-blue-600', 'font-semibold');
            langEnglish.classList.remove('text-gray-500');
            langIndo.classList.add('text-gray-500');
            langIndo.classList.remove('text-blue-600', 'font-semibold');
        }
    }
    
    // Mobile buttons
    const mobileLangIndo = document.getElementById('mobileLangIndo');
    const mobileLangEnglish = document.getElementById('mobileLangEnglish');
    
    if (mobileLangIndo && mobileLangEnglish) {
        if (lang === 'id') {
            mobileLangIndo.classList.add('text-blue-600', 'font-semibold');
            mobileLangIndo.classList.remove('text-gray-500');
            mobileLangEnglish.classList.add('text-gray-500');
            mobileLangEnglish.classList.remove('text-blue-600', 'font-semibold');
        } else {
            mobileLangEnglish.classList.add('text-blue-600', 'font-semibold');
            mobileLangEnglish.classList.remove('text-gray-500');
            mobileLangIndo.classList.add('text-gray-500');
            mobileLangIndo.classList.remove('text-blue-600', 'font-semibold');
        }
    }
}

// Apply saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage(currentLang);
    
    // Desktop language switcher
    const langIndo = document.getElementById('langIndo');
    const langEnglish = document.getElementById('langEnglish');
    if (langIndo) langIndo.addEventListener('click', () => updateLanguage('id'));
    if (langEnglish) langEnglish.addEventListener('click', () => updateLanguage('en'));
    
    // Mobile language switcher
    const mobileLangIndo = document.getElementById('mobileLangIndo');
    const mobileLangEnglish = document.getElementById('mobileLangEnglish');
    if (mobileLangIndo) mobileLangIndo.addEventListener('click', () => updateLanguage('id'));
    if (mobileLangEnglish) mobileLangEnglish.addEventListener('click', () => updateLanguage('en'));
});
