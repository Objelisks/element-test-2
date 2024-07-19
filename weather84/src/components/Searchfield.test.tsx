import { expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Searchfield } from './Searchfield'

test('renders sunny day', () => {
  const options = [
    { id: 1, name: "portland", admin1: "oregon", latitude: 25.5432, longitude: 123.5431 }
  ]
  const mockChange = vi.fn()
  const mockLocation = vi.fn()

  render(<Searchfield search={"portland"} handleChange={mockChange} setLocation={mockLocation} autoCompleteOptions={options} />)

  const button = screen.getByText("portland, oregon")
  expect(button).toBeTruthy()

  fireEvent.click(button)

  expect(mockLocation).toHaveBeenCalledOnce()
})
