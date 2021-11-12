type Data = File | Blob | MediaSource;

/**
 * 获取文件流下载
 * @param data 数据
 * @param name 名称
 */
export function getFileStream(data: Data, name: string): void {
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(data);
  link.download = name;
  link.click();
  window.URL.revokeObjectURL(link.href);
}
