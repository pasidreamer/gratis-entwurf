/* Hero-Raster: Spalten mit Beispiel-Startseiten, abwechselnd nach oben und nach unten.
   Die Betriebe sind erfunden (nur Ideen), die Fotos stammen aus Pascals Higgsfield-Konto.
   Klassisches Skript ohne Module, damit die Seite auch per Doppelklick läuft. */
(function () {
  var SCHRIFT = {
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Barlow", "Segoe UI", sans-serif',
    kraeftig: '"Barlow", "Segoe UI", sans-serif',
    georgia: 'Georgia, "Times New Roman", serif'
  };

  /* ff = Schrift, bg/ink/ac/on = Grund, Schrift, Akzent, Schrift auf Akzent, r = Rundung */
  var BETRIEBE = [
    { name: "Holzwerk Keller", foto: "01-schreinerei", ff: "serif", bg: "#F1EADF", ink: "#2A2018", ac: "#8A5A2E", on: "#FFF8EE", h: "Möbel aus Holz aus der Region.", btn: "Offerte anfragen", cta: "Kontakt", chips: ["Küchen", "Treppen", "Türen"], layouts: ["split", "oben"] },
    { name: "Coiffeur Linde", foto: "02-coiffeur", ff: "sans", bg: "#F6EEEA", ink: "#2D2326", ac: "#A9545E", on: "#fff", h: "Dein Termin, online gebucht.", btn: "Termin buchen", cta: "Buchen", chips: ["Schnitt", "Farbe", "Bart"], layouts: ["cover", "quer"] },
    { name: "Bäckerei Sonnenberg", foto: "03-baeckerei", ff: "serif", bg: "#3A2416", ink: "#FFF4E4", ac: "#E6AE52", on: "#2A170B", h: "Frisch aus dem Ofen, ab 6 Uhr.", btn: "Sortiment ansehen", cta: "Bestellen", chips: ["Brot", "Zopf", "Gipfeli"], layouts: ["oben", "cover"] },
    { name: "Ristorante Al Porto", foto: "04-restaurant", ff: "georgia", bg: "#14110E", ink: "#F1E6D4", ac: "#D6A15A", on: "#14110E", h: "Unsere Karte", karte: [["Felchen vom See", "34"], ["Risotto al limone", "26"], ["Tiramisù della casa", "12"]], btn: "Tisch reservieren", cta: "Reservieren", layouts: ["karte", "cover"] },
    { name: "Fahrschule Seeweg", foto: "05-fahrschule", ff: "kraeftig", bg: "#F4F6F8", ink: "#12202E", ac: "#E0532F", on: "#fff", r: ".35em", h: "Lernfahrausweis? Wir fahren los.", btn: "Fahrstunde buchen", cta: "Anmelden", chips: ["Auto", "Motorrad", "VKU"], layouts: ["split", "quer"] },
    { name: "Physio am See", foto: "06-physio", ff: "sans", bg: "#E8F1EE", ink: "#163330", ac: "#2E7C6F", on: "#fff", h: "Wieder schmerzfrei bewegen.", btn: "Termin vereinbaren", cta: "Termin", chips: ["Rücken", "Sport", "Reha"], layouts: ["oben", "split"] },
    { name: "Garage Thurtal", foto: "07-garage", ff: "kraeftig", bg: "#1C1F22", ink: "#F0F0F0", ac: "#F08A24", on: "#1C1F22", r: ".25em", h: "Service, Reifen und MFK.", btn: "Termin online", cta: "Termin", chips: ["Service", "Reifen", "MFK"], layouts: ["cover", "split"] },
    { name: "Gartenbau Grünwerk", foto: "08-garten", ff: "georgia", bg: "#EDF1E5", ink: "#1E2F1F", ac: "#4C7838", on: "#fff", h: "Gärten, die wachsen dürfen.", btn: "Beratung anfragen", cta: "Kontakt", chips: ["Planung", "Pflege", "Mauern"], layouts: ["quer", "oben"] },
    { name: "Elektro Frei", foto: "09-elektro", ff: "kraeftig", bg: "#0F1A2C", ink: "#EAF0FA", ac: "#F4C440", on: "#0F1A2C", r: ".35em", h: "Strom, Licht und Smart Home.", btn: "Notfall: anrufen", cta: "Anrufen", chips: ["Installation", "Service", "Solar"], layouts: ["split", "cover"] },
    { name: "Hotel Seeblick", foto: "10-hotel", ff: "serif", bg: "#0F2A3C", ink: "#FFFFFF", ac: "#E6C477", on: "#0F2A3C", h: "Aufwachen mit Blick auf den See.", btn: "Zimmer anfragen", cta: "Buchen", chips: ["Zimmer", "Frühstück", "Lage"], layouts: ["cover", "quer"] },
    { name: "Malerei Huber", foto: "11-malerei", ff: "sans", bg: "#FFFFFF", ink: "#1F2430", ac: "#C9492F", on: "#fff", h: "Farbe für dein Zuhause.", btn: "Offerte anfragen", cta: "Offerte", chips: ["Innen", "Fassade", "Tapeten"], layouts: ["oben", "split"] },
    { name: "Weingut am Hang", foto: "12-weingut", ff: "serif", bg: "#2A0F17", ink: "#F5E8EB", ac: "#C9A27A", on: "#2A0F17", h: "Weine direkt ab Hof.", btn: "Degustation buchen", cta: "Hofladen", chips: ["Rot", "Weiss", "Schaumwein"], layouts: ["cover", "karte"], karte: [["Pinot Noir 2024", "24"], ["Müller-Thurgau", "18"], ["Rosé vom Hang", "19"]] },
    { name: "Beauty Atelier Sand", foto: "13-beauty", ff: "serif", bg: "#F4EEE8", ink: "#3A2C25", ac: "#A9785A", on: "#fff", h: "Zeit für dich und deine Haut.", btn: "Behandlung buchen", cta: "Termin", chips: ["Gesicht", "Nägel", "Massage"], layouts: ["cover", "split"] },
    { name: "Bestattungen am Bach", foto: "14-bestatter", ff: "georgia", bg: "#EEECE8", ink: "#2B2B2B", ac: "#5F645C", on: "#fff", h: "Wir sind für Sie da, Tag und Nacht.", btn: "Jetzt anrufen", cta: "Kontakt", chips: ["Beratung", "Vorsorge", "Trauerfeier"], layouts: ["split", "oben"] },
    { name: "Studio Puls", foto: "15-fitness", ff: "kraeftig", bg: "#111315", ink: "#F2F2F2", ac: "#7FB3E0", on: "#111315", r: ".3em", h: "Probetraining diese Woche.", btn: "Probetraining buchen", cta: "Mitglied werden", chips: ["Kraft", "Yoga", "Kurse"], layouts: ["cover", "quer"] },
    { name: "Treuhand Brunner", foto: "16-treuhand", ff: "georgia", bg: "#F6F7F9", ink: "#14233C", ac: "#2C5A9E", on: "#fff", r: ".3em", h: "Buchhaltung und Steuern, persönlich betreut.", btn: "Erstgespräch vereinbaren", cta: "Erstgespräch", chips: ["Buchhaltung", "Steuern", "Lohn"], layouts: ["quer", "split"] },
    { name: "Glanzwerk Reinigungen", foto: "17-reinigung", ff: "sans", bg: "#EAF3F6", ink: "#12313B", ac: "#1F7F96", on: "#fff", h: "Unterhaltsreinigung für Büro und Zuhause.", btn: "Offerte anfragen", cta: "Offerte", chips: ["Büro", "Wohnung", "Fenster"], layouts: ["split", "cover"] }
  ];

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function foto(b) { return '<div class="ms-foto"><img src="bilder/kachel-' + b.foto + '.webp" alt="" loading="eager" decoding="async"></div>'; }
  function zeilen(a, b) { return '<div class="ms-zeilen"><i style="width:' + a + '%"></i><i style="width:' + b + '%"></i></div>'; }
  function chips(b) { return '<div class="ms-chips">' + (b.chips || []).map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>"; }

  function seite(b, layout) {
    var stil = "--m-bg:" + b.bg + ";--m-ink:" + b.ink + ";--m-ac:" + b.ac + ";--m-on:" + b.on + ";--m-ff:" + SCHRIFT[b.ff];
    if (b.r) stil += ";--m-r:" + b.r + ";--m-rb:" + b.r;
    if (b.ff === "kraeftig") stil += ";--m-hw:600;--m-tt:uppercase;--m-ls:-0.02em";
    var nav = '<div class="ms-nav"><span class="ms-logo">' + esc(b.name) + '</span><span class="ms-links"><i></i><i></i></span><span class="ms-cta">' + esc(b.cta) + "</span></div>";
    var innen = "";
    if (layout === "cover") {
      innen = foto(b) + nav + '<div class="ms-text"><h4>' + esc(b.h) + "</h4>" + zeilen(78, 52) + '<span class="ms-btn">' + esc(b.btn) + "</span></div>";
    } else if (layout === "split") {
      innen = nav + '<div class="ms-text"><h4>' + esc(b.h) + "</h4>" + zeilen(90, 64) + '<span class="ms-btn">' + esc(b.btn) + "</span></div>" + foto(b);
    } else if (layout === "oben") {
      innen = nav + foto(b) + '<div class="ms-text"><h4>' + esc(b.h) + "</h4>" + chips(b) + "</div>";
    } else if (layout === "karte") {
      innen = nav + foto(b) + '<div class="ms-text"><h4>' + esc(b.h) + "</h4>" + (b.karte || []).map(function (z) { return '<div class="ms-zeile"><span>' + esc(z[0]) + "</span><b>" + esc(z[1]) + "</b></div>"; }).join("") + '<span class="ms-btn">' + esc(b.btn) + "</span></div>";
    } else if (layout === "quer") {
      innen = nav + '<div class="ms-reihe"><div class="ms-text"><h4>' + esc(b.h) + "</h4>" + zeilen(92, 70) + '<span class="ms-btn">' + esc(b.btn) + "</span></div>" + foto(b) + "</div>";
    }
    return '<div class="ms ms-' + layout + '" style="' + stil + '"><div class="ms-in">' + innen + "</div></div>";
  }

  /* Jeder Betrieb zweimal, in zwei verschiedenen Aufbauten */
  var KACHELN = [];
  BETRIEBE.forEach(function (b) { KACHELN.push(seite(b, b.layouts[0])); });
  BETRIEBE.forEach(function (b) { KACHELN.push(seite(b, b.layouts[1])); });

  var DAUER = [64, 52, 72, 58, 68, 54, 74, 60, 66, 56];
  /* Zoom der gekippten Ebene, bezogen auf 1440 x 900 (PC) und 390 x 844 (Handy); mit ecken.mjs geprüft */
  var SKALA_PC = 1.1, SKALA_HANDY = 1.25;

  function bauen(ziel) {
    var schmal = window.innerWidth < 700;
    var spalten = schmal ? 7 : 10, proSpalte = schmal ? 7 : 8;
    var html = "";
    for (var s = 0; s < spalten; s++) {
      var teil = "";
      /* Versatz pro Spalte, damit nebeneinander nie derselbe Betrieb steht */
      for (var k = 0; k < proSpalte; k++) teil += KACHELN[(s * 5 + k * 7) % KACHELN.length];
      /* zweimal hintereinander für die nahtlose Endlosschleife */
      html += '<div class="spalte' + (s % 2 ? " runter" : "") + '" style="--dauer:' + DAUER[s] + 's">' + teil + teil + "</div>";
    }
    ziel.innerHTML = html;
    ziel.setAttribute("data-schmal", schmal ? "1" : "0");
    hoeheSetzen(ziel);
  }

  /* Die gekippte Ebene ist so hoch wie eine halbe Spalte: Diese Fläche ist in jedem Moment der Schleife voll. */
  function hoeheSetzen(ziel) {
    var min = Infinity;
    ziel.querySelectorAll(".spalte").forEach(function (sp) { min = Math.min(min, sp.offsetHeight / 2); });
    if (isFinite(min) && min > 0) ziel.style.setProperty("--ebene-h", Math.floor(min) + "px");
    /* Breite Bildschirme: Ebene wächst mit, damit auch die Ecken voll bleiben */
    var w = window.innerWidth, h = Math.max(window.innerHeight, ziel.parentNode.offsetHeight);
    var skala = w < 700 ? SKALA_HANDY * Math.max(w / 390, h / 844) : SKALA_PC * Math.max(w / 1440, h / 900);
    ziel.style.setProperty("--skala", skala.toFixed(3));
  }

  var raster = document.querySelector("[data-raster]");
  if (!raster) return;
  bauen(raster);
  window.addEventListener("load", function () { hoeheSetzen(raster); });
  var wartet = null;
  window.addEventListener("resize", function () {
    clearTimeout(wartet);
    wartet = setTimeout(function () {
      var schmal = window.innerWidth < 700 ? "1" : "0";
      if (raster.getAttribute("data-schmal") !== schmal) bauen(raster); else hoeheSetzen(raster);
    }, 200);
  });

  /* Bewegung anhalten, sobald der Hero nicht mehr sichtbar ist (spart Akku). Über die Scrollposition gemessen. */
  var hero = raster.parentNode, geplant = false;
  function pruefen() {
    geplant = false;
    var r = hero.getBoundingClientRect();
    raster.classList.toggle("pausiert", r.bottom <= 0 || r.top >= window.innerHeight);
  }
  function planen() { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }
  window.addEventListener("scroll", planen, { passive: true });
  window.addEventListener("resize", planen);
  pruefen();
})();
