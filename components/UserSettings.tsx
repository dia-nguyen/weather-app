import LocationUpdater from "./LocationUpdater";
import UnitToggle from "./UnitToggle";

/**
 * UserSettings Component
 *
 * Renders user settings related components such as unit toggle and location updater
 */
export default function UserSettings(){
  return (
    <div className="flex gap-2 text-white col-span-2 text-center place-self-center mt-4">
      <UnitToggle/>
      <LocationUpdater/>
    </div>
  )
}