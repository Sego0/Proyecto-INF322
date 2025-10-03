"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

export interface Application {
  id: string
  scholarshipId: string
  scholarshipTitle: string
  userId: string
  status: "draft" | "submitted" | "under-review" | "approved" | "rejected"
  submittedAt?: string
  updatedAt: string
  data: {
    personalStatement: string
    academicGoals: string
    financialNeed?: string
    additionalInfo?: string
  }
  documents: {
    transcript?: boolean
    recommendation1?: boolean
    recommendation2?: boolean
    resume?: boolean
  }
}

interface ApplicationsContextType {
  applications: Application[]
  createApplication: (scholarshipId: string, scholarshipTitle: string) => string
  updateApplication: (id: string, data: Partial<Application>) => void
  submitApplication: (id: string) => void
  getApplication: (id: string) => Application | undefined
  getApplicationByScholarship: (scholarshipId: string) => Application | undefined
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined)

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const storedApplications = localStorage.getItem(`applications_${user.id}`)
      if (storedApplications) {
        setApplications(JSON.parse(storedApplications))
      }
    } else {
      setApplications([])
    }
  }, [user])

  const saveApplications = (apps: Application[]) => {
    if (user) {
      localStorage.setItem(`applications_${user.id}`, JSON.stringify(apps))
      setApplications(apps)
    }
  }

  const createApplication = (scholarshipId: string, scholarshipTitle: string): string => {
    if (!user) throw new Error("User must be logged in")

    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      scholarshipId,
      scholarshipTitle,
      userId: user.id,
      status: "draft",
      updatedAt: new Date().toISOString(),
      data: {
        personalStatement: "",
        academicGoals: "",
        financialNeed: "",
        additionalInfo: "",
      },
      documents: {},
    }

    const updatedApplications = [...applications, newApplication]
    saveApplications(updatedApplications)
    return newApplication.id
  }

  const updateApplication = (id: string, data: Partial<Application>) => {
    const updatedApplications = applications.map((app) =>
      app.id === id
        ? {
            ...app,
            ...data,
            updatedAt: new Date().toISOString(),
          }
        : app,
    )
    saveApplications(updatedApplications)
  }

  const submitApplication = (id: string) => {
    const updatedApplications = applications.map((app) =>
      app.id === id
        ? {
            ...app,
            status: "submitted" as const,
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : app,
    )
    saveApplications(updatedApplications)
  }

  const getApplication = (id: string) => {
    return applications.find((app) => app.id === id)
  }

  const getApplicationByScholarship = (scholarshipId: string) => {
    return applications.find((app) => app.scholarshipId === scholarshipId && app.userId === user?.id)
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        createApplication,
        updateApplication,
        submitApplication,
        getApplication,
        getApplicationByScholarship,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  )
}

export function useApplications() {
  const context = useContext(ApplicationsContext)
  if (context === undefined) {
    throw new Error("useApplications must be used within an ApplicationsProvider")
  }
  return context
}
