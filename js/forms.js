/* ============================================================
   STACKLY — forms.js
   Client-side validation for contact, login and register forms.
   NOTE: demo only — no backend is connected. Submissions show a
   success state locally; wire to a real service before production.
   ============================================================ */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(field, message) {
    var wrap = field.closest('.form-field');
    if (!wrap) return;
    wrap.classList.add('invalid');
    var err = wrap.querySelector('.field-error');
    if (err) err.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }
  function clearError(field) {
    var wrap = field.closest('.form-field');
    if (!wrap) return;
    wrap.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
  }
  function validateField(field) {
    var v = field.value.trim();
    var type = field.dataset.validate || field.type;
    if (field.required && !v) { setError(field, 'This field is required.'); return false; }
    if (!v) { clearError(field); return true; }
    if (type === 'email' && !EMAIL_RE.test(v)) { setError(field, 'Please enter a valid email address.'); return false; }
    if (type === 'password' && v.length < 8) { setError(field, 'Password must be at least 8 characters.'); return false; }
    clearError(field);
    return true;
  }

  function wireForm(form, onSuccess) {
    if (!form) return;
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { validateField(f); });
      f.addEventListener('input', function () { clearError(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      fields.forEach(function (f) {
        if (f.type === 'checkbox') {
          if (f.required && !f.checked) { ok = false; setError(f, 'Please accept to continue.'); var w = f.closest('.form-field'); if (w) w.classList.add('invalid'); }
        } else if (!validateField(f)) ok = false;
      });
      /* Password confirmation pairing */
      var pw = form.querySelector('[data-validate="password"]');
      var pw2 = form.querySelector('[data-validate="confirm"]');
      if (pw && pw2 && pw.value !== pw2.value) { setError(pw2, 'Passwords do not match.'); ok = false; }
      var status = form.querySelector('.form-status');
      if (!ok) {
        if (status) { status.className = 'form-status error'; status.textContent = 'Please review the highlighted fields and try again.'; }
        var firstInvalid = form.querySelector('.form-field.invalid input, .form-field.invalid select, .form-field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      if (status) {
        status.className = 'form-status success';
        status.textContent = form.dataset.success || 'Thank you. Your message has been received — our team will respond shortly.';
      }
      form.reset();
      if (typeof onSuccess === 'function') onSuccess();
    });
  }

  /* Password visibility toggles */
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      btn.classList.toggle('showing', show);
    });
  });

  /* Password strength meter */
  var pwInput = document.querySelector('[data-strength]');
  if (pwInput) {
    var meter = document.querySelector('.strength-meter');
    var label = document.querySelector('.strength-label');
    var words = ['', 'Weak — add length and variety', 'Fair — add numbers or symbols', 'Good password', 'Strong password'];
    pwInput.addEventListener('input', function () {
      var v = pwInput.value;
      var score = 0;
      if (v.length >= 8) score++;
      if (v.length >= 12) score++;
      if (/[0-9]/.test(v) && /[a-zA-Z]/.test(v)) score++;
      if (/[^a-zA-Z0-9]/.test(v)) score++;
      score = Math.min(4, v ? Math.max(1, score) : 0);
      if (meter) meter.setAttribute('data-level', score);
      if (label) label.textContent = v ? words[score] : 'Use 12+ characters with letters, numbers and symbols.';
    });
  }

  /* Wire the three demo forms */
  wireForm(document.querySelector('#contactForm'), function () {
    window.location.href = '404.html';
  });
  wireForm(document.querySelector('#loginForm'), function () {
    /* Demo redirect: role selection is cosmetic only — real auth must be server-side */
    var role = document.querySelector('input[name="role"]:checked');
    var dest = { client: 'dashboard.html', admin: 'admin-dashboard.html', partner: 'seller-dashboard.html' };
    var target = dest[role ? role.value : 'client'] || 'dashboard.html';
    setTimeout(function () { window.location.href = target; }, 900);
  });
  wireForm(document.querySelector('#registerForm'), function () {
    setTimeout(function () { window.location.href = 'login.html'; }, 1400);
  });
})();
