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

    // === GALLERY EXPANSION LOGIC ===
    const toggleBtnEn = document.getElementById('toggle-gallery-btn');
    const toggleBtnRu = document.getElementById('toggle-gallery-btn-ru');
    const galleryContainer = document.getElementById('achievement-gallery');
    
    // Function to handle the expansion toggle
    function toggleGallery(btn) {
        galleryContainer.classList.toggle('expanded');
        
        const isExpanded = galleryContainer.classList.contains('expanded');
        
        // Update the button text
        if (isExpanded) {
            if (btn === toggleBtnEn) {
                btn.textContent = 'Hide Photos';
            } else if (btn === toggleBtnRu) {
                btn.textContent = 'Свернуть фото';
            }
        } else {
            if (btn === toggleBtnEn) {
                btn.textContent = 'View All Proof';
            } else if (btn === toggleBtnRu) {
                btn.textContent = 'Показать все доказательства';
            }
        }
    }

    // Attach listeners to both language buttons
    if (toggleBtnEn) {
        toggleBtnEn.addEventListener('click', () => toggleGallery(toggleBtnEn));
    }
    if (toggleBtnRu) {
        toggleBtnRu.addEventListener('click', () => toggleGallery(toggleBtnRu));
    }
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
}
