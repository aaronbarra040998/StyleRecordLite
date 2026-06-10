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
    const handler = this.routes[hash] || this.routes['*'];
    if (handler) handler();
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = '/login';
    } else {
      this.resolve();
    }
  }
}

export function createRouter() {
  return new Router();
}

export function navigateTo(hash) {
  window.location.hash = hash;
}