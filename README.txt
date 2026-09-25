THE YUM CART - WEBSITE v1.2

Open index.html in a browser to see it. Resize the window to see the phone layout.
In VS Code: File > Open Folder > Documents\yum-cart-website, then click "Go Live".
(Go Live shows whichever folder VS Code has open, so always open this one.)

HER DETAILS (js/main.js, section 1 "Settings") - filled in
  BUSINESS.whatsapp    2349077419753   (0907 741 9753 with 234 in front and the first 0 dropped)
  BUSINESS.instagram   theyumcart.ng
  BUSINESS.email       judithapugo41@gmail.com
  BUSINESS.area        Port Harcourt
  Each one switches its own parts on: the floating WhatsApp button, the footer contacts,
  "See more on Instagram" under the gallery, and "Or send your request by email".
  Set one back to '' and its parts hide themselves. Nothing breaks.
  NOTICE_DAYS = 2      the booking form won't take events less than 48 hours away

FILES
  index.html       the page content (text, packages, photos, booking form, About + her note, FAQ)
  css/styles.css   the look. Colours are at the top under "Tokens"
  css/fonts.css    the fonts (don't edit)
  js/main.js       settings, price estimate, November discount, booking request, phone menu
  icons/           tab and home-screen icons
  img/share.jpg    the picture shown when the link is shared on WhatsApp/Instagram
  img/  logo/  fonts/   photos, logo files, font files

WHERE THE BUTTONS GO
  Every "Get a quote"             -> the booking form
  "Choose ... Yum" on a package   -> the booking form, with that package picked
  "Request this quote" (estimate) -> the booking form, with guests, package and date filled in
  "See packages"                  -> the packages
  Floating WhatsApp button        -> a WhatsApp chat with her

HOW A BOOKING REQUEST WORKS (for now)
  (Package is a row of tap-to-pick pills; Type of event, Event location and "How did you hear" are dropdowns.)
  1. The customer fills in "Request your quote".
  2. "Send request on WhatsApp" opens WhatsApp with everything typed out, addressed to her.
     "Or send your request by email" opens their email app instead, addressed to her Gmail.
     The Send button is inside WhatsApp / the email app, not on the website.
     If it didn't open, "Open WhatsApp again" retries, or they copy the request and send it themselves.
  3. Nothing is saved on a server yet. She replies by hand.

HER BOOKING RULES (shown in "How it works" and the FAQ)
  - At least 48 hours' notice
  - 75% deposit by bank transfer secures the date, 25% balance the day before
  - A phone call and the IV before the event
  - Full refund within 48 hours if she can't take the booking
  - Guest count can be an estimate, reconfirmed before the event
  - Transport is NOT priced on the site. She agrees it in chat.
    The form asks "Event location" (4 choices) so her request shows roughly how far the cart travels.
    To change the choices, edit <select id="b-location"> in index.html.
    Keep each choice short, or it gets cut off in the closed box on a small phone.
  Payments happen outside the website (bank transfer). The site never touches money.

NOVEMBER ANNIVERSARY DISCOUNT
  PROMO in js/main.js: 10% off events held 1-30 November 2026.
  The red strip, the red badge, the discount notes and the FAQ question hide themselves from 1 December.

CHANGING PRICES
  Update PACKAGES in js/main.js AND the package cards in index.html.

LAUNCH CHECKLIST
  - In index.html, change og:image to the full web address, e.g. https://theyumcart.ng/img/share.jpg
  - On a real Android phone and a real iPhone: send a test request on WhatsApp, by email, and with Copy
  - Tap the Instagram link and check it opens her page
