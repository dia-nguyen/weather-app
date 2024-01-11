import { PhotoSizesProps, UnsplashResponse } from "@/app/lib/types";
import { NextResponse } from "next/server";

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_API_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Fetch photos from Unsplash API
 */
export async function GET(request: Request) {
  // get search param for query
  const {searchParams } = new URL(request.url);

  // do any necessary sanitizing for query
  const location = searchParams.get("location") || "";

  const city = location.split(", ").slice(0,2).join(" ");

  try {
    const response = await fetch(UNSPLASH_URL + "?" + new URLSearchParams({
      client_id: UNSPLASH_API_KEY,
      query: `${city} city`,
    }));

    const unsplashResponse: UnsplashResponse = (await response.json());

    console.log('unsplashResponse',unsplashResponse);
    const photos = {
      full: unsplashResponse.results[0].urls.full,
      regular: unsplashResponse.results[0].urls.regular
    } as PhotoSizesProps

    return NextResponse.json(photos, {
      status: 200
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

