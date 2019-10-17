/**
 * 获取数组中的最大值
 * @param arr 数字数组
 */
export function getMax(arr: Array<number>): number {
  return Math.max.call(Math, arr)
}

/**
 * 获取数组中的最小值
 * @param arr 数字数组
 */
export function getMin(arr: Array<number>): number {
  return Math.min.call(Math, arr)
}

/**
 * 从数组中随机抽取数值
 * @param arr 数组
 */
export function takeFromArray<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 获取鼠标进出方向
 * @param event 鼠标事件
 * @param el HTML 元素
 */
enum Direction {
  top,
  right,
  bottom,
  left,
}
export function getDirection(event: MouseEvent, el: HTMLElement): string {
  const w = el.offsetWidth
  const h = el.offsetHeight
  const x = (event.pageX - el.offsetLeft - (w / 2) * (w > h ? (h / w) : 1))
  const y = (event.pageY - el.offsetTop - (h / 2) * (h > w ? (w / h) : 1))

  return Direction[Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4]
}

/**
 * 数据是否合法
 * @param {any} v 值
 */
export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}

/**
 * 是否为真
 * @param {any} v 值
 */
export function isTrue(v: any): boolean {
  return v === true
}

/**
 * 是否为假
 * @param {any} v 值
 */
export function isFalse(v: any): boolean {
  return v === false
}

/**
 * 抛硬币随机正反面
 */
export function coinToss(): string {
  return (Math.floor(Math.random() * 2) === 0) ? '正面' : '反面'
}
