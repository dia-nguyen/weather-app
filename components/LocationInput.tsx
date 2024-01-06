"use client"
import { useState } from "react";

interface LocationInputProps {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function OldLocationInput({handleClick}: LocationInputProps) {
  const [query, setQuery] = useState("");
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      handleClick(query);
    }}
    className="w-full">
      <input className="border block text-black text-sm px-3 py-1" value={query} onChange={((event) => setQuery(event.target.value))}/>
      <button type="submit" placeholder="location" className="border block w-full bg-blue-500 text-white border-blue-500 px-3 py-1 text-sm">Update Location</button>
    </form>
  )
}