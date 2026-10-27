/* ============================================================
   STACKLY — navigation.js
   Header scroll state, mobile menu, active links, back-to-top
   ============================================================ */
(function () {
  'use strict';

  /* If the animation layer isn't loaded on this page, show everything */
  if (typeof window.gsap === 'undefined') {
    document.documentElement.classList.add('no-anim');
  }

  var header = document.querySelector('.site-header');

  /* Darken the floating bar after scrolling past the fold edge */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mark the active nav link based on its resolved page path */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-menu nav a').forEach(function (link) {
    var href = new URL(link.getAttribute('href'), location.href);
    if (href.pathname.split('/').pop() === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    var closeButton = menu.querySelector('.mobile-menu-close');
    function setMenuOpen(open) {
      menu.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      setMenuOpen(open);
      /* Stagger the link entrance */
      if (open) {
        menu.querySelectorAll('nav a').forEach(function (a, i) {
          a.style.transitionDelay = (0.06 * i + 0.08) + 's';
        });
      }
    });
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        setMenuOpen(false);
        toggle.focus();
      });
    }
    /* Close on Escape for keyboard users */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  /* Back to top */
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Graceful image fallback: hide broken imagery instead of a broken icon */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.opacity = '0';
      var holder = img.closest('.service-media, .article-media, .stat-figure, .about-media, .feature-media, .sd-media');
      if (holder) holder.style.background = 'linear-gradient(135deg, #182723, #101816)';
    });
  });
})();
