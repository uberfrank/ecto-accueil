/*
 * Codes QR de la page de liens.
 * Ajoute un petit bouton carré à côté de chaque lien. Le bouton ouvre une
 * fenêtre avec le code QR du lien; cliquer sur le code ouvre le lien.
 * Utilise assets/vendor/qrcode.min.js (qrcode-generator, licence MIT).
 */
(function () {
  if (typeof qrcode !== 'function') return;

  var QR_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>' +
    '<rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M17 21h4v-4"/></svg>';

  // Code QR en SVG : modules bleu ECTO sur fond blanc, marge de 4 modules.
  function qrSvg(text) {
    var qr = qrcode(0, 'M');
    qr.addData(text, 'Byte');
    qr.make();
    var n = qr.getModuleCount(), m = 4, size = n + 2 * m, d = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(r, c)) d += 'M' + (c + m) + ' ' + (r + m) + 'h1v1h-1z';
      }
    }
    return '<svg viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" role="img" aria-label="Code QR">' +
      '<rect width="' + size + '" height="' + size + '" fill="#fff"/>' +
      '<path d="' + d + '" fill="#0000a3"/></svg>';
  }

  function titleFor(a) {
    if (a.dataset.qrTitle) return a.dataset.qrTitle;
    var strong = a.querySelector('strong');
    if (strong) return strong.textContent.trim();
    return a.getAttribute('aria-label') || a.textContent.trim();
  }

  // Fenêtre (créée une seule fois)
  var dialog = document.createElement('dialog');
  dialog.className = 'qr-dialog';
  dialog.setAttribute('aria-labelledby', 'qr-title');
  dialog.innerHTML =
    '<button type="button" class="qr-close" aria-label="Fermer">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<h2 id="qr-title"></h2>' +
    '<a class="qr-code" href="#"></a>' +
    '<p class="qr-hint">Scannez le code avec votre téléphone, ou cliquez dessus pour ouvrir le lien.</p>' +
    '<p class="qr-host"></p>';
  document.body.appendChild(dialog);

  var titleEl = dialog.querySelector('#qr-title');
  var codeEl = dialog.querySelector('.qr-code');
  var hostEl = dialog.querySelector('.qr-host');

  dialog.querySelector('.qr-close').addEventListener('click', function () { dialog.close(); });
  // Clic en dehors de la carte : fermer
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });

  function open(a) {
    var url = new URL(a.getAttribute('href'), location.href).href;
    var title = titleFor(a);
    titleEl.textContent = title;
    codeEl.href = url;
    codeEl.setAttribute('aria-label', 'Ouvrir : ' + title);
    codeEl.innerHTML = qrSvg(url);
    hostEl.textContent = new URL(url).host.replace(/^www\./, '');
    dialog.showModal();
    codeEl.focus();
  }

  var links = document.querySelectorAll('.link-list a.link, .socials a');
  Array.prototype.forEach.call(links, function (a) {
    var wrap = document.createElement('span');
    wrap.className = 'qr-wrap';
    a.parentNode.insertBefore(wrap, a);
    wrap.appendChild(a);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qr-btn';
    btn.innerHTML = QR_ICON;
    btn.setAttribute('aria-label', 'Code QR : ' + titleFor(a));
    btn.title = 'Afficher le code QR';
    btn.addEventListener('click', function () { open(a); });
    wrap.appendChild(btn);
  });
})();
