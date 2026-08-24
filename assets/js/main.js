
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
