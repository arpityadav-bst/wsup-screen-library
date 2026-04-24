'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface AuthContextValue {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  setIsLoggedIn: (v: boolean) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => setIsLoggedIn(false), [])
  const value = useMemo(() => ({ isLoggedIn, login, logout, setIsLoggedIn }), [isLoggedIn, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
