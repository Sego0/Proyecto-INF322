"use client"

import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { scholarships } from "@/lib/scholarships-data"
import { useAuth } from "@/lib/auth-context"
import { DollarSign, Calendar, Award, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ScholarshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const scholarship = scholarships.find((s) => s.id === params.id)

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Scholarship Not Found</h1>
          <Link href="/scholarships">
            <Button>Back to Scholarships</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link href="/scholarships">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a becas
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-3xl text-balance">{scholarship.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {scholarship.category}
                  </Badge>
                </div>
                <CardDescription className="text-base leading-relaxed">{scholarship.description}</CardDescription>
              </CardHeader>
            </Card>

            {/* Eligibility Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requerimientos optativos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requerimientos de postulacion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full border-2 border-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Beneficios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha límite de solicitud</p>
                    <p className="font-semibold text-foreground">{scholarship.deadline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Action */}
            <Card>
              <CardContent className="pt-6">
                {user ? (
                  <div className="space-y-4">
                    <Link href={`/apply/${scholarship.id}`}>
                      <Button className="w-full" size="lg">
                        <Award className="h-4 w-4 mr-2" />
                        Postular ahora
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                      Tu postulacion sera guardada y podras seguir su progreso
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Debes iniciar sesion para postular</AlertDescription>
                    </Alert>
                    <Link href="/login">
                      <Button className="w-full" size="lg">
                        Ingresar para postular
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-primary hover:underline">
                        Sign up
                      </Link>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Need Assistance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our financial aid team is here to help with your application.
                </p>
                <Link href="/services">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Financial Aid
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
