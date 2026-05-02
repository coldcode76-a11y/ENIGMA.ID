// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============ NOTIFICATION SYSTEM ============
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ============ PLAYER COUNTER ANIMATION ============
let playerCount = 1247;
const playerCountElement = document.getElementById('playerCount');

function animateCounter() {
    const increment = Math.floor(Math.random() * 5) + 1;
    playerCount += increment;
    playerCountElement.textContent = playerCount.toLocaleString();
}

// Update player count every 5 seconds
setInterval(animateCounter, 5000);

// ============ SHOP CART SYSTEM ============
let cart = [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    showNotification(`✅ ${itemName} added to cart! Total: ${cart.length} items`);
    
    // Log cart (in real app, this would be sent to backend)
    console.log('Cart:', cart);
    console.log('Total Price:', cart.reduce((sum, item) => sum + item.price, 0));
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe shop items
document.querySelectorAll('.shop-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Observe steps
document.querySelectorAll('.step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(step);
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 's' || e.key === 'S') {
        document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#community').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============ RANDOM ITEM SPAWN ============
function spawnRandomItem() {
    const items = ['💎', '🔐', '✨', '🎁', '⚡', '🐣'];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const randomX = Math.random() * 80 + 10;
    const randomY = Math.random() * 80 + 10;
    
    const element = document.createElement('div');
    element.textContent = randomItem;
    element.style.position = 'fixed';
    element.style.left = randomX + '%';
    element.style.top = randomY + '%';
    element.style.fontSize = '2rem';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '999';
    element.style.animation = 'float 3s ease-in-out forwards';
    element.style.opacity = '0.8';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 3000);
}

// Spawn items occasionally
setInterval(spawnRandomItem, 10000);

// ============ PARALLAX EFFECT ============
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const elements = document.querySelectorAll('.floating-items .item');
            
            elements.forEach((element, index) => {
                element.style.transform = `translateY(${scrolled * 0.5 + index * 10}px) rotate(${scrolled * 0.3}deg)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ============ CURRENCY FORMATTER ============
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
}

// ============ EASTER EGGS ============
const easterEggs = {
    'gtps': () => showNotification('🎮 Growtopia Private Server is awesome!'),
    'gold': () => showNotification('💛 Gold is precious!'),
    'dev': () => showNotification('👨‍💻 Thanks for visiting my website!'),
    'secret': () => showNotification('🔓 You found a secret!'),
};

let inputString = '';
document.addEventListener('keypress', (e) => {
    inputString += e.key.toLowerCase();
    
    // Check for easter eggs
    Object.keys(easterEggs).forEach(egg => {
        if (inputString.includes(egg)) {
            easterEggs[egg]();
            inputString = '';
        }
    });
    
    // Clear input if too long
    if (inputString.length > 20) {
        inputString = inputString.slice(-10);
    }
});

// ============ ANALYTICS ============
console.log('%cGTPS Server Website', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%cVersion: 1.0.0', 'color: #ffed4e;');
console.log('%cThanks for visiting!', 'color: #999;');

// Track page visits
let pageVisits = localStorage.getItem('pageVisits') || 0;
pageVisits = parseInt(pageVisits) + 1;
localStorage.setItem('pageVisits', pageVisits);
console.log(`%cPage Visits: ${pageVisits}`, 'color: #4ade80;');

// ============ PERFORMANCE OPTIMIZATION ============
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const src = entry.target.dataset.lazy;
                entry.target.src = src;
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}