/* ========================================
   AMORFAR TANDIL — Script
   ======================================== */

(function () {
  'use strict';

  // ============ HEADER SCROLL ============
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ============ MOBILE MENU ============
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function toggleMobileMenu() {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ============ SMOOTH SCROLL FOR ANCHORS ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============ INTERSECTION OBSERVER — ANIMATIONS ============
  var animatedElements = document.querySelectorAll('.anim-fade, .anim-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Hero in-view class for image zoom
  var hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(function () {
      hero.classList.add('in-view');
    }, 200);
  }

  // ============ MENU TABS ============
  var menuTabs = document.querySelectorAll('.menu__tab');
  var menuCategories = document.querySelectorAll('.menu__category');

  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetTab = this.getAttribute('data-tab');

      // Update active tab
      menuTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      // Update active category
      menuCategories.forEach(function (cat) {
        cat.classList.remove('active');
        if (cat.getAttribute('data-category') === targetTab) {
          cat.classList.add('active');
        }
      });
    });
  });

  // ============ RESERVATION FORM → WHATSAPP ============
  var reserveForm = document.getElementById('reserveForm');

  if (reserveForm) {
    reserveForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var date = document.getElementById('date').value;
      var time = document.getElementById('time').value;
      var guests = document.getElementById('guests').value;
      var occasion = document.getElementById('occasion').value;
      var notes = document.getElementById('notes').value.trim();

      // Format date for display
      var dateDisplay = date;
      if (date) {
        var parts = date.split('-');
        var dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
        var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        dateDisplay = days[dateObj.getDay()] + ' ' + dateObj.getDate() + ' de ' + months[dateObj.getMonth()];
      }

      // Build message
      var msg = 'Hola Amorfar, quiero hacer una reserva:\n\n';
      msg += '*Nombre:* ' + name + '\n';
      msg += '*Teléfono de contacto:* ' + phone + '\n';
      if (dateDisplay) msg += '*Fecha:* ' + dateDisplay + '\n';
      if (time) msg += '*Horario:* ' + time + ' hs\n';
      if (guests) msg += '*Personas:* ' + guests + '\n';
      if (occasion) msg += '*Ocasión:* ' + occasion.charAt(0).toUpperCase() + occasion.slice(1) + '\n';
      if (notes) msg += '*Mensaje:* ' + notes + '\n';

      var encodedMsg = encodeURIComponent(msg);
      var whatsappUrl = 'https://wa.me/5492494684996?text=' + encodedMsg;

      window.open(whatsappUrl, '_blank');
    });
  }

  // ============ PARALLAX LIGHT (HERO IMAGE) ============
  function handleParallax() {
    var scrollY = window.scrollY;
    var heroImg = document.querySelector('.hero__img');
    if (heroImg && scrollY < window.innerHeight) {
      heroImg.style.transform = 'scale(' + (1 + scrollY * 0.0001) + ') translateY(' + (scrollY * 0.15) + 'px)';
    }
  }

  // Only apply parallax on non-mobile for performance
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // ============ YEAR IN FOOTER ============
  var yearSpan = document.querySelector('.footer__bottom p');
  if (yearSpan) {
    var currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
  }

})();
