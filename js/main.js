// =====================================================================
// THE YUM CART · main.js
// 1 Settings · 2 Helpers · 3 Contact links · 4 Anniversary promo
// 5 Quick estimate · 6 Booking request · 7 Package buttons · 8 Phone menu
// =====================================================================

// ---------- 1. Settings: the part you normally edit ----------
const BUSINESS = {
  whatsapp: '2349077419753',          // her WhatsApp (0907 741 9753): 234 first, drop the leading 0, digits only
  instagram: 'theyumcart.ng',         // Instagram handle without the @
  email: 'judithapugo41@gmail.com',   // booking requests can also be emailed here
  area: 'Port Harcourt',              // where she serves
};

// Price per guest. If a price changes, update it here AND on the package cards in index.html
const PACKAGES = {
  mini:    { name: 'Mini Yum',    price: 2000 },
  basic:   { name: 'Basic Yum',   price: 3000 },
  classic: { name: 'Classic Yum', price: 3500 },
  premium: { name: 'Premium Yum', price: 5000 },
};

const MIN_GUESTS = 50;             // from her price list: "Minimum of 50 guests"
const NOTICE_DAYS = 2;             // she needs at least 48 hours' notice before an event
const PROMO = {
  percent: 10,                     // 10% off...
  firstDay: '2026-11-01',          // ...for events held from 1 November
  lastDay: '2026-11-30',           // ...to 30 November (dates written YYYY-MM-DD)
};

// ---------- 2. Helpers ----------
const $ = (selector) => document.querySelector(selector);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Formats a number as Naira, e.g. 280000 -> "₦280,000"
const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency', currency: 'NGN', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0,
});

