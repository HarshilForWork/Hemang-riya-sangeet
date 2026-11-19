/**
 * Riya & Hemang · Sangeet RSVP: one Google Form, in English
 * -----------------------------------------------------------------
 * Paste this whole file into a NEW project at https://script.google.com
 * (not the project that has the other RSVP forms), choose ONE function next
 * to "Debug" and click Run:
 *
 *   createSangeetRsvpForm   makes the form (run once) and prints its links
 *   showSangeetFormLinks    prints the links again
 *   countSangeetRsvps       prints how many said yes / no, and how many
 *                           people are coming in total
 *
 * The form asks three things:
 *   1. Your name
 *   2. Will you be at the Sangeet?   Yes -> question 3   ·   No -> Submit
 *   3. How many of you, including you? (1-10)
 *
 * It is ONLY about the Sangeet. Don't add questions or text about anything
 * else: some guests are invited to the Sangeet only.
 *
 * The date, time and address match the invite site (app.js). If they ever
 * change there, change them here too (or directly in Google Forms).
 */

var FORM_FILE_NAME = 'Riya & Hemang · Sangeet RSVP';
var GUEST_COUNTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// Same Google Maps search as the "Map & contacts" button on the invite site
var MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=' +
               encodeURIComponent('Bhanushali Wadi, Sector 19A, Nerul East, Navi Mumbai');

var TEXT = {
  title: 'Riya & Hemang\'s Sangeet · RSVP',
  description: [
    'Come dance with us!',
    'You\'re invited to Riya & Hemang\'s Sangeet: an evening of music and dance as both families come together in Navi Mumbai. Bring your dancing shoes!',
    '',
    'WHEN',
    'Friday, 22 January 2027',
    '6:00 PM onwards',
    '',
    'WHERE',
    'Bhanushali Wadi',
    'Basveshewar Maharaj Marg, Sector 19A, Nerul East, Navi Mumbai, Maharashtra 400706',
    'Map: ' + MAP_LINK,
    '',
    'It would be lovely to have you with us as we celebrate our Sangeet. Please let us know below if you can make it.',
    'Questions? Call or WhatsApp Hemang (+91 97693 33516) or Harsh (+91 83698 94213).',
    '',
    '#RiyaSangHemang'
  ].join('\n'),
  name: { title: 'Your name', help: '' },
  attending: {
    title: 'Will you be at the Sangeet?',
    help: 'Friday, 22 January 2027, from 6:00 PM · Bhanushali Wadi, Nerul East, Navi Mumbai',
    yes: 'Yes, I\'ll be there!',
    no: 'Sorry, I can\'t make it'
  },
  countPage: { title: 'Lovely, see you there!', help: '' },
  count: { title: 'How many of you are coming, including you?', help: '' },
  confirmation: 'Thank you, we\'ve got your answer! The Sangeet is on Friday, 22 January 2027, from 6:00 PM at Bhanushali Wadi, ' +
                'Sector 19A, Nerul East, Navi Mumbai. If anything changes, call or WhatsApp Hemang (+91 97693 33516) ' +
                'or Harsh (+91 83698 94213). #RiyaSangHemang'
};

