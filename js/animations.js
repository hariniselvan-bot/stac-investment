/* ============================================================
   STACKLY — animations.js
   Preloader, GSAP hero choreography, ScrollTrigger reveals,
   counters, parallax. Degrades gracefully without GSAP and
   respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  if (reduced || !hasGsap) {
    document.documentElement.classList.add('no-anim');
    /* Counters must still show their final values without animation */
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + el.getAttribute('data-count') + suffix;
    });
  }

  /* ---------- Preloader ---------- */
  var preloader = document.querySelector('.preloader');
  if (preloader) {
    var bar = preloader.querySelector('.preloader-bar span');
    if (bar && !reduced && hasGsap) {
      gsap.to(bar, { width: '100%', duration: 0.9, ease: 'power2.inOut' });
    } else if (bar) {
      bar.style.width = '100%';
    }
    var hide = function () {
      preloader.classList.add('done');
      document.body.classList.remove('is-loading');
      heroIntro();
    };
    /* No artificial delay: hide as soon as the page is ready (min 500ms for brand mark) */
    var start = performance.now();
    window.addEventListener('load', function () {
      var wait = Math.max(0, 500 - (performance.now() - start));
      setTimeout(hide, reduced ? 0 : wait);
    });
    /* Safety: never trap the user behind the preloader */
    setTimeout(hide, 3500);
  } else {
    heroIntro();
  }

  /* ---------- Hero entrance choreography ---------- */
  function heroIntro() {
    var hero = document.querySelector('.hero');
    if (!hero || reduced || !hasGsap) return;

    /* Split headline lines for a masked rise */
    hero.querySelectorAll('.hero h1 .line > span').forEach(function (span) {
      span.style.transform = 'translateY(110%)';
    });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.site-header', { y: -30, opacity: 0, duration: 0.8 })
      .fromTo('.hero-media img', { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .from('.hero-eyebrow', { opacity: 0, y: 18, duration: 0.7 }, 0.25)
      .to('.hero h1 .line > span', { y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.35)
      .from('.hero-lede', { opacity: 0, y: 24, duration: 0.8 }, 0.9)
      .from('.hero-ctas > *', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 1.05)
      .from('.hero-side', { opacity: 0, x: 24, duration: 0.9 }, 1.15)
      .from('.hero-scroll, .hero-count', { opacity: 0, duration: 0.9 }, 1.3);
  }

  if (reduced || !hasST) {
    /* Without GSAP everything stays visible (see .no-anim rules) */
    return;
  }

  /* ---------- Hero parallax ---------- */
  var heroImg = document.querySelector('.hero-media img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------- Generic scroll reveals ---------- */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    var delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);
    gsap.fromTo(el,
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0, duration: 0.9, delay: delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%' }
      });
  });

  /* Staggered groups */
  gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
    var items = group.children;
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 84%' }
      });
  });

  /* Image mask reveals */
  gsap.utils.toArray('.mask-reveal').forEach(function (el) {
    gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  /* ---------- Animated metric counters ---------- */
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: function () {
        el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
      }
    });
  });

  /* ---------- About image parallax ---------- */
  gsap.utils.toArray('.about-media img, .feature-media img, .sd-media img').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.closest('div'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
})();
