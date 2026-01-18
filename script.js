// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle nav
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Here you would typically send this data to a server
        console.log('Form submitted:', { name, email, message });

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .resume-card, .contact-form, .about-content > div');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.timeline-item, .resume-card, .contact-form, .about-content > div');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Trigger initial animation check
    setTimeout(animateOnScroll, 300);

    // Show navigation after page loads
    document.querySelector('nav').style.opacity = '1';
    document.querySelector('nav').style.transform = 'translateY(0)';
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.querySelector('a').classList.remove('active');
        if (item.querySelector('a').getAttribute('href') === `#${current}`) {
            item.querySelector('a').classList.add('active');
        }
    });
});

// Add animation for skill ratings on scroll
const animateSkills = () => {
    const skillRatings = document.querySelectorAll('.skill-rating');

    skillRatings.forEach(skillRating => {
        const skillPosition = skillRating.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (skillPosition < screenPosition && !skillRating.classList.contains('animated')) {
            const rating = parseInt(skillRating.getAttribute('data-rating'));
            const stars = skillRating.querySelectorAll('.star');

            stars.forEach((star, index) => {
                if (index < rating) {
                    setTimeout(() => {
                        star.classList.add('filled');
                    }, index * 200); // Stagger the animation
                }
            });

            skillRating.classList.add('animated');
        }
    });
};


document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('H9hDHyEBO4vLyztiL');

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formMessage.style.display = 'none';

        try {
            // Get values directly using getElementById
            const fromNameEl = document.getElementById('from_name');
            const emailEl = document.getElementById('email');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');

            const templateParams = {
                from_name: fromNameEl ? fromNameEl.value : '',
                email: emailEl ? emailEl.value : '',
                subject: subjectEl ? subjectEl.value : '',
                message: messageEl ? messageEl.value : ''
            };

            console.log('Form elements:', {
                from_name: fromNameEl,
                email: emailEl,
                subject: subjectEl,
                message: messageEl
            });

            console.log('Form values directly from elements:', {
                from_name: fromNameEl?.value,
                email: emailEl?.value,
                subject: subjectEl?.value,
                message: messageEl?.value
            });

            console.log('Form values before sending:', templateParams);

            // Validate we have values
            if (!templateParams.from_name || !templateParams.email || !templateParams.message) {
                throw new Error('Required form fields are missing');
            }

            // Send the email using EmailJS
            const response = await emailjs.send(
                'service_aqh0ssn',
                'template_f60ungf',
                templateParams
            );

            console.log('Email sent successfully:', response);

            // Show success message
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('Failed to send message:', error);
            formMessage.textContent = 'Failed to send message. ' +
                (error.message || 'Please try again later or contact me directly at bmanojprabhakar@gmail.com');
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Initialize skills and stats
document.addEventListener('DOMContentLoaded', () => {
    // Animate skills with delay
    setTimeout(animateSkills, 500);

    // Animate stats on page load with delay (hero section is visible)
    setTimeout(checkStatsVisibility, 1000);
});

// Add scroll event listener for skill animations
window.addEventListener('scroll', animateSkills);

// Statistics Animation
const animateStatNumber = (statNumber) => {
    const target = parseInt(statNumber.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    // Clear any existing timer
    if (statNumber.timer) {
        clearInterval(statNumber.timer);
    }

    statNumber.timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(statNumber.timer);
        }
        // Add '+' symbol to the number
        statNumber.textContent = Math.floor(current) + '+';
    }, 16);
};

const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(statNumber => {
        const statPosition = statNumber.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        // Animate when element is in viewport and not already animated
        if (statPosition < screenPosition && !statNumber.classList.contains('animated')) {
            animateStatNumber(statNumber);
            statNumber.classList.add('animated');
        }
    });
};

// Check if stats section is visible and animate
const checkStatsVisibility = () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(statNumber => {
                if (!statNumber.classList.contains('animated')) {
                    animateStatNumber(statNumber);
                    statNumber.classList.add('animated');
                }
            });
        }
    }
};

// Add scroll event listener for stats animations
window.addEventListener('scroll', animateStats);

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update Experience Years Dynamically
function updateExperienceYears() {
    const startYear = 2011;
    const startMonth = 8; // September (0-indexed)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let years = currentYear - startYear;
    if (currentMonth < startMonth) {
        years--;
    }

    // Update all elements with class 'exp-years'
    const expElements = document.querySelectorAll('.exp-years');
    expElements.forEach(el => {
        el.textContent = years + '+';
    });

    // Update the stat number data-target
    const expStat = document.querySelector('.exp-years-stat');
    if (expStat) {
        expStat.setAttribute('data-target', years);
    }
}

// Call on load
document.addEventListener('DOMContentLoaded', updateExperienceYears);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize icon
if (themeIcon) updateThemeIcon(currentTheme);

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}


