// Check for saved user preference
document.addEventListener('DOMContentLoaded', function() {
  // Create the dark mode toggle button
  createDarkModeToggle();
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  let currentTheme = 'light'; // Default theme
  
  if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    // Check if user has dark mode set in their OS/browser
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      currentTheme = 'dark';
    }
  }
  
  // Apply theme to document
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateToggleIcon(newTheme);
    }
  });
});

// Create dark mode toggle button
function createDarkModeToggle() {
  // Check if toggle already exists
  if (document.querySelector('.dark-mode-toggle')) {
    return;
  }
  
  const toggle = document.createElement('div');
  toggle.className = 'dark-mode-toggle';
  toggle.setAttribute('aria-label', 'Toggle dark/light mode');
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('tabindex', '0');
  toggle.innerHTML = `
    <div class="moon-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
    <div class="sun-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </div>
  `;
  
  // Toggle theme on click
  toggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateToggleIcon(newTheme);
    
    // Show toast notification
    if (typeof showToast === 'function') {
      showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`, 'info', 2000);
    }
  });
  
  // Also toggle on keyboard for accessibility
  toggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
  
  document.body.appendChild(toggle);
}

// Update toggle icon to match current theme
function updateToggleIcon(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Find the toggle if it exists
  const toggle = document.querySelector('.dark-mode-toggle');
  if (toggle) {
    const moonIcon = toggle.querySelector('.moon-icon');
    const sunIcon = toggle.querySelector('.sun-icon');
    
    if (theme === 'dark') {
      moonIcon.style.opacity = '0';
      moonIcon.style.transform = 'rotate(-180deg)';
      sunIcon.style.opacity = '1';
      sunIcon.style.transform = 'rotate(0)';
    } else {
      moonIcon.style.opacity = '1';
      moonIcon.style.transform = 'rotate(0)';
      sunIcon.style.opacity = '0';
      sunIcon.style.transform = 'rotate(180deg)';
    }
  }
}
