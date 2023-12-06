export default function ErrorMessage({message}:{message:string}){
  return(
    <div className="text-white px-2 py-1 rounded-lg bg-[rgba(255,255,255,0.2)] backdrop-blur-lg m-auto col-span-2 mt-2">{message}</div>
  )
}