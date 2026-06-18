/**
 * Displays a toast notification on the screen.
 * @param {string} message - The message to display.
 * @param {'info'|'error'|'success'} type - Type of toast (defaults to 'info').
 */
export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  // Automatically remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

/**
 * Shows an error toast.
 * @param {string} message - Error message to display.
 */
export function showError(message) {
  showToast(message, 'error');
}

/**
 * Shows a success toast.
 * @param {string} message - Success message to display.
 */
export function showSuccess(message) {
  showToast(message, 'success');
}