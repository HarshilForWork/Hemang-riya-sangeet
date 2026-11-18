// Sangeet-only site: nothing about the wedding anywhere (any language, pop-ups, FAQ, served code),
// every RSVP button opens the Google Form in a new tab, the countdown targets the Sangeet, the Sangeet
// touches render, and nothing is wider than the screen.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSeD4dAbMXjewzgOCTjrC5tQziNs-6SC6AavZFkumD1hL90rlg/viewform";
// words that would reveal the wedding: English, Gujarati, the city, its date, its venue, travel/stay
const FORBIDDEN = /wedding|marriage|mandap|nadiad|fatepur|fatehpura|aavishkaar|gujarat\b|\b27\s*jan|jan(uary)?\s*27|travel|train|irctc|accommodation|lagna|લગ્ન|નડિયાદ|મંડપ|(?<!૨૦)૨૭|આવિષ્કાર|ગુજરાત|ટ્રેન|મુસાફરી|રોકાણ|પ્રવાસ/i;
const hits = (where, text) => { const m = text.match(new RegExp(FORBIDDEN.source, "gi")); return m ? [`${where}: ${[...new Set(m)].join(", ")}`] : []; };

document.getElementById("intro").click();
await wait(400);
const out = { leaks: [] };

// served files (guests can view source): index.html, app.js, styles.css
for (const f of ["index.html", "app.js", "styles.css"]) {
  const t = await (await fetch(f, { cache: "no-store" })).text();
  out.leaks.push(...hits(f, t));
}

// every language: page text, FAQ answers, each pop-up
for (const l of ["en", "gu", "mix"]) {
  $("#langToggle").click(); await wait(60); $(`[data-lang="${l}"]`).click(); await wait(300);
  $$(".faq__item").forEach((i) => i.classList.add("is-open"));
  out.leaks.push(...hits(`page[${l}]`, document.body.innerText + " " + document.body.textContent));
  for (const b of $$("button.dcard[data-overlay]")) {
    b.click(); await wait(500);
    out.leaks.push(...hits(`popup ${b.dataset.overlay}[${l}]`, $("#sheet").textContent));
    $(".sheet__x").click(); await wait(350);
  }
}
$("#langToggle").click(); await wait(60); $('[data-lang="en"]').click(); await wait(200);

// RSVP: every RSVP control is a link to the form in a new tab; no on-site form, no rsvp pop-up
const rsvpLinks = $$("a").filter((a) => /rsvp|હાજરી/i.test(a.textContent + (a.getAttribute("aria-label") || "")));
out.rsvpLinks = rsvpLinks.length;
out.rsvpLinksWrong = rsvpLinks.filter((a) => a.href !== FORM || a.target !== "_blank" || !/noopener/.test(a.rel)).map((a) => a.outerHTML.slice(0, 90));
out.rsvpOverlayButtons = $$('[data-overlay="rsvp"]').length;
out.onSiteForm = !!$("form");
out.sangeetPopupRsvp = await (async () => {
  $('button.dcard[data-overlay="sangeet"]').click(); await wait(500);
  const a = $('#sheet a[href^="https://docs.google.com/forms"]');
  const r = { rsvpLink: !!a && a.target === "_blank", contacts: $$("#sheet .contact").length, map: !!$("#sheet iframe.op__map") };
  $(".sheet__x").click(); await wait(350);
  return r;
})();

// countdown: days left must match 22 Jan 2027 18:00 IST
const target = Date.UTC(2027, 0, 22, 12, 30);
out.countdownDays = +$("#cdD").textContent;
out.countdownOk = out.countdownDays === Math.floor((target - Date.now()) / 864e5);

// Sangeet touches
out.lightGarlands = $$("[data-lights]").map((el) => el.querySelectorAll("i").length);
out.introNotes = $$("#introNotes span").length;
out.eqBars = $$(".eq i").length;
out.events = $$("#events .ev").length;
out.detailCards = $$(".dcard").map((c) => c.tagName + ":" + (c.dataset.overlay || "link"));
out.pageWiderThanScreen = document.documentElement.scrollWidth > innerWidth;
return out;
