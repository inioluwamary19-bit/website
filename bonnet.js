// Eniola Hair Bonnet - simple cart and interactions
let eniolaCart = [];
const cartKey = 'eniolaCart';

function loadCart(){ const s = localStorage.getItem(cartKey); eniolaCart = s? JSON.parse(s):[]; updateCartCount(); }
function saveCart(){ localStorage.setItem(cartKey, JSON.stringify(eniolaCart)); }
function updateCartCount(){ const el = document.querySelector('.cart-count'); if(!el) return; const total = eniolaCart.reduce((sum,i)=>sum+i.quantity,0); el.textContent = total; el.style.display = total>0? 'flex':'none'; }
function addToCart(name,price){ const it = eniolaCart.find(i=>i.name===name); if(it) it.quantity++; else eniolaCart.push({name,price,quantity:1}); saveCart(); updateCartCount(); showCartNotification(name); }
function showCartNotification(name){ const n = document.createElement('div'); n.className='cart-notification'; n.textContent = `✓ ${name} added to cart`; document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10); setTimeout(()=>{n.classList.remove('show'); setTimeout(()=>n.remove(),300)},1800); }

function setupAddButtons(){ document.querySelectorAll('.product-card').forEach(card=>{ const btn = card.querySelector('.btn-secondary'); if(!btn) return; const title = card.querySelector('h3').textContent; const price = parseFloat(card.querySelector('.price').textContent.replace('$',''))||0; btn.addEventListener('click',()=>addToCart(title,price)); }); }

function setupFiltersAndSearch(){ document.querySelectorAll('.filter-btn').forEach(btn=>{ btn.addEventListener('click',()=>{ document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const f = btn.getAttribute('data-filter'); document.querySelectorAll('.product-card').forEach(card=>{ const cat = card.getAttribute('data-category'); card.style.display = (f==='all' || f===cat)? 'block':'none'; }); }); }); const search = document.querySelector('.search-input'); if(search) search.addEventListener('input',(e)=>{ const q = e.target.value.toLowerCase(); document.querySelectorAll('.product-card').forEach(card=>{ const t = card.querySelector('h3').textContent.toLowerCase(); const d = card.querySelector('.description').textContent.toLowerCase(); card.style.display = (t.includes(q)||d.includes(q))? 'block':'none'; }); }); }

function setupContactForm(){ const form = document.querySelector('.contact-form'); if(!form) return; form.addEventListener('submit',(e)=>{ e.preventDefault(); const name = form.querySelector('input[type="text"]').value; const email = form.querySelector('input[type="email"]').value; const msg = form.querySelector('textarea').value; console.log('Contact:',{name,email,msg}); const s = document.createElement('div'); s.className='success-message'; s.textContent='✓ Message sent! I will contact you soon.'; form.parentNode.insertBefore(s,form); form.reset(); setTimeout(()=>s.remove(),3000); }); }

function setupNav(){ const ham = document.querySelector('.hamburger'); const nav = document.querySelector('.nav-links'); if(ham) ham.addEventListener('click',()=>{ nav.classList.toggle('active'); ham.classList.toggle('active'); }); }

function setupScrollToTop(){ const s = document.querySelector('.scroll-to-top'); if(!s) return; window.addEventListener('scroll',()=>{ s.style.display = window.pageYOffset>300? 'flex':'none'; }); s.addEventListener('click',()=> window.scrollTo({top:0,behavior:'smooth'})); }

document.addEventListener('DOMContentLoaded',()=>{ loadCart(); setupAddButtons(); setupFiltersAndSearch(); setupContactForm(); setupNav(); setupScrollToTop(); const view = document.getElementById('view-shop'); if(view){ view.addEventListener('click',()=>{ document.getElementById('shop').scrollIntoView({behavior:'smooth'}); }); } });