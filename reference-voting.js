(() => {
  'use strict';

  const reactions = {
    1: { emoji: '😞', label: 'Very disappointing' },
    2: { emoji: '🙁', label: 'Needs improvement' },
    3: { emoji: '😐', label: 'Okay' },
    4: { emoji: '🙂', label: 'Good' },
    5: { emoji: '😄', label: 'Excellent' }
  };

  const modal = document.getElementById('referenceVoteModal');
  const form = document.getElementById('referenceVoteForm');
  if (!modal || !form) return;

  const refIdInput = document.getElementById('voteReferenceId');
  const refName = document.getElementById('voteReferenceName');
  const ratingInput = document.getElementById('voteRating');
  const reactionBox = document.getElementById('voteReaction');
  const status = document.getElementById('voteStatus');
  const stars = [...form.querySelectorAll('[data-rating]')];

  function setRating(value) {
    const rating = Number(value) || 0;
    ratingInput.value = rating || '';
    stars.forEach(btn => {
      const selected = Number(btn.dataset.rating) <= rating;
      btn.classList.toggle('selected', selected);
      btn.setAttribute('aria-pressed', String(Number(btn.dataset.rating) === rating));
    });

    if (rating && reactions[rating]) {
      reactionBox.innerHTML = `<span class="vote-reaction-emoji" aria-hidden="true">${reactions[rating].emoji}</span><span>${rating} star${rating > 1 ? 's' : ''} · ${reactions[rating].label}</span>`;
      reactionBox.hidden = false;
    } else {
      reactionBox.hidden = true;
      reactionBox.textContent = '';
    }
  }

  function openModal(referenceId, referenceName) {
    form.reset();
    setRating(0);
    status.textContent = '';
    refIdInput.value = referenceId || '';
    refName.textContent = referenceName || 'this reference';
    modal.hidden = false;
    document.body.classList.add('pb-modal-open');
    requestAnimationFrame(() => modal.querySelector('.pb-modal-dialog')?.focus());
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('pb-modal-open');
  }

  document.querySelectorAll('[data-vote-reference]').forEach(button => {
    button.addEventListener('click', () => {
      openModal(button.dataset.referenceId, button.dataset.referenceName);
    });
  });

  modal.querySelectorAll('[data-close-vote]').forEach(button => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  stars.forEach(button => {
    button.addEventListener('click', () => setRating(button.dataset.rating));
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const rating = Number(ratingInput.value);
    if (!rating) {
      status.textContent = 'Please select a star rating first.';
      return;
    }

    const payload = {
      referenceId: refIdInput.value,
      referenceName: refName.textContent,
      name: document.getElementById('voteName').value.trim(),
      email: document.getElementById('voteEmail').value.trim(),
      rating,
      comment: document.getElementById('voteComment').value.trim(),
      submittedAt: new Date().toISOString(),
      moderationStatus: 'pending'
    };

    status.textContent = 'Submitting…';
    try {
      await window.PBSiteServices.sendJSON('referenceVote', payload);
      status.textContent = 'Thank you. Your vote was submitted. Any written comment will remain pending until reviewed.';
      form.querySelector('button[type="submit"]').disabled = true;
      setTimeout(() => {
        form.querySelector('button[type="submit"]').disabled = false;
        closeModal();
      }, 1600);
    } catch (error) {
      status.textContent = error.message;
    }
  });

  async function loadRatings() {
    if (!window.PBSiteServices?.isConfigured()) return;
    try {
      const data = await window.PBSiteServices.get('referenceRatings');
      const ratings = Array.isArray(data) ? data : (data.ratings || []);
      ratings.forEach(item => {
        const card = document.querySelector(`[data-reference-id="${CSS.escape(String(item.referenceId))}"]`);
        if (!card) return;
        const avg = Number(item.averageRating || item.average || 0);
        const count = Number(item.voteCount || item.count || 0);
        const avgEl = card.querySelector('[data-rating-average]');
        const countEl = card.querySelector('[data-rating-count]');
        if (avgEl) avgEl.textContent = avg ? avg.toFixed(1) : 'New';
        if (countEl) countEl.textContent = `${count} vote${count === 1 ? '' : 's'}`;
      });
    } catch (error) {
      console.warn('Reference ratings could not be loaded:', error);
    }
  }

  loadRatings();
})();
