import LocationAutocomplete from "./LocationAutocomplete";
import LocationUpdater from "./LocationUpdater";
import TempUnitUpdater from "./TempUnitUpdater";

export default function UserSettings(){
  return (
    <div className="flex gap-2 text-white col-span-2 text-center place-self-center mt-4">
      <TempUnitUpdater/>
      <LocationUpdater/>
      {/* <LocationAutocomplete/> */}
    </div>
  )
}