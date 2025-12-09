// Reusable function to set up the expandable carousel logic
function setupGalleryToggle(containerId, enButtonId, ruButtonId, enExpandText, enCollapseText, ruExpandText, ruCollapseText) {
    const container = document.getElementById(containerId);
    const btnEn = document.getElementById(enButtonId);
    const btnRu = document.getElementById(ruButtonId);

    // If any element is missing, exit the function
    if (!container || !btnEn || !btnRu) return;

    function toggle() {
        container.classList.toggle('expanded');
        const isExpanded = container.classList.contains('expanded');
        
        // Update both buttons for consistency regardless of current language view
        if (isExpanded) {
            btnEn.textContent = enCollapseText;
            btnRu.textContent = ruCollapseText;
        } else {
            btnEn.textContent = enExpandText;
            btnRu.textContent = ruExpandText;
        }
    }

    btnEn.addEventListener('click', toggle);
    btnRu.addEventListener('click', toggle);
}


document.addEventListener('DOMContentLoaded', () => {
    // === LANGUAGE TOGGLE LOGIC (Robust, with Memory) ===
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLang(lang);
        });
    });

    // === GALLERY EXPANSION SETUP ===
    
    // Setup Student Achievement Gallery
    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn', 'toggle-gallery-btn-ru',
        'View All Proof', 'Hide Photos', 
        'Показать все доказательства', 'Свернуть фото'
    );

    // Setup Diploma Gallery
    setupGalleryToggle(
        'diploma-gallery',
        'toggle-diploma-btn', 'toggle-diploma-btn-ru',
        'View All Diplomas', 'Hide Diplomas',
        'Показать все дипломы', 'Скрыть дипломы'
    );
});


function setLang(lang) {
    // Save selection to memory
    localStorage.setItem('site_lang', lang);

    // Toggle Text Visibility (works for all elements with .en, .ru, etc.)
    document.querySelectorAll('.en, .ru').forEach(e => {
        e.hidden = !e.classList.contains(lang);
    });
    
    // Update Buttons Visual State (Active/Inactive)
    document.querySelectorAll('.lang-btn').forEach(b => {
        if (b.getAttribute('data-lang') === lang) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}
