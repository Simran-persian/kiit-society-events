const events = [
  {
    id: 'kronos-2026', title: 'KRONOS 2026', category: 'technology', society: 'Codex & Web Society', date: '2026-10-24', dateLabel: 'OCT 24, 2026', time: 'Check KSAC for event details', venue: 'KIIT University', description: 'A technology symposium bringing together curious builders and digital creators. This listing is included as a recent campus event; check KSAC for official details and future editions.', art: 'art-kronos', symbol: '⌘', tag: 'TECH SYMPOSIUM', source: 'https://ksac.kiit.ac.in/'
  },
  {
    id: 'mun-kiit-2026', title: 'MUN KIIT 2026', category: 'community', society: 'Model United Nations Society', date: '2026-10-28', dateLabel: 'OCT 28, 2026', time: 'Check KSAC for event details', venue: 'KIIT University', description: 'A student diplomatic-conference listing for delegates who enjoy research, negotiation and big questions. This event has passed; check the official source for future editions.', art: 'art-mun', symbol: '◎', tag: 'DIPLOMACY · IDEAS', source: 'https://ksac.kiit.ac.in/'
  },
  {
    id: 'symphony-2026', title: 'SYMPHONY 2026', category: 'culture', society: 'Music Society · KSAC', date: '2026-11-05', dateLabel: 'NOV 05, 2026', time: 'Check KSAC for event details', venue: 'KIIT University', description: 'A campus music-festival listing celebrating live performance and student artists. This event has passed; check official KSAC announcements for the next music event.', art: 'art-symphony', symbol: '♫', tag: 'MUSIC · LIVE', source: 'https://ksac.kiit.ac.in/'
  },
  {
    id: 'innoventure-2026', title: 'INNOVENTURE', category: 'technology', society: 'E-Cell KIIT', date: '2026-09-18', dateLabel: 'SEP 18, 2026', time: 'Check KSAC for event details', venue: 'KIIT University', description: 'A hackathon listing for teams turning ambitious ideas into prototypes. Registration for this listed edition is closed; check KSAC and E-Cell KIIT for future opportunities.', art: 'art-innoventure', symbol: '⚡', tag: 'HACKATHON', source: 'https://ksac.kiit.ac.in/'
  }
];

const grid = document.querySelector('#eventGrid');
const searchInput = document.querySelector('#searchInput');
const emptyState = document.querySelector('#emptyState');
const dialog = document.querySelector('#eventDialog');
const dialogContent = document.querySelector('#dialogContent');
const toast = document.querySelector('#toast');
let activeFilter = 'all';
let toastTimer;

function isClosed(event) {
  return new Date(`${event.date}T23:59:59`) < new Date();
}

function eventCard(event, index) {
  const closed = isClosed(event);
  return `<article class="event-card" style="--card-index:${index}" data-category="${event.category}">
    <button class="event-card-button" type="button" data-event="${event.id}" aria-label="View details for ${event.title}">
      <div class="event-art ${event.art}"><span class="art-tag">${event.tag}</span><span class="art-symbol" aria-hidden="true">${event.symbol}</span><span class="art-date">${event.dateLabel}</span><span class="art-deco deco-one"></span><span class="art-deco deco-two"></span></div>
      <div class="event-info"><div class="event-meta"><span>${event.society}</span><span class="status-badge ${closed ? 'closed' : 'open'}"><i></i>${closed ? 'Registration closed' : 'Check registration'}</span></div><h3>${event.title}</h3><p>${event.description}</p><div class="event-bottom"><span class="event-venue">⌖ &nbsp;${event.venue}</span><span class="event-arrow" aria-hidden="true">↗</span></div></div>
    </button>
  </article>`;
}

function renderEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter((event) => {
    const matchesCategory = activeFilter === 'all' || event.category === activeFilter;
    const matchesQuery = `${event.title} ${event.society} ${event.description} ${event.tag}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  grid.innerHTML = filtered.map(eventCard).join('');
  emptyState.hidden = filtered.length !== 0;
  document.querySelector('#allCount').textContent = events.length;
}

function showEvent(id) {
  const event = events.find((item) => item.id === id);
  if (!event) return;
  const closed = isClosed(event);
  dialogContent.innerHTML = `<div class="dialog-art ${event.art}"><span class="art-tag">${event.tag}</span><span class="art-symbol" aria-hidden="true">${event.symbol}</span></div>
    <div class="dialog-body"><span class="dialog-kicker">${event.society}</span><h2 id="dialogTitle">${event.title}</h2><span class="status-badge ${closed ? 'closed' : 'open'}"><i></i>${closed ? 'Registration closed' : 'Check registration with KSAC'}</span>
      <p>${event.description}</p><div class="dialog-facts"><div><small>DATE</small><strong>${event.dateLabel}</strong></div><div><small>VENUE</small><strong>${event.venue}</strong></div><div><small>TIME</small><strong>${event.time}</strong></div></div>
      <div class="dialog-actions"><a class="button button-primary" href="${event.source}" target="_blank" rel="noreferrer">${closed ? 'See KSAC updates' : 'Check official registration'} <span>↗</span></a><p>${closed ? 'This event has passed. Registration links are no longer active.' : 'Registration availability has not been independently confirmed.'}</p></div>
      <form class="interest-form" id="interestForm"><label for="interestEmail">Want to hear about future events?</label><div class="interest-row"><input id="interestEmail" type="email" placeholder="Your email address" required><button type="submit" aria-label="Save interest">Notify me ↗</button></div><small>This demo saves your interest only in this browser.</small></form>
    </div>`;
  dialog.showModal();
  document.querySelector('#interestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email') || document.querySelector('#interestEmail').value;
    const saved = JSON.parse(localStorage.getItem('kexplore-interest') || '[]');
    if (!saved.some((item) => item.eventId === event.id && item.email === email)) saved.push({ eventId: event.id, email });
    localStorage.setItem('kexplore-interest', JSON.stringify(saved));
    dialog.close();
    announce('You’re on the list! Interest saved on this device.');
  });
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-event]');
  if (button) showEvent(button.dataset.event);
});
document.querySelectorAll('.filter-chip').forEach((button) => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
  renderEvents();
}));
searchInput.addEventListener('input', renderEvents);
document.querySelector('#dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

document.querySelector('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('kexplore-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});
if (localStorage.getItem('kexplore-theme') === 'light') document.body.classList.add('light-theme');

document.querySelector('#menuToggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const nav = document.querySelector('.nav-links');
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('nav-open', !expanded);
});
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.remove('nav-open');
  document.querySelector('#menuToggle').setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.section-heading, .event-card, .society-copy, .mosaic-tile, .about-copy').forEach((element) => observer.observe(element));

renderEvents();
