// --- CAROUSEL EXPANSION LOGIC ---
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

// --- LANGUAGE TOGGLE LOGIC ---
function setLang(lang) {
    // Save selection to memory
    localStorage.setItem('site_lang', lang);

    // Toggle Text Visibility (works for all elements with .en, .ru, etc.)
    document.querySelectorAll('.en, .ru').forEach(e => {
        // e.hidden is a built-in property for elements
        e.hidden = !e.classList.contains(lang);
    });
    
    // Update Buttons Visual State (Active/Inactive)
    document.querySelectorAll('.langs button').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-lang') === lang) {
            b.classList.add('active');
        }
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set language based on saved preference or default to 'en'
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);

    // 2. Setup Student Achievement Gallery
    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn-en', 'toggle-gallery-btn-ru',
        'View All Proof', 'Hide Photos', 
        'Показать все доказательства', 'Свернуть фото'
    );

    // 3. Setup Diploma Gallery
    setupGalleryToggle(
        'diploma-gallery',
        'toggle-diploma-btn-en', 'toggle-diploma-btn-ru',
        'View All Diplomas', 'Hide Diplomas',
        'Показать все дипломы', 'Скрыть дипломы'
    );
});
