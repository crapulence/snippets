/**
 * 检查元素是否在屏幕内
 * @param dom
 * @param {int} preload
 * @return {boolean}
 */
export function checkInView(dom) {
  const rect = dom.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  )
}