// A date as "YYYY-MM-DD" in the visitor's own timezone: 0 = today, 2 = the day after tomorrow
function dateFromTodayISO(days) {
  const day = new Date();
  day.setDate(day.getDate() + days);
  const local = new Date(day.getTime() - day.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
function todayISO() { return dateFromTodayISO(0); }

// "YYYY-MM-DD" strings compare correctly as text, so no date maths is needed
const promoIsOver = todayISO() > PROMO.lastDay;
const isNovemberEvent = (dateText) => dateText >= PROMO.firstDay && dateText <= PROMO.lastDay;

// "2026-11-14" -> "14 November" or "Saturday 14 November 2026" (the Nigerian way, whatever the phone shows)
function formatDate(dateText, style) {
  const [year, month, day] = dateText.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', style).format(new Date(year, month - 1, day));
}

// "15:00" -> "3:00 pm"
function formatTime(timeText) {
  const [hours, minutes] = timeText.split(':').map(Number);
  return new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
    .format(new Date(2000, 0, 1, hours, minutes));
}

const digitsOnly = (text) => String(text).replace(/\D/g, '');

// "2349077419753" -> "0907 741 9753" (the way it's written in Nigeria)
function prettyPhone(digits) {
  if (digits.startsWith('234') && digits.length === 13) {
    return `0${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return `+${digits}`;
}

// The one price rule used everywhere: guests x price per guest, minus 10% for November events
function calculate(guests, packageKey, dateText) {
  const pkg = PACKAGES[packageKey];
  const full = guests * pkg.price;
  const discounted = !promoIsOver && dateText !== '' && isNovemberEvent(dateText);
  const total = discounted ? Math.round(full * (100 - PROMO.percent) / 100) : full;
  return { pkg, full, total, discounted };
}

// ---------- 3. Contact links: each one appears only once it's filled in under Settings ----------
const whatsappNumber = digitsOnly(BUSINESS.whatsapp);
const instagramHandle = BUSINESS.instagram.replace(/^@/, '').trim();
const businessEmail = BUSINESS.email.trim();
const serviceArea = BUSINESS.area.trim();

function whatsappLink(message) {
  return `https://wa.me/${whatsappNumber}` + (message ? `?text=${encodeURIComponent(message)}` : '');
}

// Opens her email in the visitor's email app, with the subject and message typed out
function emailLink(subject, message) {
  const body = message.replace(/\n/g, '\r\n');     // email links expect this kind of line break
  return `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Adds one line to the footer contact list (a link if href is given)
function addFooterContact(text, href) {
  const item = document.createElement('li');
  if (href) {
    const link = document.createElement('a');
    link.href = href;
    if (href.startsWith('http')) {     // web links open in a new tab; email links open the email app
      link.target = '_blank';
      link.rel = 'noopener';
    }
    link.textContent = text;
    item.append(link);
  } else {
    item.textContent = text;
  }
  $('#footer-contact').append(item);
}

if (whatsappNumber) {
  addFooterContact(`WhatsApp ${prettyPhone(whatsappNumber)}`, whatsappLink());
  const floatButton = $('#wa-float');
  floatButton.href = whatsappLink('Hello The Yum Cart! ');
  floatButton.hidden = false;
}

if (instagramHandle) {
  const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;
  addFooterContact(`Instagram @${instagramHandle}`, instagramUrl);
  const moreLink = document.createElement('a');
  moreLink.className = 'btn btn-ghost';
  moreLink.href = instagramUrl;
  moreLink.target = '_blank';
  moreLink.rel = 'noopener';
  moreLink.textContent = 'See more on Instagram';   // short, so it fits on small phones
  $('#gallery-more').append(moreLink);
  $('#gallery-more').hidden = false;
}

if (businessEmail) {
  addFooterContact(`Email ${businessEmail}`, `mailto:${businessEmail}`);
  $('#send-email').hidden = false;      // the "Or send your request by email" button
}

if (serviceArea) addFooterContact(`Serving ${serviceArea}`);

// ---------- 4. Anniversary promo: hides itself after 30 November ----------
if (promoIsOver) {
  document.querySelectorAll('[data-promo]').forEach((el) => { el.hidden = true; });
}

// ---------- 5. Quick estimate ----------
const estimateForm = $('#estimate');
const guestsInput = $('#guests');
const packageSelect = $('#package');
const dateInput = $('#event-date');
const totalOutput = $('#total');
const wasPrice = $('#was');
const hint = $('#hint');
const promoNote = $('#promo-note');

dateInput.min = dateFromTodayISO(NOTICE_DAYS);

function updateEstimate() {
  const guests = Math.floor(Number(guestsInput.value));
  const eventDate = dateInput.value;               // "" if the visitor hasn't picked a date

  wasPrice.hidden = true;
  promoNote.classList.remove('applied');

  // Below the minimum: show the rule instead of a price
  if (!guests || guests < MIN_GUESTS) {
    totalOutput.textContent = '—';
    hint.textContent = `Minimum of ${MIN_GUESTS} guests`;
    hint.classList.add('warn');
    promoNote.hidden = true;
    return;
  }

  const { pkg, full, total, discounted } = calculate(guests, packageSelect.value, eventDate);
  hint.classList.remove('warn');
  hint.textContent = `${guests} guests × ${naira.format(pkg.price)}`;
  totalOutput.textContent = naira.format(total);

  if (discounted) {
    // November event: old price crossed out, discounted price shown
    wasPrice.textContent = naira.format(full);
    wasPrice.hidden = false;
    promoNote.innerHTML = `Anniversary discount applied to your ${formatDate(eventDate, { day: 'numeric', month: 'long' })} event: <strong>${PROMO.percent}% off</strong>, you save ${naira.format(full - total)}.`;
    promoNote.classList.add('applied');
    promoNote.hidden = false;
  } else if (promoIsOver) {
    promoNote.hidden = true;
  } else if (eventDate === '') {
    const novemberPrice = Math.round(full * (100 - PROMO.percent) / 100);
    promoNote.innerHTML = `Event in November? It's <strong>${naira.format(novemberPrice)}</strong> with our ${PROMO.percent}% anniversary discount.`;
    promoNote.hidden = false;
  } else {
    promoNote.textContent = `Our ${PROMO.percent}% anniversary discount is for events held in November.`;
    promoNote.hidden = false;
  }
}

guestsInput.addEventListener('input', updateEstimate);
packageSelect.addEventListener('change', updateEstimate);
dateInput.addEventListener('input', updateEstimate);
updateEstimate();

// ---------- 6. Booking request: checks the form, types the request out, opens WhatsApp or email ----------
const bookingForm = $('#booking');
const bookingDone = $('#booking-done');
const bookingSummary = $('#booking-summary');
const messageBox = $('#booking-message');
const fields = {
  // Boxes you type in and dropdowns
  name: $('#b-name'), phone: $('#b-phone'), type: $('#b-type'), date: $('#b-date'), time: $('#b-time'),
  guests: $('#b-guests'), location: $('#b-location'), venue: $('#b-venue'), address: $('#b-address'),
  source: $('#b-source'), notes: $('#b-notes'),
  // Package is a tap-to-pick group: .value is the picked one, and setting .value picks it
  package: bookingForm.elements.package,
};

// A tap-to-pick group's box (<fieldset id="b-package-group">), or null for a normal field or dropdown
const choiceGroup = (name) => document.getElementById(`b-${name}-group`);

fields.date.min = dateFromTodayISO(NOTICE_DAYS);   // date pickers start 48 hours ahead

function showBookingForm() {
  bookingDone.hidden = true;
  bookingForm.hidden = false;
}

// "Estimated total: ₦252,000 + transport" under the booking form
function updateBookingSummary() {
  const guests = Math.floor(Number(fields.guests.value));
  if (!guests || guests < MIN_GUESTS || !PACKAGES[fields.package.value]) {
    bookingSummary.hidden = true;
    return;
  }
  const { total, discounted } = calculate(guests, fields.package.value, fields.date.value);
  const amount = document.createElement('strong');
  amount.textContent = naira.format(total);
  const extra = discounted ? ` + transport (includes our ${PROMO.percent}% anniversary discount)` : ' + transport';
  bookingSummary.replaceChildren('Estimated total: ', amount, extra);
  bookingSummary.hidden = false;
}
// Any change in the form (typing, picking a package, a date) refreshes the estimate
bookingForm.addEventListener('input', updateBookingSummary);
bookingForm.addEventListener('change', updateBookingSummary);

// "Request this quote" in the estimate: carry the numbers into the booking form
estimateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (guestsInput.value) fields.guests.value = guestsInput.value;
  fields.package.value = packageSelect.value;
  if (dateInput.value) fields.date.value = dateInput.value;
  showBookingForm();
  updateBookingSummary();
  $('#book').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  fields.name.focus({ preventScroll: true });
});

