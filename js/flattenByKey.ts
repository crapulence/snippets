export function flattenByKey<T>(arr: T[], key: string): T[] {
  return arr.reduce((pre, cur) => {
    if (!Array.isArray(cur[key]) || !cur[key].length) {
      return [...pre, cur];
    } else {
      return [...pre, ...flattenByKey(cur[key], key)];
    }
  }, []);
}
