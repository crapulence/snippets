class Router {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
  }

  // storage update callback routes
  route(path, callback) {
    this.routes[path] = callback || function () {}
  }

  // change event
  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }

  // listen browser url hash change event
  init() {
    window.addEventListener('load', this.refresh.bind(this), false)
    window.addEventListener('hashchange', this.refresh.bind(this), false)
  }
}

window.Router = new Router()
window.Router.init()

// demo
// Router.route('/test', () => {
//   console.log('test')
// })
