export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

export function showError(message) {
  showToast(message, 'error');
}

export function showSuccess(message) {
  showToast(message, 'success');
}