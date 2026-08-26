
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


// Freccia laterale "Torna su" - tutte le pagine
(() => {
  const style = document.createElement('style');
  style.textContent = `.back-to-top{position:fixed;right:22px;bottom:92px;width:48px;height:48px;border:0;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-size:25px;font-weight:900;box-shadow:0 10px 28px rgba(0,0,0,.28);cursor:pointer;z-index:1999;opacity:0;visibility:hidden;transform:translateY(10px);transition:.25s}.back-to-top.show{opacity:1;visibility:visible;transform:none}.back-to-top:hover{background:#25d366;color:#fff}@media(max-width:580px){.back-to-top{right:18px;bottom:88px;width:46px;height:46px}}`;
  document.head.appendChild(style);
  const btn=document.createElement('button');
  btn.className='back-to-top'; btn.type='button'; btn.setAttribute('aria-label','Torna in cima'); btn.innerHTML='↑';
  document.body.appendChild(btn);
  const update=()=>btn.classList.toggle('show',window.scrollY>420);
  window.addEventListener('scroll',update,{passive:true}); update();
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
