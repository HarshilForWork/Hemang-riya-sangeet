// Screenshot helper: scrolls to the part named by ?shot= and leaves it on screen for the harness's SHOT capture.
// ?shot=intro | hero | story | countdown | events | rsvp | details | footer | popup
// e.g. SHOT=/tmp/events.jpg node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en&shot=events" 390 664 1 tools/test/shot.js
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const go = (y) => window.scrollTo({ top: y, behavior: "instant" });
const what = new URLSearchParams(location.search).get("shot") || "hero";
if (what === "intro") { await wait(2600); return what; }
document.getElementById("intro").click();
await wait(700);
document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
const el = (id) => document.getElementById(id);
const settle = async (y) => { for (let i = 0; i < 6; i++) { go(y); await wait(120); } await wait(900); };
if (what === "hero") await settle(el("hero").offsetHeight - innerHeight);
else if (what === "story") await settle(el("story").offsetTop + el("story").offsetHeight * 0.42);
else if (what === "countdown") await settle(el("logistics-section").offsetTop);
else if (what === "events") await settle(el("events").offsetTop - (innerWidth < 768 ? 10 : 40));
else if (what === "rsvp") await settle(el("rsvp-callout-section").offsetTop - 40);
else if (what === "details") await settle(el("details").offsetTop + (innerWidth < 768 ? 120 : 40));
else if (what === "footer") await settle(el("footer").offsetTop);
else if (what === "popup") { document.querySelector('button.dcard[data-overlay="sangeet"]').click(); await wait(900); document.querySelector(".sheet__panel").scrollTop = innerWidth < 768 ? 0 : 0; await wait(300); }
else if (what === "popup2") { document.querySelector('button.dcard[data-overlay="sangeet"]').click(); await wait(900); const p = document.querySelector(".sheet__panel"); p.scrollTop = p.scrollHeight; await wait(1500); }
return what;
