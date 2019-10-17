(function () {
  function Flexible(baseSize, baseWidth) {
    this.baseSize = 16 || baseSize
    this.baseWidth = 375 || baseWidth
    this.htmlElement = document.querySelector('html')
    this.delay = 100
    this.init()
  }

  Flexible.prototype = {

    init: function () {
      var self = this
      window.addEventListener('onload', this.calcWidth())
      window.addEventListener('resize', this.throttle(this.calcWidth.bind(this), this.delay))
    },

    /**
     * 节流函数
     * @params Function callback - 延迟执行的回调函数
     * @params Number delay - 延迟执行多长时间
     */
    throttle: function (callback, delay) {
      var timer = null
      return function () {
        clearTimeout(timer)
        timer = setTimeout(callback, delay)
      }
    },

    calcWidth: function () {
      var winWidth = document.documentElement.clientWidth
      var rootSize = (winWidth / this.baseWidth * this.baseSize).toFixed(2) + 'px'
      this.htmlElement.style.fontSize = rootSize
    }
  }
}())