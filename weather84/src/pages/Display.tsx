import './Display.css'
import { useEffect, useState } from "react"
import type { DailyLocationData, Location, WeatherDayData } from '../types'
import { WeatherDay } from '../components/WeatherDay'

//const regularForecastEndpoint = (latitude: number, longitude: number) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
const climateChangeEndpoint = (latitude: number, longitude: number, fromDate: string, toDate: string) => `https://climate-api.open-meteo.com/v1/climate?latitude=${latitude}&longitude=${longitude}&start_date=${fromDate}&end_date=${toDate}&models=NICAM16_8S&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&daily=temperature_2m_max,cloud_cover_mean,precipitation_sum`

export default function Display({ location, setLocation }: { location: Location, setLocation: React.Dispatch<Location | null> }) {
  const [locationData, setLocationData] = useState<DailyLocationData | null>(null)

  useEffect(() => {
    const when = new Date()
    when.setFullYear(2050)
    const futureDateString = when.toISOString().split('T')[0]
    when.setDate(when.getDate() + 4)
    const futureDateStringPlusFiveDays = when.toISOString().split('T')[0]

    fetch(climateChangeEndpoint(location.latitude, location.longitude, futureDateString, futureDateStringPlusFiveDays))
      .then(res => res.json())
      .then(data => setLocationData(data))
  }, [location])

  let dailyData: WeatherDayData[] | undefined = undefined
  if (locationData) {
    dailyData = locationData.daily.time.map((date, index) => ({
      date,
      cloud_cover_mean: locationData.daily.cloud_cover_mean[index],
      precipitation_sum: locationData.daily.precipitation_sum[index],
      temperature_2m_max: locationData.daily.temperature_2m_max[index],
    }))
  }

  return (
    <div className='content'>
      <h2>The weather in {location.displayName} in the year 2050...</h2>
      <button className='return' onClick={() => setLocation(null)}>go back</button>
      <div className='weather-days'>
        {dailyData && dailyData.map(day => <WeatherDay key={day.date} day={day} />)}
      </div>
      <p>based on the climate change model <a href="https://gmd.copernicus.org/articles/14/795/2021/">NICAM16_8S</a> from Japan</p>
    </div>
  )
}