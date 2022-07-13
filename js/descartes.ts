export function descartes(groups: Array<any[]>) {
  return groups.reduce((a, b) => a.flatMap((x) => b.map((y) => [...x, y])), [[]]);
}

// demo
descartes([
  ['男裤', '女裤'],
  ['黑色', '白色'],
  ['S', 'L'],
]);
