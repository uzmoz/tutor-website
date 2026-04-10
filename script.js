// Reusable function to set up the expandable carousel logic
function setupGalleryToggle(containerId, enButtonId, ruButtonId, enExpandText, enCollapseText, ruExpandText, ruCollapseText) {
    const container = document.getElementById(containerId);
    const btnEn = document.getElementById(enButtonId);
    const btnRu = document.getElementById(ruButtonId);

    if (!container || !btnEn || !btnRu) return;

    function toggle() {
        container.classList.toggle('expanded');
        const isExpanded = container.classList.contains('expanded');
        
        if (isExpanded) {
            btnEn.textContent = enCollapseText;
            btnRu.textContent = ruCollapseText;
        } else {
            btnEn.textContent = enExpandText;
            btnRu.textContent = ruExpandText;
            // Smoothly scroll back to view when collapsing
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    btnEn.addEventListener('click', toggle);
    btnRu.addEventListener('click', toggle);
}

document.addEventListener('DOMContentLoaded', () => {
    // === LANGUAGE TOGGLE LOGIC ===
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLang(lang);
        });
    });

    // === LESSON STEPS CAROUSEL ===
    const stepsTrack = document.getElementById('steps-track');
    const stepDots = document.querySelectorAll('.step-dot');
    const stepCards = document.querySelectorAll('.step-card');
    let currentStep = 0;
    let stepAutoplay;

    function goToStep(index) {
        currentStep = index;
        stepsTrack.style.transform = `translateX(-${index * 100}%)`;
        stepCards.forEach(c => c.classList.remove('active'));
        stepDots.forEach(d => d.classList.remove('active'));
        stepCards[index].classList.add('active');
        stepDots[index].classList.add('active');
    }

    stepDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToStep(Number(dot.dataset.step));
            resetAutoplay();
        });
    });

    function resetAutoplay() {
        clearInterval(stepAutoplay);
        stepAutoplay = setInterval(() => {
            goToStep((currentStep + 1) % stepCards.length);
        }, 5000);
    }

    if (stepsTrack && stepCards.length) {
        resetAutoplay();
        // Pause on hover
        stepsTrack.addEventListener('mouseenter', () => clearInterval(stepAutoplay));
        stepsTrack.addEventListener('mouseleave', resetAutoplay);
        // Swipe support
        let touchStartX = 0;
        stepsTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; clearInterval(stepAutoplay); }, { passive: true });
        stepsTrack.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goToStep(diff > 0 ? Math.min(currentStep + 1, stepCards.length - 1) : Math.max(currentStep - 1, 0));
            }
            resetAutoplay();
        }, { passive: true });
    }

    // === GALLERY EXPANSION SETUP ===
    
    // Student Results Gallery
    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn', 'toggle-gallery-btn-ru',
        'View All Proof', 'Hide Results', 
        'Показать доказательства', 'Свернуть'
    );

    // Education/Diploma Gallery
    setupGalleryToggle(
        'diploma-gallery',
        'toggle-diploma-btn', 'toggle-diploma-btn-ru',
        'View All Credentials', 'Hide Credentials',
        'Показать все дипломы', 'Скрыть дипломы'
    );
});

function setLang(lang) {
    localStorage.setItem('site_lang', lang);

    document.querySelectorAll('.en, .ru').forEach(e => {
        if (e.classList.contains(lang)) {
            e.hidden = false;
        } else {
            e.hidden = true;
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // Update HTML lang attribute for accessibility/SEO
    document.documentElement.lang = lang;
}
