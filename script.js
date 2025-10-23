(function(){
  'use strict';

  function $all(sel, root) { return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
  function $(sel, root) { return (root||document).querySelector(sel); }

  function setText(node, text) {
    // Prefer textContent; if it's an input/button with value, set value too
    if (node == null) return;
    if ('value' in node && node.tagName === 'INPUT') {
      node.value = text;
    } else {
      node.textContent = text;
    }
  }

  function changeLanguage(lang) {
    try {
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('siteLang', lang);

      // Toggle active class
      $all('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      // Swap text for anything carrying data-lang-ko / data-lang-en
      $all('[data-lang-ko], [data-lang-en]').forEach(el => {
        const ko = el.getAttribute('data-lang-ko');
        const en = el.getAttribute('data-lang-en');
        const text = (lang === 'ko' ? (ko ?? en) : (en ?? ko)) || el.textContent;
        setText(el, text);
      });
    } catch (e) {
      console.error('changeLanguage error:', e);
    }
  }

  function currentLang() {
    return localStorage.getItem('siteLang') ||
           (document.querySelector('.lang-btn.active')?.dataset.lang) ||
           document.documentElement.getAttribute('lang') ||
           'en';
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Wire Contact Us
    const contactLink = $('#contact-link');
    if (contactLink) {
      contactLink.addEventListener('click', function(ev){
        ev.preventDefault();
        const lang = currentLang();
        alert(lang === 'ko' ? '문의: shstudio@shstudio.co.kr' : 'Contact: shstudio@shstudio.co.kr');
      });
    }

    // Wire language buttons
    $all('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function(ev){
        ev.preventDefault();
        const lang = this.dataset.lang || 'en';
        changeLanguage(lang);
      });
    });

    // Initial language
    changeLanguage(currentLang());
  });
})();