# Palak's Little Dreamworld — Website 01 / 19

A standalone static website made with HTML, CSS, and JavaScript.

## Run it
1. Extract this ZIP.
2. Open `index.html` in a browser.
3. Internet is only needed for optional Google Fonts; the website itself has no backend.

## Personalize it
Open `script.js` and edit:
- `SITE_CONTENT.greeting` — the greeting on Page 1.
- `SITE_CONTENT.message` — the personal letter on Page 3.

## Shinchan sticker
The page includes a visible replaceable Shinchan sticker placeholder. When you have an image you want to use, put it in `assets/` (for example `assets/shinchan.png`) and replace the `.shinchan-placeholder` element in `index.html` with:
`<img class="shinchan-image" src="assets/shinchan.png" alt="Shinchan sticker">`
Then add this CSS rule to `style.css`:
`.shinchan-image { display:block; width:92px; max-height:110px; object-fit:contain; filter: drop-shadow(0 8px 8px rgba(126,99,146,.12)); }`

## Birthday logic
The countdown uses India Standard Time (Asia/Kolkata) and targets the next November 20 at 12:00 AM IST. Birthday mode is active for the entire November 20 in IST. Test it by changing your computer clock only if you know what you're doing; the date is calculated from the actual current time.

## Files
- `index.html` — page content and structure
- `style.css` — layout, responsive styles, visuals and animations
- `script.js` — page navigation, editable copy, countdown and secret buttons
- `assets/` — place your chosen sticker or other local assets here
