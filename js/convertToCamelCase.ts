export function convertToCamelCase(path: string) {
  const regex = /\/([^/]+)\.vue$/;
  const match = regex.exec(path);

  if (match) {
    const fileName = match[1];
    const camelCaseName = fileName
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toUpperCase() : word.toLowerCase();
      })
      .replace(/\s+/g, '');

    return path.replace(fileName, camelCaseName);
  }

  return path;
}
