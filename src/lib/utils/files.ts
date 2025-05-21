export function fetchImageAsFile(imageUrl: string) {
  return fetch(imageUrl, {}).then(async (response) => {
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const file = new File([blob], imageUrl.split("/").pop() || imageUrl, { type: contentType || undefined });
    file.preview = URL.createObjectURL(blob);
    return file;
  });
}

declare global {
  interface File {
    preview?: string;
  }
}
