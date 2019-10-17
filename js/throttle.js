/**
 * 时间戳方法
 * @param {回调函数} func 
 * @param {间隔时间} wait 
 */
const throttle1 = (func, wait) => {
  let previous = 0
  return (...args) => {
    let now = +new Date()
    if (now - previous > wait) {
      func(args)
      previous = now
    }
  }
}

/**
 * 定时器方法
 * @param {回调函数} func 
 * @param {间隔时间} wait 
 */
const throttle2 = (func, wait) => {
  let timeout
  let previous = 0

  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func(args)
      }, wait)
    }
  }
}

/**
 * 双剑合璧
 * 事件触发能立刻执行
 * 停止触发时再执行一次
 * @param {回调函数} func 
 * @param {间隔时间} wait 
 * @param {配置} options
 * @param {是否触发立刻执行} options - leading
 * @param {是否停止触发时再执行一次} options - trailing
 */
const throttle = (func, wait, options = {}) => {
  let timeout
  let result
  let previous = 0

  const later = (...args) => {
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    func(args)
    if (!timeout) {
      args = null
    }
  }

  const throttled = (...args) => {
    let now = +new Date()
    if (!previous && options.leading === false) {
      previous = now
    }

    let remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func(args)
      if (!timeout) {

        args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  return throttled
}