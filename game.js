(() => {
  'use strict';
  const { SCENARIOS } = window.SpotData;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function show(id) {
    $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
    window.scrollTo(0, 0);
  }

  $('#btn-classic').addEventListener('click', () => show('play'));
  $$('[data-home]').forEach((b) => b.addEventListener('click', () => show('home')));
  $('#btn-quit').addEventListener('click', () => show('home'));
})();
