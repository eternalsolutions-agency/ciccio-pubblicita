(()=>{
const data=Array.isArray(window.CICCIO_CATALOGO)?window.CICCIO_CATALOGO:[];
const code=p=>String(p?.code||'').trim().toUpperCase();
const byCode=c=>data.find(p=>code(p)===String(c).trim().toUpperCase());
const byTitle=s=>data.find(p=>String(p?.title||'').toLowerCase().includes(String(s).toLowerCase()));
const rel=n=>`assets/images/catalogo-gallery/${n}`;

// A-411
let p=byCode('A-411');
if(p){p.price='€ 135,00';p.price_ex_vat='€ 135,00';}

// E035 e S26119: se per qualsiasi motivo fossero ancora presenti, vengono rimossi.
for(let i=data.length-1;i>=0;i--){
  const t=String(data[i]?.title||'').toUpperCase();
  if(code(data[i])==='S26119'||t.includes('E035')) data.splice(i,1);
}

// C-017 Limette Unghie ELIF
p=byCode('C-017');
const c017imgs=[rel('custom-C-017-01.png'),rel('custom-C-017-02.png'),rel('custom-C-017-03.png')];
if(!p){
  p={
    source_page:41,image:c017imgs[0],category:'Personal Care',type:'Personal care',
    title:'Limette Unghie “ELIF”',code:'C-017',price:'€ 99,00',qty:'100',
    offer:'STAMPA UN COLORE INCLUSA',
    summary:'6 limette in gomma EVA con dettagli glitter.',
    search:'limette unghie elif c-017 personal care 6 limette gomma eva dettagli glitter stampa un colore inclusa',
    price_ex_vat:'€ 99,00',vat_included:true,full_image:c017imgs[0],images:c017imgs
  };
  const pos=data.findIndex(x=>Number(x?.source_page)>=42);
  data.splice(pos>=0?pos:data.length,0,p);
}else{
  Object.assign(p,{source_page:41,title:'Limette Unghie “ELIF”',price:'€ 99,00',qty:'100',
    offer:'STAMPA UN COLORE INCLUSA',summary:'6 limette in gomma EVA con dettagli glitter.',
    price_ex_vat:'€ 99,00',image:c017imgs[0],full_image:c017imgs[0],images:c017imgs});
}

// AGM10 - sostituzione immagini, dati commerciali invariati
p=byCode('AGM10');
if(p){
  const a=[rel('custom-AGM10-01.png'),rel('custom-AGM10-02.png')];
  p.image=a[0];p.full_image=a[0];p.images=a;
}

// Z428 - sostituzione immagini
p=byCode('Z428');
if(p){
  const a=[rel('custom-Z428-01.png'),rel('custom-Z428-02.png')];
  p.image=a[0];p.full_image=a[0];p.images=a;
}

// 988 - aggiunta immagine, senza rimuovere quelle esistenti
p=byCode('988');
if(p){
  const a=Array.isArray(p.images)&&p.images.length?[...p.images]:[p.image].filter(Boolean);
  const n=rel('custom-988-02.png'); if(!a.includes(n)) a.push(n); p.images=a;
}

// 835 - aggiunta immagine, senza rimuovere quelle esistenti
p=byCode('835');
if(p){
  const a=Array.isArray(p.images)&&p.images.length?[...p.images]:[p.image].filter(Boolean);
  const n=rel('custom-835-03.png'); if(!a.includes(n)) a.push(n); p.images=a;
}

// 2849 - Zainetto Sacca, nuovo articolo pagina 70
p=byCode('2849');
const zimgs=[rel('custom-2849-01.png'),rel('custom-2849-02.png')];
if(!p){
  p={source_page:70,image:zimgs[0],category:'Tempo Libero',type:'Tempo libero',
    title:'Zainetto Sacca',code:'2849',price:'€ 167,00',qty:'100',offer:'',
    summary:'Zainetto sacca personalizzabile.',
    search:'zainetto sacca 2849 tempo libero 100 pezzi 167',
    price_ex_vat:'€ 167,00',vat_included:true,full_image:zimgs[0],images:zimgs};
  const pos=data.findIndex(x=>Number(x?.source_page)>=71);
  data.splice(pos>=0?pos:data.length,0,p);
}else{
  Object.assign(p,{source_page:70,title:'Zainetto Sacca',price:'€ 167,00',qty:'100',
    price_ex_vat:'€ 167,00',image:zimgs[0],full_image:zimgs[0],images:zimgs});
}

// 10559
p=byCode('10559');
if(p){p.price='€ 199,00';p.price_ex_vat='€ 199,00';p.qty='200';}

// 10250 Ventaglio pieghevole - aggiorna articolo già esistente
p=byCode('10250');
if(p){
  const a=[rel('custom-10250-01.png'),rel('custom-10250-02.png')];
  p.price='€ 149,00';p.price_ex_vat='€ 149,00';p.qty='100';
  p.image=a[0];p.full_image=a[0];p.images=a;
}

// TM 84 - solo prezzo e quantità
p=byTitle('TM 84 Matita Falegname/Carpentiere');
if(p){p.price='€ 89,00';p.price_ex_vat='€ 89,00';p.qty='200';}
})();