// Sangeet-only site: nothing about the wedding anywhere (any language, pop-ups, FAQ, served code),
// every RSVP button opens the Google Form in a new tab, the countdown targets the Sangeet, the Sangeet
// touches render, and nothing is wider than the screen.
// On Riya's link (/riya) there must be NO RSVP at all: no RSVP words or form links in any language or pop-up.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NO_RSVP = location.pathname === "/riya";
const SRC = await (await fetch("app.js", { cache: "no-store" })).text();
const FORM = SRC.match(/const RSVP_FORM = "([^"]+)"/)[1];
// the form the main site uses (it asks about the wedding): the Sangeet site must not link it
const MAIN_SITE_FORM_ID = "1FAIpQLSeD4dAbMXjewzgOCTjrC5tQziNs-6SC6AavZFkumD1hL90rlg";
// words that would reveal the wedding: English, Gujarati, the city, its date, its venue, travel/stay
const FORBIDDEN = /wedding|marriage|mandap|nadiad|fatepur|fatehpura|aavishkaar|gujarat\b|\b27\s*jan|jan(uary)?\s*27|travel|train|irctc|accommodation|lagna|લગ્ન|નડિયાદ|મંડપ|(?<!૨૦)૨૭|આવિષ્કાર|ગુજરાત|ટ્રેન|મુસાફરી|રોકાણ|પ્રવાસ/i;
// on Riya's link: anything that asks for an RSVP
const RSVP_WORDS = /rsvp|હાજરી|docs\.google\.com\/forms|forms\.gle/i;
const find = (re, where, text) => { const m = text.match(new RegExp(re.source, "gi")); return m ? [`${where}: ${[...new Set(m)].join(", ")}`] : []; };
const hits = (where, text) => find(FORBIDDEN, where, text);
const formLinks = (root) => $$("a", root).filter((a) => RSVP_WORDS.test(a.href)).map((a) => a.outerHTML.slice(0, 90));

document.getElementById("intro").click();
await wait(400);
const out = { mode: NO_RSVP ? "riya (no RSVP)" : "main (with RSVP)", leaks: [] };
if (NO_RSVP) out.rsvpMentions = [];

// served files (guests can view source): index.html, app.js, styles.css
for (const f of ["index.html", "app.js", "styles.css"]) {
  const t = f === "app.js" ? SRC : await (await fetch(f, { cache: "no-store" })).text();
  out.leaks.push(...hits(f, t));
}

// every language: page text, FAQ answers, each pop-up
for (const l of ["en", "gu", "mix"]) {
  $("#langToggle").click(); await wait(60); $(`[data-lang="${l}"]`).click(); await wait(300);
  $$(".faq__item").forEach((i) => i.classList.add("is-open"));
  const text = document.body.innerText + " " + document.body.textContent;
  out.leaks.push(...hits(`page[${l}]`, text));
  if (NO_RSVP) out.rsvpMentions.push(...find(RSVP_WORDS, `page[${l}]`, text), ...formLinks(document).map((h) => `page[${l}] link: ${h}`));
  for (const b of $$("button.dcard[data-overlay]")) {
    b.click(); await wait(500);
    out.leaks.push(...hits(`popup ${b.dataset.overlay}[${l}]`, $("#sheet").textContent));
    if (NO_RSVP) out.rsvpMentions.push(...find(RSVP_WORDS, `popup ${b.dataset.overlay}[${l}]`, $("#sheet").textContent), ...formLinks($("#sheet")));
    $(".sheet__x").click(); await wait(350);
  }
}
$("#langToggle").click(); await wait(60); $('[data-lang="en"]').click(); await wait(200);

// RSVP: every RSVP control is a link to the form in a new tab; no on-site form, no rsvp pop-up.
// On Riya's link there are none at all.
const rsvpLinks = $$("a").filter((a) => /rsvp|હાજરી/i.test(a.textContent + (a.getAttribute("aria-label") || "")) || RSVP_WORDS.test(a.href));
out.rsvpLinks = rsvpLinks.length;
out.rsvpLinksWrong = NO_RSVP ? [] : rsvpLinks.filter((a) => a.href !== FORM || a.target !== "_blank" || !/noopener/.test(a.rel)).map((a) => a.outerHTML.slice(0, 90));
out.rsvpSection = !!$("#rsvp-callout-section");
out.formSharedWithMainSite = !NO_RSVP && FORM.includes(MAIN_SITE_FORM_ID);
out.rsvpOverlayButtons = $$('[data-overlay="rsvp"]').length;
out.onSiteForm = !!$("form");
out.faqQuestions = $$(".faq__q").length;
out.sangeetPopup = await (async () => {
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
