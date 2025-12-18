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
        }
    }

    btnEn.addEventListener('click', toggle);
    btnRu.addEventListener('click', toggle);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLang(lang);
        });
    });

    setupGalleryToggle(
        'achievement-gallery',
        'toggle-gallery-btn', 'toggle-gallery-btn-ru',
        'View All Proof', 'Hide Photos', 
        'Показать все доказательства', 'Свернуть фото'
    );

    setupGalleryToggle(
        'diploma-gallery',
        'toggle-diploma-btn', 'toggle-diploma-btn-ru',
        'View All Diplomas', 'Hide Diplomas',
        'Показать все дипломы', 'Скрыть дипломы'
    );
});

function setLang(lang) {
    localStorage.setItem('site_lang', lang);

    document.querySelectorAll('.en, .ru').forEach(e => {
        e.hidden = !e.classList.contains(lang);
    });
    
    document.querySelectorAll('.lang-btn').forEach(b => {
        if (b.getAttribute('data-lang') === lang) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}
