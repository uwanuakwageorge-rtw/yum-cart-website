THE YUM CART - WEBSITE v1.3

PREVIEW
  In VS Code: File > Open Folder > Documents\yum-cart-website, then click "Go Live".
  (Go Live shows whichever folder VS Code has open, so always open this one.)
  Double-clicking index.html also works, but the browser console will show two harmless
  font messages ("blocked by CORS policy"). They don't happen on the real website.

PUBLISHING A CHANGE
  VS Code > Source Control: type a message in the box (e.g. "Fix typo"), click Commit, then Sync.
  If VS Code opens a tab called COMMIT_EDITMSG instead, type a message on the first line,
  save it (Ctrl+S) and close that tab. The commit only happens after that.
  Netlify updates the live site about 30 seconds after Sync.

HER DETAILS - filled in
  js/main.js, section 1 "Settings":
    BUSINESS.whatsapp    2349077419753   (0907 741 9753 with 234 in front and the first 0 dropped)
    BUSINESS.instagram   theyumcart.ng
    BUSINESS.email       judithapugo41@gmail.com
    BUSINESS.area        Port Harcourt
  Set one back to '' and its parts hide themselves. Nothing breaks: with no WhatsApp number (but an email),
  the main button becomes "Send request by email"; with neither, customers are asked to copy their request.

  !! Her details are ALSO written out in these places, so they still show if the script can't run
     and so Google can read them. If her number, email or Instagram changes, change ALL of them:
     1. js/main.js      BUSINESS settings (above)
     2. index.html      the footer list  <ul class="footer-contact">
     3. index.html      the floating button  <a class="wa-float" ... href="https://wa.me/...">
     4. index.html      the booking form  <form class="booking" ... action="https://wa.me/...">
     5. index.html      the "Business details for Google" block near the top (telephone, email, sameAs)
     6. 404.html        the "Chat on WhatsApp" link

  NOTICE_DAYS = 2      the booking form won't take events less than 48 hours away

FILES
  index.html       the page content (text, packages, photos, booking form, About + her note, FAQ)
  404.html         the "Page not found" page Netlify shows for any wrong address
  css/styles.css   the look. Colours are at the top under "Tokens"
  css/fonts.css    the fonts (don't edit)
  css/noscript.css only used when JavaScript is turned off (shows the phone menu links)
  js/main.js       settings, price estimate, November discount, booking request, phone menu
  icons/           tab and home-screen icons
  img/share.jpg    the picture shown when the link is shared on WhatsApp/Instagram
  img/  logo/      photos and logo files
  fonts/           font files. The "-naira-" files hold only the ₦ sign (under 4 KB each).
                   They replace 168 KB of downloads that were only needed for that one symbol.
                   If a font is ever swapped, recreate them with fonttools:
                   pyftsubset <font>-latin-ext-<weight>.woff2 --unicodes=U+20A6 --flavor=woff2
                     --layout-features='*' --output-file=<font>-naira-<weight>.woff2
  _headers         Netlify settings: security headers, and long caching for fonts.
                   If you ever add an outside script or embed (Google Analytics, an Instagram embed,
                   a map), add its web address to the Content-Security-Policy line or it will be blocked.
  _redirects       Netlify settings: keeps this README off the public website
  robots.txt, sitemap.xml   tell Google what to index

WHERE THE BUTTONS GO
  Every "Get a quote"             -> the booking form
  "Choose ... Yum" on a package   -> the booking form, with that package picked
  "Request this quote" (estimate) -> the booking form, with guests, package and date filled in
  "See packages"                  -> the packages
  Floating WhatsApp button        -> a WhatsApp chat with her
  A wrong web address             -> 404.html, with "Go to the homepage" and "Chat on WhatsApp"

HOW A BOOKING REQUEST WORKS (for now)
  (Package is a row of tap-to-pick pills; Type of event, Event location and "How did you hear" are dropdowns.)
  1. The customer fills in "Request your quote". Under the date, the site repeats it in words
     ("That's Saturday 14 November 2026") so a phone set to US format can't cause a wrong date.
  2. "Send request on WhatsApp" opens WhatsApp with everything typed out, addressed to her.
     "Or send your request by email" opens their email app instead, addressed to her Gmail.
     The Send button is inside WhatsApp / the email app, not on the website.
  3. The "Almost done!" panel offers: Open WhatsApp again, Copy my request, Edit my request,
     and (tucked under "Trouble sending? Try another way") the other app.
     "Copy" only says "Copied!" if it worked; otherwise it selects the text to copy by hand.
  4. Nothing is saved on a server. She replies by hand.
  Text boxes have length limits (name 80, phone 30, venue 120, address 200, notes 500)
  so the message always fits in a WhatsApp / email link.
  If the page's script can't run (very old phone, blocked script), the contacts still show,
  and the Send button opens a plain WhatsApp chat with her. The form boxes have no "name" on purpose,
  so what customers type is never put into a web address. With JavaScript turned off, a note at the top of
  the form points people to WhatsApp / email, and the phone menu links show without the Menu button.

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
  The red strip, the red badge, the discount notes, the estimate's date box and the FAQ question hide themselves
  once the earliest bookable date (48 hours ahead) is after 30 November, i.e. from 29 November.
  After November you can delete everything marked data-promo in index.html, if you like (optional).

CHANGING PRICES - change every one of these:
  js/main.js   PACKAGES (this is what the estimate and the request actually calculate with)
  index.html   the 4 package cards, the Package dropdown in "Quick estimate",
               the 4 Package pills in the booking form, "From ₦2,000" in the hero,
               "from ₦2,000" in the description / og:description lines at the top,
               and the starting figures in "Quick estimate" (₦280,000 / 80 guests × ₦3,500 / ₦252,000:
               only seen if the page's script can't run, but keep them right)

LAUNCH CHECKLIST
  - Commit + Sync so the live site has this version (see PUBLISHING A CHANGE)
  - On a real Android phone and a real iPhone: send a test request on WhatsApp, by email, and with Copy
  - Tap the Instagram link and check it opens her page
  - Google Search Console: add https://theyumcart.netlify.app and submit sitemap.xml,
    so Google finds the site (it doesn't know about it yet)
  - If a custom domain (e.g. theyumcart.ng) is added, change https://theyumcart.netlify.app to it in:
    index.html (og:image, og:url, canonical, the business details block), robots.txt, sitemap.xml
