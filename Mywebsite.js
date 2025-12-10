 // Portfolio Interactivity

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Scroll animations - fade in elements as they come into view
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.stat-card, .skill-category, .project-card, .feature-card, .info-item').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => barObserver.observe(bar));
}

// Scroll to top button
function setupScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Submission
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = form.querySelector('textarea').value;
            
            // Simulate form submission
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
            form.parentNode.insertBefore(successMsg, form);
            
            // Reset form
            form.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }
}

// View Work button - scroll to projects
function setupViewWorkButton() {
    const viewWorkBtn = document.querySelector('.hero .btn-primary');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Download CV button
function setupDownloadCV() {
    const downloadBtn = document.querySelector('.hero .btn-secondary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Create a sample CV content
            const cvContent = `
PORTFOLIO RESUME
===============================================

NAME: Your Name
TITLE: Web Developer
EMAIL: hello@example.com
PHONE: +234 (123) 456-7890
LOCATION: Lagos, Nigeria

===============================================
PROFESSIONAL SUMMARY
===============================================

Passionate web developer with expertise in HTML, CSS, and JavaScript.
Specialized in creating responsive, user-friendly websites and web applications.
Strong problem-solving skills and attention to detail.

===============================================
TECHNICAL SKILLS
===============================================

Front-End Development:
- HTML5 (Semantic, Forms, Accessibility)
- CSS3 (Flexbox, Grid, Animations, Responsive Design)
- JavaScript (ES6+, DOM Manipulation, APIs, LocalStorage)
- Responsive Design & Mobile-First Approach

Web Technologies:
- Git & GitHub
- Web Performance Optimization
- Cross-browser Compatibility
- SEO Optimization
- Web Accessibility (a11y)

===============================================
PROJECTS
===============================================

1. SWEET BAKERY
   - E-commerce website for pastry shop
   - Features: Product filtering, search, shopping cart, dark mode
   - Technologies: HTML5, CSS3, JavaScript, LocalStorage

2. AYANFE'S FASHION EMPIRE
   - Luxury fashion e-commerce platform
   - Features: Category filtering, product search, mobile responsive
   - Technologies: HTML5, CSS3, JavaScript, Responsive Design

3. PORTFOLIO WEBSITE
   - Professional portfolio showcasing skills and projects
   - Features: Smooth scrolling, animations, skill progress bars
   - Technologies: HTML5, CSS3, JavaScript, Intersection Observer API

===============================================
EDUCATION
===============================================

Web Development Certification
Completed comprehensive training in front-end web development

===============================================
KEY STRENGTHS
===============================================

✓ Clean, readable, and maintainable code
✓ Responsive design expertise
✓ User experience focused development
✓ Problem-solving and debugging skills
✓ Ability to learn new technologies quickly
✓ Excellent communication skills

===============================================
AVAILABILITY
===============================================

Available for freelance projects and full-time positions.
Ready to discuss your web development needs.

Generated: 2025
            `;
            
            // Create blob and download
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'My_Resume.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }
}

// Animate numbers in stats (optional enhancement)
function animateStats() {
    const stats = document.querySelectorAll('.stat-card h3');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const hasPlus = text.includes('+');
                let currentValue = 0;
                const increment = Math.ceil(number / 30);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= number) {
                        entry.target.textContent = number + (hasPlus ? '+' : '');
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = currentValue + (hasPlus ? '+' : '');
                    }
                }, 30);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupMobileMenu();
    setupScrollAnimations();
    animateSkillBars();
    setupScrollToTop();
    setupContactForm();
    setupViewWorkButton();
    setupDownloadCV();
    animateStats();
    
    console.log('Portfolio website initialized successfully!');
});