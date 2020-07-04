export default function replaceTree(tree: any[]): any[] {
  const data: any[] = [];
  for (const item of tree) {
    if (item.children.length > 0) {
      item.children = replaceTree(item.children);
    }
    let param = {
      value: item.id,
      label: item.name,
      children: item.children,
    };
    data.push(param);
  }
  return data;
}
