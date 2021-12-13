import { useState } from "react"

export const useLocalStorage = (key, initialValue) => {

  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem(key)) {
      return (JSON.parse(localStorage.getItem(key)))
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue))
      return (initialValue)
    }
  })

  const setStoredValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setDarkMode(value)
  }
  return [darkMode, setStoredValue]
}
