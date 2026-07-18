// ============================================================
// TEMIMA CABINETS — shared interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navLinks.style.display = navLinks.classList.contains('open') ? 'flex' : '';
    });
  }

  // Accordion (product page)
  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.closest('.acc-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Product gallery thumbnails
  document.querySelectorAll('.pg-thumbs img').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const main = document.querySelector('.pg-main img');
      document.querySelectorAll('.pg-thumbs img').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (main) main.src = thumb.src.replace('w=200', 'w=900');
    });
  });

  // Quantity steppers (product + cart)
  document.querySelectorAll('.pg-qty, .ci-qty').forEach(box => {
    const display = box.querySelector('span');
    const [minus, plus] = box.querySelectorAll('button');
    let qty = parseInt(display?.textContent || '1', 10);
    minus?.addEventListener('click', () => { qty = Math.max(1, qty - 1); if (display) display.textContent = qty; });
    plus?.addEventListener('click', () => { qty += 1; if (display) display.textContent = qty; });
  });

  // Color swatch selection (product page)
  document.querySelectorAll('.color-dots .dot, .pg-colors .dot').forEach(dot => {
    dot.addEventListener('click', () => {
      dot.parentElement.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Quick view (simple modal via alert-style toast, non-blocking)
  document.querySelectorAll('.js-quickview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Quick view — full modal wired up on production build.');
    });
  });

  // Wishlist heart toggle
  document.querySelectorAll('.p-fav').forEach(fav => {
    fav.addEventListener('click', () => {
      fav.classList.toggle('active');
      fav.style.color = fav.classList.contains('active') ? '#F58220' : '';
    });
  });

  // Quote form -> success screen
  const quoteForm = document.querySelector('.q-form form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      quoteForm.style.display = 'none';
      document.querySelector('.success-screen').style.display = 'block';
    });
  }

  // Payment option select (checkout)
  document.querySelectorAll('.pay-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('header.site');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px rgba(21,34,56,.06)' : 'none';
    });
  }

  // Simple toast utility
  window.toast = function (msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      Object.assign(t.style, {
        position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
        background: '#152238', color: '#FAF9F7', padding: '13px 22px', borderRadius: '999px',
        fontSize: '13.5px', fontFamily: 'Inter, sans-serif', zIndex: 999, opacity: 0,
        transition: 'opacity .25s ease', boxShadow: '0 12px 30px rgba(0,0,0,.25)'
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.style.opacity = 1);
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => { t.style.opacity = 0; }, 2200);
  };

  // Add to cart buttons -> toast + bump cart count
  document.querySelectorAll('.p-add, .js-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      toast('Added to cart');
      const badge = document.querySelector('.cart-count');
      if (badge) badge.textContent = (parseInt(badge.textContent, 10) + 1);
    });
  });

  // Color filter dots (category page) toggle active state
  document.querySelectorAll('.filters .dot').forEach(dot => {
    dot.addEventListener('click', () => dot.classList.toggle('active'));
  });

});
