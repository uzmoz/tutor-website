// --- CAROUSEL EXPANSION LOGIC ---
// Reusable function to set up the expandable carousel logic
// Now uses a single button ID and finds the language spans inside it.
function setupGalleryToggle(containerId, buttonId, enExpandText, enCollapseText, ruExpandText, ruCollapseText) {
    const container = document.getElementById(containerId);
    const btn = document.getElementById(buttonId);

    if (!container || !btn) return;
    
    // Find the language spans inside the single button
    const spanEn = btn.querySelector('.en');
    const spanRu = btn.querySelector('.ru');

    function toggle() {
        container.classList.toggle('expanded');
        const isExpanded = container.classList.contains('expanded');

        // Update the text content of BOTH spans (the visible one will update the UI)
        if (isExpanded) {
            spanEn.textContent = enCollapseText;
            spanRu.textContent = ruCollapseText;
        } else {
            spanEn.textContent = enExpandText;
            spanRu.textContent = ruExpandText;
        }
    }

    btn.addEventListener('click', toggle);
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
    // Now passes a single button ID
    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn',
        'View All Proof', 'Hide Photos', 
        'Показать все доказательства', 'Свернуть фото'
    );

    // 3. Setup Diploma Gallery
    // Now passes a single button ID
    setupGalleryToggle(
        'diploma-gallery',
        'toggle-diploma-btn',
        'View All Diplomas', 'Hide Diplomas',
        'Показать все дипломы', 'Скрыть дипломы'
    );
});
