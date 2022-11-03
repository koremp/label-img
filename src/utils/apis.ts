const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos/';

export const fetchPhotoInfoById = async (id: number) => {
  const res = await fetch(`${PHOTOS_URL}${id}`);

  if (!res.ok) {
    throw new Error(`fetchPhotoInfoById Error! id: ${id}`);
  }

  return res.json();
}