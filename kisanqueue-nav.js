(function () {
  'use strict';

  const pages = [
    { n:'01', label:'Landing / Home', file:'page01-landing.html', group:'Farmer portal' },
    { n:'02', label:'Farmer registration', file:'page02-farmer-registration.html', group:'Farmer portal' },
    { n:'03', label:'Slot booking', file:'page03-slot-booking.html', group:'Farmer portal' },
    { n:'04', label:'Booking token', file:'page04-booking-token.html', group:'Farmer portal' },
    { n:'05', label:'Procurement status', file:'page05-procurement-status.html', group:'Farmer portal' },
    { n:'06', label:'Farmer dashboard', file:'page06-farmer-dashboard.html', group:'Farmer portal' },
    { n:'07', label:'Centre finder', file:'page07-centre-finder.html', group:'Farmer portal' },
    { n:'08', label:'Live queue', file:'page08-live-queue.html', group:'Farmer portal' },
    { n:'09', label:'Notifications', file:'page09-notifications.html', group:'Farmer portal' },
    { n:'10', label:'Alerts', file:'page10-alerts.html', group:'Farmer portal' },
    { n:'11', label:'Staff login', file:'page11-staff-login.html', group:'Operations & staff' },
    { n:'12', label:'Operations dashboard', file:'page12-operations-dashboard.html', group:'Operations & staff' },
    { n:'13', label:'Queue console', file:'page13-queue-console.html', group:'Operations & staff' },
    { n:'14', label:'Status management', file:'page14-status-management.html', group:'Operations & staff' },
    { n:'15', label:'Reports & analytics', file:'page15-reports-analytics.html', group:'Operations & staff' },
    { n:'16', label:'Settings', file:'page16-settings.html', group:'Operations & staff' }
  ];

  const currentFile = location.pathname.split(/[\\/]/).pop() || 'page01-landing.html';

  function logoHTML(extraClass) {
    return '<a class="kq-brand-wrap" href="page01-landing.html" aria-label="KisanQueue home">' +
      '<img class="kq-brand-logo ' + (extraClass || '') + '" src="assets/kisanqueue-logo.png" alt="KisanQueue">' +
      '</a>';
  }

  function addNavigation() {
    document.body.classList.add('kq-enhanced');

    const menu = document.createElement('button');
    menu.className = 'kq-menu-btn';
    menu.type = 'button';
    menu.setAttribute('aria-label', 'Open navigation menu');
    menu.setAttribute('aria-expanded', 'false');
    menu.innerHTML = '<span class="kq-menu-icon"><span></span><span></span><span></span></span>';
    document.body.appendChild(menu);

    const backdrop = document.createElement('div');
    backdrop.className = 'kq-drawer-backdrop';
    document.body.appendChild(backdrop);

    const drawer = document.createElement('aside');
    drawer.className = 'kq-drawer';
    drawer.setAttribute('aria-label', 'KisanQueue navigation');

    const groups = ['Farmer portal', 'Operations & staff'];
    let nav = '';
    groups.forEach(group => {
      nav += '<section class="kq-nav-group"><div class="kq-nav-label">' + group + '</div>';
      pages.filter(p => p.group === group).forEach(p => {
        const active = p.file === currentFile;
        nav += '<a class="kq-nav-link' + (active ? ' active' : '') + '" href="' + p.file + '"' + (active ? ' aria-current="page"' : '') + '>' +
          '<span class="kq-nav-num">' + p.n + '</span><span>' + p.label + '</span></a>';
      });
      nav += '</section>';
    });

    drawer.innerHTML =
      '<div class="kq-drawer-head">' + logoHTML('') +
        '<div class="kq-drawer-tag">Smart agricultural procurement & queue management</div>' +
      '</div>' +
      '<div class="kq-nav-scroll">' + nav + '</div>' +
      '<div class="kq-drawer-foot">SIH-ready prototype · All screens connected<br>Use the menu icon on any page to move between modules.</div>';
    document.body.appendChild(drawer);

    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
    menu.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
    backdrop.addEventListener('click', () => setOpen(false));
    drawer.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  function applyBranding() {
    const brands = document.querySelectorAll('header .brand, .topbar .brand');
    brands.forEach(el => {
      el.innerHTML = logoHTML('');
    });

    // The staff login has no shared header, so give it the same persistent identity.
    if (currentFile === 'page11-staff-login.html' && !document.querySelector('.kq-login-brand')) {
      const loginBrand = document.createElement('div');
      loginBrand.className = 'kq-login-brand';
      loginBrand.innerHTML = '<a href="page01-landing.html" aria-label="KisanQueue home"><img src="assets/kisanqueue-logo.png" alt="KisanQueue"></a>';
      document.body.appendChild(loginBrand);
    }
  }

  function wireCoreLinks() {
    const map = {
      startBookingBtn: 'page03-slot-booking.html',
      checkStatusBtn: 'page05-procurement-status.html',
      searchCentreBtn: 'page07-centre-finder.html',
      viewTokenBtn: 'page04-booking-token.html',
      viewTokenFromDashboard: 'page04-booking-token.html',
      doneBtn: 'page01-landing.html',
      bookFromEmpty: 'page03-slot-booking.html',
      rebookFromCancelled: 'page03-slot-booking.html',
      rebookFromExpired: 'page03-slot-booking.html'
    };
    Object.keys(map).forEach(id => {
      let el = document.getElementById(id);
      if (!el || el.dataset.kqWired) return;
      // Replace only these navigation CTAs so prototype alert/demo handlers do not
      // fire before the user is taken to the connected screen.
      const clean = el.cloneNode(true);
      el.replaceWith(clean);
      el = clean;
      el.dataset.kqWired = '1';
      el.addEventListener('click', () => { location.href = map[id]; });
    });

    document.querySelectorAll('.back-link').forEach(a => {
      a.href = 'page01-landing.html';
      a.removeAttribute('onclick');
    });

    const staffLogin = document.querySelector('.login-link');
    if (staffLogin) {
      staffLogin.href = 'page11-staff-login.html';
      staffLogin.removeAttribute('onclick');
    }
  }

  function init() {
    addNavigation();
    applyBranding();
    wireCoreLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
