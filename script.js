// Smooth scrolling for internal links + active nav link
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if(window.innerWidth < 900) toggleMobileMenu(false);
      }
    });
  });
  
  const navLinks = document.querySelectorAll('.nav-link');
  function onScroll(){
    const fromTop = window.scrollY + 120;
    document.querySelectorAll('main section[id]').forEach(section=>{
      const id = section.id;
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if(fromTop >= top && fromTop < top + height){
        navLinks.forEach(n=>n.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  menuBtn && menuBtn.addEventListener('click', ()=> toggleMobileMenu());
  function toggleMobileMenu(force){
    const nav = document.getElementById('nav');
    if(force === false){
      nav.classList.remove('open-mobile');
      return;
    }
    nav.classList.toggle('open-mobile');
  }
  
  // Projects modal
  const projButtons = document.querySelectorAll('.proj-btn');
  const modal = document.getElementById('projModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.getElementById('modalClose');
  
  projButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.closest('.proj');
      const title = card.dataset.title || 'Project';
      const desc = card.dataset.desc || '';
      const link = card.dataset.link || '#';
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLink.href = link;
      modalLink.textContent = (link === '#' ? 'View details' : 'View Repo / Demo');
      openModal();
    });
  });
  
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
  function openModal(){
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }
  
  // Recommendation carousel (auto-advance)
  (function recCarousel(){
    const recs = Array.from(document.querySelectorAll('.rec'));
    if(!recs.length) return;
    let i = 0;
    setInterval(()=>{
      recs[i].classList.remove('active');
      i = (i+1) % recs.length;
      recs[i].classList.add('active');
    }, 4200);
  })();
  
  // small accessibility tweak: focus outlines for keyboard users
  document.body.addEventListener('keydown', e=>{
    if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });
  document.body.addEventListener('mousedown', ()=> document.documentElement.classList.remove('show-focus'));