// CAC Liberty Land - small client script for nav and contact
document.addEventListener('DOMContentLoaded', function(){
  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        const nav = document.querySelector('.main-nav ul');
        if(window.innerWidth <= 768 && nav && nav.style.display === 'flex'){
          toggleNav();
        }
      }
    });
  });

  // contact form handling
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value || 'Friend';
      alert('Thanks ' + name + '! Your message has been received.');
      form.reset();
    });
  }
});

function toggleNav(){
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav ul');
  if(!nav) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  if(expanded){
    nav.style.display = 'none';
    btn.setAttribute('aria-expanded','false');
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '10px';
    btn.setAttribute('aria-expanded','true');
  }
}
