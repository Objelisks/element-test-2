export type Location = {displayName: string, latitude: number, longitude: number}

export type HourlyLocationData = {
  hourly: {
    temperature_2m: number[]
  }
}

export type DailyLocationData = {
  daily: {
    cloud_cover_mean: number[],
    precipitation_sum: number[],
    temperature_2m_max: number[],
    time: string[],
  }
}

export type WeatherDayData = {
  cloud_cover_mean: number,
  precipitation_sum: number,
  temperature_2m_max: number,
  date: string,
}

export type GeocodingResult = {id: number, name: string, admin1: string, latitude: number, longitude: number}