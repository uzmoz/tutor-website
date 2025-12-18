// ===============================
// Language toggle (EN / RU)
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
// Expandable gallery logic
// (kept for future use, NOT removed)
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
    const expanded = container.classList.contains('expanded');

    btnEn.textContent = expanded ? enCollapseText : enExpandText;
    btnRu.textContent = expanded ? ruCollapseText : ruExpandText;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  btnEn.addEventListener('click', toggle);
  btnRu.addEventListener('click', toggle);
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

  // Gallery hooks are intentionally kept
  // Uncomment if galleries are re-enabled later

  /*
  setupGalleryToggle(
    'achievement-gallery',
    'toggle-gallery-btn',
    'toggle-gallery-btn-ru',
    'View All Proof',
    'Hide Proof',
    'Показать все доказательства',
    'Свернуть'
  );

  setupGalleryToggle(
    'diploma-gallery',
    'toggle-diploma-btn',
    'toggle-diploma-btn-ru',
    'View All Diplomas',
    'Hide Diplomas',
    'Показать все дипломы',
    'Скрыть'
  );
  */
});
