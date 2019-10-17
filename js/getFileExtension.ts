export function getFileExtension(filename: string): string {
	return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

console.log(getFileExtension('index.html'))
