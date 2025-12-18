// ===============================
// Expandable carousel logic
// ===============================
function setupGalleryToggle(
  containerId,
  enButtonId,
  ruButtonId,
  enExpandText,
  enCollapseText,
  ruExpandText,
  ruCollapseText
) {
  const container = document.getElementById(containerId);
  const btnEn = document.getElementById(enButtonId);
  const btnRu = document.getElementById(ruButtonId);

  if (!container || !btnEn || !btnRu) return;

  function toggle() {
    const top = container.getBoundingClientRect().top + window.scrollY;

    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');

    if (isExpanded) {
      btnEn.textContent = enCollapseText;
      btnRu.textContent = ruCollapseText;
    } else {
      btnEn.textContent = enExpandText;
      btnRu.textContent = ruExpandText;
    }

    window.scrollTo({ top, behavior: 'smooth' });
  }

  btnEn.addEventListener('click', toggle);
  btnRu.addEventListener('click', toggle);
}

// ===============================
// Language logic (EN / RU)
// ===============================
function setLang(lang) {
  localStorage.setItem('site_lang', lang);

  document.querySelectorAll('.en, .ru').forEach(el => {
    el.hidden = !el.classList.contains(lang);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ===============================
// Init
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('site_lang') || 'en';
  setLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });

  // Diploma gallery
  setupGalleryToggle(
    'diploma-gallery',
    'toggle-diploma-btn',
    'toggle-diploma-btn-ru',
    'View All Diplomas',
    'Hide Diplomas',
    'Показать все дипломы',
    'Скрыть дипломы'
  );

  // Student results gallery
  setupGalleryToggle(
    'achievement-gallery',
    'toggle-gallery-btn',
    'toggle-gallery-btn-ru',
    'View All Proof',
    'Hide Proof',
    'Показать все доказательства',
    'Свернуть'
  );
});
