function setLang(lang){
  document.querySelectorAll('.en').forEach(e=>e.hidden = (lang!=='en'));
  document.querySelectorAll('.ru').forEach(e=>e.hidden = (lang!=='ru'));
  document.querySelectorAll('.langs button').forEach(b=>b.classList.remove('active'));
  if(lang==='en') document.querySelector('.langs button:nth-child(1)').classList.add('active');
  else document.querySelector('.langs button:nth-child(2)').classList.add('active');
}
