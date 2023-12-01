"use client"
import { useState } from "react";

interface LocationInputProps {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function LocationInput({handleClick}: LocationInputProps) {
  const [query, setQuery] = useState("");
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      handleClick(query);
    }}>
      <input className="border p-2 w-[200px] text-black" value={query} onChange={((event) => setQuery(event.target.value))}/>
      <button type="submit" className="border bg-blue-500 text-white p-2 border-blue-500">Update</button>
    </form>
  )
}