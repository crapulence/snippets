export function debounce(
  func: Function,
  wait: number,
  immediate: boolean
): any {
  let timeout: number | null;
  let result: any;

  return (...args: any[]) => {
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