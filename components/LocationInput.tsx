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
    }}
    className="w-full flex">
      <input className="border w-full text-black text-sm px-3 py-1 flex-grow-1  rounded-tl-full rounded-bl-full" value={query} onChange={((event) => setQuery(event.target.value))}/>
      <button type="submit" placeholder="location" className="border bg-blue-500 text-white border-blue-500 px-3 py-1 text-sm rounded-tr-full rounded-br-full">Update</button>
    </form>
  )
}