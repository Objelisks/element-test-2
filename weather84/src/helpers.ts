/**
 * Returns a function that, when called, only actually executes at most once over a period of time.
 * The first execution will occur after the delay, with the parameters of the latest call.
 */
export const debounce = (func: (...any: any[]) => any, delay: number) => {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
