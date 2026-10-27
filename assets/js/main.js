(function () {
  'use strict';

  var KEY = 'syn-theme';
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setSaved(value) {
    try {
      if (value) { localStorage.setItem(KEY, value); } else { localStorage.removeItem(KEY); }
    } catch (e) {}
  }
  function systemTheme() { return mq.matches ? 'dark' : 'light'; }

  var knob = document.querySelector('.volume');
  var label = knob ? knob.querySelector('.volume-label') : null;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (knob) {
      knob.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
    if (label) {
      label.textContent = theme === 'dark' ? 'Full volume' : 'Unplugged';
    }
  }

  // Start from the saved override if there is one, otherwise follow the device.
  apply(getSaved() || systemTheme());

  // The knob turns on its own when the device setting changes (for example at sunset).
  function onSystemChange() {
    if (!getSaved()) { apply(systemTheme()); }
  }
  if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
  else if (mq.addListener) { mq.addListener(onSystemChange); }

  // Clicking the knob overrides the device setting. Matching the device again clears the override.
  if (knob) {
    knob.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      setSaved(next === systemTheme() ? null : next);
    });
  }

  // Send a SYN: the address is stored encoded and only assembled on click.
  var syn = document.querySelector('.syn-btn');
  var status = document.querySelector('.syn-status');
  if (syn) {
    syn.addEventListener('click', function () {
      var address;
      try { address = atob(syn.getAttribute('data-u')); } catch (e) { address = ''; }
      if (!address) {
        if (status) { status.textContent = 'Something went wrong. Please find me on LinkedIn instead.'; }
        return;
      }
      var href = 'mailto:' + address +
        '?subject=' + encodeURIComponent(syn.getAttribute('data-s') || 'SYN') +
        '&body=' + encodeURIComponent(syn.getAttribute('data-b') || '');
      if (status) { status.textContent = 'Opening your mail app. If nothing happens, find me on LinkedIn.'; }
      window.location.href = href;
    });
  }
})();
