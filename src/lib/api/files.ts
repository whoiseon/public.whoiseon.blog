export async function uploadImage(file: File, isThumbnail?: boolean) {
  const response = await fetch('https://imslow.me/api/files/upload', {
    method: 'POST',
    body: JSON.stringify({
      file,
      isThumbnail,
    }),
  });
  return await response.json();
}
