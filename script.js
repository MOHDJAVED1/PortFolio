// ========================================
// PROFILE PHOTO UPLOAD FEATURE
// ========================================

const PROFILE_PHOTO_KEY = 'portfolio_profile_photo';

// Get profile photo elements
const uploadProfileBtn = document.getElementById('uploadProfileBtn');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const profilePicture = document.getElementById('profilePicture');

// Load stored profile photo on page load
window.addEventListener('load', () => {
    const storedPhoto = localStorage.getItem(PROFILE_PHOTO_KEY);
    if (storedPhoto) {
        profilePicture.src = storedPhoto;
    }
});

// Trigger file input when upload button is clicked
if (uploadProfileBtn) {
    uploadProfileBtn.addEventListener('click', () => {
        profilePhotoInput.click();
    });
}

// Handle file selection and upload
if (profilePhotoInput) {
    profilePhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showProfilePhotoNotification('❌ Please upload a valid image file (JPG, PNG, GIF, WebP)', 'error');
            return;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showProfilePhotoNotification('❌ File size must be less than 5MB', 'error');
            return;
        }
        
        // Read the file and store it
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                // Save the image data to localStorage
                localStorage.setItem(PROFILE_PHOTO_KEY, event.target.result);
                
                // Update the profile picture
                profilePicture.src = event.target.result;
                
                // Show success message
                showProfilePhotoNotification('✅ Profile photo updated successfully!', 'success');
                
                // Reset the input
                profilePhotoInput.value = '';
            } catch (error) {
                // Handle localStorage quota exceeded
                if (error.name === 'QuotaExceededError') {
                    showProfilePhotoNotification('❌ Storage quota exceeded. Please use a smaller image.', 'error');
                } else {
                    showProfilePhotoNotification('❌ Error updating profile photo. Please try again.', 'error');
                }
            }
        };
        
        reader.onerror = () => {
            showProfilePhotoNotification('❌ Error reading the file. Please try again.', 'error');
        };
        
        reader.readAsDataURL(file);
    });
}

