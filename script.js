/**
 * 자기소개 페이지 - 인터랙션 스크립트
 * HTML, CSS, JavaScript만 사용
 */

(function () {
  'use strict';

  // ===== 설정 (자기소개서 내용으로 수정 가능) =====
  const CONFIG = {
    name: '이 해 구',           // 이름 (타이핑 효과)
    greeting: '안녕하세요',
  };

  // ===== DOM 요소 =====
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const typedNameEl = document.getElementById('typedName');
  const currentYearEl = document.getElementById('currentYear');
  const skillFills = document.querySelectorAll('.skill-fill');

  // ===== 타이핑 효과 (이름) =====
  function typeWriter(el, text, speed = 100) {
    if (!el || !text) return;
    let i = 0;
    el.textContent = '';
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          el.textContent = '';
          i = 0;
          type();
        }, 2000);
      }
    }
    type();
  }

  // ===== 네비 스크롤 시 스타일 =====
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ===== 모바일 메뉴 토글 =====
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenuOnLinkClick() {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // ===== 스킬 바 스크롤 애니메이션 =====
  function animateSkillBars() {
    if (!skillFills.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const pct = fill.getAttribute('data-pct') || '0';
            fill.style.setProperty('--fill-width', pct + '%');
            fill.classList.add('animate');
            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );
    skillFills.forEach((fill) => observer.observe(fill));
  }

  // ===== 푸터 연도 =====
  function setCurrentYear() {
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  // ===== 초기화 =====
  function init() {
    if (typedNameEl) {
      typeWriter(typedNameEl, CONFIG.name, 120);
    }
    setCurrentYear();
    handleNavScroll();
    animateSkillBars();

    window.addEventListener('scroll', handleNavScroll);
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
    }
    closeMenuOnLinkClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
