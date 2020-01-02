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
