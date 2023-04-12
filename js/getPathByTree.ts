export function getPathByTree(tree: any[], fn: Function, path: any[] = []) {
  if (!tree) {
    return [];
  }

  for (const data of tree) {
    path.push(data);
    if (fn(data)) {
      return path;
    }
    if (data.children) {
      const findChildren = getPathByTree(data.children, fn, path);
      if ((findChildren as any[]).length) {
        return findChildren;
      }
    }
    path.pop();
  }
  return [];
}

/**
 * 支持多个顶级树的路径搜索
 * @param trees
 * @param fn
 * @param path
 * @param results
 * @returns
 *
 * @example
 * const data = [{label: 'a', value: 1, children: [{label: 'a-1', value: 2}]}, {label: 'a', value: 1, children: [{label: 'a-2', value: 2}]}]
 * const results = getPathByTrees(data, (item: any) => item.label === 'a')
 * @returns
 * [
 *   [ { label: 'a', value: 1, children: [Array] } ],
 *   [ { label: 'a', value: 1, children: [Array] } ]
 * ]
 */
export function getPathByTrees(
  trees: any[],
  fn: (data: any) => any,
  path: any[] = [],
  results: any[] = []
) {
  if (!trees || !trees.length) {
    return results;
  }

  for (const tree of trees) {
    path.push(tree);
    if (fn(tree)) {
      results.push([...path]);
    }
    if (tree.children) {
      getPathByTrees(tree.children, fn, path, results);
    }
    path.pop();
  }
  return results;
}
