// Create toast container if it doesn't exist
function createToastContainer() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }
  return document.querySelector('.toast-container');
}

// Toast notification types
const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  AUTH_ERROR: 'auth-error'
};

// Icons for each toast type
const ToastIcons = {
  [ToastType.SUCCESS]: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  [ToastType.ERROR]: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  [ToastType.WARNING]: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  [ToastType.INFO]: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  [ToastType.AUTH_ERROR]: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`
};

// Show a toast notification
function showToast(message, type = ToastType.INFO, duration = 3000) {
  const container = createToastContainer();
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Toast content
  const content = document.createElement('div');
  content.className = 'toast-content';
  
  // Icon
  const icon = document.createElement('div');
  icon.className = 'toast-icon';
  icon.innerHTML = ToastIcons[type];
  
  // Message
  const messageElement = document.createElement('div');
  messageElement.className = 'toast-message';
  messageElement.textContent = message;
  
  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'toast-close';
  closeButton.innerHTML = '×';
  closeButton.addEventListener('click', () => dismissToast(toast));
  
  // Assemble the toast
  content.appendChild(icon);
  content.appendChild(messageElement);
  toast.appendChild(content);
  toast.appendChild(closeButton);
  
  // Add to container
  container.appendChild(toast);
  
  // Set timeout to dismiss
  setTimeout(() => dismissToast(toast), duration);
  
  return toast;
}

// Dismiss a toast notification
function dismissToast(toast) {
  toast.classList.add('hide');
  
  toast.addEventListener('animationend', () => {
    toast.remove();
    
    // Remove container if empty
    const container = document.querySelector('.toast-container');
    if (container && container.children.length === 0) {
      container.remove();
    }
  });
}

// Check for URL parameters to show toast messages
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('success')) {
    showToast(urlParams.get('success'), ToastType.SUCCESS);
  }
  
  if (urlParams.has('error')) {
    showToast(urlParams.get('error'), ToastType.ERROR);
  }
  
  if (urlParams.has('warning')) {
    showToast(urlParams.get('warning'), ToastType.WARNING);
  }
  
  if (urlParams.has('info')) {
    showToast(urlParams.get('info'), ToastType.INFO);
  }
  
  // Remove the parameters from URL to prevent showing toast on refresh
  if (urlParams.has('success') || urlParams.has('error') || urlParams.has('warning') || urlParams.has('info')) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
