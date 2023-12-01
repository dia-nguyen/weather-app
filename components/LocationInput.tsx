"use client"
import { useState } from "react";

export default function LocationInput({handleClick}) {
  const [query, setQuery] = useState("");
  return (
    <>
      <input className="border p-2 w-[200px] text-black" value={query} onChange={((event) => setQuery(event.target.value))}/>
      <button className="border bg-blue-500 text-white p-2 border-blue-500" onClick={()=>handleClick(query)}>Update</button>
    </>
  )
}