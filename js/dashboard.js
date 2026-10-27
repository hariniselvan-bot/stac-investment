/* ============================================================
   STACKLY — dashboard.js
   Sidebar, panel switching, animated bars, notifications.
   All data on dashboard pages is illustrative mock content.
   ============================================================ */
(function () {
  'use strict';

  var sidebar = document.querySelector('.dash-sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  var menuBtn = document.querySelector('.menu-btn');

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (overlay) overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  /* Panel switching */
  var navBtns = document.querySelectorAll('.dash-nav button[data-panel]');
  var panels = document.querySelectorAll('.dash-panel');
  var title = document.querySelector('.dash-topbar h1');
  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      navBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var id = btn.getAttribute('data-panel');
      panels.forEach(function (p) { p.classList.toggle('active', p.id === id); });
      if (title) title.textContent = btn.getAttribute('data-title') || btn.textContent.trim();
      closeSidebar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* Animate bar chart heights when visible */
  var chart = document.querySelector('.bar-chart');
  if (chart) {
    var bars = chart.querySelectorAll('.bar i');
    bars.forEach(function (b) { b.style.height = '0%'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          bars.forEach(function (b, i) {
            setTimeout(function () { b.style.height = b.getAttribute('data-h') + '%'; }, i * 60);
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(chart);
  }

  /* Notifications: mark-all-read */
  var notifBtn = document.querySelector('[data-clear-notifs]');
  if (notifBtn) {
    notifBtn.addEventListener('click', function () {
      document.querySelectorAll('.notif.unread').forEach(function (n) { n.classList.remove('unread'); });
      var dot = document.querySelector('.icon-btn .dot');
      if (dot) dot.remove();
    });
  }

  /* Notification bell scrolls to the notifications panel */
  var bell = document.querySelector('[data-goto-panel]');
  if (bell) {
    bell.addEventListener('click', function () {
      var target = bell.getAttribute('data-goto-panel');
      var btn = document.querySelector('.dash-nav button[data-panel="' + target + '"]');
      if (btn) btn.click();
    });
  }
})();
