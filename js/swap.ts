export function swap<T>(arr: T[], indexA: number, indexB: number): void {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
}