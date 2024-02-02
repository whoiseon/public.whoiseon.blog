export async function uploadImage(file: File) {
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: file,
  });
  return await response.json();
}
