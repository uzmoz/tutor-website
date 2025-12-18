function setupGalleryToggle(containerId, enButtonId, ruButtonId, enExpandText, enCollapseText, ruExpandText, ruCollapseText) {
  const container = document.getElementById(containerId);
  const btnEn = document.getElementById(enButtonId);
  const btnRu = document.getElementById(ruButtonId);
  if (!container || !btnEn || !btnRu) return;

  function toggle() {
    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');

    btnEn.textContent = isExpanded ? enCollapseText : enExpandText;
    btnRu.textContent = isExpanded ? ruCollapseText : ruExpandText;
  }

  btnEn.addEventListener('click', toggle);
  btnRu.addEventListener('click', toggle);
}

function setLang(lang) {
  localStorage.setItem('site_lang', lang);
  document.querySelectorAll('.en, .ru').forEach(e => {
    e.hidden = !e.classList.contains(lang);
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('site_lang') || 'en';
  setLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
      setLang(button.dataset.lang);
    });
  });
});
