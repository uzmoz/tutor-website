function setLang(lang){
  document.querySelectorAll('.en').forEach(e => e.hidden = (lang !== 'en'));
  document.querySelectorAll('.ru').forEach(e => e.hidden = (lang !== 'ru'));
}
