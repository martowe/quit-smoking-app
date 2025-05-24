// Creates a loading overlay in the document
function createLoadingOverlay() {
  if (!document.getElementById('loading-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading...';
    
    const spinnerContainer = document.createElement('div');
    spinnerContainer.style.textAlign = 'center';
    
    spinnerContainer.appendChild(spinner);
    spinnerContainer.appendChild(loadingText);
    overlay.appendChild(spinnerContainer);
    
    document.body.appendChild(overlay);
  }
}

// Shows the loading overlay
function showLoading(message = 'Loading...') {
  createLoadingOverlay();
  const overlay = document.getElementById('loading-overlay');
  const loadingText = overlay.querySelector('.loading-text');
  
  if (loadingText) {
    loadingText.textContent = message;
  }
  
  overlay.classList.add('active');
}

// Hides the loading overlay
function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Shows loading when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Create the overlay but don't show it yet
  createLoadingOverlay();
  
  // Show loading when submitting forms
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      showLoading('Processing...');
    });
  });
  
  // Hide loading when page is fully loaded
  window.addEventListener('load', function() {
    hideLoading();
  });
});

// Add loading when clicking on navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't show loading for links that open in new tabs/windows
      if (!e.ctrlKey && !e.metaKey && this.target !== '_blank') {
        showLoading('Loading page...');
      }
    });
  });
});
