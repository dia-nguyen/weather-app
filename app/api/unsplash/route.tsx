import { PhotoSizesProps, UnsplashResponse } from "@/app/lib/types";
import { NextResponse } from "next/server";

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY?.toString() || "";

/**
 * Fetch photos from Unsplash API
 */
export async function GET(request: Request) {
  // get search param for query
  const { searchParams } = new URL(request.url);

  // do any necessary sanitizing for query
  const location = searchParams.get("location") || "";

  if (!location) {
    return NextResponse.json({ error: "No Location provided" }, { status: 500 });
  }

  const city = location.split(", ").slice(0, 2).join(" ");

  try {
    const response = await fetch(UNSPLASH_URL + "?" + new URLSearchParams({
      client_id: UNSPLASH_API_KEY,
      query: `${city} city`,
    }));

    // handle err if request not successful
    if (response.status != 200) {
      return NextResponse.json({ error: "Cannot fetch photos" }, {
        status: 500,
        statusText: "Cannot fetch photos",
      });
    }

    const unsplashResponse: UnsplashResponse = (await response.json());

    // handle err if no unsplash data
    if (!unsplashResponse.results) {
      return NextResponse.json({ error: "Could not fetch photos from Unsplash" }, {
        status: unsplashResponse.status,
        statusText: unsplashResponse.statusText,
      });
    }

    const photos = {
      full: unsplashResponse.results[0].urls.full,
      regular: unsplashResponse.results[0].urls.regular
    } as PhotoSizesProps;

    return NextResponse.json(photos, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, statusText: "Internal Server Error" });
  }
}