// Show notification for profile photo updates
function showProfilePhotoNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `profile-photo-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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

// Portfolio owner email
const PORTFOLIO_EMAIL = 'javedkhan1078692@mail.com';

// ========================================
// CAPTCHA SYSTEM (First Page Load)
// ========================================

let captchaState = {
    type: 'number',
    question: '',
    correctAnswer: ''
};

const captchaData = {
    number: [
        { q: '2 + 3 = ?', a: '5' },
        { q: '10 - 4 = ?', a: '6' },
        { q: '6 × 2 = ?', a: '12' },
        { q: '15 ÷ 3 = ?', a: '5' },
        { q: '7 + 8 = ?', a: '15' },
        { q: '20 - 5 = ?', a: '15' },
        { q: '4 + 4 = ?', a: '8' },
        { q: '9 - 3 = ?', a: '6' },
        { q: '5 × 3 = ?', a: '15' },
        { q: '12 ÷ 2 = ?', a: '6' }
    ],
    letters: [
        { q: 'What letter comes after Z?', a: 'A' },
        { q: 'What is the 1st letter of alphabet?', a: 'A' },
        { q: 'What is the 5th letter?', a: 'E' },
        { q: 'What letter is before C?', a: 'B' },
        { q: 'What is the middle letter of alphabet?', a: 'M' },
        { q: 'What is the last letter?', a: 'Z' },
        { q: 'What letter comes after M?', a: 'N' },
        { q: 'How many unique vowels? (A E I O U)', a: '5' },
    ]
};

// Generate random CAPTCHA
function generateCaptcha() {
    const types = ['number', 'letters'];
    captchaState.type = types[Math.floor(Math.random() * types.length)];
    
    const questions = captchaData[captchaState.type];
    const selected = questions[Math.floor(Math.random() * questions.length)];
    
    captchaState.question = selected.q;
    captchaState.correctAnswer = selected.a;
    
    displayCaptcha();
}

// Display CAPTCHA
function displayCaptcha() {
    document.getElementById('captchaQuestion').textContent = captchaState.question;
    const errorEl = document.getElementById('captchaError');
    errorEl.textContent = '';
    errorEl.classList.remove('show');
    
    document.querySelectorAll('input[name="captchaAnswer"]').forEach(input => {
        input.checked = false;
    });
    
    let options = [captchaState.correctAnswer];
    const fakeAnswers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'B', 'C', 'X', 'Y', 'Z'];
    
    while (options.length < 4) {
        const fake = fakeAnswers[Math.floor(Math.random() * fakeAnswers.length)];
        if (!options.includes(fake)) {
            options.push(fake);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 4; i++) {
        document.getElementById(`option${i + 1}`).textContent = options[i];
        document.querySelector(`input[value="option${i + 1}"]`).dataset.answer = options[i];
    }
}

// CAPTCHA Submit Button
const captchaSubmitBtn = document.getElementById('captchaSubmitBtn');
if (captchaSubmitBtn) {
    captchaSubmitBtn.addEventListener('click', () => {
        const selected = document.querySelector('input[name="captchaAnswer"]:checked');
        
        if (!selected) {
            const errorEl = document.getElementById('captchaError');
            errorEl.textContent = '⚠️ Please select an answer';
            errorEl.classList.add('show');
            return;
        }
        
        const answer = selected.dataset.answer;
        
        if (answer !== captchaState.correctAnswer) {
            const errorEl = document.getElementById('captchaError');
            errorEl.textContent = '❌ Incorrect! Try again. Refreshing...';
            errorEl.classList.add('show');
            setTimeout(() => generateCaptcha(), 1500);
            return;
        }
        
        // Correct answer - close CAPTCHA modal and show portfolio
        const captchaModal = document.getElementById('captchaModal');
        captchaModal.classList.remove('show');
        console.log('✅ CAPTCHA verified! Portfolio unlocked.');
    });
}

// Initialize CAPTCHA on page load
window.addEventListener('load', () => {
    generateCaptcha();
});

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('emailSubject').value.trim();
        const message = document.getElementById('messageBody').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Create formatted email body
        const emailBody = `${message}\n\n\nThanks and Regards,\n${name}\n${email}`;
        
        // Create mailto link
        const mailtoLink = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show success message
        showMessage('Opening your default email client...', 'success');
        
        // Open email client after a short delay
        setTimeout(() => {
            window.location.href = mailtoLink;
            contactForm.reset();
        }, 500);
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

// ========================================
// APPRECIATION PAGINATION SYSTEM
// ========================================

let appreciationFiles = [];
let currentAppreciationIndex = 0;

// Function to load all appreciation files
function loadAppreciationFiles() {
    if (appreciationFiles.length > 0) {
        console.log('ℹ️ Files already loaded, using cached list');
        return appreciationFiles;
    }
    
    console.log('🔍 Loading appriciations folder files...');
    
    // List of all appreciation files in the folder
    const files = [
        'appriciations/01.jpg',
        'appriciations/02.jpg',
        'appriciations/03.jpg',
        'appriciations/04.jpg',
        'appriciations/5.jpeg',
        'appriciations/6.jpeg',
        'appriciations/7.jpeg',
        'appriciations/8.jpeg',
        'appriciations/9.jpeg',
        'appriciations/10.jpeg',
        'appriciations/11.jpeg',
        'appriciations/12.jpeg',
        'appriciations/13.jpeg',
        'appriciations/14.jpeg',
        'appriciations/15.jpeg',
        'appriciations/16.jpeg'
    ];
    
    appreciationFiles = files;
    console.log(`✅ Successfully loaded ${appreciationFiles.length} files`);
    console.log(`📝 Files:`, appreciationFiles);
    
    return appreciationFiles;
}

// Get DOM elements
const openAllBtn = document.getElementById('openAllAppreciations');
const appreciationModal = document.getElementById('appreciationModal');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const paginationInfo = document.getElementById('pagination-info');
const paginationDisplay = document.getElementById('paginationDisplay');

// Display appreciation file
function displayAppreciation(index) {
    if (appreciationFiles.length === 0) {
        paginationDisplay.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <p style="font-size: 18px; margin-bottom: 10px;">❌ No files found</p>
                <p style="font-size: 14px;">Check folder: C:/temp/MyPortFolio/appriciations/</p>
            </div>
        `;
        return;
    }
    
    const file = appreciationFiles[index];
    const ext = file.toLowerCase().split('.').pop();
    
    paginationDisplay.innerHTML = '';
    console.log(`📍 Displaying: ${file}`);
    
    // IMAGE FILES
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        const img = document.createElement('img');
        img.src = file;
        img.alt = `Appreciation ${index + 1}`;
        img.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            object-fit: contain;
        `;
        
        img.onerror = () => {
            console.error(`Failed to load: ${file}`);
            paginationDisplay.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Failed to load image</p>`;
        };
        
        paginationDisplay.appendChild(img);
    }
    
    // Update pagination info
    paginationInfo.textContent = `${index + 1} / ${appreciationFiles.length}`;
    
    // Update button disabled states
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === appreciationFiles.length - 1;
}

