/* Vorher-Nachher: Reiter für fünf Branchen (alle Betriebe erfunden) und ein Schieberegler.
   Der unsichtbare Regler über dem Bild setzt die Trennlinie (--pos): ziehen mit Maus oder Finger, Pfeiltasten.
   Ohne JavaScript bleibt das Restaurant aus dem HTML stehen. Klassisches Skript ohne Module. */
(function () {
  var B = "bilder/";
  var BEISPIELE = [
    {
      id: "restaurant", reiter: "Restaurant", adresse: "Beispiel: Osteria Lumi", licht: ["kachel-03-baeckerei", "kachel-04-restaurant", "kachel-03-baeckerei"],
      alt: { name: "Osteria Lumi", gruss: "Herzlich Willkommen auf unserer Homepage!", nav: ["Home", "Speisekarte (PDF)", "Anfahrt", "Kontakt", "Gästebuch"], bild: "kachel-04-restaurant",
        titel: "Willkommen!", text: "Wir begrüssen Sie herzlich in der Osteria Lumi. Bei uns erwartet Sie italienische Küche in gemütlicher Atmosphäre. Reservationen nehmen wir gerne telefonisch entgegen.",
        tabelle: [["Montag", "Ruhetag"], ["Dienstag bis Freitag", "11.30 bis 14.00 und 18.00 bis 23.00"], ["Samstag und Sonntag", "17.00 bis 23.00"]],
        fuss: "Besucher: 004213 | Letzte Aktualisierung: 12.03.2014 | Impressum", farben: { bg: "#e8e2d2", k1: "#8e1b1b", k2: "#5e0f0f", ak: "#8e1b1b", gruss: "#ffe16a" } },
      neu: { name: "Osteria Lumi", links: ["Karte", "Über uns", "Anfahrt"], cta: "Tisch reservieren", bild: "kachel-04-restaurant", chip: "Heute offen bis 23 Uhr",
        titel: "Hausgemachte Pasta und Fisch vom See.", unter: "Mittags und abends, mitten in der Altstadt.", knopf: "Tisch reservieren", knopf2: "Speisekarte ansehen",
        band: "Aus der Karte", eintraege: [["Felchen vom See", "34"], ["Risotto al limone", "26"], ["Tiramisù della casa", "12"]],
        farben: { bg: "#14110E", ink: "#F1E6D4", titel: "#ffffff", ac: "#D6A15A", on: "#14110E", band: "#1b1713" } },
      punkte: [["Speisekarte direkt auf der Seite", "Lesbar am Computer und auf dem Handy, ohne PDF herunterzuladen."], ["Reservieren im ersten Bildschirm", "Der wichtigste Knopf ist der erste, den man sieht."], ["Öffnungszeiten auf einen Blick", "Niemand muss suchen oder anrufen, um zu fragen."]]
    },
    {
      id: "handwerk", reiter: "Handwerk", adresse: "Beispiel: Holzwerk Keller", licht: ["kachel-01-schreinerei", "kachel-11-malerei", "kachel-01-schreinerei"],
      alt: { name: "Schreinerei Keller AG", gruss: "Ihr Partner für Holz", nav: ["Home", "Über uns", "Leistungen", "Referenzen", "Kontakt"], bild: "kachel-01-schreinerei",
        titel: "Willkommen", text: "Wir fertigen Möbel, Küchen und Treppen nach Ihren Wünschen. Für eine Beratung rufen Sie uns während der Bürozeiten an.",
        tabelle: [["Montag bis Freitag", "7.00 bis 12.00 und 13.30 bis 17.30"], ["Samstag", "nach Vereinbarung"]],
        fuss: "Besucher: 001877 | Letzte Aktualisierung: 08.06.2013 | Impressum", farben: { bg: "#e4e8dc", k1: "#3d6b2f", k2: "#264a1c", ak: "#2f5a22", gruss: "#f3e7a8" } },
      neu: { name: "Holzwerk Keller", links: ["Arbeiten", "Werkstatt", "Kontakt"], cta: "Offerte anfragen", bild: "kachel-01-schreinerei", chip: "Schreinerei im Thurgau",
        titel: "Möbel aus Holz, die bleiben.", unter: "Küchen, Treppen und Türen nach Mass, aus der eigenen Werkstatt.", knopf: "Offerte anfragen", knopf2: "Arbeiten ansehen",
        band: "Leistungen", eintraege: [["Küchen", "nach Mass"], ["Treppen", "Holz und Stahl"], ["Türen", "innen und aussen"]],
        farben: { bg: "#120d09", ink: "#F3E9DD", titel: "#ffffff", ac: "#ffffff", on: "#120d09", band: "#1a130d" } },
      punkte: [["Offerte mit einem Klick", "Kunden fragen direkt an, auch abends nach Feierabend."], ["Arbeiten mit Bildern zeigen", "Fotos von Küchen und Treppen überzeugen mehr als eine Liste."], ["Klar, was und wo", "Leistungen und Region stehen ganz oben, am Computer und auf dem Handy."]]
    },
    {
      id: "coiffeur", reiter: "Coiffeur und Beauty", adresse: "Beispiel: Coiffeur Linde", licht: ["kachel-02-coiffeur", "kachel-13-beauty", "kachel-02-coiffeur"],
      alt: { name: "Coiffeur Linde", gruss: "Ihr Coiffeur in der Altstadt", nav: ["Home", "Preise", "Team", "Kontakt"], bild: "kachel-02-coiffeur",
        titel: "Preisliste", text: "Termine nur telefonisch. Wir freuen uns auf Ihren Besuch!",
        tabelle: [["Damen schneiden und föhnen", "Fr. 68.00"], ["Herren schneiden", "Fr. 38.00"], ["Färben", "ab Fr. 85.00"]],
        fuss: "Besucher: 000956 | Letzte Aktualisierung: 21.01.2015 | Impressum", farben: { bg: "#f1e4ea", k1: "#c2185b", k2: "#880e4f", ak: "#ad1457", gruss: "#ffd6e7" } },
      neu: { name: "Coiffeur Linde", links: ["Leistungen", "Team", "Kontakt"], cta: "Termin buchen", bild: "kachel-02-coiffeur", chip: "Heute noch Termine frei",
        titel: "Dein Termin, online gebucht.", unter: "Schnitt, Farbe und Pflege in der Altstadt.", knopf: "Termin buchen", knopf2: "Preise ansehen",
        band: "Freie Termine", eintraege: [["Heute", "14.30"], ["Morgen", "09.00"], ["Samstag", "10.15"]],
        farben: { bg: "#F6EEEA", ink: "#2D2326", titel: "#2D2326", ac: "#A9545E", on: "#ffffff", band: "#efe2dc" } },
      punkte: [["Termin online buchen", "Freie Zeiten sehen und buchen, ohne anzurufen."], ["Preise übersichtlich", "Leistungen und Preise, gut lesbar am Computer und auf dem Handy."], ["Bilder aus dem Salon", "Wer die Stimmung sieht, kommt lieber vorbei."]]
    },
    {
      id: "garage", reiter: "Garage", adresse: "Beispiel: Garage Thurtal", licht: ["kachel-07-garage", "kachel-05-fahrschule", "kachel-07-garage"],
      alt: { name: "Garage Thurtal", gruss: "Ihre Garage für alle Marken", nav: ["Home", "Occasionen", "Werkstatt", "Anfahrt", "Kontakt"], bild: "kachel-07-garage",
        titel: "Willkommen", text: "Wir reparieren und warten Fahrzeuge aller Marken. Für einen Termin rufen Sie uns bitte an.",
        tabelle: [["Montag bis Freitag", "7.30 bis 12.00 und 13.15 bis 18.00"], ["Samstag", "8.00 bis 12.00"]],
        fuss: "Besucher: 012560 | Letzte Aktualisierung: 30.09.2016 | Impressum", farben: { bg: "#dfe3e6", k1: "#455a64", k2: "#263238", ak: "#37474f", gruss: "#ffcc80" } },
      neu: { name: "Garage Thurtal", links: ["Service", "Reifen", "Occasionen"], cta: "Termin buchen", bild: "kachel-07-garage", chip: "Pannenhilfe in der Region",
        titel: "Service, Reifen und MFK.", unter: "Termin online wählen, Auto bringen, fertig.", knopf: "Service-Termin buchen", knopf2: "Notfall anrufen",
        band: "Nächste Termine", eintraege: [["Service", "Montag"], ["Reifenwechsel", "Mi 08.00"], ["MFK-Vorbereitung", "Do 13.30"]],
        farben: { bg: "#15181b", ink: "#EEF1F3", titel: "#ffffff", ac: "#F08A24", on: "#15181b", band: "#1c2024" } },
      punkte: [["Service-Termin online", "Service, Reifenwechsel oder MFK direkt auf der Seite wählen."], ["Notfall-Nummer gross", "Bei einer Panne findet man die Nummer sofort."], ["Öffnungszeiten und Anfahrt", "Auf einen Blick, am Computer und auf dem Handy."]]
    },
    {
      id: "physio", reiter: "Physiotherapie", adresse: "Beispiel: Physio am See", licht: ["kachel-06-physio", "kachel-08-garten", "kachel-06-physio"],
      alt: { name: "Physiotherapie am See", gruss: "Ihre Praxis für Physiotherapie und Massage", nav: ["Startseite", "Über uns", "Leistungen", "Anfahrt", "Kontakt"], bild: "kachel-06-physio",
        titel: "Herzlich willkommen", text: "Unsere Leistungen: Massage, Lymphdrainage, Manuelle Therapie und Sportphysiotherapie. Termine nur telefonisch.",
        tabelle: [["Montag bis Freitag", "8.00 bis 19.00"], ["Samstag", "geschlossen"]],
        fuss: "Letzte Aktualisierung: 04.11.2015 | Impressum", farben: { bg: "#dfe6ec", k1: "#3b6ea5", k2: "#224c7a", ak: "#224c7a", gruss: "#d9ecff" } },
      neu: { name: "Physio am See", links: ["Behandlungen", "Team", "Kontakt"], cta: "Termin buchen", bild: "kachel-06-physio", chip: "Neue Patienten willkommen",
        titel: "Wieder schmerzfrei bewegen.", unter: "Physiotherapie und Massage, direkt am See.", knopf: "Termin online buchen", knopf2: "Behandlungen",
        band: "Behandlungen", eintraege: [["Rücken", "45 Min."], ["Sport", "45 Min."], ["Reha", "60 Min."]],
        farben: { bg: "#E8F1EE", ink: "#163330", titel: "#163330", ac: "#2E7C6F", on: "#ffffff", band: "#dbe9e4" } },
      punkte: [["Termin online buchen", "Patienten buchen selbst, die Praxis telefoniert weniger."], ["Behandlungen erklärt", "Wer weiss, was ihn erwartet, kommt entspannter."], ["Am Computer und auf dem Handy", "Die Seite passt sich jedem Bildschirm an."]]
    }
  ];

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function img(name) { return '<img src="' + B + name + '.webp" alt="" decoding="async">'; } /* sofort laden: der Reiter wird ja gerade angeschaut */

  function altHtml(a) {
    return '<div class="alt-seite">' +
      '<div class="alt-kopf"><b>' + esc(a.name) + "</b><span>" + esc(a.gruss) + "</span></div>" +
      '<div class="alt-nav">' + a.nav.map(function (n) { return "<u>" + esc(n) + "</u>"; }).join(" | ") + "</div>" +
      '<div class="alt-inhalt">' + img(a.bild) + "<div>" +
        '<p class="alt-titel">' + esc(a.titel) + "</p><p>" + esc(a.text) + "</p><p><b>Tel. 071 000 00 00</b></p>" +
        "<table>" + a.tabelle.map(function (z) { return "<tr><td>" + esc(z[0]) + "</td><td>" + esc(z[1]) + "</td></tr>"; }).join("") + "</table>" +
      "</div></div>" +
      '<div class="alt-fuss">' + esc(a.fuss) + "</div></div>";
  }
  function neuHtml(n) {
    return '<div class="neu-seite">' +
      '<div class="neu-nav"><span class="neu-logo">' + esc(n.name) + '</span><span class="neu-links">' + n.links.map(function (l) { return "<i>" + esc(l) + "</i>"; }).join("") + '</span><span class="neu-cta">' + esc(n.cta) + "</span></div>" +
      '<div class="neu-hero">' + img(n.bild) + '<div class="neu-hero-text">' +
        '<span class="neu-chip">' + esc(n.chip) + '</span><p class="neu-titel">' + esc(n.titel) + '</p><p class="neu-unter">' + esc(n.unter) + "</p>" +
        '<span class="neu-knoepfe"><span class="neu-btn">' + esc(n.knopf) + '</span><span class="neu-btn leer">' + esc(n.knopf2) + "</span></span>" +
      "</div></div>" +
      '<div class="neu-karte"><p class="neu-karte-titel">' + esc(n.band) + '</p><div class="neu-gerichte">' +
        n.eintraege.map(function (e) { return "<div><span>" + esc(e[0]) + "</span><b>" + esc(e[1]) + "</b></div>"; }).join("") +
      "</div></div></div>";
  }
  function farben(b) {
    var a = b.alt.farben, n = b.neu.farben;
    return "--alt-bg:" + a.bg + ";--alt-k1:" + a.k1 + ";--alt-k2:" + a.k2 + ";--alt-ak:" + a.ak + ";--alt-gruss:" + a.gruss +
      ";--neu-bg:" + n.bg + ";--neu-ink:" + n.ink + ";--neu-titel:" + n.titel + ";--neu-ac:" + n.ac + ";--neu-on:" + n.on + ";--neu-band:" + n.band;
  }

  document.querySelectorAll(".vn").forEach(function (vn) {
    var buehne = vn.querySelector(".vn-buehne");
    var regler = vn.querySelector("[data-vn-regler]");
    var reiterBox = document.querySelector("[data-vn-reiter]");
    var adresse = vn.querySelector(".vn-adresse");
    var punkte = document.querySelectorAll(".vn-punkte li");
    var licht = document.querySelectorAll(".umgebung-vn img");

    function setzen() {
      var wert = Number(regler.value);
      buehne.style.setProperty("--pos", wert + "%");
      regler.setAttribute("aria-valuetext", (100 - wert) + " Prozent der neuen Seite sichtbar");
    }
    regler.addEventListener("input", function () { abbrechen(); setzen(); });

    /* Vorführung: Der Regler fährt einmal nach links, nach rechts und zurück zur Mitte.
       Beim ersten Hinscrollen und bei jedem Reiterwechsel; hört auf, sobald jemand selbst zieht. */
    var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var lauf = null, schonGezeigt = false;
    function setzePos(v) { buehne.style.setProperty("--pos", v.toFixed(2) + "%"); regler.value = Math.round(v); }
    function abbrechen() { if (lauf) { cancelAnimationFrame(lauf); lauf = null; } }
    function vorfuehren() {
      if (ruhig) return;
      abbrechen();
      var ziele = [50, 18, 82, 50], dauer = [650, 1100, 650], start = null;
      function bild(t) {
        if (start === null) start = t;
        var d = t - start, i = 0;
        while (i < dauer.length && d > dauer[i]) { d -= dauer[i]; i++; }
        if (i >= dauer.length) { setzePos(50); setzen(); lauf = null; return; }
        var p = d / dauer[i];
        p = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; /* weich anfahren und abbremsen */
        setzePos(ziele[i] + (ziele[i + 1] - ziele[i]) * p);
        lauf = requestAnimationFrame(bild);
      }
      lauf = requestAnimationFrame(bild);
    }
    buehne.addEventListener("pointerdown", abbrechen);
    regler.addEventListener("keydown", abbrechen);

    /* Erstes Hinscrollen: Vergleich zu gut der Hälfte im Bild, dann einmal vorführen */
    var geplant = false;
    function pruefeSicht() {
      geplant = false;
      if (schonGezeigt) return;
      var r = buehne.getBoundingClientRect(), h = window.innerHeight;
      var drin = Math.min(r.bottom, h) - Math.max(r.top, 0);
      if (drin > Math.min(r.height, h) * 0.6) {
        schonGezeigt = true;
        window.removeEventListener("scroll", planen);
        setTimeout(vorfuehren, 250);
      }
    }
    function planen() { if (!geplant) { geplant = true; requestAnimationFrame(pruefeSicht); } }
    window.addEventListener("scroll", planen, { passive: true });

    function zeigen(b, ersterAufruf) {
      abbrechen();
      buehne.setAttribute("style", "--pos: 50%;" + farben(b));
      buehne.setAttribute("data-beispiel", b.id);
      if (!ersterAufruf || b.id !== "restaurant") {
        vn.querySelector(".vn-alt").innerHTML = altHtml(b.alt);
        vn.querySelector(".vn-neu").innerHTML = neuHtml(b.neu);
      }
      regler.value = 50; setzen();
      adresse.textContent = b.adresse;
      punkte.forEach(function (li, i) {
        if (!b.punkte[i]) return;
        li.querySelector("b").textContent = b.punkte[i][0];
        li.querySelector("span").textContent = b.punkte[i][1];
      });
      licht.forEach(function (bild, i) { var q = B + b.licht[i % b.licht.length] + ".webp"; if (bild.getAttribute("src") !== q) bild.setAttribute("src", q); });
      if (reiterBox) reiterBox.querySelectorAll("[role=tab]").forEach(function (t) {
        var an = t.getAttribute("data-id") === b.id;
        t.setAttribute("aria-selected", an ? "true" : "false");
        t.tabIndex = an ? 0 : -1;
      });
    }

    /* Reiter bauen (nur mit JavaScript sinnvoll) */
    if (reiterBox) {
      reiterBox.innerHTML = BEISPIELE.map(function (b) {
        return '<button type="button" role="tab" class="vn-reiter-knopf" data-id="' + b.id + '" aria-controls="vn-buehne">' + esc(b.reiter) + "</button>";
      }).join("");
      reiterBox.hidden = false;
      reiterBox.addEventListener("click", function (e) {
        var k = e.target.closest("[role=tab]");
        if (!k) return;
        var b = BEISPIELE.filter(function (x) { return x.id === k.getAttribute("data-id"); })[0];
        if (b) { zeigen(b); schonGezeigt = true; window.removeEventListener("scroll", planen); vorfuehren(); }
      });
      /* Pfeiltasten wechseln zwischen den Reitern */
      reiterBox.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var tabs = [].slice.call(reiterBox.querySelectorAll("[role=tab]"));
        var i = tabs.indexOf(document.activeElement);
        if (i < 0) return;
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        n.focus(); n.click(); e.preventDefault();
      });
    }
    zeigen(BEISPIELE[0], true);
    pruefeSicht();
  });
})();
