// P-MAN TECH - site script: cart, compare, search, reviews, dark mode
const CART_KEY = 'pmanCart_v1';
const COMPARE_KEY = 'pmanCompare_v1';
const REVIEWS_KEY = 'pmanReviews_v1';

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  updateCartCount();
  setupAddToCartButtons();
  setupCompareButtons();
  setupSearch();
  setupCompareModal();
  setupCartModal();
  setupReviewForms();
  setupMobileToggle();
});

/* Theme */
function initTheme(){
  const prefer = localStorage.getItem('pman_theme');
  if(prefer === 'light') document.documentElement.classList.add('light');
  // toggle button
  const tgl = document.querySelector('#theme-toggle');
  if(tgl) tgl.addEventListener('click', ()=>{
    if(document.documentElement.classList.contains('light')){
      document.documentElement.classList.remove('light');
      localStorage.setItem('pman_theme','dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('pman_theme','light');
    }
  });
}

/* CART */
function loadCart(){
  try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return []}
}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));}
function addToCart(item){const cart = loadCart();
  const found = cart.find(i=>i.id===item.id);
  if(found){found.qty += 1;} else {item.qty=1; cart.push(item);} saveCart(cart); updateCartCount(); showCartNotification(item.title)}
function updateCartCount(){const c = loadCart(); const el = document.querySelector('#cart-count'); if(el) el.textContent = c.reduce((s,i)=>s+i.qty,0);} 
function showCartNotification(title){const n = document.createElement('div');n.textContent = `${title} added to cart`; n.style.position='fixed'; n.style.right='20px'; n.style.bottom='20px'; n.style.background='#00d4ff'; n.style.color='#001'; n.style.padding='10px 14px'; n.style.borderRadius='8px'; n.style.zIndex=9999; document.body.appendChild(n); setTimeout(()=>n.remove(),1800)}

function setupAddToCartButtons(){document.querySelectorAll('.btn-add').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.product');
    const item = {id:card.dataset.id,title:card.dataset.title,price:parseFloat(card.dataset.price),img:card.dataset.img};
    addToCart(item);
  });
});}

/* CART MODAL */
function setupCartModal(){const open = document.querySelector('#open-cart'); if(!open) return; open.addEventListener('click', ()=>{
  const modal = buildCartModal(); document.body.appendChild(modal);
});}
function buildCartModal(){const modal = document.createElement('div'); modal.className='modal'; modal.id='cart-modal'; const cart = loadCart(); let html = `<h3>Your Cart</h3>`; if(cart.length===0){html+=`<p class="kv">Cart is empty</p>`;} else {html+=`<div>`; cart.forEach(i=>{html+=`<div style="display:flex;gap:10px;align-items:center;margin:8px 0"><img src="${i.img}" width="64" style="border-radius:6px"><div><div style="font-weight:700">${i.title}</div><div class="kv">Qty: ${i.qty} • $${(i.price*i.qty).toFixed(2)}</div></div></div>`}); const total = cart.reduce((s,i)=>s+i.price*i.qty,0); html+=`<div style="margin-top:12px;font-weight:700">Total: $${total.toFixed(2)}</div><div style="margin-top:12px"><button class="btn" onclick="checkout()">Checkout</button> <button class="btn-outline" onclick="closeModal('cart-modal')">Close</button></div>`; html+=`</div>`;} modal.innerHTML = html; return modal}
function checkout(){alert('Demo checkout — integrate a payment provider to accept orders.'); closeModal('cart-modal')}
function closeModal(id){const el = document.getElementById(id); if(el) el.remove()}

/* COMPARE */
function loadCompare(){try{return JSON.parse(localStorage.getItem(COMPARE_KEY))||[];}catch(e){return []}}
function saveCompare(s){localStorage.setItem(COMPARE_KEY,JSON.stringify(s));}
function setupCompareButtons(){document.querySelectorAll('.btn-compare').forEach(b=>{b.addEventListener('click', ()=>{
  const card = b.closest('.product'); const id = card.dataset.id; const title = card.dataset.title; const specs = JSON.parse(card.dataset.specs||'{}');
  let cur = loadCompare(); if(cur.find(x=>x.id===id)){cur = cur.filter(x=>x.id!==id);} else {if(cur.length>=3){alert('You can compare up to 3 products'); return;} cur.push({id,title,specs,img:card.dataset.img,price:card.dataset.price});}
  saveCompare(cur); showCompareCount();})}); showCompareCount();}
