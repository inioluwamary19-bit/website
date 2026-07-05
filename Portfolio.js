// My Portfolio interactivity
function setupNav(){
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if(ham) ham.addEventListener('click',()=>{nav.classList.toggle('active'); ham.classList.toggle('active')});
}

function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
      const nav = document.querySelector('.nav-links');
      const ham = document.querySelector('.hamburger');
      if(nav && nav.classList.contains('active')){
        nav.classList.remove('active');
        ham.classList.remove('active');
      }
    });
  });
}

function setupScrollToTop(){
  const s = document.querySelector('.scroll-to-top');
  if(!s) return;
  window.addEventListener('scroll',()=>{ s.style.display = window.pageYOffset>300? 'flex':'none'; });
  s.addEventListener('click',()=> window.scrollTo({top:0,behavior:'smooth'}));
}

function setupContactForm(){
  const form = document.querySelector('.contact-form');
  if(!form) return;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const msg = inputs[2].value;
    console.log('Message:',{name,email,msg});
    const success = document.createElement('div');
    success.style.cssText = 'background:#27ae60;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:12px;text-align:center;font-weight:600';
    success.textContent = '✓ Message sent! I will get back to you soon.';
    form.parentNode.insertBefore(success,form);
    form.reset();
    setTimeout(()=>success.remove(),3000);
  });
}

function setupScrollAnimations(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.animation = 'fadeIn .6s ease forwards';
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.work-card, .stat-box, .info-item').forEach(el=>observer.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  setupNav();
  setupSmoothScroll();
  setupScrollToTop();
  setupContactForm();
  setupScrollAnimations();
  const ctaBtn = document.getElementById('cta-btn');
  if(ctaBtn) ctaBtn.addEventListener('click',()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'}));
});
