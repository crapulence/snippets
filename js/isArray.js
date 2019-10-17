/**
 * ES5
 * @param {Array} array 
 */
export function isArray (array) {
  return Object.prototype.toString(array) === '[Object Array]'
}

/**
 * ES6
 * @param {Array} array 
 */
export function isArray(array) {
  return Array.isArray(array)
}
