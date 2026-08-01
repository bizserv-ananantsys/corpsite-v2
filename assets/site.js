/* Ananant Systems — progressive enhancement only.
   Every panel below is present and readable in the HTML with JS disabled. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {

    /* ---- mobile nav ---- */
    try {
      var burger = document.querySelector('.burger');
      var menu = document.getElementById('navmenu');
      if (burger && menu) {
        burger.addEventListener('click', function () {
          var open = menu.classList.toggle('open');
          burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }
    } catch (e) {}

    /* ---- scroll reveal ---- */
    try {
      if ('IntersectionObserver' in window) {
        document.documentElement.classList.add('js');
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        Array.prototype.forEach.call(document.querySelectorAll('.rv'), function (el, i) {
          el.style.transitionDelay = (Math.min(i % 6, 4) * 60) + 'ms';
          io.observe(el);
        });
      }
    } catch (e) { document.documentElement.classList.remove('js'); }

    /* ---- architecture block explorer ----
       Detail copy lives in the markup (.blkdetail). JS only swaps which is shown. */
    try {
      var blocks = document.querySelectorAll('.blk');
      if (blocks.length) {
        var showBlk = function (k) {
          Array.prototype.forEach.call(blocks, function (b) {
            b.setAttribute('aria-pressed', b.getAttribute('data-k') === k ? 'true' : 'false');
          });
          Array.prototype.forEach.call(document.querySelectorAll('.blkdetail'), function (d) {
            var on = d.getAttribute('data-k') === k;
            d.hidden = !on;
          });
        };
        Array.prototype.forEach.call(blocks, function (b) {
          b.addEventListener('click', function () { showBlk(b.getAttribute('data-k')); });
        });
        showBlk(blocks[0].getAttribute('data-k'));
      }
    } catch (e) {}

    /* ---- composition stepper ---- */
    try {
      var steps = document.querySelectorAll('.step');
      if (steps.length) {
        var showStep = function (k) {
          Array.prototype.forEach.call(steps, function (s) {
            s.setAttribute('aria-pressed', s.getAttribute('data-s') === k ? 'true' : 'false');
          });
          Array.prototype.forEach.call(document.querySelectorAll('.compviz'), function (v) {
            var on = v.getAttribute('data-s') === k;
            v.classList.toggle('on', on);
            v.hidden = !on;
          });
        };
        Array.prototype.forEach.call(steps, function (s) {
          s.addEventListener('click', function () { showStep(s.getAttribute('data-s')); });
        });
        showStep(steps[0].getAttribute('data-s'));
      }
    } catch (e) {}

    /* ---- platform layers accordion ---- */
    try {
      var layers = document.querySelectorAll('.layer');
      Array.prototype.forEach.call(layers, function (l) {
        var body = document.getElementById('lb-' + l.getAttribute('data-l'));
        if (body) { body.classList.remove('on'); l.setAttribute('aria-expanded', 'false'); }
        l.addEventListener('click', function () {
          var open = l.getAttribute('aria-expanded') === 'true';
          Array.prototype.forEach.call(layers, function (x) { x.setAttribute('aria-expanded', 'false'); });
          Array.prototype.forEach.call(document.querySelectorAll('.layerbody'), function (x) { x.classList.remove('on'); });
          if (!open) {
            l.setAttribute('aria-expanded', 'true');
            if (body) body.classList.add('on');
          }
        });
      });
    } catch (e) {}

  });
})();
