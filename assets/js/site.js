(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-set-lang]');
  const saved = localStorage.getItem('site-language');
  const initial = saved === 'ko' || saved === 'en' ? saved : 'en';

  function setLanguage(lang) {
    root.dataset.language = lang;
    root.lang = lang;
    buttons.forEach((button) => {
      const active = button.dataset.setLang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    localStorage.setItem('site-language', lang);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.setLang));
  });

  setLanguage(initial);
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
