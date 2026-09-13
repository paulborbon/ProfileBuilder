(() => {
  let theme;
  try { theme = localStorage.getItem('pb-theme'); } catch (_) { /* Storage may be unavailable. */ }
  if (theme !== 'dark' && theme !== 'light') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', theme);
})();
