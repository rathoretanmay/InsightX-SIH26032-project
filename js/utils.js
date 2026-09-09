// Shared Utility Functions

// Toast Notifications
function showToast(message, duration = 2600) {
  const stack = document.getElementById('toastStack') || createToastStack();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  stack.appendChild(toast);
  
  requestAnimationFrame(() => toast.classList.add('show'));
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

function createToastStack() {
  const stack = document.createElement('div');
  stack.id = 'toastStack';
  stack.className = 'toast-stack';
  document.body.appendChild(stack);
  return stack;
}

// Loading Overlay
function showLoading(message = 'Loading...') {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
  }
  overlay.classList.add('show');
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.remove('show');
  }
}

// Form Validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone.trim());
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      isValid = false;
    } else {
      input.classList.remove('invalid');
    }
  });
  
  return isValid;
}

// Navigation Helpers
function navigateTo(page) {
  showLoading();
  setTimeout(() => {
    window.location.href = page;
  }, 300);
}

function goHome() {
  navigateTo('page01-landing.html');
}

function goRegistration() {
  navigateTo('page02-farmer-registration.html');
}

function goSlotBooking() {
  navigateTo('page03-slot-booking.html');
}

function goBookingToken() {
  navigateTo('page04-booking-token.html');
}

function goProcurementStatus() {
  navigateTo('page05-procurement-status.html');
}

function goFinder() {
  navigateTo('page%207%20finder.html');
}

function goQueueManagement() {
  navigateTo('page8%20queue%20management.html');
}

function goNotifications() {
  navigateTo('page%209%20notification.html');
}

function goNotice() {
  navigateTo('page%2010%20notice.html');
}

function goOperationsDashboard() {
  navigateTo('operations-dashboard.html');
}

function goQueueConsole() {
  navigateTo('queue-console.html');
}

function goReportsAnalytics() {
  navigateTo('reports-analytics.html');
}

function goStaffLogin() {
  navigateTo('staff-login.html');
}

function goStatusManagement() {
  navigateTo('status-management.html');
}

function goSettings() {
  navigateTo('settings.html');
}

// Local Storage Helpers
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
}

function getData(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return defaultValue;
  }
}

function removeData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing data:', e);
    return false;
  }
}

// Date & Time Helpers
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDateTime(date) {
  return formatDate(date) + ' ' + formatTime(date);
}

// Session Management
function setSession(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error setting session:', e);
    return false;
  }
}

function getSession(key, defaultValue = null) {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error getting session:', e);
    return defaultValue;
  }
}

function clearSession() {
  try {
    sessionStorage.clear();
    return true;
  } catch (e) {
    console.error('Error clearing session:', e);
    return false;
  }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add active state to current page link
  const currentPage = window.location.pathname.split('/').pop() || 'page01-landing.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === './index.html' && currentPage === '')) {
      link.classList.add('active');
    }
  });
});
