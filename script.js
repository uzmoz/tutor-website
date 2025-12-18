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
            // Scroll back to the top of the section when collapsing
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

    // === GALLERY EXPANSION SETUP ===
    
    // Student Results Gallery
    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn', 'toggle-gallery-btn-ru',
        'View Student Proof', 'Hide Results', 
        'Результаты учеников', 'Свернуть'
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
            // Handle display for non-block elements if needed, but 'hidden' attribute is SEO friendly
        } else {
            e.hidden = true;
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
}
