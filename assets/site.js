/* SNUG site: mobile menu, accessible dropdowns, conference status badges. No dependencies. */
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var ddButtons = Array.prototype.slice.call(document.querySelectorAll('.dd-btn'));

  function closeAll(except) {
    ddButtons.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      var m = document.getElementById(b.getAttribute('aria-controls'));
      if (m) m.classList.remove('open');
    });
  }

  ddButtons.forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      closeAll(btn);
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      menu.classList.toggle('open', !open);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        closeAll(btn);
        btn.setAttribute('aria-expanded', 'true');
        menu.classList.add('open');
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });
    menu.addEventListener('keydown', function (e) {
      var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
    });
    // close when focus leaves this dropdown group
    btn.parentNode.addEventListener('focusout', function (e) {
      if (!btn.parentNode.contains(e.relatedTarget)) {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dd')) closeAll();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = ddButtons.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openBtn) { closeAll(); openBtn.focus(); return; }
    if (nav && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && nav.classList.contains('open')) setMenu(false);
    });
  }

  /* Conference status badge. Markup: <span class="status" data-start="2026-09-29" data-end="2026-09-30" hidden></span>
     Shows "Upcoming", "Happening now" or "Concluded" based on the visitor's date, so the page never goes stale. */
  var today = new Date();
  var ymd = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  function toNum(s) { return parseInt(String(s).replace(/-/g, ''), 10); }
  Array.prototype.forEach.call(document.querySelectorAll('.status[data-start]'), function (el) {
    var s = toNum(el.getAttribute('data-start')), en = toNum(el.getAttribute('data-end') || el.getAttribute('data-start'));
    var state = ymd < s ? 'soon' : ymd > en ? 'past' : 'live';
    el.setAttribute('data-state', state);
    el.textContent = state === 'live' ? 'Happening now' : state === 'soon' ? 'Upcoming' : 'Concluded';
    el.hidden = false;
  });
})();
