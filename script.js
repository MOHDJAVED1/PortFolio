// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = this[0].value;
        const email = this[1].value;
        const message = this[2].value;

        // Simple validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        formMessage.textContent = 'Sending...';
        
        setTimeout(() => {
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
    
    // Clear message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    }
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to project cards and skill items
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation link indicator
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').slice(1) === current) {
            a.classList.add('active');
        }
    });
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills');

if (skillSection) {
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.animation = 'none';
                        bar.offsetHeight;
                        bar.style.animation = 'skillFill 1.5s ease forwards';
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(skillSection);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillSection);
}

// Add keyframe animation for skills
const style = document.createElement('style');
style.innerHTML = `
    @keyframes skillFill {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);