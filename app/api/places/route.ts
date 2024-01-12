import { NextResponse } from "next/server";
import { LocationProps, PlacesPredictionProps, PlacesResponse } from "@/app/lib/types";
const PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const PLACES_API_KEY = process.env.PLACES_API_KEY?.toString() || "";

/**
 * Predicts and returns list of locations based on user input
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // parse location from search params
  const query = searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ error: "Places: No query provided" }, { status: 500 });
  }

  try {
    const response = await fetch(PLACES_API_URL + "?" + new URLSearchParams({
      input: query,
      language: "en",
      types: "(cities)",
      key: PLACES_API_KEY,
    }));

    if (response.status != 200) {
      return NextResponse.json({ error: "Places: Could not fetch places"}, { status: 500 });
    }

    const placesResponse: PlacesResponse = (await response.json());

    //TODO: deal with places status != 200

    // build list of locations
    const locations = placesResponse.predictions.map((prediction: PlacesPredictionProps) => ({
      id: prediction.place_id,
      city: prediction.description
    })) as LocationProps[];

    return NextResponse.json(locations, {
      status: 200,
    });

  } catch (error) {
    // return server error
    return NextResponse.json({ error: "Places: Internal Server Error" }, { status: 500 });
  }

}

