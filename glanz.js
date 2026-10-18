/* Liquid Glass: Ein heller Glanz folgt der Maus über alle Glasflächen (Karten, Knöpfe, Navigation).
   Am Handy gibt es keine Maus: Dort gleitet der Glanz einmal über jede grössere Karte, sobald sie ins Bild kommt.
   Klassisches Skript ohne Module, damit die Seite auch per Doppelklick läuft. */
(function () {
  var GLAS = ".liquid-glass, .liquid-glass-strong";
  var aktiv = null, wartet = false, letzte = null;

  function setzen() {
    wartet = false;
    if (!letzte) return;
    var ziel = letzte.target.closest ? letzte.target.closest(GLAS) : null;
    if (ziel && ziel.classList.contains("ich-bild")) ziel = null;
    if (aktiv && aktiv !== ziel) aktiv.classList.remove("glanz-an");
    aktiv = ziel;
    if (!ziel) return;
    var r = ziel.getBoundingClientRect();
    ziel.style.setProperty("--gx", (letzte.clientX - r.left) + "px");
    ziel.style.setProperty("--gy", (letzte.clientY - r.top) + "px");
    ziel.classList.add("glanz-an");
  }

  document.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;
    letzte = e;
    if (!wartet) { wartet = true; requestAnimationFrame(setzen); }
  }, { passive: true });
  document.addEventListener("pointerleave", function () { if (aktiv) aktiv.classList.remove("glanz-an"); aktiv = null; });

  /* Touch-Geräte: einmaliger Glanz über die grösseren Karten */
  var ohneMaus = window.matchMedia && window.matchMedia("(hover: none)").matches;
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (ohneMaus && !ruhig && "IntersectionObserver" in window) {
    var beob = document.documentElement.glanzBeobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("glanz-lauf");
        beob.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".schritt, .vn, .vn-punkte li, .frage, .ich-text, .fakten-band, .knopf.liquid-glass-strong").forEach(function (k) { beob.observe(k); });
  }
})();
