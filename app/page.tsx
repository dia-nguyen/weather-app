import { useEffect, useState } from "react";
import { GET } from "./api/weather/weather";
import Weather from "@/components/Weather";

export default async function Home() {
  return (
    <main >
      <Weather/>
    </main>
  )
}
