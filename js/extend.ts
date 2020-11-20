const extend = (...args) => {
  let deep = false
  let options
  let copy
  let src
  let i = 1

  let target = args[0] || {}

  if (typeof target === 'boolean') {
    deep = target
    target = args[i] || {}
    i++
  }

  if (typeof target !== 'object') {
    target = {}
  }

  for (; i < args.length; i++) {
    options = args[i]
    if (options !== null) {
      for (let key in options) {
        src = target[key]
        copy = options[key]

        if (deep && copy && typeof copy === 'object') {
          target[key] = extend(deep, src, copy)
        } else if (copy !== undefined) {
          target[key] = copy
        }
      }
    }
  }

  return target
}

console.log(extend(false, {}, { a: 1, b: { c: 2 } }, { b: { c: [5] } }))
