(() => {
  'use strict';
  // Public contact addresses for approved references. Add future owners here.
  // These addresses are visible to visitors, as required for mailto links.
  const references = {
    'maven-website-builder': {
      name: 'Maven Website Builder',
      email: 'borbon_pj@hotmail.com'
    }
  };
  const params = new URLSearchParams(window.location.search);
  const referenceId = params.get('referenceId') || 'maven-website-builder';
  const reference = Object.prototype.hasOwnProperty.call(references, referenceId)
    ? references[referenceId] : null;
  const form = document.getElementById('referralForm');
  const status = document.getElementById('sendStatus');
  const subject = document.getElementById('draftSubject');
  const body = document.getElementById('draftBody');
  if (!reference) {
    status.textContent = 'No contact address is available for this reference.';
    form.querySelector('button[type="submit"]').disabled = true;
    return;
  }
  document.getElementById('ownerAddress').textContent = reference.email;
  document.getElementById('referenceLabel').textContent = '(' + reference.name + ')';
  const value = id => document.getElementById(id).value.trim();
  function updateDraft() {
    subject.value = reference.name + ' Inquiry';
    body.value = [
      'Hello ' + reference.name + ',', '',
      value('requestText'), '',
      'Full Name: ' + value('fullName'),
      'Email: ' + value('email'),
      'Phone: ' + value('phone'),
      'Preferred Date / Time: ' + value('preferredDateTime').replace('T', ' '),
      '', 'Reference: ' + reference.name,
      'Reference ID: ' + referenceId
    ].join('\r\n');
  }
  form.addEventListener('input', updateDraft);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    updateDraft();
    const link = 'mailto:' + reference.email + '?subject=' +
      encodeURIComponent(subject.value) + '&body=' + encodeURIComponent(body.value);
    status.textContent = 'Review the draft in your email app and press Send. If it does not open, copy the draft below.';
    // Keep form values so visitors can copy their inquiry or try again.
    window.location.href = link;
  });
  updateDraft();
})();
