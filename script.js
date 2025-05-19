// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to service items on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Add hover effect to QR code
const qrCode = document.querySelector('.qr-code img');
if (qrCode) {
    qrCode.addEventListener('mouseover', () => {
        qrCode.style.transform = 'scale(1.1)';
        qrCode.style.transition = 'transform 0.3s ease';
    });

    qrCode.addEventListener('mouseout', () => {
        qrCode.style.transform = 'scale(1)';
    });
}

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Here you would typically send the form data to your backend server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('There was an error sending your message. Please try again later.');
            console.error('Error:', error);
        }
    });
}

// Add animation to contact form on scroll
const contactSection = document.querySelector('.contact-section');
if (contactSection) {
    observer.observe(contactSection);
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'translateY(20px)';
    contactSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

// Add discount banner with countdown timer
function createDiscountBanner() {
    // Remove the old banner if it exists
    const oldBanner = document.querySelector('.discount-banner');
    if (oldBanner) {
        oldBanner.remove();
    }

    // Add styles for the discount badge
    const style = document.createElement('style');
    style.textContent = `
        .discount-badge {
            background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
            color: white;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            margin: 10px 0;
            position: relative;
            overflow: hidden;
        }
        .discount-badge h3 {
            margin: 0;
            font-size: 20px;
        }
        .discount-badge p {
            margin: 5px 0;
            font-size: 16px;
        }
        .countdown {
            font-size: 18px;
            font-weight: bold;
            margin-top: 5px;
        }
        .countdown span {
            background: rgba(255,255,255,0.2);
            padding: 3px 8px;
            border-radius: 4px;
            margin: 0 2px;
        }
    `;
    document.head.appendChild(style);
}

function updateCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(countdownElement => {
        const hoursElement = countdownElement.querySelector('#hours');
        const minutesElement = countdownElement.querySelector('#minutes');
        const secondsElement = countdownElement.querySelector('#seconds');

        let hours = 1;
        let minutes = 0;
        let seconds = 0;

        const countdown = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(countdown);
                        const discountBadge = countdownElement.closest('.discount-badge');
                        if (discountBadge) {
                            discountBadge.remove();
                        }
                        return;
                    }
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
                seconds = 59;
            } else {
                seconds--;
            }

            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    });
}

function addDiscountToServices() {
    const services = document.querySelectorAll('.service-item');
    
    services.forEach(service => {
        const serviceTitle = service.querySelector('h3')?.textContent.toLowerCase() || '';
        
        // Check if the service is Instagram, WhatsApp, or Phone Access
        if (serviceTitle.includes('instagram') || 
            serviceTitle.includes('whatsapp') || 
            serviceTitle.includes('phone access')) {
            
            const discountBadge = document.createElement('div');
            discountBadge.className = 'discount-badge';
            discountBadge.innerHTML = `
                <h3>🎉 Special Offer! 🎉</h3>
                <p>Get 50% OFF on this service!</p>
                <div class="countdown">
                    <span id="hours">01</span>:
                    <span id="minutes">00</span>:
                    <span id="seconds">00</span>
                </div>
            `;
            
            // Insert the discount badge at the beginning of the service item
            service.insertBefore(discountBadge, service.firstChild);
        }
    });
}

// Initialize discount badges and countdown
createDiscountBanner();
addDiscountToServices();
updateCountdown();

