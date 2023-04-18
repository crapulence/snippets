/**
 * break lines
 * from https://antfu.me/posts/break-lines-in-js
 * @param text
 * @param limit
 * @returns
 */
export function getBreakLines(text: string, limit: number) {
  const pattern = new RegExp(`(.{0,${limit}})(?:\\s|$)`, 'g');

  return text.split(pattern).filter(Boolean);
}

/**
 * @example
 */
const text = 'A quick brown fox jumps over the lazy dog.';
console.log(getBreakLines(text, 16)); // ['A quick brown', 'fox jumps over', 'the lazy dog.']