// =================================================================
function createSangeetRsvpForm() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('SANGEET_FORM_ID')) {
    throw new Error('This project has already made the Sangeet form. Run showSangeetFormLinks to see its links. ' +
      '(To make a brand-new form with a new link anyway: Project Settings > Script properties > delete SANGEET_FORM_ID, then run again.)');
  }

  var form = FormApp.create(FORM_FILE_NAME);
  form.setTitle(TEXT.title)
      .setDescription(TEXT.description)
      .setConfirmationMessage(TEXT.confirmation)
      .setProgressBar(false)
      .setAllowResponseEdits(true)
      .setShowLinkToRespondAgain(false)
      .setPublishingSummary(false)          // guests can't see each other's answers
      .setAcceptingResponses(true);

  // Page 1: name + coming or not
  var name = form.addTextItem().setTitle(TEXT.name.title).setHelpText(TEXT.name.help).setRequired(true);
  var attending = form.addMultipleChoiceItem().setTitle(TEXT.attending.title).setHelpText(TEXT.attending.help)
                      .setRequired(true);

  // Page 2 (only for "Yes"): how many
  var countPage = form.addPageBreakItem().setTitle(TEXT.countPage.title).setHelpText(TEXT.countPage.help);
  var count = form.addListItem().setTitle(TEXT.count.title).setHelpText(TEXT.count.help)
                  .setChoiceValues(GUEST_COUNTS).setRequired(true);

  // Yes -> page 2; No -> submit straight away
  attending.setChoices([
    attending.createChoice(TEXT.attending.yes, countPage),
    attending.createChoice(TEXT.attending.no, FormApp.PageNavigationType.SUBMIT)
  ]);

  makeReachable_(form);
  props.setProperty('SANGEET_FORM_ID', form.getId());
  props.setProperty('SANGEET_ITEMS', JSON.stringify({ name: name.getId(), attending: attending.getId(), count: count.getId() }));
  logLinks_(form);
}

/** Prints the links again, without changing anything. */
function showSangeetFormLinks() {
  logLinks_(openForm_());
}

/** How many said yes / no, and how many people are coming (from the "How many" answers). */
function countSangeetRsvps() {
  var form = openForm_();
  var ids = JSON.parse(PropertiesService.getScriptProperties().getProperty('SANGEET_ITEMS'));
  // The first choice is "Yes" (works even if the wording is changed later in Google Forms)
  var yesText = form.getItemById(ids.attending).asMultipleChoiceItem().getChoices()[0].getValue();
  var yes = [], no = [], people = 0;
  form.getResponses().forEach(function (r) {
    var a = {};
    r.getItemResponses().forEach(function (ir) { a[ir.getItem().getId()] = ir.getResponse(); });
    var who = a[ids.name] || '(no name)';
    if (a[ids.attending] === yesText) {
      var n = Number(a[ids.count]) || 1;
      yes.push(who + ' (' + n + ')');
      people += n;
    } else if (a[ids.attending]) {
      no.push(who);
    }
  });
  Logger.log('Coming: ' + yes.length + ' replies, ' + people + ' people in total');
  if (yes.length) Logger.log('  ' + yes.join('\n  '));
  Logger.log('Not coming: ' + no.length);
  if (no.length) Logger.log('  ' + no.join('\n  '));
}

// ---------------- helpers ----------------
function openForm_() {
  var id = PropertiesService.getScriptProperties().getProperty('SANGEET_FORM_ID');
  if (!id) throw new Error('No Sangeet form in this project yet. Run createSangeetRsvpForm first.');
  return FormApp.openById(id);
}

function logLinks_(form) {
  var published = form.getPublishedUrl();
  var shortUrl = '';
  try { shortUrl = form.shortenFormUrl(published); } catch (e) { shortUrl = '(short link unavailable: use the public link)'; }
  Logger.log('');
  Logger.log('================ SANGEET RSVP FORM ================');
  Logger.log('For the website (public link): ' + published);
  Logger.log('Short link:                     ' + shortUrl);
  Logger.log('Edit link (keep private):       ' + form.getEditUrl());
  Logger.log('===================================================');
  Logger.log('Tip: open the public link in an incognito window to check it opens without signing in.');
}

/** Make sure guests can open the form without signing in (as far as the account allows). */
function makeReachable_(form) {
  try {
    if (typeof form.setPublished === 'function') form.setPublished(true);
  } catch (e) {
    Logger.log('Note: could not mark the form as published (' + e.message + '). If guests see "not published", open the edit link and click Publish.');
  }
  // Work/school accounts may limit forms to the same organisation. Personal Gmail doesn't support this setting.
  try { form.setRequireLogin(false); } catch (e) { /* personal account: not applicable */ }
}
