import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ApplicationsProvider } from "@/lib/applications-context"
import { Suspense } from "react"
// Analytics comentado temporalmente para compatibilidad con Netlify
// import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "University Student Relations",
  description: "Access university events, services, scholarships, and benefits",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <ApplicationsProvider>{children}</ApplicationsProvider>
          </AuthProvider>
        </Suspense>
        {/* Analytics comentado para Netlify - descomentar si usas Vercel */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
