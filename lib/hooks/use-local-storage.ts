/**
 * useLocalStorage
 *
 * This hook retrieves a value from localStorage and saves it to state.
 * It also saves any changes to the state back to localStorage.
 *
 * It takes two arguments:
 *   key: the key to store the value under in localStorage
 *   initialValue: the initial value to use if the key isn't present in localStorage
 *
 * It returns an array of two values:
 *   The first is the current value of the state
 *   The second is a function that can be used to update the state
 *
 * The function returned by this hook will save the new value to state
 * and also save it to localStorage
 */

import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string, // the key to store the value under in localStorage
  initialValue: T // the initial value to use if the key isn't present in localStorage
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue) // set the initial state to the initialValue

  // On mount, check localStorage for a value with the given key
  useEffect(() => {
    const item = window.localStorage.getItem(key) // get the item from localStorage
    if (item) {
      // if the item is present, parse it from JSON and set it as the state
      setStoredValue(JSON.parse(item))
    }
  }, [key]) // only run this effect when the key changes

  // this function will be returned as the second item in the array
  const setValue = (value: T) => {
    // set the state to the new value
    setStoredValue(value)
    // save the new value to localStorage
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // return an array of the current state and the function to update the state
  return [storedValue, setValue]
}


