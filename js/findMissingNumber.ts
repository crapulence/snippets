/**
 * 找出数组中缺失的数字
 * @param {Array} nums
 */
export function findMissingNumber(nums: number[]) {
  return Array.from(Array(Math.max(...nums)).keys())
    .map((_, i) => (nums.indexOf(i) < 0 ? i : null))
    .filter((f) => f);
}
