document.addEventListener('DOMContentLoaded', () => {
    // Check if user has a saved language, otherwise default to 'en'
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);
});

function setLang(lang) {
    // Save selection to memory
    localStorage.setItem('site_lang', lang);

    // Toggle Text Visibility
    document.querySelectorAll('.en').forEach(e => e.hidden = (lang !== 'en'));
    document.querySelectorAll('.ru').forEach(e => e.hidden = (lang !== 'ru'));

    // Update Buttons Visual State
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    // Select the correct button based on text content logic
    const buttons = document.querySelectorAll('.langs button');
    if (lang === 'en') {
        buttons[0].classList.add('active');
    } else {
        buttons[1].classList.add('active');
    }
}
