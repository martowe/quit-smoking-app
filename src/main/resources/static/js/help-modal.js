// Create help button and modal
function createHelpModal() {
  // Create help button
  const helpButton = document.createElement('div');
  helpButton.className = 'help-button';
  helpButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `;
  document.body.appendChild(helpButton);
  
  // Create modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">Quit Smoking App Guide</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Welcome to the Quit Smoking App! This guide will help you navigate the app and make the most of its features to help you successfully quit smoking.</p>
      
      <h3>Getting Started</h3>
      <p>If you're new to the app, here's how to get started:</p>
      <ol>
        <li>Create your account or log in if you already have one.</li>
        <li>Set up your quit plan by specifying your quit date and smoking habits.</li>
        <li>Track your progress and celebrate your achievements along the way.</li>
      </ol>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Quit Plan</strong> - Set your quit date and track your progress.</li>
        <li><strong>Progress Tracking</strong> - See how far you've come with visual progress indicators.</li>
        <li><strong>Health Milestones</strong> - Track the health benefits you gain as time passes.</li>
        <li><strong>Tips & Advice</strong> - Get helpful tips to manage cravings and stay smoke-free.</li>
      </ul>
      
      <h3>Health Benefits Timeline</h3>
      <p>Here's what happens to your body when you quit smoking:</p>
      <ul>
        <li><strong>20 minutes:</strong> Your heart rate and blood pressure drop.</li>
        <li><strong>12 hours:</strong> The carbon monoxide level in your blood drops to normal.</li>
        <li><strong>2-12 weeks:</strong> Your circulation improves and lung function increases.</li>
        <li><strong>1-9 months:</strong> Coughing and shortness of breath decrease.</li>
        <li><strong>1 year:</strong> Your risk of coronary heart disease is about half that of a smoker's.</li>
        <li><strong>5-15 years:</strong> Your stroke risk is reduced to that of a nonsmoker.</li>
      </ul>
      
      <h3>Tips for Success</h3>
      <ul>
        <li>Visit the app daily to track your progress and stay motivated.</li>
        <li>Identify your triggers and plan how to handle them.</li>
        <li>Use the tips section for strategies to manage cravings.</li>
        <li>Celebrate each milestone, no matter how small.</li>
        <li>Don't give up if you slip – just get back on track right away.</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button class="button" id="dontShowAgain">Don't show again</button>
      <button class="button" id="closeModal">Close</button>
    </div>
  `;
  
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  
  // Event listeners
  helpButton.addEventListener('click', function() {
    openModal();
  });
  
  modal.querySelector('.modal-close').addEventListener('click', function() {
    closeModal();
  });
  
  modal.querySelector('#closeModal').addEventListener('click', function() {
    closeModal();
  });
  
  modal.querySelector('#dontShowAgain').addEventListener('click', function() {
    localStorage.setItem('hideHelpModal', 'true');
    closeModal();
    
    // Show toast notification
    if (typeof showToast === 'function') {
      showToast('Help guide will not be shown automatically', 'info', 3000);
    }
  });
  
  // Close when clicking outside the modal
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Check if we should show the modal automatically
  const hideHelpModal = localStorage.getItem('hideHelpModal');
  const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
  
  if (!hideHelpModal && !hasVisitedBefore) {
    // First time visitor, show the modal automatically
    setTimeout(openModal, 1000); // Slight delay for better UX
    localStorage.setItem('hasVisitedBefore', 'true');
  }
}

// Open the modal
function openModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.add('show');
  }
}

// Close the modal
function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
  }
}

// Initialize help modal when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  createHelpModal();
});
