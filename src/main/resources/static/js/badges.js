document.addEventListener('DOMContentLoaded', function() {
  // Badge definitions
  const badges = [
    {
      id: '24-hours',
      label: '24 Hours',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      description: 'Smoke-free for 24 hours! Carbon monoxide levels in your blood have returned to normal.',
      seconds: 86400 // 24 hours in seconds
    },
    {
      id: '3-days',
      label: '3 Days',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
      description: 'Smoke-free for 3 days! Nicotine has left your body and your sense of taste and smell are improving.',
      seconds: 259200 // 3 days in seconds
    },
    {
      id: '1-week',
      label: '1 Week',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
      description: 'Smoke-free for 1 week! Your circulation is improving and your lung function is increasing.',
      seconds: 604800 // 1 week in seconds
    },
    {
      id: '2-weeks',
      label: '2 Weeks',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
      description: 'Smoke-free for 2 weeks! Your lung function and circulation continue to improve.',
      seconds: 1209600 // 2 weeks in seconds
    },
    {
      id: '1-month',
      label: '1 Month',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>',
      description: 'Smoke-free for 1 month! Your lungs are cleaner and you should be coughing less.',
      seconds: 2592000 // 1 month (30 days) in seconds
    },
    {
      id: '3-months',
      label: '3 Months',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path><path d="M15 9l5 -5"></path><path d="M16 4l4 0l0 4"></path></svg>',
      description: 'Smoke-free for 3 months! Your circulation has improved and exercise is getting easier.',
      seconds: 7776000 // 3 months (90 days) in seconds
    },
    {
      id: '6-months',
      label: '6 Months',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      description: 'Smoke-free for 6 months! Your risk of heart attack has dropped significantly.',
      seconds: 15552000 // 6 months (180 days) in seconds
    },
    {
      id: '1-year',
      label: '1 Year',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>',
      description: 'Smoke-free for 1 year! Your risk of coronary heart disease is now half that of a smoker.',
      seconds: 31536000 // 1 year (365 days) in seconds
    }
  ];

  // Create badges container if doesn't exist
  let badgesContainer = document.getElementById('achievementBadges');
  if (!badgesContainer) {
    // Try to find the progress section or dashboard
    const progressHeading = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Progress:'));
    const dashboard = document.querySelector('.dashboard');
    
    if (progressHeading) {
      const progressSection = progressHeading.parentNode;
      
      badgesContainer = document.createElement('div');
      badgesContainer.id = 'achievementBadges';
      badgesContainer.className = 'badges-container';
      
      const badgesTitle = document.createElement('h3');
      badgesTitle.textContent = 'Achievement Badges:';
      
      progressSection.appendChild(badgesTitle);
      progressSection.appendChild(badgesContainer);
    } else if (dashboard) {
      // Add after dashboard
      badgesContainer = document.createElement('div');
      badgesContainer.id = 'achievementBadges';
      badgesContainer.className = 'badges-container';
      
      const badgesTitle = document.createElement('h3');
      badgesTitle.textContent = 'Achievement Badges:';
      
      const badgesSection = document.createElement('div');
      badgesSection.style.marginTop = '40px';
      badgesSection.appendChild(badgesTitle);
      badgesSection.appendChild(badgesContainer);
      
      dashboard.parentNode.insertBefore(badgesSection, dashboard.nextSibling);
    } else {
      // Create a new section for badges if we can't find the progress section or dashboard
      const mainContent = document.querySelector('.content') || document.querySelector('.main-content');
      if (mainContent) {
        badgesContainer = document.createElement('div');
        badgesContainer.id = 'achievementBadges';
        badgesContainer.className = 'badges-container';
        
        const badgesTitle = document.createElement('h3');
        badgesTitle.textContent = 'Achievement Badges:';
        
        const badgesSection = document.createElement('div');
        badgesSection.appendChild(badgesTitle);
        badgesSection.appendChild(badgesContainer);
        
        mainContent.appendChild(badgesSection);
      }
    }
  }

  // Function to create and render badges
  function renderBadges(quitDateTime) {
    if (!quitDateTime) return;
    
    // Clear existing badges
    badgesContainer.innerHTML = '';
    
    // Get time without smoking in seconds
    const now = new Date();
    const timeDifference = now - quitDateTime;
    const secondsWithoutSmoking = Math.floor(timeDifference / 1000);
    
    // Create badges
    badges.forEach(badge => {
      const isUnlocked = secondsWithoutSmoking >= badge.seconds;
      
      const badgeElement = document.createElement('div');
      badgeElement.className = `badge ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`;
      badgeElement.setAttribute('data-badge-id', badge.id);
      
      const badgeIcon = document.createElement('div');
      badgeIcon.className = 'badge-icon';
      badgeIcon.innerHTML = badge.icon;
      
      const badgeLabel = document.createElement('div');
      badgeLabel.className = 'badge-label';
      badgeLabel.textContent = badge.label;
      
      const tooltip = document.createElement('div');
      tooltip.className = 'badge-tooltip';
      tooltip.textContent = isUnlocked ? 
        badge.description : 
        `Unlock after ${badge.label} of being smoke-free`;
      
      badgeElement.appendChild(badgeIcon);
      badgeElement.appendChild(badgeLabel);
      badgeElement.appendChild(tooltip);
      badgesContainer.appendChild(badgeElement);
      
      // Celebrate newly unlocked badge if it's close to the threshold (within the last 5 minutes)
      if (isUnlocked && (secondsWithoutSmoking - badge.seconds) < 300) {
        celebrateAchievement(badge);
      }
    });
  }
  
  // Function to celebrate an achievement
  function celebrateAchievement(badge) {
    if (typeof showToast === 'function') {
      showToast(`Achievement Unlocked: ${badge.label}! ${badge.description}`, 'success', 5000);
    }
    
    // Find the badge element and add animation
    const badgeElement = document.querySelector(`[data-badge-id="${badge.id}"]`);
    if (badgeElement) {
      // Add a sparkle effect
      badgeElement.style.boxShadow = '0 0 15px var(--primary-color)';
      setTimeout(() => {
        badgeElement.style.boxShadow = '';
      }, 5000);
    }
  }
  
  // Check for existing quit plan data
  const quitDateTimeElement = document.getElementById('quitDateTime');
  if (quitDateTimeElement && quitDateTimeElement.value) {
    const quitDateTime = new Date(quitDateTimeElement.value);
    
    // Initial render
    renderBadges(quitDateTime);
    
    // Update badges every minute
    setInterval(() => {
      renderBadges(quitDateTime);
    }, 60000);
  }
});

// Add client-side code to ensure progress rings display correctly
document.addEventListener('DOMContentLoaded', function() {
  // Fix for milestone progress circles
  const milestones = document.querySelectorAll('.milestone');
  milestones.forEach(milestone => {
    const nameElement = milestone.querySelector('.milestone-name');
    const progressCircle = milestone.querySelector('.progress-circle');
    const progressText = milestone.querySelector('.progress-text');
    if (nameElement && nameElement.textContent.includes('Pulse rate')) {
      milestone.classList.add('pulse-rate');
    }
    if (progressCircle && progressText) {
      // Always set the progress ring, not just for 100%
      let percent = parseInt(progressText.textContent);
      if (!isNaN(percent)) {
        progressCircle.setAttribute('data-progress', percent.toString());
        progressCircle.style.setProperty('--progress', percent + '%');
        // Always set background for all percentages
        progressCircle.style.background = `conic-gradient(var(--primary-color) ${percent}%, #e0e0e0 0%)`;
      }
    }
  });
});