function showCompareCount(){const el = document.querySelector('#compare-count'); const cur = loadCompare(); if(el) el.textContent = cur.length;}
function setupCompareModal(){const open = document.querySelector('#open-compare'); if(!open) return; open.addEventListener('click', ()=>{
  const cur = loadCompare(); if(cur.length<2){alert('Select at least 2 products to compare'); return;} const modal = document.createElement('div'); modal.className='modal'; modal.id='compare-modal'; let html = `<h3>Compare Products</h3><div style="display:flex;gap:12px">`;
  // build columns
  const keys = [...new Set(cur.flatMap(c=>Object.keys(c.specs)))]
  html += `<div style="min-width:200px"></div>`;
  cur.forEach(c=>{html+=`<div style="min-width:200px;text-align:center"><img src="${c.img}" width="120" style="border-radius:8px"><div style="font-weight:700;margin-top:6px">${c.title}</div><div class="kv">$${parseFloat(c.price).toFixed(2)}</div></div>`})
  html += `</div><div style="margin-top:12px">`;
  keys.forEach(k=>{html+=`<div style="display:flex;gap:12px;align-items:center;margin:6px 0"><div style="width:200px" class="kv">${k}</div>`; cur.forEach(c=>{html+=`<div style="min-width:200px">${c.specs[k]||'—'}</div>`}); html+=`</div>`});
  html += `</div><div style="margin-top:12px"><button class="btn-outline" onclick="closeModal('compare-modal')">Close</button></div>`;
  modal.innerHTML=html; document.body.appendChild(modal);
});}

/* SEARCH */
function setupSearch(){const input = document.querySelector('#search'); if(!input) return; input.addEventListener('input', ()=>{
  const q = input.value.toLowerCase().trim(); document.querySelectorAll('.product').forEach(card=>{
    const title = card.dataset.title.toLowerCase(); const tags = (card.dataset.tags||'').toLowerCase();
    if(!q || title.includes(q) || tags.includes(q)) card.style.display='flex'; else card.style.display='none';
  });});}

/* REVIEWS */
function setupReviewForms(){document.querySelectorAll('.review-form').forEach(form=>{
  form.addEventListener('submit', e=>{e.preventDefault(); const id = form.dataset.for; const name = form.querySelector('[name="name"]').value||'Guest'; const text = form.querySelector('[name="text"]').value||''; const r = {name,text,at:(new Date()).toISOString()}; saveReview(id,r); form.reset(); renderReviews(id);}); renderReviews(form.dataset.for);
});}
function saveReview(productId, review){const all = JSON.parse(localStorage.getItem(REVIEWS_KEY)||'{}'); if(!all[productId]) all[productId]=[]; all[productId].push(review); localStorage.setItem(REVIEWS_KEY,JSON.stringify(all));}
function renderReviews(productId){const area = document.querySelector(`#reviews-${productId}`); if(!area) return; area.innerHTML=''; const all = JSON.parse(localStorage.getItem(REVIEWS_KEY)||'{}'); const list = all[productId]||[]; if(list.length===0){area.innerHTML='<div class="kv">No reviews yet</div>'; return;} list.slice().reverse().forEach(r=>{const d = document.createElement('div'); d.className='review'; d.innerHTML=`<div style="font-weight:700">${escapeHtml(r.name)}</div><div class="kv">${new Date(r.at).toLocaleString()}</div><div style="margin-top:6px">${escapeHtml(r.text)}</div>`; area.appendChild(d);});}

/* HELPERS */
function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}

/* initial UI counts */
function showCompareCount(){const el = document.querySelector('#compare-count'); const cur = loadCompare(); if(el) el.textContent = cur.length;}

/* Expose for HTML buttons */
window.addToCart = function(id){ const card = document.querySelector(`.product[data-id="${id}"]`); if(card){ addToCart({id,title:card.dataset.title,price:parseFloat(card.dataset.price),img:card.dataset.img}); }}

// Open cart modal directly (avoid triggering inline click handlers)
window.openCart = function(){
  const existing = document.getElementById('cart-modal'); if(existing) return;
  const modal = buildCartModal(); document.body.appendChild(modal);
}

// Open compare modal directly using current compare items
window.openCompare = function(){
  const cur = loadCompare(); if(cur.length<2){alert('Select at least 2 products to compare'); return;} if(document.getElementById('compare-modal')) return;
  const modal = document.createElement('div'); modal.className='modal'; modal.id='compare-modal'; let html = `<h3>Compare Products</h3><div style="display:flex;gap:12px">`;
  const keys = [...new Set(cur.flatMap(c=>Object.keys(c.specs)))]
  html += `<div style="min-width:200px"></div>`;
  cur.forEach(c=>{html+=`<div style="min-width:200px;text-align:center"><img src="${c.img}" width="120" style="border-radius:8px"><div style="font-weight:700;margin-top:6px">${c.title}</div><div class="kv">$${parseFloat(c.price).toFixed(2)}</div></div>`})
  html += `</div><div style="margin-top:12px">`;
  keys.forEach(k=>{html+=`<div style="display:flex;gap:12px;align-items:center;margin:6px 0"><div style="width:200px" class="kv">${k}</div>`; cur.forEach(c=>{html+=`<div style="min-width:200px">${c.specs[k]||'—'}</div>`}); html+=`</div>`});
  html += `</div><div style="margin-top:12px"><button class="btn-outline" onclick="closeModal('compare-modal')">Close</button></div>`;
  modal.innerHTML=html; document.body.appendChild(modal);
}

/* Mobile nav toggle */
function setupMobileToggle(){
  const btn = document.querySelector('#mobile-toggle');
  const nav = document.querySelector('#main-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('mobile-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close when clicking outside the nav on mobile
  document.addEventListener('click', (e)=>{
    if(!nav.contains(e.target) && !btn.contains(e.target)){
      if(nav.classList.contains('mobile-open')) nav.classList.remove('mobile-open');
    }
  });
}
