import React, { createContext, useState, useEffect } from 'react'
import { getAuth } from '../util/apiHelper'

type ContextType = {
  isAuth: boolean | null
  setIsAuth: (state: boolean) => void
  getAuthStatus: () => Promise<void>
}

export const AuthContext = createContext<ContextType>({} as ContextType)

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [auth, setAuth] = useState<boolean | null>(null)

  const getAuthStatus = async (): Promise<void> => {
    return getAuth().then((retauth) => {
      setAuth(retauth)
    })
  }

  useEffect(() => {
    getAuthStatus()
  }, [])

  const setIsAuth = (state: boolean): void => {
    setAuth(state)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: auth,
        setIsAuth,
        getAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
