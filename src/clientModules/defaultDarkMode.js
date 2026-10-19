/**
 * Ensures returning visitors pick up the new dark default once.
 * Docusaurus stores the last choice in localStorage key "theme", which
 * overrides themeConfig.colorMode.defaultMode.
 */
(function applyDefaultDarkModeOnce() {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const flag = 'ams-docs-default-dark-v1';
    if (!window.localStorage.getItem(flag)) {
      window.localStorage.setItem('theme', 'dark');
      window.localStorage.setItem(flag, '1');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-theme-choice', 'dark');
    }
  } catch (e) {
    // ignore storage access errors
  }
})();
