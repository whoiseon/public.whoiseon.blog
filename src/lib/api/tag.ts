export async function getTags() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/tag`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
