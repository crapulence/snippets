/**
 * 确保数字在定义范围内
 */
export function ensureNumberInRange(
  num: number,
  min: number,
  max: number
): number {
  if (isNaN(num) || num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}
