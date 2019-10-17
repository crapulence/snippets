const debounce = (func, wait, immediate) => {
  let timeout
  let result

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)

      if (callNow) {
        result = func.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
    return result
  }
}