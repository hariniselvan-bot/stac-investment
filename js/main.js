/* ============================================================
   STACKLY — main.js
   AOS init, magnetic buttons, misc shared behaviour
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* AOS is used as a lightweight fallback / secondary reveal system */
  if (typeof window.AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: reduced
    });
  }

  /* Magnetic hover on primary CTAs (desktop pointers only) */
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var strength = 14;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = 'translate(' + x * strength + 'px,' + y * strength + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* Trusted strip: duplicate logos for an even wrap on wide screens */
  var trusted = document.querySelector('.trusted-row');
  if (trusted) {
    trusted.querySelectorAll('.t-logo').forEach(function (logo, i) {
      logo.style.transitionDelay = (i * 0.05) + 's';
    });
  }

  /* ---------- Blog: search + category filtering ---------- */
  var grid = document.getElementById('blogGrid');
  if (grid) {
    var searchInput = document.getElementById('blogSearch');
    var filterLinks = document.querySelectorAll('#blogFilters a');
    var emptyMsg = document.getElementById('blogEmpty');
    var activeFilter = 'all';

    function applyFilters() {
      var q = (searchInput.value || '').trim().toLowerCase();
      var visible = 0;
      grid.querySelectorAll('.article-card').forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var text = (card.getAttribute('data-title') + ' ' + card.textContent).toLowerCase();
        var show = (activeFilter === 'all' || cat === activeFilter) && (!q || text.indexOf(q) !== -1);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (emptyMsg) emptyMsg.classList.toggle('show', visible === 0);
    }

    filterLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        filterLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
        activeFilter = link.getAttribute('data-filter');
        applyFilters();
      });
    });
    if (searchInput) searchInput.addEventListener('input', applyFilters);
  }
})();
