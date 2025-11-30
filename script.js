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
            const navbarHeight = 80; // Tinggi navbar + padding
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
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
