/* «Das Angebot»: Im Editor-Hintergrund arbeitet jemand sichtbar an der Beispielseite.
   Ablauf (rund 11 Sekunden, dann wieder zurück): Knopffarbe wählen, Überschrift markieren und neu tippen,
   Schrift grösser stellen, Bild aus der Medienauswahl ersetzen, speichern. Ein blauer Rahmen zeigt jeweils,
   was gerade bearbeitet wird. Läuft nur, solange der Abschnitt sichtbar ist (direkt gemessen: ein
   IntersectionObserver auf der gekippten Fläche meldete am Handy falsch).
   Klassisches Skript ohne Module, damit die Seite auch per Doppelklick läuft. */
(function () {
  var app = document.querySelector(".editor .ed-app");
  if (!app) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function el(name) { return app.querySelector('[data-ed="' + name + '"]'); }
  var zeiger = el("zeiger"), box = el("box"), marke = el("marke"), medien = el("medien");
  var titel = el("titel"), knopf = el("knopf"), groesse = el("groesse"), bild = el("bild");
  var farbeA = el("farbe-a"), farbeB = el("farbe-b"), thumbA = el("thumb-a"), thumbB = el("thumb-b");
  var gespeichert = el("gespeichert"), speichern = el("veroeffentlichen");
  var ring = document.createElement("div");
  ring.className = "ed-ring";
  /* Zeiger, Rahmen, Medienauswahl und Klickring direkt in die App, damit sie überall hinkommen */
  [box, medien, ring, zeiger].forEach(function (k) { app.appendChild(k); });

  var ZUSTAND = [
    { text: "Zeit für dich und deine Haut.", farbe: "#A9785A", feld: farbeA, gross: false, wert: "64", bildB: false, thumb: thumbA },
    { text: "Schön, dass du da bist.", farbe: "#6E7F64", feld: farbeB, gross: true, wert: "72", bildB: true, thumb: thumbB }
  ];
  var jetzt = 0;
  var SCHRITT = 850; /* so lange gleitet der Zeiger (CSS: 0.8 s), danach wird geklickt */

  /* Lage eines Elements in der App, ohne die 3D-Drehung des Editors (offset-Werte sind ungedreht) */
  function lage(ziel) {
    var x = 0, y = 0, n = ziel;
    while (n && n !== app) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return [x, y, ziel.offsetWidth, ziel.offsetHeight];
  }
  function setze(k, a, b) { k.style.setProperty(a[0], b[0] + "px"); k.style.setProperty(a[1], b[1] + "px"); }
  function fahre(ziel, fx, fy) {
    var l = lage(ziel), p = [l[0] + l[2] * (fx == null ? 0.5 : fx), l[1] + l[3] * (fy == null ? 0.55 : fy)];
    setze(zeiger, ["--zx", "--zy"], p);
    setze(ring, ["--zx", "--zy"], p);
  }
  function rahmen(ziel, name, ebene) {
    var l = lage(ziel);
    setze(box, ["--bx", "--by"], [l[0], l[1]]);
    setze(box, ["--bw", "--bh"], [l[2], l[3]]);
    if (name) marke.textContent = name;
    if (ebene) app.querySelectorAll("[data-ebene]").forEach(function (li) { li.classList.toggle("gewaehlt", li.getAttribute("data-ebene") === ebene); });
  }
  function klick() {
    zeiger.classList.add("klick");
    ring.classList.remove("los"); void ring.offsetWidth; ring.classList.add("los");
    setTimeout(function () { zeiger.classList.remove("klick"); }, 160);
  }
  function warte(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function tippen(text) {
    return new Promise(function (fertig) {
      var i = 0, caret = '<span class="ed-caret"></span>';
      (function weiter() {
        titel.innerHTML = text.slice(0, i) + caret;
        if (i++ < text.length) setTimeout(weiter, 38); else { setTimeout(function () { titel.textContent = text; }, 500); fertig(); }
      })();
    });
  }

  /* Ist der Abschnitt zu mindestens einem Viertel im Bild? (direkt gemessen, ohne Beobachter) */
  var abschnitt = app.closest("section") || app;
  function sichtbar() {
    if (document.hidden) return false;
    var r = abschnitt.getBoundingClientRect(), h = window.innerHeight;
    var drin = Math.min(r.bottom, h) - Math.max(r.top, 0);
    return drin > Math.min(r.height, h) * 0.25;
  }

  async function runde() {
    var neu = ZUSTAND[(jetzt + 1) % 2];
    function weg() { return !sichtbar(); }
    /* 1 Knopf: Farbe wählen */
    rahmen(knopf, "Knopf", "knopf");
    fahre(neu.feld); await warte(SCHRITT); if (weg()) return; klick();
    farbeA.classList.toggle("an", neu.feld === farbeA); farbeB.classList.toggle("an", neu.feld === farbeB);
    knopf.style.setProperty("--ed-farbe", neu.farbe);
    await warte(500);
    /* 2 Überschrift markieren und neu tippen */
    fahre(titel, 0.62, 0.5); await warte(SCHRITT); if (weg()) return; klick();
    rahmen(titel, "Überschrift", "titel");
    titel.innerHTML = '<span class="markiert">' + titel.textContent + "</span>";
    await warte(400);
    await tippen(neu.text);
    jetzt = (jetzt + 1) % 2; /* sichtbarer Zustand ist jetzt der neue */
    rahmen(titel);
    await warte(250);
    /* 3 Schrift grösser oder kleiner */
    if (weg()) return;
    fahre(groesse); await warte(SCHRITT); if (weg()) return; klick();
    groesse.textContent = neu.wert; groesse.classList.add("blitz"); titel.classList.toggle("gross", neu.gross);
    await warte(450); rahmen(titel); groesse.classList.remove("blitz");
    await warte(300);
    /* 4 Bild ersetzen über die Medienauswahl */
    fahre(bild, 0.5, 0.45); await warte(SCHRITT); if (weg()) return; klick();
    rahmen(bild, "Bild", "bild");
    var b = lage(bild);
    setze(medien, ["--mx", "--my"], [b[0] + b[2] * 0.06, b[1] + b[3] - medien.offsetHeight - b[3] * 0.06]);
    medien.classList.add("zeigen");
    await warte(550);
    fahre(neu.thumb, 0.5, 0.5); await warte(SCHRITT); if (weg()) { medien.classList.remove("zeigen"); return; } klick();
    neu.thumb.classList.add("an");
    bild.classList.toggle("zeigt-b", neu.bildB);
    await warte(500);
    medien.classList.remove("zeigen"); neu.thumb.classList.remove("an");
    await warte(300);
    /* 5 Speichern */
    fahre(speichern); await warte(SCHRITT); if (weg()) return; klick(); speichern.classList.add("gedrueckt");
    gespeichert.classList.add("da");
    await warte(300); speichern.classList.remove("gedrueckt");
    await warte(1300); gespeichert.classList.remove("da");
  }

  /* Eine einzige Schleife: liegt der Abschnitt nicht im Bild, wartet sie und schaut alle 0.6 s wieder nach */
  async function schleife() {
    for (;;) {
      if (sichtbar()) { await runde(); await warte(500); }
      else await warte(600);
    }
  }

  /* Startlage: Zeiger rechts neben den Farbfeldern, Rahmen auf der Überschrift */
  fahre(farbeB, 2.2, 1.8);
  rahmen(titel, "Überschrift", "titel");
  schleife();
})();
