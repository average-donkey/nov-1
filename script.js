/*
 * PALAK'S LITTLE DREAMWORLD — Website 01 / 19
 * Edit the two text fields below to personalize the site.
 * This project is static: open index.html or host the folder as a static site.
 */

const SITE_CONTENT = {
  // ✏️ EDIT YOUR GREETING HERE
  greeting: `I wanted to make you a tiny corner of the internet that feels like opening a little box full of good things. So here it is: causee you deserve to feel celebrated, not just on your birthday, but in all the ordinary bits in between too. ♡`,

  // ✏️ EDIT YOUR PERSONAL MESSAGE HERE
  message: `Okay, so this is the part where I attempt to be nice and all without making it weird.I'm really glad you're in my life tho you have habit of just disappearing randomly. You make ordinary conversations funnier, random days less boring, and banters that I know I'll look back on and laugh at. . Never forget that you're a whole person worth celebrating, even when it's not your birthday.Anyway, enough nice guy talks or i might cringe very bad.also your birthday is in 19 days so i expect a partyy btw`
};

const IST = 'Asia/Kolkata';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$('#greetingCopy').textContent = SITE_CONTENT.greeting;
$('#messageCopy').textContent = SITE_CONTENT.message;

function getISTParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: IST, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}
function istDateKey(date = new Date()) {
  const p = getISTParts(date);
  return `${p.year}-${String(p.month).padStart(2,'0')}-${String(p.day).padStart(2,'0')}`;
}
function nextBirthdayTimestamp(now = new Date()) {
  const p = getISTParts(now);
  let year = p.year;
  let target = Date.parse(`${year}-11-20T00:00:00+05:30`);
  if (now.getTime() >= target + 24 * 60 * 60 * 1000) {
    year += 1;
    target = Date.parse(`${year}-11-20T00:00:00+05:30`);
  }
  // On November 20 itself, show birthday mode and count down to next year's birthday.
  if (p.month === 11 && p.day === 20) {
    year += 1;
    target = Date.parse(`${year}-11-20T00:00:00+05:30`);
  }
  return target;
}
function isBirthdayInIST(date = new Date()) {
  const p = getISTParts(date);
  return p.month === 11 && p.day === 20;
}
function showToast(message, duration = 3300) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), duration);
}

const starfield = $('#starfield');
for (let i = 0; i < 34; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.textContent = ['✧','·','✦','⋆'][i % 4];
  star.style.left = `${(i * 37 + 11) % 100}%`;
  star.style.top = `${(i * 61 + 8) % 100}%`;
  star.style.fontSize = `${7 + (i % 4) * 4}px`;
  star.style.animationDelay = `${(i % 7) * -.47}s`;
  starfield.appendChild(star);
}

