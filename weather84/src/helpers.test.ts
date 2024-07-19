import { expect, test, vi } from 'vitest'
import { debounce } from './helpers'

test('debounces single call', () => {
  vi.useFakeTimers()

  const mockFn = vi.fn(() => 10)
  const debouncedFunc = debounce(mockFn, 500)
  debouncedFunc()

  vi.runAllTimers()

  expect(mockFn).toHaveBeenCalledOnce()
  expect(mockFn).toHaveReturnedWith(10)

  vi.useRealTimers()
})

test('debounces multiple calls', () => {
  vi.useFakeTimers()

  const mockFn = vi.fn(() => 10)
  const debouncedFunc = debounce(mockFn, 500)
  debouncedFunc()
  debouncedFunc()
  debouncedFunc()

  vi.runAllTimers()

  expect(mockFn).toHaveBeenCalledOnce()
  expect(mockFn).toHaveReturnedWith(10)

  debouncedFunc()
  debouncedFunc()
  debouncedFunc()
  
  vi.runAllTimers()

  expect(mockFn).toHaveBeenCalledTimes(2)
  expect(mockFn).toHaveReturnedWith(10)

  vi.useRealTimers()
})