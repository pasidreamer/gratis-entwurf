/* Pop-up-Formular «Gratis-Entwurf»: öffnen, zwei Schritte, Prüfung der Felder, Versand, Danke-Ansicht.
   Wohin gesendet wird, steht im <form> in index.html: action = Adresse, data-zugang = Access Key (nur Web3Forms).
   Ist action leer, sendet das Formular nichts und zeigt die Fehlermeldung mit dem Weg per E-Mail.
   Klassisches Skript ohne Module, damit die Seite auch per Doppelklick läuft. */
(function () {
  var dialog = document.getElementById("formular");
  if (!dialog || typeof dialog.showModal !== "function") return; /* ohne Dialog-Unterstützung bleibt der Link #formular */

  var POSTFACH = "office@pagestudio.ch";
  var form = document.getElementById("anfrage");
  var stufen = form.querySelectorAll(".stufe");
  var anzeige = document.getElementById("schritt-anzeige");
  var balken = dialog.querySelectorAll(".balken i");
  var kopf = dialog.querySelector(".formular-kopf");
  var danke = dialog.querySelector(".danke");
  var feldLink = form.querySelector('[data-feld="link"]');
  var knopfSenden = form.querySelector("[data-senden]");
  var knopfZurueck = form.querySelector("[data-zurueck]");
  var sendeFehler = form.querySelector("[data-sende-fehler]");
  var sendet = false;
  var ausloeser = null;

  var MELDUNG = {
    website: "Bitte wähle, ob du schon eine Website hast.",
    link: "Bitte gib die Adresse deiner Website an, zum Beispiel www.beispiel.ch.",
    betrieb: "Bitte gib den Namen deines Betriebs an.",
    branche: "Bitte gib deine Branche an, zum Beispiel Schreinerei.",
    land: "Bitte wähle, wo dein Betrieb seinen Sitz hat.",
    vorname: "Bitte gib deinen Vornamen an.",
    nachname: "Bitte gib deinen Nachnamen an.",
    telefon: "Bitte gib eine Telefonnummer an, unter der ich dich erreiche.",
    email: "Bitte gib eine gültige E-Mail-Adresse an.",
    einverstanden: "Bitte bestätige, dass du einverstanden bist."
  };

  function wert(name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "ja" : "";
    return (el.value || "").trim();
  }

  function pruefe(name) {
    var v = wert(name);
    if (name === "link") return wert("website") !== "ja" || /^(https?:\/\/)?[^\s.\/]+(\.[^\s.\/]+)+(\/\S*)?$/i.test(v);
    if (name === "telefon") return v.replace(/\D/g, "").length >= 8;
    if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    return v !== "";
  }

  function zeige(name, ok) {
    var feld = form.querySelector('[data-feld="' + name + '"]');
    if (!feld) return;
    var fehler = feld.querySelector(".fehler");
    var wahl = feld.querySelector(".wahl");
    var eingabe = feld.querySelector(".eingabe, input[type=checkbox]");
    fehler.textContent = ok ? "" : MELDUNG[name];
    if (wahl) wahl.classList.toggle("ungueltig", !ok);
    if (eingabe) eingabe.setAttribute("aria-invalid", ok ? "false" : "true");
    feld.classList.toggle("hat-fehler", !ok);
  }

  function pruefeStufe(nr) {
    var namen = nr === 1 ? ["website", "link", "betrieb", "branche", "land"] : ["vorname", "nachname", "telefon", "email", "einverstanden"];
    var erster = null;
    namen.forEach(function (n) {
      var ok = pruefe(n);
      zeige(n, ok);
      if (!ok && !erster) erster = n;
    });
    if (erster) {
      var ziel = form.querySelector('[data-feld="' + erster + '"] input');
      if (ziel) ziel.focus();
      return false;
    }
    return true;
  }

  function gehe(nr) {
    stufen.forEach(function (s) { s.hidden = Number(s.getAttribute("data-stufe")) !== nr; });
    anzeige.textContent = "Schritt " + nr + " von 2";
    balken[1].classList.toggle("an", nr === 2);
    var erstes = form.querySelector('.stufe[data-stufe="' + nr + '"] input');
    if (erstes) erstes.focus();
  }

  function zuruecksetzen() {
    form.reset();
    sendeZustand(false);
    sendeFehler.hidden = true;
    form.querySelectorAll(".fehler").forEach(function (f) { f.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach(function (e) { e.setAttribute("aria-invalid", "false"); });
    form.querySelectorAll(".ungueltig").forEach(function (e) { e.classList.remove("ungueltig"); });
    feldLink.hidden = true;
    form.hidden = false;
    kopf.hidden = false;
    danke.hidden = true;
    gehe(1);
  }

  function oeffnen(e) {
    if (e) e.preventDefault();
    ausloeser = document.activeElement;
    if (!dialog.open) dialog.showModal();
    aufgeraeumt = false;
    document.documentElement.classList.add("modal-offen");
    var erstes = form.querySelector('.stufe:not([hidden]) input');
    if (erstes && !form.hidden) erstes.focus();
  }

  /* Aufräumen direkt beim Schliessen: Das Ereignis «close» kommt in manchen Browsern verspätet */
  var aufgeraeumt = true;
  function aufraeumen() {
    if (aufgeraeumt) return;
    aufgeraeumt = true;
    document.documentElement.classList.remove("modal-offen");
    if (!danke.hidden) zuruecksetzen();
    if (location.hash === "#formular") history.replaceState(null, "", location.pathname + location.search);
    if (ausloeser && ausloeser.focus) ausloeser.focus();
  }
  function schliessen() { if (dialog.open) dialog.close(); aufraeumen(); }
  dialog.addEventListener("close", aufraeumen);
  /* Esc schliesst das Fenster ebenfalls */
  dialog.addEventListener("keydown", function (e) { if (e.key === "Escape") { e.preventDefault(); schliessen(); } });

  /* Klick neben das Fenster schliesst es */
  dialog.addEventListener("click", function (e) { if (e.target === dialog) schliessen(); });
  dialog.querySelectorAll("[data-schliessen]").forEach(function (k) { k.addEventListener("click", schliessen); });

  document.querySelectorAll("[data-formular]").forEach(function (a) { a.addEventListener("click", oeffnen); });

  /* Website ja/nein: Feld für die Adresse ein- oder ausblenden */
  form.querySelectorAll('input[name="website"]').forEach(function (r) {
    r.addEventListener("change", function () {
      feldLink.hidden = wert("website") !== "ja";
      zeige("website", true);
      if (!feldLink.hidden) form.elements.link.focus();
    });
  });

  /* Fehler verschwinden, sobald das Feld stimmt */
  form.addEventListener("input", function (e) {
    var name = e.target.name;
    if (!name || !MELDUNG[name]) return;
    var feld = form.querySelector('[data-feld="' + name + '"]');
    if (feld && feld.classList.contains("hat-fehler") && pruefe(name)) zeige(name, true);
  });
  form.addEventListener("change", function (e) {
    var name = e.target.name;
    if ((name === "land" || name === "einverstanden") && pruefe(name)) zeige(name, true);
  });

  form.querySelector("[data-weiter]").addEventListener("click", function () { if (pruefeStufe(1)) gehe(2); });
  knopfZurueck.addEventListener("click", function () { gehe(1); });

  /* ---------- Versand ---------- */
  function sendeZustand(an) {
    sendet = an;
    knopfSenden.disabled = an;
    knopfZurueck.disabled = an;
    knopfSenden.textContent = an ? "Wird gesendet …" : "Entwurf anfordern";
    form.setAttribute("aria-busy", an ? "true" : "false");
  }

  function daten() {
    var fd = new FormData(form);
    if (wert("website") !== "ja") fd.delete("link");
    fd.append("subject", "Gratis-Entwurf: " + wert("betrieb"));
    fd.append("from_name", "PaGe Studio Landingpage");
    var zugang = form.getAttribute("data-zugang");
    if (zugang) fd.append("access_key", zugang);
    return fd;
  }

  /* Plan B: Die Angaben als fertige E-Mail im Mailprogramm des Besuchers */
  function mailLink() {
    var zeilen = [
      "Ich möchte einen Gratis-Entwurf.",
      "",
      "Website: " + (wert("website") === "ja" ? "Ja, " + wert("link") : "Nein"),
      "Betrieb: " + wert("betrieb"),
      "Branche: " + wert("branche"),
      "Sitz: " + ({ CH: "Schweiz", LI: "Liechtenstein", DE: "Deutschland", AT: "Österreich" }[wert("land")] || wert("land")),
      "Wünsche: " + (wert("wuensche") || "(keine Angabe)"),
      "Name: " + wert("vorname") + " " + wert("nachname"),
      "Telefon: " + wert("telefon"),
      "E-Mail: " + wert("email")
    ];
    return "mailto:" + POSTFACH + "?subject=" + encodeURIComponent("Gratis-Entwurf: " + wert("betrieb")) +
      "&body=" + encodeURIComponent(zeilen.join("\n"));
  }

  function zeigeDanke() {
    danke.querySelector("[data-vorname]").textContent = wert("vorname");
    danke.querySelector("[data-telefon]").textContent = wert("telefon");
    sendeZustand(false);
    form.hidden = true;
    kopf.hidden = true;
    danke.hidden = false;
    danke.querySelector(".h2-form").focus();
  }

  function zeigeSendeFehler() {
    sendeZustand(false);
    sendeFehler.querySelector("a").href = mailLink();
    sendeFehler.hidden = false;
    knopfSenden.focus();
  }

  function senden() {
    var ziel = form.getAttribute("action");
    sendeFehler.hidden = true;
    if (!ziel || typeof fetch !== "function") { zeigeSendeFehler(); return; }
    sendeZustand(true);
    var abbruch = typeof AbortController === "function" ? new AbortController() : null;
    var uhr = abbruch ? setTimeout(function () { abbruch.abort(); }, 15000) : null;
    fetch(ziel, { method: "POST", body: daten(), headers: { Accept: "application/json" }, signal: abbruch ? abbruch.signal : undefined })
      .then(function (antwort) {
        return antwort.json().then(function (j) { return antwort.ok && j && j.success === true; }, function () { return false; });
      })
      .then(function (ok) { clearTimeout(uhr); if (ok) zeigeDanke(); else zeigeSendeFehler(); },
            function () { clearTimeout(uhr); zeigeSendeFehler(); });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sendet) return;
    /* Enter in Schritt 1 heisst «Weiter», nicht «Senden» */
    if (!stufen[0].hidden) { if (pruefeStufe(1)) gehe(2); return; }
    if (!pruefeStufe(2)) return;
    senden();
  });

  /* Direkt geöffnet über #formular oder ?modal=1 (zum Testen) */
  if (location.hash === "#formular" || /[?&]modal=1/.test(location.search)) oeffnen();
})();