// Returns a list of [fieldName, message] for everything that needs fixing
function checkBooking() {
  const problems = [];
  if (fields.name.value.trim().length < 2) problems.push(['name', 'Please enter your name.']);
  const phoneDigits = digitsOnly(fields.phone.value).length;
  if (phoneDigits < 10 || phoneDigits > 14) problems.push(['phone', 'Enter a phone number we can reach you on.']);
  if (!fields.type.value) problems.push(['type', 'Choose the type of event.']);
  if (!fields.date.value) problems.push(['date', 'Choose your event date.']);
  else if (fields.date.value < todayISO()) problems.push(['date', 'That date has already passed.']);
  else if (fields.date.value < dateFromTodayISO(NOTICE_DAYS)) {
    problems.push(['date', "We need at least 48 hours' notice. For a sooner date, chat with us on WhatsApp."]);
  }
  const guests = Math.floor(Number(fields.guests.value));
  if (!guests || guests < MIN_GUESTS) problems.push(['guests', `The minimum is ${MIN_GUESTS} guests.`]);
  if (!fields.location.value) problems.push(['location', 'Choose where your event is.']);
  if (fields.address.value.trim().length < 5) problems.push(['address', 'Enter the venue address.']);
  return problems;
}

function showProblems(problems) {
  bookingForm.querySelectorAll('.error').forEach((error) => { error.hidden = true; error.textContent = ''; });
  bookingForm.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
  bookingForm.querySelectorAll('.choices.invalid').forEach((group) => group.classList.remove('invalid'));
  problems.forEach(([name, message]) => {
    const error = $(`#b-${name}-error`);
    error.textContent = message;
    error.hidden = false;
    const group = choiceGroup(name);
    if (group) {
      group.classList.add('invalid');           // red outline on the choices (the group already points to its error text)
    } else {
      fields[name].setAttribute('aria-invalid', 'true');
      fields[name].setAttribute('aria-describedby', error.id);
    }
  });
  if (problems.length) focusField(problems[0][0]);
}

// Puts the cursor on a field: a normal box, or the first choice of a tap-to-pick group
function focusField(name) {
  const group = choiceGroup(name);
  if (group) group.querySelector('input').focus();
  else fields[name].focus();
}

// "WhatsApp didn't open? ... send it to us on 0907 741 9753:" with the number/address kept in normal letters
function setCopyLabel(text, contact) {
  const detail = document.createElement('span');
  detail.className = 'contact-detail';
  detail.textContent = contact;
  $('#copy-label').replaceChildren(text, detail, ':');
}