function goToPage(pageId) {
  $$('.page').forEach(page => page.classList.toggle('active', page.id === pageId));
  $$('.step').forEach(button => button.classList.toggle('active', button.dataset.go === pageId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
$$('[data-go]').forEach(button => button.addEventListener('click', event => {
  const target = button.dataset.go;
  if (!target) return;
  event.preventDefault();
  if ($('#appShell').hidden) enterDreamworld();
  goToPage(target);
}));

function enterDreamworld() {
  $('#intro').classList.add('leaving');
  $('#appShell').hidden = false;
  setTimeout(() => { $('#intro').hidden = true; }, 950);
}
$('#enterButton').addEventListener('click', enterDreamworld);

const skipIntroButton = $('#skipIntro');

if (skipIntroButton) {
  skipIntroButton.addEventListener('click', enterDreamworld);
}
$('#sparkleButton').addEventListener('click', () => {
  for (let i = 0; i < 13; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'confetti-bit';
    sparkle.textContent = ['✧','♡','⋆','✦'][i % 4];
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.setProperty('--fall', `${2.2 + Math.random() * 2.5}s`);
    sparkle.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    sparkle.style.setProperty('--size', `${10 + Math.random() * 13}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 5000);
  }
});

function updateCountdown() {
  const now = new Date();
  const target = nextBirthdayTimestamp(now);
  let remaining = Math.max(0, target - now.getTime());
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000); remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  $('#days').textContent = String(days).padStart(3, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#minutes').textContent = String(minutes).padStart(2, '0');
  $('#seconds').textContent = String(seconds).padStart(2, '0');
  const p = getISTParts(now);
  $('#todayLabel').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: IST, day: '2-digit', month: 'short', year: 'numeric' }).format(now).toUpperCase();
  renderCalendar(p.year, p.month, p.day);
  updateBirthdayMode();
}

let calendarRenderedFor = '';
function renderCalendar(year, month, day) {
  const key = `${year}-${month}`;
  if (calendarRenderedFor === key) {
    $$('.calendar-day').forEach(el => {
      el.classList.toggle('today', Number(el.dataset.day) === day && Number(el.dataset.month) === month);
    });
    return;
  }
  calendarRenderedFor = key;
  const monthNames = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  $('#calendarMonth').textContent = `${monthNames[month - 1]} ${year}`;
  const grid = $('#calendarDays');
  grid.innerHTML = '';
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement('span'); empty.className = 'calendar-day empty'; grid.appendChild(empty);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement(month === 11 && d === 20 ? 'button' : 'span');
    cell.className = 'calendar-day';
    cell.textContent = d;
    cell.dataset.day = d;
    cell.dataset.month = month;
    if (d === day) cell.classList.add('today');
    if (month === 11 && d === 20) {
      cell.classList.add('birthday-day');
      cell.setAttribute('aria-label', 'November 20, Palak Day');
      cell.addEventListener('click', () => showToast('Ribbon day = PALAK DAY. No further explanation required. ୨୧'));
    }
    grid.appendChild(cell);
  }
}
$('#calendarNote').addEventListener('click', () => showToast('NOVEMBER 20: a very important day for a very specific human. ୨୧'));

$$('[data-surprise="star"]').forEach(button => button.addEventListener('click', () => showToast('You found the tiny star! Your side quest reward: one emoji cloud☁️☁️☁️☁️ and 3 bonus sparkles. ✦')));
$('#ordinarySecret').addEventListener('click', () => {
  const messages = [
    'Official reminder: you are not allowed to have a good day for absolutely no reason.',
    'Keep slayinnn btwww',
    'You clicked  a random button....; real smart move bro',
    'Never stop being yourself'
  ];
  const next = (Number(sessionStorage.getItem('secretIndex') || 0)) % messages.length;
  sessionStorage.setItem('secretIndex', String(next + 1));
  showToast(messages[next], 4200);
  $('#ordinarySecret').classList.add('secret-found');
  setTimeout(() => $('#ordinarySecret').classList.remove('secret-found'), 500);
});

$('#openLetter').addEventListener('click', () => {
  const button = $('#openLetter');
  const opened = button.classList.toggle('open');
  button.setAttribute('aria-expanded', String(opened));
  $('#envelopeHint').textContent = opened ? 'the note is ready for you ♡' : 'tap the envelope to open it ♡';
  if (opened) {
    setTimeout(() => {
      $('#personalLetter').hidden = false;
      $('#personalLetter').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
  } else {
    $('#personalLetter').hidden = true;
  }
});

function updateBirthdayMode() {
  const birthday = isBirthdayInIST();
  $('#birthdayBanner').hidden = !birthday;
  if (birthday && !sessionStorage.getItem('birthdayConfettiShown')) {
    sessionStorage.setItem('birthdayConfettiShown', 'yes');
    for (let i = 0; i < 28; i++) {
      const bit = document.createElement('span');
      bit.className = 'confetti-bit';
      bit.textContent = ['✧','♡','୨୧','✦'][i % 4];
      bit.style.left = `${Math.random() * 100}vw`;
      bit.style.setProperty('--fall', `${3.5 + Math.random() * 3}s`);
      bit.style.setProperty('--drift', `${Math.random() * 150 - 75}px`);
      bit.style.setProperty('--size', `${9 + Math.random() * 12}px`);
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), 7000);
    }
  }
}
$('#closeBirthday').addEventListener('click', () => { $('#birthdayBanner').hidden = true; });
$('#birthdaySecret').addEventListener('click', () => {
  showToast('BIRTHDAY BONUS ✨ If i could hand you a tiny trophy, it would say: “A bauna born on 20 nov.” Go be celebrated, homie. ♡', 5200);
  for (let i = 0; i < 12; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti-bit';
    bit.textContent = ['♡','✧','୨୧'][i % 3];
    bit.style.left = `${20 + Math.random() * 60}vw`;
    bit.style.setProperty('--fall', `${2 + Math.random() * 2}s`);
    bit.style.setProperty('--drift', `${Math.random() * 90 - 45}px`);
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 4500);
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
