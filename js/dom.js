const dom = {
  on: function (element, eventType, selector, callback) {
    element.addEventListener(eventType, e => {
      let target = e.target
      while (!target.matches(selector)) {
        if (element === target) {
          target = null
          break
        }
        target = target.parentNode
      }
      target && callback.call(target, e, target)
    })
    return element
  },

  onSwipe: function (element, callback) {
    let x0, y0
    element.addEventListener('touchstart', e => {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    })
    element.addEventListener('touchmove', e => {
      if (!x0 || !y0) {
        return
      }
      let xDiff = e.touches[0].clientX - x0
      let yDiff = e.touches[0].clientY - y0

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          callback.call(element, e, 'right')
        } else {
          callback.call(element, e, 'left')
        }
      } else {
        if (yDiff > 0) {
          callback.call(element, e, 'down')
        } else {
          callback.call(element, e, 'up')
        }
      }
      x0 = undefined
      y0 = undefined
    })
  }
}