/* =========================================================
   Riya + Hemang — SANGEET-ONLY invite: interactions, scroll choreography & languages
   (built from the main site; see CONTEXT.md for what differs)
   Languages: "en" (English), "gu" (Gujarati), "mix" (English + Gujarati accent lines)
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const GU_RE = /[઀-૿]/;

  /* =========================================================
     CONTENT — edit here. Every text has an English (en) and Gujarati (gu) version.
     ========================================================= */

  // SANGEET-ONLY SITE: every text, card and link on this page is about the Sangeet only, in every
  // language (see CONTEXT.md before adding anything).

  // Every RSVP button opens this Google Form in a new tab (no on-site form on this site).
  const RSVP_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScjt8fXO3nJDbcQimEJqLpDoN4Sx8DFivjK2zVznNaiuzPm1w/viewform";

  // Riya's link (/riya, see vercel.json): the same invite without any RSVP. It drops the RSVP buttons,
  // the RSVP section, the RSVP card, the pop-up's RSVP button and the RSVP question in the FAQ.
  const NO_RSVP = location.pathname === "/riya" || location.pathname === "/riya/";

  // Static page text, matched to data-i18n="key" in index.html
  const UI = {
    en: {
      intro: "come dance with...", introCta: "scroll to begin",
      navSangeet: "Sangeet", navFaq: "FAQ", navRsvp: "RSVP",
      heroName: "Riya & Hemang", heroPrompt: "Scroll to explore",
      storyIntro: "a few moments that led us here...", storyTitle: "our love story",
      eventLead: "so come dance with us...", eventDate: "january 22, 2027",
      cdDays: "Days", cdHours: "Hours", cdMinutes: "Minutes", cdSeconds: "Seconds", until: "until the sangeet",
      sangeetKicker: "The Sangeet", sangeetTagline: "an evening of music & dance",
      sangeetDate: "Friday, 22 January 2027", time: "6:00 PM onwards",
      sangeetVenue: "Bhanushali Wadi, Nerul", sangeetAddr: "Basveshewar Maharaj Marg, Sector 19A, Nerul East, Navi Mumbai 400706",
      dancingShoes: "bring your dancing shoes!", seeMap: "Map & contacts",
      rsvpTitle: "RSVP", rsvpNote: "we'd love to have you with us", rsvpBtn: "RSVP now",
      detailsTitle: "and now some additional details...",
      detailsSub: "Everything you need for one very musical evening.",
      faqTitle: "Questions and answers", faqHelp: "Can't find the answer here?", faqLink: "Reach out to Hemang or Harsh",
      faqOutro: "We cannot wait to dance with you.",
      // used inside pop-ups
      call: "Call", whatsapp: "WhatsApp", rsvpContact: "Questions? Ask", openMaps: "Open in Google Maps", mapTitle: "Map to the venue",
    },
    gu: {
      intro: "આવો, ઝૂમીએ સાથે...", introCta: "શરૂ કરવા સ્ક્રોલ કરો",
      navSangeet: "સંગીત", navFaq: "પ્રશ્નો", navRsvp: "હાજરી જણાવો",
      heroName: "રિયા & હેમાંગ", heroPrompt: "આગળ જોવા સ્ક્રોલ કરો",
      storyIntro: "થોડી પળો, જે અમને અહીં સુધી લાવી...", storyTitle: "અમારી પ્રેમકહાણી",
      eventLead: "તો આવો, સાથે ઝૂમીએ...", eventDate: "૨૨ જાન્યુઆરી, ૨૦૨૭",
      cdDays: "દિવસ", cdHours: "કલાક", cdMinutes: "મિનિટ", cdSeconds: "સેકન્ડ", until: "સંગીત સંધ્યા સુધી",
      sangeetKicker: "સંગીત સંધ્યા", sangeetTagline: "સંગીત અને નૃત્યની એક સાંજ",
      sangeetDate: "શુક્રવાર, ૨૨ જાન્યુઆરી ૨૦૨૭", time: "સાંજે ૬:૦૦ વાગ્યાથી",
      sangeetVenue: "ભાનુશાલી વાડી, નેરુલ", sangeetAddr: "બસવેશ્વર મહારાજ માર્ગ, સેક્ટર ૧૯એ, નેરુલ ઈસ્ટ, નવી મુંબઈ ૪૦૦૭૦૬",
      dancingShoes: "નાચવાની પૂરી તૈયારી સાથે આવજો!", seeMap: "નકશો અને સંપર્ક",
      rsvpTitle: "હાજરી જણાવશો", rsvpNote: "આપની હાજરીથી અમને ખૂબ આનંદ થશે", rsvpBtn: "હાજરી જણાવો",
      detailsTitle: "અને હવે થોડી વધુ વિગતો...",
      detailsSub: "સંગીતભરી એક સાંજ માટે જરૂરી બધી માહિતી.",
      faqTitle: "પ્રશ્નો અને જવાબો", faqHelp: "અહીં જવાબ ન મળ્યો?", faqLink: "હેમાંગ અથવા હર્ષનો સંપર્ક કરો",
      faqOutro: "આપની સાથે ઝૂમવા અમે આતુર છીએ.",
      call: "ફોન કરો", whatsapp: "વૉટ્સએપ", rsvpContact: "પ્રશ્ન હોય તો", openMaps: "Google Maps માં ખોલો", mapTitle: "સ્થળનો નકશો",
    },
  };

  // Gujarati accent lines shown only in "Mix" mode (data-accent="key")
  const ACCENT = {
    intro: "આવો, ઝૂમીએ સાથે",
    hero: "રિયા & હેમાંગ",
    storyIntro: "થોડી પળો, જે અમને અહીં સુધી લાવી",
    storyTitle: "અમારી પ્રેમકહાણી",
    eventLead: "આવો, સાથે ઝૂમીએ",
    sangeetKicker: "સંગીત સંધ્યા",
    rsvp: "આપની હાજરી જણાવશો",
    details: "થોડી વધુ વિગતો",
    faq: "પ્રશ્નો અને જવાબો",
  };

  // Every photo used on the site: [width, height, then the area to keep visible when a box has to crop it
  // (x0, y0, x1, y1 as fractions of the photo)]. The areas come from Apple Vision face/body detection.
  // (Same rows as the main site; only the photos this page uses are kept.)
  const PHOTOS = {
    1: [1200, 1600, 0.12, 0.311, 0.831, 0.635],
    5: [1200, 1600, 0.289, 0.225, 0.629, 0.429],
    32: [1066, 1600, 0.196, 0.563, 0.763, 0.705],
    37: [1600, 1066, 0.225, 0.31, 0.807, 0.667],
    52: [1200, 1600, 0.434, 0.43, 0.705, 0.598],
    54: [1600, 1200, 0.316, 0.258, 0.682, 0.605],
    57: [1200, 1600, 0.276, 0.217, 0.685, 0.372],
    68: [1200, 1600, 0.17, 0.263, 0.739, 0.57],
  };

  // Story: ONE short chapter with 3 photos (the short version, like the short invite).
  // photos: file numbers; caps: caption under each photo (same order), per language.
  // tags: optional hashtag; a tagged photo's caption stays "". Frames look like Instagram prints
  // (white border, deeper bottom edge with the hashtag or caption handwritten on it). No dates on photos.
  // Frames take the photo's own shape, so nothing is ever cropped.
  const STORY = [
    {
      side: "left", photos: [1, 57, 32],
      tags: [null, "#FirstNavratri", "#SheSaidYes"],
      en: {
        title: "our story, the short version",
        body: "We met at a concert in Toronto, so of course there's music in this story. A year of firsts later, our first garba included, he got down on one knee and she said yes.",
        caps: ["Where it all began", "", ""],
      },
      gu: {
        title: "અમારી કહાણી, ટૂંકમાં",
        body: "અમે ટોરોન્ટોમાં એક કોન્સર્ટમાં મળ્યા, એટલે આ કહાણીમાં સંગીત તો હોવાનું જ. 'પહેલી વાર'થી ભરેલા એક વર્ષ પછી — પહેલા ગરબા સહિત — તેણે ઘૂંટણિયે બેસીને પૂછ્યું, અને તેણે હા પાડી.",
        caps: ["જ્યાંથી બધું શરૂ થયું", "", ""],
      },
    },
  ];
  const ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -1.6];

  // Who guests can call or WhatsApp. Riya's link sends her guests to her family, the main link to Hemang's.
  const CONTACTS = NO_RSVP ? [
    { en: "Dharmesh Raval", gu: "ધર્મેશ રાવલ", tel: "+919998870158", display: "+91 99988 70158" },
    { en: "Kunj Raval", gu: "કુંજ રાવલ", tel: "+917016906401", display: "+91 70169 06401" },
  ] : [
    { en: "Hemang", gu: "હેમાંગ", tel: "+919769333516", display: "+91 97693 33516" },
    { en: "Harsh", gu: "હર્ષ", tel: "+918369894213", display: "+91 83698 94213" },
  ];
  if (NO_RSVP) {
    UI.en.faqLink = "Reach out to Dharmesh or Kunj";
    UI.gu.faqLink = "ધર્મેશ અથવા કુંજનો સંપર્ક કરો";
  }
  const mapsEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  // Detail cards. A card with `href` is a link (the RSVP card opens the Google Form); the others open OVERLAYS[id].
  const CARDS = [
    { id: "sangeet", en: ["Sangeet", "Friday, 22 January · Nerul, Navi Mumbai"], gu: ["સંગીત સંધ્યા", "શુક્રવાર, ૨૨ જાન્યુઆરી · નેરુલ, નવી મુંબઈ"] },
    { id: "rsvp", href: RSVP_FORM, en: ["RSVP", "We'd love to have you with us."], gu: ["હાજરી જણાવો", "આપની હાજરીથી અમને ખૂબ આનંદ થશે."] },
    { id: "hashtag", en: ["#RiyaSangHemang", "Share every moment with us."], gu: ["#RiyaSangHemang", "દરેક પળ અમારી સાથે શેર કરો."] },
  ];

  const OVERLAYS = {
    sangeet: {
      map: "Bhanushali Wadi, Sector 19A, Nerul East, Navi Mumbai",
      contacts: true,
      en: {
        title: "Sangeet", description: "An evening of music and dance as both families come together in Navi Mumbai. Bring your dancing shoes!",
        sections: [
          ["When", "Friday, 22 January 2027", "6:00 PM onwards"],
          ["Where", "Bhanushali Wadi, Nerul", "Basveshewar Maharaj Marg, Nerul East, Sector 19A, Nerul, Navi Mumbai, Maharashtra 400706, India"],
        ],
      },
      gu: {
        title: "સંગીત સંધ્યા", description: "નવી મુંબઈમાં સંગીત અને નૃત્યની એક સાંજ, જ્યાં બંને પરિવાર એકસાથે મળશે. નાચવાની પૂરી તૈયારી સાથે આવજો!",
        sections: [
          ["ક્યારે", "શુક્રવાર, ૨૨ જાન્યુઆરી ૨૦૨૭", "સાંજે ૬:૦૦ વાગ્યાથી"],
          ["ક્યાં", "ભાનુશાલી વાડી, નેરુલ", "બસવેશ્વર મહારાજ માર્ગ, નેરુલ ઈસ્ટ, સેક્ટર ૧૯એ, નેરુલ, નવી મુંબઈ, મહારાષ્ટ્ર ૪૦૦૭૦૬, ભારત"],
        ],
      },
    },
    hashtag: {
      en: {
        title: "#RiyaSangHemang", description: "Snap, post and tag — we'd love to see the Sangeet through your eyes.",
        sections: [["Our hashtag", "#RiyaSangHemang", "Use it on Instagram, WhatsApp statuses and anywhere else you share photos and dance videos from the Sangeet."]],
      },
      gu: {
        title: "#RiyaSangHemang", description: "ફોટો પાડો, પોસ્ટ કરો અને ટૅગ કરો — સંગીત સંધ્યા આપની નજરે જોવી અમને ગમશે.",
        sections: [["અમારો હેશટૅગ", "#RiyaSangHemang", "સંગીત સંધ્યાના ફોટા અને ડાન્સના વીડિયો ઇન્સ્ટાગ્રામ, વૉટ્સએપ સ્ટેટસ કે બીજે ક્યાંય પણ શેર કરો ત્યારે આ હેશટૅગ વાપરજો."]],
      },
    },
  };

  const FAQ = {
    en: [
      ["When and where is the Sangeet?", ["Friday, 22 January 2027, from 6:00 PM at Bhanushali Wadi, Basveshewar Maharaj Marg, Sector 19A, Nerul East, Navi Mumbai."]],
      ["How do I RSVP?", ["Tap any RSVP button on this page. It opens a short Google Form in a new tab.", "You can also call or text Hemang (+91 97693 33516) or Harsh (+91 83698 94213)."], "rsvp"],
      ["How do I find the venue?", ["Tap the Sangeet card (or Map & contacts) for a map and a link to Google Maps."]],
      ["Do you have a hashtag?", ["Yes! Please share your photos and dance videos with #RiyaSangHemang."]],
    ],
    gu: [
      ["સંગીત સંધ્યા ક્યારે અને ક્યાં છે?", ["શુક્રવાર, ૨૨ જાન્યુઆરી ૨૦૨૭, સાંજે ૬:૦૦ વાગ્યાથી, ભાનુશાલી વાડી, બસવેશ્વર મહારાજ માર્ગ, સેક્ટર ૧૯એ, નેરુલ ઈસ્ટ, નવી મુંબઈ."]],
      ["હાજરી કેવી રીતે જણાવું?", ["આ પેજ પર 'હાજરી જણાવો' બટન પર ટૅપ કરો. નવી ટૅબમાં એક નાનું Google ફોર્મ ખૂલશે.", "આપ હેમાંગ (+91 97693 33516) અથવા હર્ષ (+91 83698 94213) ને ફોન કે મેસેજ પણ કરી શકો છો."], "rsvp"],
      ["સ્થળ કેવી રીતે શોધું?", ["નકશો અને Google Maps ની લિંક માટે 'સંગીત સંધ્યા' કાર્ડ (અથવા 'નકશો અને સંપર્ક') પર ટૅપ કરો."]],
      ["કોઈ હેશટૅગ છે?", ["હા! આપના ફોટા અને ડાન્સના વીડિયો #RiyaSangHemang સાથે શેર કરજો."]],
    ],
  };

  // Sangeet: 2027-01-22 18:00 IST (UTC+5:30)
  const COUNTDOWN_TARGET = Date.UTC(2027, 0, 22, 12, 30, 0);
  const img = (n) => `assets/rh/${n}.jpg`;

  // Riya's link: take the RSVP pieces out of the page before anything is measured or animated
  if (NO_RSVP) {
    document.documentElement.dataset.rsvp = "off";
    $("#rsvp-callout-section").remove();
    $$("a[data-rsvp]").forEach((a) => (a.closest("li") || a).remove());
  }
  // "Reach out to …" under the FAQ title calls the first contact
  $$(".faq__link").forEach((a) => (a.href = `tel:${CONTACTS[0].tel}`));
  // FAQ entries tagged "rsvp" are left out on Riya's link (same filter for both languages, so Mix lines up)
  const faqFor = (l) => FAQ[l].filter((f) => !(NO_RSVP && f[2] === "rsvp"));

  // Stable screen height (CSS 100svh). window.innerHeight changes whenever a phone browser's address
  // bar slides in or out while scrolling; using it made the opening animation jump on iPhones.
  const vhProbe = document.createElement("div");
  vhProbe.setAttribute("aria-hidden", "true");
  vhProbe.style.cssText = "position:absolute;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none";
  document.body.appendChild(vhProbe);
  const VH = () => vhProbe.offsetHeight || window.innerHeight;
  // The opening section is sized to the LARGE viewport (100lvh: address bar hidden) so no strip opens up
  // at the bottom when the bar slides away; text inside it is kept within the small viewport (always visible).
  const lvhProbe = vhProbe.cloneNode();
  lvhProbe.style.height = "100vh";
  lvhProbe.style.height = "100lvh";
  document.body.appendChild(lvhProbe);
  const VHL = () => lvhProbe.offsetHeight || window.innerHeight;

  // Places a photo inside its box (bw x bh) so both faces are always fully visible.
  // Normally the photo fills the box (like object-fit: cover), centred on the faces. When the box is too
  // narrow or too short for that (e.g. a wide photo on a tall phone screen), the photo shrinks just enough
  // to fit both faces and the leftover space shows a soft blurred copy of the same photo.
  function placeFocus(el, n, bw, bh) {
    const p = PHOTOS[n];
    if (!p || !bw || !bh) return;
    const [W, H, x0, y0, x1, y1] = p;
    const m = 0.03; // a little breathing room around the faces when centring
    const fx0 = clamp(x0 - m), fx1 = clamp(x1 + m), fy0 = clamp(y0 - m), fy1 = clamp(y1 + m);
    const cover = Math.max(bw / W, bh / H);
    // largest size at which the faces area (which already has padding) still fits inside the box
    const fit = Math.min(bw / ((x1 - x0) * W), bh / ((y1 - y0) * H));
    // One continuous rule: fill the box, but never so much that a face is cut. (Switching between two
    // rules made the photo pop a little larger partway through the opening animation.)
    const sc = Math.min(cover, fit);
    const dw = W * sc, dh = H * sc;
    const place = (box, d, a0, a1) => (d >= box ? clamp(box / 2 - ((a0 + a1) / 2) * d, box - d, 0) : (box - d) / 2);
    el.style.width = `${dw}px`;
    el.style.height = `${dh}px`;
    el.style.left = `${place(bw, dw, fx0, fx1)}px`;
    el.style.top = `${place(bh, dh, fy0, fy1)}px`;
    const parent = el.parentElement;
    const needsFill = dw < bw - 1 || dh < bh - 1;
    let fill = parent.querySelector(":scope > .blurfill");
    if (needsFill && !fill) {
      fill = document.createElement("img");
      fill.className = "blurfill";
      fill.alt = "";
      fill.setAttribute("aria-hidden", "true");
      fill.src = el.getAttribute("src");
      parent.insertBefore(fill, parent.firstChild);
    }
    if (fill) fill.hidden = !needsFill;
    // Fade the photo's edges into the blur. The fade grows with the gap and is 0 when the photo fills the
    // box, so it changes smoothly during animations instead of switching on and off (that read as a glitch).
    const fv = Math.min(9, (Math.max(0, bh - dh) / 2 / dh) * 140);
    const fh = Math.min(9, (Math.max(0, bw - dw) / 2 / dw) * 140);
    if (fv > 0.05 || fh > 0.05) {
      const m = `linear-gradient(to bottom, transparent 0, #000 ${fv.toFixed(2)}%, #000 ${(100 - fv).toFixed(2)}%, transparent 100%), linear-gradient(to right, transparent 0, #000 ${fh.toFixed(2)}%, #000 ${(100 - fh).toFixed(2)}%, transparent 100%)`;
      el.style.webkitMaskImage = m; el.style.maskImage = m;
      el.style.webkitMaskComposite = "source-in"; el.style.maskComposite = "intersect";
    } else if (el.style.maskImage && el.style.maskImage !== "none") {
      el.style.webkitMaskImage = "none"; el.style.maskImage = "none";
    }
  }
  function applyFocus(root = document) {
    $$("img[data-n]", root).forEach((el) => {
      const box = el.parentElement;
      placeFocus(el, +el.dataset.n, box.clientWidth, box.clientHeight);
    });
  }

  /* =========================================================
     LANGUAGE STATE
     ========================================================= */
  const LANG_KEY = "rh-lang";
  const LABEL = { en: "EN", gu: "ગુજ", mix: "Mix" };
  const readLang = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LABEL[q]) return q;
    try { const s = localStorage.getItem(LANG_KEY); if (s && LABEL[s]) return s; } catch { /* storage unavailable */ }
    return "en";
  };
  let lang = readLang();
  const tl = () => (lang === "gu" ? "gu" : "en"); // which text set to show
  const mix = () => lang === "mix";
  const T = (key) => UI[tl()][key];
  const guNum = new Intl.NumberFormat("gu-IN-u-nu-gujr", { useGrouping: false });
  const num = (n) => (lang === "gu" ? guNum.format(n) : String(n));

  /* ---------------- INTRO ---------------- */
  const intro = $("#intro");
  const introText = $("#introText");
  function splitIntro() {
    const txt = T("intro");
    introText.textContent = "";
    // Gujarati letters combine with vowel signs, so it animates word by word instead of letter by letter.
    // Spaces stay real text so the line can wrap on phones; English letters sit inside an unbreakable word.
    const gu = GU_RE.test(txt);
    let i = 0;
    const piece = (text) => {
      const s = document.createElement("span");
      s.textContent = text;
      s.style.animationDelay = `${0.25 + i++ * (gu ? 0.16 : 0.045)}s`;
      return s;
    };
    txt.split(" ").forEach((word, wi) => {
      if (wi > 0) { introText.appendChild(document.createTextNode(" ")); i++; }
      if (gu) { introText.appendChild(piece(word)); return; }
      const w = document.createElement("span");
      w.className = "intro__word";
      [...word].forEach((ch) => w.appendChild(piece(ch)));
      introText.appendChild(w);
    });
  }
  const enter = () => {
    if (intro.classList.contains("is-gone")) return;
    intro.classList.add("is-gone");
    document.body.classList.remove("is-locked");
    window.scrollTo(0, 0);
  };
  intro.addEventListener("click", enter);
  // "scroll to begin": a wheel scroll, a swipe or a tap all open the site
  let wheelSum = 0, touchY = null;
  intro.addEventListener("wheel", (e) => { wheelSum += Math.abs(e.deltaY); if (wheelSum > 30) enter(); }, { passive: true });
  intro.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  intro.addEventListener("touchmove", (e) => { if (touchY !== null && Math.abs(e.touches[0].clientY - touchY) > 24) enter(); }, { passive: true });
  intro.addEventListener("keydown", (e) => { if (["Enter", " ", "ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); enter(); } });

  /* ---------------- NAV ---------------- */
  const nav = $("#nav");
  $$("[data-scrolltop]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
  $$("[data-scrollto]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(a.dataset.scrollto).scrollIntoView({ behavior: "smooth", block: "start" });
  }));

  /* ---------------- HERO ---------------- */
  const hero = $("#hero");
  const heroMain = $("#heroMain");
  const heroTitle = $("#heroTitle");
  const heroName = $("#heroName");
  const heroImg = $("img", heroMain);
  const HERO_PHOTO = 37;
  const heroPrompt = $("#heroPrompt");
  const gallery = $$(".hero__g");
  const G_START = [0.0, 0.035, 0.07, 0.28];
  const G_DIR = [-1, -1, 1, 1];
  let heroP = 0;
  let nameW100 = 1; // width of the name at a 100px font size, measured per language

  function measureName() {
    const prev = heroTitle.style.fontSize;
    heroTitle.style.fontSize = "100px";
    nameW100 = heroName.getBoundingClientRect().width || 1;
    heroTitle.style.fontSize = prev;
  }

  // Phone layout: main photo in the middle at full width, two side photos above and two below,
  // aligned in a grid with equal gaps so nothing overlaps. Built inside the always-visible height.
  function phoneLayout(vw, vhs) {
    const pad = 16, gap = 12, top = 86, bottom = 18;
    const ratio = PHOTOS[HERO_PHOTO][0] / PHOTOS[HERO_PHOTO][1];
    const avail = vhs - top - bottom;
    const rowW = (vw - pad * 2 - gap) / 2;
    const minRow = Math.min(rowW * 0.72, 140);
    let mainW = vw - pad * 2;
    let mainH = mainW / ratio;
    if (avail - mainH - gap * 2 < minRow * 2) { // short screen: shrink the main photo a little
      mainH = Math.max(110, avail - gap * 2 - minRow * 2);
      mainW = Math.min(vw - pad * 2, mainH * ratio);
      mainH = mainW / ratio;
    }
    const rowH = Math.max(80, Math.min(rowW * 1.25, (avail - mainH - gap * 2) / 2));
    const y = top + Math.max(0, (avail - (rowH * 2 + mainH + gap * 2)) / 2);
    const yBottom = y + rowH + gap + mainH + gap;
    const xRight = pad + rowW + gap;
    return {
      main: { x: (vw - mainW) / 2, y: y + rowH + gap, w: mainW, h: mainH },
      // order matches the four side photos in the page: top-left, bottom-left, top-right, bottom-right
      g: [{ x: pad, y, w: rowW, h: rowH }, { x: pad, y: yBottom, w: rowW, h: rowH },
          { x: xRight, y, w: rowW, h: rowH }, { x: xRight, y: yBottom, w: rowW, h: rowH }],
    };
  }

  let layoutKey = "";
  let phone = null;
  function layoutGallery(vw, vhs, mobile) {
    const key = `${vw}x${vhs}x${mobile}`;
    if (key === layoutKey) return;
    layoutKey = key;
    phone = mobile ? phoneLayout(vw, vhs) : null;
    gallery.forEach((g, i) => {
      if (phone) {
        const r = phone.g[i];
        // on phones the side photos sit BEHIND the main photo, which reveals them as it shrinks
        Object.assign(g.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px`, borderRadius: "18px", zIndex: "0" });
      } else {
        Object.assign(g.style, { left: "", top: "", width: "", height: "", borderRadius: "", zIndex: "" });
      }
      const im = $("img[data-n]", g);
      placeFocus(im, +im.dataset.n, g.clientWidth, g.clientHeight);
    });
  }

  function renderHero(target) {
    const vw = window.innerWidth, vh = VHL(), vhs = VH();
    heroP += (target - heroP) * 0.16;
    if (Math.abs(target - heroP) < 0.0005) heroP = target;
    const p = heroP;
    // phones, and tablets held upright, use the phone layout for this section
    const mobile = vw < 768 || (vh > vw * 1.15 && vw < 1100);
    layoutGallery(vw, vhs, mobile);

    const x0 = vw * 0.015, y0 = 14, w0 = vw - x0 * 2, h0 = vh - 27;
    let x1, y1, w1, h1;
    if (phone) ({ x: x1, y: y1, w: w1, h: h1 } = phone.main);
    else { w1 = vw * 0.485; h1 = vh * 0.829; x1 = (vw - w1) / 2; y1 = (vh - h1) / 2 + vh * 0.022; }
    const w = lerp(w0, w1, p), h = lerp(h0, h1, p), top = lerp(y0, y1, p);
    heroMain.style.left = `${lerp(x0, x1, p)}px`;
    heroMain.style.top = `${top}px`;
    heroMain.style.width = `${w}px`;
    heroMain.style.height = `${h}px`;
    heroMain.style.borderRadius = `${lerp(18, mobile ? 22 : 41, p)}px`;
    placeFocus(heroImg, HERO_PHOTO, w, h);

    // the name always spans ~64% of the photo's width, whatever the language, and sits inside the part
    // of the photo that's on screen even when the address bar is showing
    heroTitle.style.fontSize = `${(w * (mobile ? 0.82 : 0.64)) / nameW100 * 100}px`;
    const hiddenBelow = Math.max(0, top + h - vhs);
    heroTitle.style.bottom = `${hiddenBelow + 0.13 * (h - hiddenBelow)}px`;
    heroTitle.style.opacity = 1 - clamp((p - 0.12) / 0.5);
    heroPrompt.style.opacity = 1 - clamp(p / 0.12);
    heroPrompt.style.bottom = mobile ? `${vh - vhs + 28}px` : "";

    gallery.forEach((g, i) => {
      if (mobile) {
        // phone: each photo starts tucked in towards the middle (behind the main photo) and slides
        // outwards into its grid slot as the main photo shrinks
        const t = clamp((p - 0.28) / 0.62);
        const e = easeOutCubic(t);
        const tx = (1 - e) * -G_DIR[i] * vw * 0.14;
        const ty = (1 - e) * (i % 2 === 0 ? 1 : -1) * vhs * 0.14;
        g.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${0.9 + 0.1 * e})`;
        g.style.opacity = clamp(t * 2.5);
        return;
      }
      const t = clamp((p - G_START[i]) / 0.62);
      const e = easeOutCubic(t);
      // desktop: photos fly in from the sides
      const tx = (1 - e) * G_DIR[i] * vw * 0.5;
      const ty = (1 - e) * vh * 0.444;
      g.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${0.96 + 0.04 * e})`;
      g.style.opacity = clamp(t * 6);
    });
    return heroP !== target;
  }

  /* ---------------- WORD REVEAL ---------------- */
  let wordBlocks = [];
  function splitWords() {
    wordBlocks = $$("[data-words]").map((p) => {
      const words = p.textContent.trim().split(/\s+/);
      p.innerHTML = words.map((w) => `<span>${esc(w)}</span>`).join(" ");
      return { p, spans: $$("span", p) };
    });
  }
  function renderWords() {
    const vh = VH();
    wordBlocks.forEach(({ p, spans }) => {
      const r = p.getBoundingClientRect();
      const prog = (vh * 0.8 - r.top) / (r.height + vh * 0.45);
      const lit = Math.floor(clamp(prog) * spans.length + (prog > 0 ? 0.5 : 0));
      spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
    });
  }

  /* ---------------- STORY (sticky polaroid stack) ---------------- */
  const story = $("#story");
  const stage = $("#storyStage");
  let cards = [];
  let chapters = [];
  let chaptersM = [];
  const CH_W = [0.324, 0.35, 0.37, 0.39, 0.4125];
  const CH_H = [0.399, 0.43, 0.455, 0.48, 0.507];
  const GAP = 400;

  function buildStory() {
    [...chapters, ...chaptersM, ...cards.map((c) => c.el)].forEach((el) => el.remove());
    cards = []; chapters = []; chaptersM = [];
    STORY.forEach((ch, ci) => {
      const t = ch[tl()];
      const accent = mix() ? `<span class="accent accent--chapter">${esc(ch.gu.title)}</span>` : "";
      const text = `<h3>${esc(t.title)}${accent}</h3><p>${esc(t.body)}</p>`;
      const c = document.createElement("div");
      c.className = "chapter";
      c.innerHTML = ch.side === "left"
        ? `<div class="chapter__col chapter__col--left">${text}</div><div class="chapter__spacer"></div><div class="chapter__col"></div>`
        : `<div class="chapter__col"></div><div class="chapter__spacer"></div><div class="chapter__col chapter__col--right">${text}</div>`;
      stage.appendChild(c);
      chapters.push(c);

      const m = document.createElement("div");
      m.className = "chapter-m";
      m.innerHTML = text;
      stage.appendChild(m);
      chaptersM.push(m);

      ch.photos.forEach((n, pi) => {
        const cap = t.caps[pi];
        const tag = ch.tags && ch.tags[pi];
        const k = cards.length;
        const label = tag ? `${tag}${cap ? ` · ${cap}` : ""}` : cap;
        const wrap = document.createElement("div");
        wrap.className = "polaroid-wrap";
        wrap.innerHTML = `
          <div class="polaroid${tag ? " polaroid--first" : ""}" style="transform: rotate(${ROTATIONS[pi % ROTATIONS.length]}deg)" role="button" tabindex="0" aria-label="${esc(label)}">
            <div class="polaroid__img" style="aspect-ratio:${PHOTOS[n][0]} / ${PHOTOS[n][1]}"><img src="${img(n)}" alt="${esc(label)}" loading="${k < 3 ? "eager" : "lazy"}" decoding="async" /></div>
            <p class="polaroid__cap${tag ? " polaroid__cap--tag" : ""}">${esc(tag || cap) || "&nbsp;"}</p>
          </div>`;
        const pol = $(".polaroid", wrap);
        const open = () => openLightbox(img(n), cap, tag);
        pol.addEventListener("click", open);
        pol.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
        stage.appendChild(wrap);
        cards.push({ el: wrap, chapter: ci, i: pi, n });
      });
    });
    lastChapter = -1;
  }

  let storyGeom = null;
  function layoutStory() {
    const vw = window.innerWidth, vh = VH();
    const s = vh / 900;
    const mobile = vw < 768;
    // in Mix mode the Gujarati line under "our story" needs a little room above the stack
    const off = mix() ? 50 : 0;
    const step = mix() ? 20 : 26;
    const perChapter = STORY.map((ch) => ch.photos.length);
    const stack = cards.map((c) => {
      const n = perChapter[c.chapter];
      // keep each chapter's pile within ~64px (desktop) / ~30px (phone), however many photos it has
      const iStep = mobile ? Math.min(6, 30 / Math.max(1, n - 1)) : Math.min(17, 64 / Math.max(1, n - 1));
      return mobile
        ? vh * 0.19 + off * 0.6 + c.chapter * 6 + c.i * iStep
        : s * (255 + off + c.chapter * step + c.i * iStep);
    });
    // widest a landscape card may get in each chapter (grows a little per chapter, like the template)
    const maxW = STORY.map((_, ci) => (mobile ? vw * 0.82 : vw * CH_W[ci % CH_W.length]));
    // phone: chapter text sits at the bottom; photos must end above the tallest chapter text
    // (its top padding is only a fade, so it may overlap)
    const textTop = mobile ? vh - Math.max(...chaptersM.map((m) => m.offsetHeight - 28)) : vh;
    cards.forEach((c, k) => {
      const [pw, ph] = PHOTOS[c.n];
      // frame height ≈ width × (top border + photo + deep bottom edge of the print)
      const perW = 0.05 + 0.9 * (ph / pw) + 0.2;
      const room = mobile
        ? textTop - 30 - stack[k]
        : Math.min(vh * CH_H[c.chapter % CH_H.length] * 1.12, vh - stack[k] - 22 * s);
      c.w = Math.max(140, Math.min(maxW[c.chapter], room / perW));
      c.el.style.width = `${c.w}px`;
      c.el.style.setProperty("--cw", `${c.w}px`); // handwriting size follows the card size
    });
    // The estimate above assumes a one-line caption; long captions wrap on narrow cards. Measure the real
    // frames and shrink any that would run past their limit (two passes, since the caption re-wraps).
    for (let pass = 0; pass < 2; pass++) {
      cards.forEach((c, k) => {
        const limit = mobile ? textTop - 30 : vh - 22 * s;
        const hgt = c.el.offsetHeight;
        if (stack[k] + hgt > limit && hgt > 0) {
          c.w = Math.max(140, c.w * (limit - stack[k]) / hgt);
          c.el.style.width = `${c.w}px`;
          c.el.style.setProperty("--cw", `${c.w}px`);
        }
      });
    }
    // the text sits beside the pile, which still holds photos from earlier chapters, so clear the widest so far
    chapters.forEach((ch, i) => {
      const ws = cards.filter((c) => c.chapter <= i).map((c) => c.w);
      $(".chapter__spacer", ch).style.width = `${Math.max(...ws) + 24}px`;
    });
    // Each print rests fully visible (hashtag on its bottom edge included) for HOLD px of scrolling before
    // the next one slides up over its bottom edge: space the cards by the previous frame's height, not a
    // fixed gap, since tall photos are taller than GAP.
    const HOLD = mobile ? 150 : 170 * s;
    const natural = [];
    cards.forEach((c, k) => {
      if (k === 0) { natural.push(s * (291 + off)); return; }
      const p = cards[k - 1].el;
      const capH = $(".polaroid__cap", p).offsetHeight;
      natural.push(natural[k - 1] + Math.max(s * GAP, p.offsetHeight - capH + HOLD));
    });
    const last = cards.length - 1;
    const range = natural[last] - stack[last] + vh * 0.15;
    story.style.height = `${range + vh}px`;
    storyGeom = { stack, natural, range };
  }

  let lastChapter = -1;
  function renderStory() {
    if (!storyGeom) return;
    const top = story.getBoundingClientRect().top;
    const d = clamp(-top, 0, storyGeom.range);
    let landed = 0;
    cards.forEach((c, k) => {
      const nat = storyGeom.natural[k] - d;
      const st = storyGeom.stack[k];
      if (nat <= st + 0.5) landed = k + 1;
      c.el.style.transform = `translate3d(-50%, ${Math.max(st, nat)}px, 0)`;
    });
    const active = landed === 0 ? 0 : cards[landed - 1].chapter;
    if (active !== lastChapter) {
      chapters.forEach((c, i) => c.classList.toggle("is-active", i === active));
      chaptersM.forEach((c, i) => c.classList.toggle("is-active", i === active));
      lastChapter = active;
    }
  }

  /* ---------------- MAIN LOOP ---------------- */
  let ticking = false;
  function frame() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 30);
    const range = (hero.offsetHeight - VHL()) * (1000 / 1200);
    const target = clamp((y - hero.offsetTop) / range);
    const moving = renderHero(target);
    renderWords();
    renderStory();
    if (moving) requestAnimationFrame(frame);
    else ticking = false;
  }
  const requestFrame = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", requestFrame, { passive: true });
  // Re-lay-out only when the width or the stable height actually changed (an address bar sliding in or
  // out changes neither). The animation is never reset, so nothing jumps.
  let lastW = window.innerWidth, lastVH = VH(), lastVHL = VHL();
  window.addEventListener("resize", () => {
    const w = window.innerWidth, h = VH(), hl = VHL();
    if (w !== lastW || Math.abs(h - lastVH) > 1 || Math.abs(hl - lastVHL) > 1) {
      lastW = w; lastVH = h; lastVHL = hl;
      layoutStory(); measureName(); applyFocus();
    }
    requestFrame();
  });
  document.addEventListener("load", (e) => { if (e.target.matches && e.target.matches("img[data-n]")) applyFocus(e.target.parentElement); }, true);

  /* ---------------- REVEAL ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal]").forEach((el) => io.observe(el));

  /* ---------------- COUNTDOWN ---------------- */
  const cd = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
  function tick() {
    let diff = Math.max(0, COUNTDOWN_TARGET - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    cd.d.textContent = num(d); cd.h.textContent = num(h); cd.m.textContent = num(m); cd.s.textContent = num(s);
  }
  setInterval(tick, 1000);

  /* ---------------- SANGEET SPARKLE: colours, fairy lights, floating notes ---------------- */
  const FESTIVE = ["#f2b84b", "#e9774f", "#e0628a", "#f6d98b", "#c9629e", "#f3a6b8", "#8cc7a4"];
  const NOTE_GLYPHS = ["♪", "♫", "♪", "♥"];
  const BULBS = ["#f6c453", "#f08a5d", "#ec6f96", "#fbe3a0", "#8fd3b0", "#d79be6"];
  // A garland of fairy lights hanging in scallops across any [data-lights] element; rebuilt when its width changes.
  function buildLights() {
    $$("[data-lights]").forEach((el) => {
      const W = el.clientWidth;
      if (!W || +el.dataset.w === W) return;
      el.dataset.w = W;
      const H = el.clientHeight || 64;
      const loops = Math.max(2, Math.round(W / 330));
      const per = 7, seg = W / loops, sag = H * 0.5, top = 4;
      let d = `M0 ${top}`;
      let bulbs = "";
      for (let i = 0; i < loops; i++) {
        d += ` Q${(seg * (i + 0.5)).toFixed(1)} ${(top + sag * 2).toFixed(1)} ${(seg * (i + 1)).toFixed(1)} ${top}`;
        for (let j = 1; j < per; j++) {
          const t = j / per;
          const x = seg * (i + t), y = top + 4 * sag * t * (1 - t);
          const tilt = Math.atan2(4 * sag * (1 - 2 * t), seg) * 57.3 * 0.6;
          const k = i * per + j;
          bulbs += `<i style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;--c:${BULBS[k % BULBS.length]};--r:${tilt.toFixed(1)}deg;animation-delay:${(-(k * 0.37) % 2.6).toFixed(2)}s"></i>`;
        }
      }
      el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path d="${d}"/></svg>${bulbs}`;
    });
  }
  // little music notes drifting up the welcome screen
  (() => {
    const box = $("#introNotes");
    if (!box) return;
    box.innerHTML = Array.from({ length: 12 }, (_, i) =>
      `<span style="left:${4 + ((i * 37) % 92)}%;animation-delay:${(i * 0.9).toFixed(1)}s;animation-duration:${(8 + (i % 4) * 1.6).toFixed(1)}s;font-size:${14 + (i % 3) * 8}px;color:${FESTIVE[i % FESTIVE.length]}">${i % 3 ? "♪" : "♫"}</span>`).join("");
  })();
  buildLights();
  window.addEventListener("resize", buildLights);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildLights);

  /* ---------------- CONFETTI ---------------- */
  (() => {
    const canvas = $("#confetti");
    const ctx = canvas.getContext("2d");
    const COLORS = FESTIVE;
    let W = 0, H = 0, dpr = 1, parts = [], running = false, raf = 0;
    const spawn = (anywhere) => ({
      x: Math.random() * W, y: anywhere ? Math.random() * H : -10,
      r: 1.6 + Math.random() * 2.4, vy: 0.25 + Math.random() * 0.55,
      sway: Math.random() * Math.PI * 2, swaySpeed: 0.005 + Math.random() * 0.015,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.04,
      shape: Math.random() < 0.45 ? 0 : Math.random() < 0.75 ? 1 : 2, c: COLORS[(Math.random() * COLORS.length) | 0], a: 0.55 + Math.random() * 0.45,
    });
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(clamp(W / 1440, 0.4, 1.2) * 140) }, () => spawn(true));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.sway += p.swaySpeed; p.y += p.vy; p.x += Math.sin(p.sway) * 0.35; p.rot += p.vr;
        if (p.y > H + 10) Object.assign(p, spawn(false));
        const edge = Math.min(p.y / (H * 0.18), (H - p.y) / (H * 0.18), 1);
        ctx.globalAlpha = p.a * clamp(edge);
        ctx.fillStyle = p.c;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        if (p.shape === 0) { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
        else if (p.shape === 1) ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
        else { ctx.font = `${Math.round(p.r * 6)}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(p.r > 2.8 ? "♫" : "♪", 0, 0); }
        ctx.restore();
      }
      if (running) raf = requestAnimationFrame(draw);
    };
    size();
    window.addEventListener("resize", size);
    new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    }).observe(canvas);
  })();

  /* ---------------- DETAILS GRID ---------------- */

  // Detail cards and their pop-up banners use stock photos, never the couple's photos (Hemang, 18 Nov 2026).
  // Files in assets/stock/ (Unsplash License: free, no credit required; sources in CONTEXT.md).
  const CARD_ART = { sangeet: ["sangeet"], rsvp: ["dandiya"], hashtag: ["hashtag"] };
  // where to crop a photo when the box is wider than the photo (default: centre)
  const ART_POS = { dandiya: "50% 52%" }; // the sticks and marigolds
  const artMedia = (id) => {
    const files = CARD_ART[id].map((f) => `<img src="assets/stock/${f}.jpg" alt="" loading="lazy"${ART_POS[f] ? ` style="object-position:${ART_POS[f]}"` : ""} />`).join("");
    return CARD_ART[id].length > 1 ? `<span class="collage">${files}</span>` : files;
  };

  const arrowSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
  const plusSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
  let gridBuilt = false;
  function buildGrid() {
    const cards = NO_RSVP ? CARDS.filter((c) => c.id !== "rsvp") : CARDS;
    $("#detailsGrid").innerHTML = cards.map((c, i) => {
      const [title, sub] = c[tl()];
      const accent = mix() && c.gu[0] !== c.en[0] ? `<span class="accent accent--card">${esc(c.gu[0])}</span>` : "";
      return `
      <div data-reveal class="${gridBuilt ? "is-in" : ""}" style="transition-delay:${(i % 3) * 90}ms">
        ${c.href
          ? `<a class="dcard" href="${c.href}" target="_blank" rel="noopener" aria-label="${esc(title)}">`
          : `<button class="dcard" data-overlay="${c.id}" aria-label="${esc(title)}">`}
          ${artMedia(c.id)}
          <div class="dcard__text">${accent}<h3>${esc(title)}</h3><p>${esc(sub)}</p></div>
          <span class="dcard__plus">${c.href ? arrowSvg : plusSvg}</span>
        ${c.href ? "</a>" : "</button>"}
      </div>`;
    }).join("");
    if (!gridBuilt) $$("#detailsGrid [data-reveal]").forEach((el) => io.observe(el));
    gridBuilt = true;
  }

  /* ---------------- FAQ ---------------- */
  const chevron = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
  function buildFaq() {
    const list = $("#faqList");
    const gu = faqFor("gu");
    list.innerHTML = faqFor(tl()).map(([q, a], i) => `
      <div class="faq__item">
        <button class="faq__q" aria-expanded="false" aria-controls="faq-a-${i}"><span>${esc(q)}${mix() ? `<small class="accent accent--faq">${esc(gu[i][0])}</small>` : ""}</span><i class="faq__icon">${chevron}</i></button>
        <div class="faq__a" id="faq-a-${i}" role="region"><div>${a.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div>
      </div>`).join("");
    $$(".faq__q", list).forEach((b) => b.addEventListener("click", () => {
      const item = b.parentElement;
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      b.setAttribute("aria-expanded", open);
    }));
  }

  /* ---------------- SHEET (overlay pages) ---------------- */
  const sheet = $("#sheet");
  const sheetTitle = $("#sheetTitle");
  const sheetBody = $("#sheetBody");
  const panel = $(".sheet__panel", sheet);
  let lastFocus = null;
  let openId = null;

  function openSheet(id) {
    lastFocus = document.activeElement;
    openId = id;
    renderSheet();
    panel.scrollTop = 0;
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => $(".sheet__x", sheet).focus({ preventScroll: true }), 50);
  }
  function closeSheet() {
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openId = null;
    setTimeout(() => { if (!sheet.classList.contains("is-open")) sheetBody.innerHTML = ""; }, 600);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-close]", sheet).forEach((b) => b.addEventListener("click", closeSheet));

  const contactHtml = () => `
    <div class="contacts">${CONTACTS.map((c) => `
      <div class="contact">
        <p class="op__label">${esc(T("rsvpContact"))}</p>
        <p class="contact__name">${esc(c[tl()])}</p>
        <p class="contact__num">${esc(c.display)}</p>
        <div class="contact__btns">
          <a class="btn-pill btn-pill--sm" href="tel:${c.tel}">${esc(T("call"))}</a>
          <a class="btn-line" href="https://wa.me/${c.tel.replace("+", "")}" target="_blank" rel="noopener">${esc(T("whatsapp"))}</a>
        </div>
      </div>`).join("")}
    </div>`;

  function renderSheet() {
    if (!openId) return;
    const o = OVERLAYS[openId];
    const t = o[tl()];
    sheetTitle.textContent = t.title;
    const accent = mix() && o.gu.title !== o.en.title ? `<span class="accent accent--op">${esc(o.gu.title)}</span>` : "";
    // banner = the same stock photo (or collage) as the card, never the couple's photos
    let h = `<div class="op__banner">${artMedia(openId)}</div>
             <h1 class="op__title">${esc(t.title)}${accent}</h1>
             <p class="op__desc">${esc(t.description)}</p>`;
    if (t.sections) {
      h += t.sections.map(([label, sub, body]) => `
        <div class="op__sec">
          <p class="op__label">${esc(label)}</p>
          <p class="op__sub">${esc(sub)}</p>
          <div class="op__body">${body.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        </div>`).join("");
    }
    if (o.map) {
      h += `<iframe class="op__map" src="${mapsEmbed(o.map)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(T("mapTitle"))}"></iframe>
            <a class="btn-pill op__mapbtn" href="${mapsLink(o.map)}" target="_blank" rel="noopener">${esc(T("openMaps"))}</a>`;
    }
    if (o.contacts) {
      h += `<div class="op__sec">${contactHtml()}${NO_RSVP ? "" : `
              <a class="btn-pill op__mapbtn" href="${RSVP_FORM}" target="_blank" rel="noopener">${esc(T("rsvpBtn"))}</a>`}</div>`;
    }
    sheetBody.innerHTML = h;
    requestAnimationFrame(() => applyFocus(sheetBody));
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-overlay]");
    if (!t) return;
    e.preventDefault();
    // RSVP buttons are plain links to the Google Form; this catches any leftover data-overlay="rsvp"
    if (t.dataset.overlay === "rsvp" || !OVERLAYS[t.dataset.overlay]) { if (!NO_RSVP) window.open(RSVP_FORM, "_blank", "noopener"); return; }
    openSheet(t.dataset.overlay);
  });

  /* ---------------- LIGHTBOX ---------------- */
  const lb = $("#lightbox");
  function openLightbox(src, cap, tag) {
    $("#lightboxCard").innerHTML = `<img src="${src}" alt="${esc(tag || cap)}" /><figcaption>${tag ? `<span class="lightbox__tag">${esc(tag)}</span>` : ""}${esc(cap)}</figcaption>`;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
  }
  const closeLightbox = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); };
  $$("[data-close-lb]", lb).forEach((b) => b.addEventListener("click", closeLightbox));

  /* ---------------- LANGUAGE SWITCHER ---------------- */
  const langBox = $("#lang");
  const langToggle = $("#langToggle");

  function applyLang() {
    const root = document.documentElement;
    root.lang = lang === "gu" ? "gu" : "en";
    root.dataset.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = T(el.dataset.i18n); });
    $$("[data-accent]").forEach((el) => { el.textContent = ACCENT[el.dataset.accent] || ""; });
    langToggle.textContent = LABEL[lang];
    $$("[data-lang]", langBox).forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
    splitIntro();
    splitWords();
    buildStory();
    layoutStory();
    buildGrid();
    buildFaq();
    renderSheet();
    applyFocus();
    tick();
    measureName();
    requestFrame();
  }

  langToggle.addEventListener("click", (e) => { e.stopPropagation(); langBox.classList.toggle("is-open"); });
  $$("[data-lang]", langBox).forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    lang = b.dataset.lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
    langBox.classList.remove("is-open");
    applyLang();
  }));
  document.addEventListener("click", () => langBox.classList.remove("is-open"));

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("is-open")) closeLightbox();
    else if (sheet.classList.contains("is-open")) closeSheet();
    langBox.classList.remove("is-open");
  });

  /* ---------------- CLICK NOTES (music notes + hearts) ---------------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest("a, button, input, textarea, label, .sheet, .lightbox, .intro, .polaroid, .lang")) return;
    if (!intro.classList.contains("is-gone")) return;
    for (let i = 0; i < 7; i++) {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = NOTE_GLYPHS[(Math.random() * NOTE_GLYPHS.length) | 0];
      h.style.color = FESTIVE[(Math.random() * FESTIVE.length) | 0];
      h.style.left = `${e.clientX - 9}px`;
      h.style.top = `${e.clientY - 9}px`;
      h.style.fontSize = `${12 + Math.random() * 12}px`;
      document.body.appendChild(h);
      const ang = (Math.random() * 0.9 + 0.05) * Math.PI;
      const dist = 40 + Math.random() * 70;
      h.animate([
        { transform: "translate(0,0) scale(0.4)", opacity: 1 },
        { transform: `translate(${Math.cos(ang) * dist}px, ${-Math.sin(ang) * dist - 30}px) scale(1)`, opacity: 0 },
      ], { duration: 800 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => h.remove();
    }
  });

  /* ---------------- START ---------------- */
  // every RSVP link in index.html points at RSVP_FORM (kept in one place, here)
  $$("a[data-rsvp]").forEach((a) => { a.href = RSVP_FORM; a.target = "_blank"; a.rel = "noopener"; });
  applyLang();
  // re-measure the hero name once the web fonts (incl. Gujarati) have loaded
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureName(); layoutStory(); requestFrame(); });
})();
