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
    // Separar la ruta de los query params (ej: /login?role=professional → /login)
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
 * Función utilitaria para navegar a una ruta desde cualquier lugar.
 * @param {string} hash - ruta a la que navegar (ej. '/login', '/professional')
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}