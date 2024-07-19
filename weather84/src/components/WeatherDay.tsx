import { WeatherDayData } from "../types"

const classifyWeather = (day: WeatherDayData) => {
  if (day.precipitation_sum > 0.5) {
    return "🌧️"
  }
  if (day.cloud_cover_mean > 75) {
    return "☁️"
  }
  if (day.cloud_cover_mean > 50) {
    return "🌥️"
  }
  if (day.cloud_cover_mean > 25) {
    return "🌤️"
  }
  return "☀️"
}

export function WeatherDay({ day }: { day: WeatherDayData }) {
  const date = new Date(day.date)
  const weekday = date.toDateString().split(' ')[0]
  const monthDay = `${date.getMonth()}/${date.getDate()}`
  return (<div className='weather-day'>
    <div>{weekday}</div>
    <div>{monthDay}</div>
    <div>{classifyWeather(day)}</div>
    <div>{day.temperature_2m_max}</div>
  </div>)
}
