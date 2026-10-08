/* Classic (non-module) script so it runs when index.html is opened directly from disk. */
(function () {
  var btn = document.querySelector('.mobile-toggle');
  var desk = document.querySelector('.desktop-nav');
  if (btn && desk) {
    var panel = null;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (open) { if (panel) panel.remove(); panel = null; }
      else {
        panel = document.createElement('nav');
        panel.id = 'mobile-navigation'; panel.className = 'mobile-nav';
        panel.setAttribute('aria-label', 'Mobile navigation');
        panel.innerHTML = desk.innerHTML;
        document.body.appendChild(panel);
      }
      btn.setAttribute('aria-expanded', String(!open));
      btn.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
  }
  var form = document.querySelector('main form');
  if (form) {
    var to = 'visualcraftstudiosz@gmail.com';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var action = (e.submitter && e.submitter.value) || 'email';
      var f = form.elements, missing = ['name', 'email', 'description'].filter(function (k) { return !f[k] || !f[k].value.trim(); });
      if (missing.length) { alert('Please fill in: ' + missing.join(', ')); return; }
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.name && el.name !== 'action' && el.value) lines.push(el.name + ': ' + el.value);
      });
      var body = lines.join('\n');
      if (action === 'download') {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([body], { type: 'text/plain' }));
        a.download = 'project-brief.txt'; document.body.appendChild(a); a.click(); a.remove();
      } else {
        location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('Project enquiry') + '&body=' + encodeURIComponent(body);
      }
    });
  }
})();
