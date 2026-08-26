
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
if(toggle && nav){
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
}
document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.category===f)?'block':'none';
    });
  });
});


/* Privacy & Cookie modal */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .legal-modal{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.78);display:none;align-items:center;justify-content:center;padding:20px}
    .legal-modal.open{display:flex}
    .legal-modal-card{width:min(920px,96vw);max-height:88vh;overflow:auto;background:#fff;color:#151515;border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.45);position:relative;padding:34px}
    .legal-modal-close{position:sticky;top:0;float:right;width:42px;height:42px;border:0;border-radius:50%;background:#111;color:#fff;font-size:25px;cursor:pointer;z-index:2}
    .legal-modal-content h1{font-size:30px;margin:0 50px 20px 0}.legal-modal-content h2{font-size:21px;margin-top:25px}
    .legal-modal-content p{line-height:1.7}.legal-modal-content a{color:#168a43}
    @media(max-width:600px){.legal-modal-card{padding:22px}.legal-modal-content h1{font-size:25px}}
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.className = 'legal-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = '<div class="legal-modal-card" role="dialog" aria-modal="true"><button class="legal-modal-close" aria-label="Chiudi">×</button><div class="legal-modal-content"></div></div>';
  document.body.appendChild(modal);
  const content = modal.querySelector('.legal-modal-content');

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  modal.querySelector('.legal-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

  async function openLegal(url, label){
    content.innerHTML = '<p>Caricamento...</p>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    try{
      const res = await fetch(url);
      if(!res.ok) throw new Error();
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text,'text/html');
      const legal = doc.querySelector('.legal .container');
      const pageTitle = doc.querySelector('main h1');
      content.innerHTML = `<h1>${pageTitle ? pageTitle.textContent : label}</h1>${legal ? legal.innerHTML : '<p>Contenuto non disponibile.</p>'}`;
    }catch(e){
      content.innerHTML = `<h1>${label}</h1><p>Non è stato possibile caricare il contenuto. <a href="${url}">Apri la pagina completa</a>.</p>`;
    }
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href') || '';
    const explicit = a.dataset.legalPopup;
    if(explicit || /(^|\/)(privacy|cookie)\.html(?:$|[?#])/.test(href)){
      e.preventDefault();
      openLegal(href, explicit === 'privacy' || href.includes('privacy') ? 'Privacy Policy' : 'Cookie Policy');
    }
  });
})();
