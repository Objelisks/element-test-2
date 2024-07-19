import { Dispatch, useState } from "react"
import type { GeocodingResult, Location } from "../types"
import { debounce } from "../helpers"
import { Searchfield } from "../components/Searchfield"

const fetchGeocodingResults = async (search: string) => {
  return await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=4&language=en&format=json`).then(res => res.json())
}

export default function Home({ setLocation }: { setLocation: Dispatch<Location | null> }) {
  const [autoCompleteList, setAutoCompleteList] = useState<GeocodingResult[]>([])
  const [search, setSearch] = useState("")

  // calls the geocoding api at most every 300ms
  const updateAutocomplete = debounce((value) => {
    fetchGeocodingResults(value).then((data: { results: GeocodingResult[] }) => {
      if (data.results) {
        setAutoCompleteList(data.results)
      } else {
        setAutoCompleteList([])
      }
    })
  }, 300)

  const handleChange = (value: string) => {
    setSearch(value)
    updateAutocomplete(value)
  }

  return (
    <>
      <p>what's the weather going to be like in</p>
      <Searchfield search={search} handleChange={handleChange} setLocation={setLocation} autoCompleteOptions={autoCompleteList} />
    </>
  )
}