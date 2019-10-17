import { swap } from './swap'

export function shuffle<T>(arr: T[]): T[] {
  arr.forEach((_: T, index: number) => {
    if (index > 0) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      swap(arr, index, randomIndex)
    }
  })

  return arr
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7]))
