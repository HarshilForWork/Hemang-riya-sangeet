// Page length: how many screens tall the whole page is at this size (after the welcome screen),
// and how tall each section is in screens.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
document.getElementById("intro").click();
await wait(800);
const H = document.documentElement.scrollHeight;
const sections = [...document.querySelectorAll("main > section")].map((s) => `${s.id}:${(s.offsetHeight / innerHeight).toFixed(1)}`);
return { screens: +(H / innerHeight).toFixed(1), pagePx: H, sections };
