"use client"

import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useApplications } from "@/lib/applications-context"
import { ArrowLeft, Calendar, CheckCircle, FileText, User } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const statusConfig = {
  draft: {
    label: "Draft",
    color: "bg-muted text-muted-foreground",
  },
  submitted: {
    label: "Submitted",
    color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  "under-review": {
    label: "Under Review",
    color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  approved: {
    label: "Approved",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  rejected: {
    label: "Not Selected",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { getApplication } = useApplications()

  const application = getApplication(params.id as string)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user || !application) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const config = statusConfig[application.status]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link href="/applications">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Devolverse a postulaciones
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-3xl text-balance">{application.scholarshipTitle}</CardTitle>
                  <Badge variant="outline" className={config.color}>
                    {config.label}
                  </Badge>
                </div>
                <CardDescription>ID de postulacion: {application.id}</CardDescription>
              </CardHeader>
            </Card>

            {/* Personal Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Estado Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {application.data.personalStatement || "Not provided"}
                </p>
              </CardContent>
            </Card>

            {/* Academic Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Datos & logros academicos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {application.data.academicGoals || "Not provided"}
                </p>
              </CardContent>
            </Card>

            {/* Financial Need */}
            {application.data.financialNeed && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Financial Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {application.data.financialNeed}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            {application.data.additionalInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Informacion adicional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {application.data.additionalInfo}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Documentos subidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(application.documents).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      {value ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className={value ? "text-foreground" : "text-muted-foreground"}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tiempo de postulacion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Ultima actualizacion</p>
                    <p className="text-xs text-muted-foreground">{formatDate(application.updatedAt)}</p>
                  </div>
                </div>
                {application.submittedAt && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Subido</p>
                      <p className="text-xs text-muted-foreground">{formatDate(application.submittedAt)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Applicant Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informacion de aplicacion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">ID: {user.studentId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Link href={`/scholarships/${application.scholarshipId}`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver detalles de la beca
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Status Info */}
            {application.status === "approved" && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground leading-relaxed">
                    Felicidades! haz sido seleccionado para la beca. 
                  </p>
                </CardContent>
              </Card>
            )}

            {application.status === "under-review" && (
              <Card className="bg-chart-2/5 border-chart-2/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground leading-relaxed">
                    Tu publicacion esta siendo revisada
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
