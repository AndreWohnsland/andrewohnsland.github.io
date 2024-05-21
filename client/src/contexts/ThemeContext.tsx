import React, { createContext, useEffect, useState } from 'react'

type ContextType = {
  isLightTheme: boolean
  toggleTheme: () => void
  setTheme: (theme: boolean) => void
  cacheTheme: (lightTheme: boolean) => void
  getCachedTheme: () => boolean
}

export const ThemeContext = createContext<ContextType>({} as ContextType)

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [lighttheme, setLighttheme] = useState<boolean>(true)

  const getCachedTheme = (): boolean => {
    const userTheme = localStorage.getItem('theme')
    let useLightTheme = true
    if (userTheme !== null) {
      useLightTheme = userTheme === 'light'
    }
    return useLightTheme
  }

  useEffect(() => {
    setLighttheme(getCachedTheme())
  }, [])

  const cacheTheme = (lightTheme: boolean): void => {
    const saveTheme = lightTheme ? 'light' : 'dark'
    localStorage.setItem('theme', saveTheme)
  }

  const toggleTheme = (): void => {
    setLighttheme(!lighttheme)
  }

  const setTheme = (theme: boolean): void => {
    setLighttheme(theme)
    cacheTheme(theme)
  }

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme: lighttheme,
        toggleTheme,
        setTheme,
        cacheTheme,
        getCachedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