// Add hover effects and price updates for services
function initializeServiceSelection() {
    const services = document.querySelectorAll('.service-item');
    const paymentSection = document.querySelector('.payment-section');
    
    // Add styles for service selection
    const style = document.createElement('style');
    style.textContent = `
        .service-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .service-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .service-item.selected {
            border: 2px solid #ff6b6b;
            background-color: rgba(255, 107, 107, 0.05);
        }
        
        .price-display {
            font-size: 24px;
            font-weight: bold;
            color: #ff6b6b;
            margin: 20px 0;
            text-align: center;
        }
        
        .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 18px;
            margin-right: 10px;
        }
        
        .discounted-price {
            color: #ff6b6b;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // Create price display element if it doesn't exist
    if (!document.querySelector('.price-display')) {
        const priceDisplay = document.createElement('div');
        priceDisplay.className = 'price-display';
        priceDisplay.innerHTML = 'Select a service to see pricing';
        paymentSection.insertBefore(priceDisplay, paymentSection.firstChild);
    }

    services.forEach(service => {
        service.addEventListener('click', () => {
            // Remove selected class from all services
            services.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked service
            service.classList.add('selected');
            
            // Get service details
            const serviceTitle = service.querySelector('h3')?.textContent.toLowerCase() || '';
            const hasDiscount = service.querySelector('.discount-badge') !== null;
            
            // Set prices based on service type
            let originalPrice, finalPrice;
            
            if (serviceTitle.includes('instagram')) {
                originalPrice = '₹1999';
                finalPrice = '₹499';
            } else if (serviceTitle.includes('whatsapp')) {
                originalPrice = '₹1999';
                finalPrice = '₹499';
            } else if (serviceTitle.includes('phone access')) {
                originalPrice = '₹4999';
                finalPrice = '₹1249';
            } else {
                // For non-discounted services
                const priceElement = service.querySelector('.price');
                if (priceElement) {
                    originalPrice = priceElement.textContent;
                    finalPrice = originalPrice;
                } else {
                    originalPrice = 'Price not available';
                    finalPrice = originalPrice;
                }
            }
            
            // Update price display
            const priceDisplay = document.querySelector('.price-display');
            if (hasDiscount && originalPrice !== finalPrice) {
                priceDisplay.innerHTML = `
                    <span class="original-price">${originalPrice}</span>
                    <span class="discounted-price">${finalPrice}</span>
                    <div style="font-size: 14px; color: #666; margin-top: 5px;">75% discount applied!</div>
                `;
            } else {
                priceDisplay.innerHTML = `
                    <span class="discounted-price">${finalPrice}</span>
                `;
            }

            // Update QR code amount based on selected service
            updateQRCodeAmount(serviceTitle);
        });

        // Add hover effect
        service.addEventListener('mouseenter', () => {
            if (!service.classList.contains('selected')) {
                service.style.transform = 'translateY(-5px)';
                service.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }
        });

        service.addEventListener('mouseleave', () => {
            if (!service.classList.contains('selected')) {
                service.style.transform = 'translateY(0)';
                service.style.boxShadow = 'none';
            }
        });
    });
}

// Initialize service selection
initializeServiceSelection();

// Add final amount display below QR code
function updateQRCodeAmount(serviceTitle) {
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        // Remove existing amount display if any
        const existingAmount = qrCode.querySelector('.final-amount');
        if (existingAmount) {
            existingAmount.remove();
        }

        // Only show amount for full phone access service
        if (serviceTitle && serviceTitle.toLowerCase().includes('phone access')) {
            // Create amount display
            const amountDisplay = document.createElement('div');
            amountDisplay.className = 'final-amount';
            amountDisplay.style.cssText = `
                text-align: center;
                margin-top: 15px;
                font-size: 24px;
                font-weight: bold;
                color: #ff6b6b;
            `;
            amountDisplay.textContent = '₹1249';
            
            // Insert after QR code image
            const qrImage = qrCode.querySelector('img');
            if (qrImage) {
                qrImage.parentNode.insertBefore(amountDisplay, qrImage.nextSibling);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Star rating functionality
    const stars = document.querySelectorAll('.rating-input .star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            selectedRating = rating;
            
            // Update stars appearance
            stars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                if (starRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            stars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                if (starRating <= rating) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#8892b0';
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                if (starRating <= selectedRating) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#8892b0';
                }
            });
        });
    });

    // Feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the feedback to your server
            alert('Thank you for your feedback!');
            this.reset();
            stars.forEach(s => s.classList.remove('active'));
            selectedRating = 0;
        });
    }
}); 
