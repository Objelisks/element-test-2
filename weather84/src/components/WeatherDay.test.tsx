import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WeatherDay } from './WeatherDay'
import '@testing-library/jest-dom'

test('renders sunny day', () => {
  const day = {
    cloud_cover_mean: 15,
    precipitation_sum: 0.3,
    temperature_2m_max: 89.3,
    date: "2050-06-17",
  }

  render(<WeatherDay day={day} />)

  expect(screen.getAllByText("☀️")).toHaveLength(1)
})

test('renders rainy day', () => {
  const day = {
    cloud_cover_mean: 15,
    precipitation_sum: 2.5,
    temperature_2m_max: 89.3,
    date: "2050-06-17",
  }

  render(<WeatherDay day={day} />)

  expect(screen.getAllByText("🌧️")).toHaveLength(1)
})

test('renders cloudy day', () => {
  const day = {
    cloud_cover_mean: 55,
    precipitation_sum: 0.1,
    temperature_2m_max: 89.3,
    date: "2050-06-17",
  }

  render(<WeatherDay day={day} />)

  expect(screen.getAllByText("🌥️")).toHaveLength(1)
})

