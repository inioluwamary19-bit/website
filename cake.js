 // Shopping Cart Functionality
let cart = [];
const cartKey = 'pastryCart';

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
function addToCart(pastryName, price) {
    const existingItem = cart.find(item => item.name === pastryName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: pastryName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showCartNotification(pastryName);
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
    const cards = document.querySelectorAll('.pastry-card');
    cards.forEach((card, index) => {
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
            }
        });
    });
}

// Mobile menu toggle (for future mobile nav)
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
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
    document.querySelectorAll('.pastry-card, .stat, .info-item').forEach(el => {
        observer.observe(el);
    });
}

// Price filter functionality
function setupPriceFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.pastry-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                const priceText = card.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('$', ''));
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (filterValue === 'budget' && price <= 4.99) {
                    card.style.display = 'block';
                } else if (filterValue === 'mid' && price > 4.99 && price <= 5.99) {
                    card.style.display = 'block';
                } else if (filterValue === 'premium' && price > 5.99) {
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
            const cards = document.querySelectorAll('.pastry-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
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
                scrollBtn.style.display = 'block';
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

// Quantity selector for cart items
function setupQuantitySelectors() {
    document.querySelectorAll('.quantity-control').forEach(control => {
        const decreaseBtn = control.querySelector('.qty-decrease');
        const increaseBtn = control.querySelector('.qty-increase');
        const quantityInput = control.querySelector('.qty-input');
        
        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                let qty = parseInt(quantityInput.value);
                if (qty > 1) {
                    quantityInput.value = qty - 1;
                    updateCartTotal();
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                let qty = parseInt(quantityInput.value);
                quantityInput.value = qty + 1;
                updateCartTotal();
            });
        }
    });
}

// Update cart total price
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalEl = document.querySelector('.cart-total');
    if (totalEl) {
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

// Dark mode toggle
function setupDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isNowDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isNowDark);
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
                const isPlus = target.textContent.includes('+');
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 30);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (isPlus ? '+' : '');
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue + (isPlus ? '+' : '');
                    }
                }, 30);
                
                counterObserver.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => counterObserver.observe(stat));
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupAddToCartButtons();
    setupContactForm();
    setupSmoothScroll();
    setupMobileMenu();
    setupScrollAnimations();
    setupPriceFilter();
    setupSearch();
    setupScrollToTop();
    setupQuantitySelectors();
    setupDarkMode();
    animateCounters();
    
    console.log('Sweet Bakery website initialized successfully!');
});