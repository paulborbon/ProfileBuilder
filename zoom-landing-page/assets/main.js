'use strict';
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
function updateThemeButton() {
  const dark = root.dataset.bsTheme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  document.getElementById('theme-icon').textContent = dark ? '☀' : '☾';
}
updateThemeButton();
toggle.addEventListener('click', () => {
  const next = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
  root.dataset.bsTheme = next;
  try { localStorage.setItem('pb-theme', next); } catch (_) { /* Keep the current session usable. */ }
  updateThemeButton();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  let saved;
  try { saved = localStorage.getItem('pb-theme'); } catch (_) { /* No stored preference. */ }
  if (!saved) { root.dataset.bsTheme = event.matches ? 'dark' : 'light'; updateThemeButton(); }
});
document.getElementById('year').textContent = new Date().getFullYear();
const nav = document.getElementById('main-nav');
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (!window.bootstrap) return;
  if (nav.classList.contains('collapsing')) {
    nav.addEventListener('shown.bs.collapse', () => bootstrap.Collapse.getOrCreateInstance(nav).hide(), { once: true });
  } else if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('service').value = link.dataset.service;
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
const projects = {
  website: { title: 'Small business landing page', service: 'Website Design', description: 'A concept for a service business that needs a clear, professional presence online. This is an illustrative scope, not a completed client engagement.', scope: ['Responsive service and profile sections', 'Clear inquiry calls to action', 'Accessible navigation and mobile layouts'] },
  automation: { title: 'Inquiry follow-up workflow', service: 'Automation', description: 'A concept for reducing the manual steps between receiving an inquiry and preparing a follow-up. Tools and integrations would be selected around your existing process.', scope: ['Map the current inquiry process', 'Organize incoming details in a shared tracker', 'Prepare a follow-up step with human review'] },
  admin: { title: 'Organized team workspace', service: 'Microsoft 365', description: 'A concept for bringing scattered documents and everyday tasks into a shared Microsoft 365 workspace. The structure would be adapted to the team.', scope: ['A clear document and folder structure', 'A shared task tracker', 'Reusable meeting notes and document templates'] }
};
let selectedProject;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  selectedProject = projects[button.dataset.project];
  document.getElementById('project-title').textContent = selectedProject.title;
  document.getElementById('project-description').textContent = selectedProject.description;
  const list = document.getElementById('project-scope');
  list.replaceChildren(...selectedProject.scope.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
}));
document.getElementById('discuss-project').addEventListener('click', () => {
  if (!selectedProject) return;
  document.getElementById('service').value = selectedProject.service;
  const modal = document.getElementById('project-modal');
  modal.addEventListener('hidden.bs.modal', () => {
    document.getElementById('contact').scrollIntoView();
    document.getElementById('name').focus({ preventScroll: true });
  }, { once: true });
  bootstrap.Modal.getOrCreateInstance(modal).hide();
});
const configuredEmail = (window.PAUL_CONFIG?.email || '').trim();
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail) ? configuredEmail : '';
if (email) {
  const direct = document.getElementById('direct-email');
  direct.href = `mailto:${email}`; direct.textContent = email + ' ↗'; direct.hidden = false;
  document.getElementById('contact-note').textContent = 'Prefer a direct hello? Send me an email.';
  document.getElementById('contact-submit').textContent = 'Open email draft ↗';
  document.getElementById('form-note').textContent = 'Opens your email app. Review and send your message there. A copyable draft is also shown below.';
}
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const brief = `Hi Paul,\n\nI’d like help with ${data.get('service')}.\n\n${String(data.get('message')).trim()}\n\nName: ${String(data.get('name')).trim()}\nReply to: ${data.get('email')}`;
  document.getElementById('brief-text').value = brief;
  document.getElementById('brief-result').hidden = false;
  if (email) {
    const subject = encodeURIComponent(`Project inquiry: ${data.get('service')}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(brief)}`;
    status.textContent = 'Draft prepared. If your email app did not open, copy the brief below and email it to ' + email + '. Nothing has been sent by this website.';
  } else status.textContent = 'Your brief is ready to copy. Nothing has been sent.';
});
document.getElementById('copy-brief').addEventListener('click', async () => {
  const field = document.getElementById('brief-text');
  try { await navigator.clipboard.writeText(field.value); status.textContent = 'Project brief copied. Paste it into your email to Paul.'; }
  catch (_) { field.focus(); field.select(); status.textContent = 'Your brief is selected. Use your device’s Copy command to copy it.'; }
});
