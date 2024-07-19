import { Dispatch } from "react"
import { GeocodingResult, Location } from "../types"

function Option({ data, setLocation }: { data: GeocodingResult, setLocation: React.Dispatch<Location | null> }) {
  let displayName = data.name
  if (data.admin1) {
    displayName += ', ' + data.admin1
  }
  return (
    <button
      onClick={() => setLocation({ displayName: displayName, latitude: data.latitude, longitude: data.longitude })}>
      {displayName}
    </button>
  )
}

export function Searchfield({ search, handleChange, setLocation, autoCompleteOptions }: {
  search: string,
  handleChange: (value: string) => void,
  setLocation: Dispatch<Location | null>,
  autoCompleteOptions: GeocodingResult[]
}) {
  return <>
    <input
      name="location_search"
      value={search}
      onChange={e => handleChange(e.target.value)}
      placeholder='"Portland" or "97214"'
    />
    {<ul className="location-list">{autoCompleteOptions.map(opt => <Option key={opt.id} data={opt} setLocation={setLocation} />)}</ul>}
  </>
}
