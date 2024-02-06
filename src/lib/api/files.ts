export async function uploadImage(file: File, isThumbnail?: boolean) {
  const formData = new FormData();
  formData.append('file', file);

  if (isThumbnail) {
    formData.append('isThumbnail', isThumbnail.toString());
  }

  const response = await fetch('https://imslow.me/api/files/upload', {
    method: 'POST',
    body: formData,
  });
  return await response.json();
}
