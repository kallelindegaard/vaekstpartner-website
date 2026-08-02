const mobileToggle = document.getElementById('mobileToggle');
const mobilePanel = document.getElementById('mobilePanel');
mobileToggle?.addEventListener('click', () => {
  const open = mobilePanel.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.textContent = open ? '×' : '☰';
});
mobilePanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobilePanel.classList.remove('open');
  mobileToggle.textContent = '☰';
  mobileToggle.setAttribute('aria-expanded','false');
}));

const bookingModal = document.getElementById('bookingModal');
const serviceModal = document.getElementById('serviceModal');

function openModal(modal){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(modal){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('.js-book').forEach(btn => btn.addEventListener('click',()=>openModal(bookingModal)));
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click',()=>closeModal(btn.closest('.modal'))));
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if(e.target===m) closeModal(m); }));
document.addEventListener('keydown', e => { if(e.key==='Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });

const services = {
  website: {
    title:'Professionelle hjemmesider',
    text:'Vi designer moderne, mobilvenlige hjemmesider med et klart mål: at gøre det nemt for besøgende at forstå virksomheden og tage kontakt.',
    list:['Strategi og sidestruktur','Tekster og call-to-actions','Responsivt design','Kontaktformular','Grundlæggende SEO','Test før lancering']
  },
  marketing: {
    title:'Digital markedsføring',
    text:'Vi udvikler kampagner og indhold, der passer til virksomhedens målgruppe, produkter og visuelle identitet.',
    list:['Contentplan','SoMe-opslag og captions','Produktreklamer','Kampagneidéer','Stories og bannere','Månedlig evaluering']
  },
  advice: {
    title:'Rådgivning og vækst',
    text:'Vi analyserer virksomhedens digitale tilstedeværelse og giver en enkel, prioriteret plan for de vigtigste forbedringer.',
    list:['Websiteanalyse','Konkurrentoverblik','Målgruppe og budskaber','Prioriteret handlingsplan','Løbende sparring','Resultatopfølgning']
  }
};
document.querySelectorAll('.service-open').forEach(btn => btn.addEventListener('click',()=>{
  const s=services[btn.dataset.service];
  document.getElementById('serviceTitle').textContent=s.title;
  document.getElementById('serviceContent').innerHTML=`<p style="color:var(--muted);line-height:1.7">${s.text}</p><ul class="service-detail-list">${s.list.map(x=>`<li>${x}</li>`).join('')}</ul><button class="btn btn-primary js-service-book" type="button">Book gratis analyse</button>`;
  openModal(serviceModal);
  document.querySelector('.js-service-book').addEventListener('click',()=>{closeModal(serviceModal);openModal(bookingModal);});
}));

function validEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);}
function showStatus(el,msg,type){el.textContent=msg;el.className=`form-status show ${type}`;}

document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const company=document.getElementById('company').value.trim();
  const email=document.getElementById('email').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const interest=document.getElementById('interest').value;
  const message=document.getElementById('message').value.trim();
  const status=document.getElementById('contactStatus');
  if(!name||!company||!email||!message||!validEmail(email)){
    showStatus(status,'Udfyld venligst alle obligatoriske felter med en gyldig e-mail.','error'); return;
  }
  const subject=encodeURIComponent(`Ny henvendelse fra ${company}`);
  const body=encodeURIComponent(`Navn: ${name}\nVirksomhed: ${company}\nE-mail: ${email}\nTelefon: ${phone}\nInteresse: ${interest}\n\nBesked:\n${message}`);
  showStatus(status,'Dit mailprogram åbner nu med en færdigskrevet besked.','success');
  window.location.href=`mailto:kontakt@vaekstpartner.dk?subject=${subject}&body=${body}`;
});

document.getElementById('bookingForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const name=document.getElementById('bookName').value.trim();
  const company=document.getElementById('bookCompany').value.trim();
  const email=document.getElementById('bookEmail').value.trim();
  const phone=document.getElementById('bookPhone').value.trim();
  const time=document.getElementById('bookTime').value;
  const need=document.getElementById('bookNeed').value.trim();
  const status=document.getElementById('bookingStatus');
  if(!name||!company||!email||!phone||!validEmail(email)){
    showStatus(status,'Udfyld navn, virksomhed, telefon og en gyldig e-mail.','error'); return;
  }
  const subject=encodeURIComponent(`Ønske om gratis analyse – ${company}`);
  const body=encodeURIComponent(`Navn: ${name}\nVirksomhed: ${company}\nE-mail: ${email}\nTelefon: ${phone}\nForetrukket tidspunkt: ${time || 'Ikke angivet'}\n\nEmne:\n${need || 'Gratis analyse af virksomhedens digitale tilstedeværelse'}`);
  showStatus(status,'Dit mailprogram åbner nu. Send mailen for at færdiggøre bookingen.','success');
  window.location.href=`mailto:kontakt@vaekstpartner.dk?subject=${subject}&body=${body}`;
});

// ---- Combined script block ----

/* Premium motion, kept subtle and honest */
const siteHeader = document.querySelector('header');
const updateHeader = () => siteHeader?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -30px 0px'});

document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const laptop = document.querySelector('.laptop');
const visual = document.querySelector('.visual');
if(laptop && visual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  visual.addEventListener('mousemove', e=>{
    const r=visual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    laptop.style.transform=`translateY(-20px) perspective(1200px) rotateY(${x*5-3}deg) rotateX(${-y*3+1}deg)`;
  });
  visual.addEventListener('mouseleave',()=>{
    laptop.style.transform='';
  });
}