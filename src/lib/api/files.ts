export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
  });
  return await response.json();
}
