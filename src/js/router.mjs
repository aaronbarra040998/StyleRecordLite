class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.resolve());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    // Separate route from query params (e.g. /login?role=professional → /login)
    const [path] = hash.split('?');
    const handler = this.routes[path] || this.routes['*'];
    if (handler) handler();
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = '/home';
    } else {
      this.resolve();
    }
  }
}

export function createRouter() {
  return new Router();
}

/**
 * Utility function to navigate to a route from anywhere.
 * @param {string} hash - route to navigate to (e.g. '/login', '/professional')
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}