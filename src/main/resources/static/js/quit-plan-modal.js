// Create welcome modal to be shown on the first visit to the quit-plan page
function createWelcomeModal() {
  // Check if we already showed the welcome message
  if (localStorage.getItem('welcomeModalShown')) {
    return;
  }
  
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">Welcome to Your Quit Plan!</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Congratulations on taking this important step toward becoming smoke-free! Here's what you need to know to get started:</p>
      
      <h3>Setting Your Quit Date</h3>
      <p>Your quit date is a significant milestone. Choose a date that gives you time to prepare but is close enough to maintain motivation. Consider selecting a day with fewer stressors.</p>
      
      <h3>Tracking Your Smoking Habits</h3>
      <p>By entering how many cigarettes you smoke per day and the price per pack, we can calculate:</p>
      <ul>
        <li>The money you're saving by quitting</li>
        <li>The number of cigarettes you've avoided</li>
        <li>The health improvements you're experiencing</li>
      </ul>
      
      <h3>Your Progress Dashboard</h3>
      <p>Once you set your quit plan, you'll have access to a personalized dashboard showing your progress and health milestones. Return daily to see how far you've come!</p>
      
      <p>Remember, quitting smoking is one of the best things you can do for your health, and we're here to support you every step of the way.</p>
    </div>
    <div class="modal-footer">
      <button class="button" id="getStartedBtn">Let's Get Started!</button>
    </div>
  `;
  
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  
  // Open modal
  modalOverlay.classList.add('show');
  
  // Event listeners
  modal.querySelector('.modal-close').addEventListener('click', function() {
    closeModal(modalOverlay);
    setWelcomeModalShown();
  });
  
  modal.querySelector('#getStartedBtn').addEventListener('click', function() {
    closeModal(modalOverlay);
    setWelcomeModalShown();
    
    // Scroll to form
    const quitPlanForm = document.getElementById('quitPlanForm');
    if (quitPlanForm) {
      quitPlanForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Close when clicking outside the modal
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay);
      setWelcomeModalShown();
    }
  });
}

// Mark welcome modal as shown
function setWelcomeModalShown() {
  localStorage.setItem('welcomeModalShown', 'true');
}

// Close a specific modal overlay
function closeModal(modalOverlay) {
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      modalOverlay.remove();
    }, 300);
  }
}

// Check if we're on the quit plan page and show welcome modal if needed
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('quit-plan')) {
    createWelcomeModal();
  }
});