// Button event listeners
if (openAllBtn) {
    openAllBtn.addEventListener('click', () => {
        loadAppreciationFiles();
        
        if (appreciationFiles.length === 0) {
            alert('No files found! Check: C:\\temp\\MyPortFolio\\appriciations\\');
            return;
        }
        
        currentAppreciationIndex = 0;
        appreciationModal.classList.add('show');
        displayAppreciation(currentAppreciationIndex);
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        appreciationModal.classList.remove('show');
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentAppreciationIndex > 0) {
            currentAppreciationIndex--;
            displayAppreciation(currentAppreciationIndex);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentAppreciationIndex < appreciationFiles.length - 1) {
            currentAppreciationIndex++;
            displayAppreciation(currentAppreciationIndex);
        }
    });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === appreciationModal) {
        appreciationModal.classList.remove('show');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (!appreciationModal.classList.contains('show')) return;
    
    if (event.key === 'ArrowLeft' && currentAppreciationIndex > 0) {
        currentAppreciationIndex--;
        displayAppreciation(currentAppreciationIndex);
    } else if (event.key === 'ArrowRight' && currentAppreciationIndex < appreciationFiles.length - 1) {
        currentAppreciationIndex++;
        displayAppreciation(currentAppreciationIndex);
    } else if (event.key === 'Escape') {
        appreciationModal.classList.remove('show');
    }
});

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

// ========================================
// CERTIFICATION MODAL SYSTEM
// ========================================

const certModal = document.getElementById('certificationModal');
const closeCertModal = document.querySelector('.close-cert-modal');
const certPdfViewer = document.getElementById('certPdfViewer');

// Certification files
const certifications = [
    { name: 'AWS Certified DevOps Engineer', path: 'certifications/AWS Certified DevOps Engineer.jpeg' },
    { name: 'AWS Developer Associate', path: 'certifications/AWS Developer Associate.jpeg' },
    { name: 'Azure Administrator', path: 'certifications/Azure administrator.jpeg' }
];

let currentCertIndex = 0;

// Open certifications when button is clicked
const openAllCertsBtn = document.getElementById('openAllCertifications');
if (openAllCertsBtn) {
    openAllCertsBtn.addEventListener('click', () => {
        currentCertIndex = 0;
        displayCertification(currentCertIndex);
        certModal.classList.add('show');
        console.log('📜 Opening certifications gallery');
    });
}

// Display certification
function displayCertification(index) {
    const cert = certifications[index];
    const certDisplay = document.getElementById('certDisplay');
    
    certDisplay.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = cert.path;
    img.alt = cert.name;
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        object-fit: contain;
    `;
    
    img.onerror = () => {
        certDisplay.innerHTML = `<p style=\"color: red; text-align: center;\">Failed to load: ${cert.name}</p>`;
    };
    
    certDisplay.appendChild(img);
    
    // Update cert info
    const certInfo = document.getElementById('certInfo');
    certInfo.textContent = `${index + 1} / ${certifications.length}`;
    
    // Update cert title
    const certTitle = document.getElementById('certTitle');
    certTitle.textContent = cert.name;
    
    // Update button states
    const certPrevBtn = document.getElementById('certPrevBtn');
    const certNextBtn = document.getElementById('certNextBtn');
    
    certPrevBtn.disabled = index === 0;
    certNextBtn.disabled = index === certifications.length - 1;
}

// Certification navigation
const certPrevBtn = document.getElementById('certPrevBtn');
const certNextBtn = document.getElementById('certNextBtn');

if (certPrevBtn) {
    certPrevBtn.addEventListener('click', () => {
        if (currentCertIndex > 0) {
            currentCertIndex--;
            displayCertification(currentCertIndex);
        }
    });
}

if (certNextBtn) {
    certNextBtn.addEventListener('click', () => {
        if (currentCertIndex < certifications.length - 1) {
            currentCertIndex++;
            displayCertification(currentCertIndex);
        }
    });
}

// Close certification modal
if (closeCertModal) {
    closeCertModal.addEventListener('click', () => {
        certModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === certModal) {
        certModal.classList.remove('show');
    }
});

// Keyboard navigation for certification modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certModal.classList.contains('show')) {
        certModal.classList.remove('show');
    }
});

// Disable save, print, and right-click on PDFs
window.addEventListener('keydown', (event) => {
    // Disable Ctrl+S (Save)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        return false;
    }
    // Disable Ctrl+P (Print)
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        return false;
    }
});

// Disable right-click context menu on appreciation and certification modals
document.addEventListener('contextmenu', (event) => {
    if (appreciationModal.classList.contains('show') || certModal.classList.contains('show')) {
        event.preventDefault();
        return false;
    }
});
