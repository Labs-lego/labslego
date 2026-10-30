// BARRE SP — POINTS DE RETRAIT FROZENBLOCKS
// Photo du secteur Magne : boutiques/lycee-magne.jpg
// Photo du secteur Gambier : boutiques/lycee-gambier.jpg
var SP = [
  ["Mitterrand — Centre-ville", "Boutique principale", "mitterrand"],
  ["Hauteville", "Point de retrait", "hauteville"],
  ["Secteur lycée Cornu", "Point de retrait", "lycee-cornu"],
  ["Secteur lycée Gambier", "Point de retrait", "lycee-gambier"],
  ["Secteur lycée Magne", "Point de retrait", "lycee-magne"]
];

var EXT = [
  "jpg", "jpeg", "png", "webp",
  "JPG", "JPEG", "PNG", "WEBP",
  "Jpg", "Jpeg", "Png", "Webp",
  "avif", "gif"
];

$("shops").innerHTML = SP.map(function(x, i) {
  return '<div class="shop">' +
    '<div class="shot" id="sh' + i + '">' +
      '<span>📷</span><small>Photo bientôt</small>' +
    '</div>' +
    '<b>' + esc(x[0]) + '</b>' +
    '<small>' + esc(x[1]) + '</small>' +
  '</div>';
}).join("");

SP.forEach(function(x, i) {
  var k = 0;
  var box = $("sh" + i);

  (function nx() {
    if (k >= EXT.length) return;
    var im = new Image();
    im.alt = x[0];
    im.onload = function() {
      box.innerHTML = "";
      box.appendChild(im);
    };
    im.onerror = nx;
    im.src = "boutiques/" + x[2] + "." + EXT[k++];
  })();
});

$("hc").innerHTML = chips();
drawP();
drawC();
go("home");
