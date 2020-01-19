export function isNumber(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value);
}

export function average(array: number[]): number {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
}

export function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
