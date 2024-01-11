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
  const location = searchParams.get("location") || "";

  // sanitize location
  const sanitizedLocation = encodeURI(location) || "";

  if (!location) {
    return NextResponse.json({ error: "No Location provided" }, { status: 400 });
  }

  try{
    const response = await fetch( PLACES_API_URL + "?" + new URLSearchParams({
      input: sanitizedLocation,
      language: "en",
      types: "(cities)",
      key: PLACES_API_KEY,
    }));

    const placesResponse: PlacesResponse = (await response.json());

    //TODO: deal with places status != 200

    // build list of locations
    const locations = placesResponse.predictions.map((prediction: PlacesPredictionProps) => ({
       id: prediction.place_id,
       city: prediction.description
      })) as LocationProps[];

    return NextResponse.json(locations,{
      status: 200,
    });

  } catch (error) {
    // return server error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

