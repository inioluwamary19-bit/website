 // Fashion Empire Cart Functionality
let cart = [];
const cartKey = 'ayanfeCart';

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem(cartKey);
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Add item to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showCartNotification(itemName);
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
        cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Show notification when item added
function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `✓ ${itemName} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add to cart button listeners
function setupAddToCartButtons() {
    const cards = document.querySelectorAll('.fashion-card');
    cards.forEach((card) => {
        const button = card.querySelector('.btn-secondary');
        const title = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        
        button.addEventListener('click', () => {
            addToCart(title, price);
        });
    });
}

// Form Submission
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simulate form submission
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '✓ Message sent successfully! We\'ll get back to you soon.';
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
    document.querySelectorAll('.fashion-card, .stat, .feature-card, .info-item').forEach(el => {
        observer.observe(el);
    });
}

// Category filter functionality
function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.fashion-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (filterValue === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.fashion-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.description').textContent.toLowerCase();
                const category = card.querySelector('.category-tag').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
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

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/[^0-9]/g, '');
                const hasPlus = target.textContent.includes('+');
                const hasPercent = target.textContent.includes('%');
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 50);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        let displayText = finalValue;
                        if (hasPlus) displayText += '+';
                        if (hasPercent) displayText += '%';
                        target.textContent = displayText;
                        clearInterval(counter);
                    } else {
                        let displayText = currentValue;
                        if (hasPercent) displayText += '%';
                        target.textContent = displayText;
                    }
                }, 30);
                
                counterObserver.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => counterObserver.observe(stat));
}

// Cart icon click to view items
function setupCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                let cartSummary = 'Items in your cart:\n\n';
                let total = 0;
                
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    cartSummary += `${item.name}\nQuantity: ${item.quantity}\nPrice: $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}\n\n`;
                });
                
                cartSummary += `\nTotal: $${total.toFixed(2)}`;
                alert(cartSummary);
            }
        });
    }
}

// Explore button on hero section
function setupExploreButton() {
    const exploreBtn = document.querySelector('.hero .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const collectionsSection = document.querySelector('#collections');
            if (collectionsSection) {
                collectionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupAddToCartButtons();
    setupContactForm();
    setupSmoothScroll();
    setupMobileMenu();
    setupScrollAnimations();
    setupCategoryFilter();
    setupSearch();
    setupScrollToTop();
    animateCounters();
    setupCartIcon();
    setupExploreButton();
    
    console.log('Ayanfe\'s Fashion Empire website initialized successfully!');
});