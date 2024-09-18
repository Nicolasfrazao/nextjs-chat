import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

/**
 * Make a request to the given URL and return the JSON response.
 *
 * If the response is not a 200-299 status code, throw an error.
 * If the response is a JSON object with an "error" property, extract
 * that error and throw it. Otherwise, throw a generic error.
 *
 * @param {RequestInfo} input - The URL to request. This can be a
 * string URL, a URL object, or a Request object.
 * @param {RequestInit} [init] - An object containing options for
 * the request. See the Fetch API documentation for more information.
 * @returns {Promise<JSON>} A promise that resolves to the JSON
 * response from the server.
 */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  // Make the request. The Fetch API will throw an error if the
  // request fails, so we don't need to do any error handling here.
  const res = await fetch(input, init)

  // If the response was successful (i.e. the status code is 200-299),
  // return the JSON response.
  if (res.ok) {
    return res.json()
  }

  // If the response was not successful, read the response JSON. This
  // will throw an error if the response is not a JSON object, so we
  // don't need to do any error handling here.
  const json = await res.json()

  // If the response JSON has an "error" property, throw that error.
  // Otherwise, throw a generic error.
  if (json.error) {
    const error = new Error(json.error) as Error & {
      status: number
    }
    error.status = res.status
    throw error
  } else {
    throw new Error('An unexpected error occurred')
  }
}

/**
 * Format a date as a string in the format of "Month Day, Year",
 * where "Month" is the full month name (e.g. "January"),
 * "Day" is the day of the month (e.g. "12"), and "Year" is the
 * full year (e.g. "2023").
 *
 * @param {string|number|Date} input - The date to format. This can be
 * a string in the format of "YYYY-MM-DD", a number of milliseconds
 * since the Unix epoch, or a Date object.
 * @returns {string} The formatted date string.
 */
export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  // We're using the `toLocaleDateString` method to format the date.
  // This method takes two arguments: the locale to use for formatting
  // the date, and an options object that specifies the format of the
  // date. The locale is "en-US", which means that the date will be
  // formatted in the way that is typical for the United States. The
  // options object is an object with the following properties:
  //
  // - month: 'long' - This specifies that the month should be
  //   formatted as a full month name (e.g. "January" instead of
  //   "Jan" or "1").
  //
  // - day: 'numeric' - This specifies that the day of the month
  //   should be formatted as a number (e.g. "12" instead of "12th").
  //
  // - year: 'numeric' - This specifies that the year should be
  //   formatted as a full year (e.g. "2023" instead of "23").
  //
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}


