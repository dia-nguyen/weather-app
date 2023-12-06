"use client";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

export async function fetchPhotos(query: string) {
  if (query) {
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(`${query} cityscape`)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There's been a problem. Code: ${response.status}`);
    }

    return await response.json();
  } else {
    throw new Error("Query parameter is missing");
  }
}
