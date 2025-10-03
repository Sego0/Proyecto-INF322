"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  studentId: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, studentId: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("university_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    const storedUsers = localStorage.getItem("university_users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("university_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const signup = async (email: string, password: string, name: string, studentId: string): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    const storedUsers = localStorage.getItem("university_users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
      studentId,
    }

    users.push(newUser)
    localStorage.setItem("university_users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("university_user", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("university_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
