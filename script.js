document.addEventListener('DOMContentLoaded', () => {
    // Check if user has a saved language, otherwise default to 'en'
    const savedLang = localStorage.getItem('site_lang') || 'en';
    // Initialize the language setting
    setLang(savedLang);

    // Attach event listeners to all language buttons
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLang(lang);
        });
    });
});

function setLang(lang) {
    // Save selection to memory
    localStorage.setItem('site_lang', lang);

    // Toggle Text Visibility (works for all elements with .en, .ru, etc.)
    // It hides all text elements that DO NOT match the selected language class.
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
