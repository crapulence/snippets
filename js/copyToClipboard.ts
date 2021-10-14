export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

copyToClipboard('Hello World');