// The request she receives, on WhatsApp or by email
function buildMessage() {
  const guests = Math.floor(Number(fields.guests.value));
  const { pkg, total, discounted } = calculate(guests, fields.package.value, fields.date.value);
  const lines = [
    'Hello The Yum Cart! I would like a quote for my event.',
    '',
    `Name: ${fields.name.value.trim()}`,
    `Phone: ${fields.phone.value.trim()}`,
    `Event: ${fields.type.value}`,
    `Date: ${formatDate(fields.date.value, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
  ];
  if (fields.time.value) lines.push(`Start time: ${formatTime(fields.time.value)}`);
  lines.push(`Location: ${fields.location.value}`);            // helps her agree transport in chat
  if (fields.venue.value.trim()) lines.push(`Venue: ${fields.venue.value.trim()}`);
  lines.push(`Address: ${fields.address.value.trim()}`);
  lines.push(`Guests: ${guests}`);
  lines.push(`Package: ${pkg.name} (${naira.format(pkg.price)} per guest)`);
  lines.push(`Estimate: ${naira.format(total)} + transport` + (discounted ? ` (includes ${PROMO.percent}% anniversary discount)` : ''));
  if (fields.source.value) lines.push(`Heard about you: ${fields.source.value}`);
  if (fields.notes.value.trim()) lines.push(`Notes: ${fields.notes.value.trim()}`);
  return lines.join('\n');
}

// Which send button was tapped. Pressing Enter counts as the WhatsApp button (the first one).
let sendVia = 'whatsapp';
bookingForm.querySelectorAll('button[name="via"]').forEach((button) =>
  button.addEventListener('click', () => { sendVia = button.value; })
);

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const problems = checkBooking();
  showProblems(problems);
  if (problems.length) return;

  const message = buildMessage();
  const subject = `Quote request: ${fields.type.value}, ${formatDate(fields.date.value, { day: 'numeric', month: 'long', year: 'numeric' })}`;
  messageBox.value = message;
  bookingForm.hidden = true;
  bookingDone.hidden = false;

  // Buttons on the "Almost done!" panel, ready in case WhatsApp or email didn't open the first time
  const openAgain = $('#open-again');                  // "Open WhatsApp again" / "Open my email again"
  const emailButton = $('#email-request');             // "Email it instead"
  const whatsappButton = $('#whatsapp-request');       // "Send on WhatsApp instead"
  if (businessEmail) emailButton.href = emailLink(subject, message);
  if (whatsappNumber) whatsappButton.href = whatsappLink(message);
  openAgain.hidden = true;
  emailButton.hidden = true;
  whatsappButton.hidden = true;
  $('#setup-note').hidden = true;

  if (sendVia === 'email' && businessEmail) {
    $('#done-text').textContent = "Your email app should now be open with your request typed out. Tap Send there, and we'll reply with your quote.";
    openAgain.textContent = 'Open my email again';
    openAgain.href = emailLink(subject, message);
    openAgain.removeAttribute('target');                // email links open the email app, not a new tab
    openAgain.hidden = false;
    setCopyLabel('Still not opening? Copy your request and email it to ', businessEmail);
    whatsappButton.hidden = !whatsappNumber;
    window.location.href = emailLink(subject, message);   // opens the email app; this page stays open
  } else if (whatsappNumber) {
    $('#done-text').textContent = "WhatsApp should now be open with your request typed out. Tap Send in WhatsApp, and we'll reply with your quote.";
    openAgain.textContent = 'Open WhatsApp again';
    openAgain.href = whatsappLink(message);
    openAgain.target = '_blank';
    openAgain.rel = 'noopener';
    openAgain.hidden = false;
    setCopyLabel('Still not opening? Copy your request and send it to us on ', prettyPhone(whatsappNumber));
    emailButton.hidden = !businessEmail;
    const whatsappTab = window.open(whatsappLink(message), '_blank');
    if (whatsappTab) whatsappTab.opener = null;
    else window.location.href = whatsappLink(message);   // pop-up blocked: open it in this tab
  } else {
    $('#done-text').textContent = 'Your request is ready. Copy it below and send it to us on WhatsApp.';
    $('#copy-label').textContent = 'Your request:';
    $('#setup-note').hidden = false;
    emailButton.hidden = !businessEmail;
  }
  sendVia = 'whatsapp';
  bookingDone.focus();
});

$('#copy-message').addEventListener('click', async () => {
  const button = $('#copy-message');
  try {
    await navigator.clipboard.writeText(messageBox.value);
  } catch {
    messageBox.select();                // older phones: select the text and copy it the old way
    document.execCommand('copy');
  }
  button.textContent = 'Copied!';
  setTimeout(() => { button.textContent = 'Copy my request'; }, 2000);
});

$('#edit-request').addEventListener('click', () => {
  showBookingForm();
  fields.name.focus();
});

// ---------- 7. Package buttons: "Choose Premium Yum" picks that package in the booking form ----------
// (the button is a link to #book, so the page also scrolls down to the form)
document.querySelectorAll('.package-cta').forEach((button) => {
  button.addEventListener('click', () => {
    fields.package.value = button.dataset.package;
    packageSelect.value = button.dataset.package;   // keep the quick estimate in step
    updateEstimate();
    showBookingForm();
    updateBookingSummary();
  });
});

// ---------- 8. Phone menu button ----------
const header = $('.site-header');
const menuButton = $('.menu-btn');

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('#site-nav a').forEach((link) =>
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  })
);
