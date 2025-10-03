"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { useApplications, type Application } from "@/lib/applications-context"
import { FileText, Clock, CheckCircle, XCircle, Eye, Edit, Award, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

const statusConfig = {
  draft: {
    label: "Borrador",
    icon: Edit,
    color: "bg-muted text-muted-foreground",
    description: "Continua editando tu postulacion",
  },
  submitted: {
    label: "Enviada",
    icon: CheckCircle,
    color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    description: "Tu postulacion esta en espera de ser revisada",
  },
  "under-review": {
    label: "Bajo revision",
    icon: Eye,
    color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    description: "Tu postulacion a sido recibida por un examinador",
  },
  approved: {
    label: "Aprobada",
    icon: Award,
    color: "bg-primary/10 text-primary border-primary/20",
    description: "Tu postulacion ha sido aprobada",
  },
  rejected: {
    label: "No seleccionada",
    icon: XCircle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    description: "Tu postulacion no ha sido aprovada",
  },
}

function ApplicationCard({ application }: { application: Application }) {
  const router = useRouter()
  const config = statusConfig[application.status]
  const StatusIcon = config.icon

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <CardTitle className="text-xl text-balance">{application.scholarshipTitle}</CardTitle>
          <Badge variant="outline" className={config.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <CardDescription className="text-sm">{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Ultima actualizacion</p>
            <p className="font-medium text-foreground">{formatDate(application.updatedAt)}</p>
          </div>
          {application.submittedAt && (
            <div>
              <p className="text-muted-foreground mb-1">Subida</p>
              <p className="font-medium text-foreground">{formatDate(application.submittedAt)}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {application.status === "draft" ? (
            <Link href={`/apply/${application.scholarshipId}`} className="flex-1">
              <Button className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Continua postulando
              </Button>
            </Link>
          ) : (
            <Link href={`/applications/${application.id}`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Ver detalles
              </Button>
            </Link>
          )}
          <Link href={`/scholarships/${application.scholarshipId}`}>
            <Button variant="ghost">
              <FileText className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ApplicationsPage() {
  const { user } = useAuth()
  const { applications } = useApplications()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const draftApplications = applications.filter((app) => app.status === "draft")
  const activeApplications = applications.filter((app) => app.status === "submitted" || app.status === "under-review")
  const completedApplications = applications.filter((app) => app.status === "approved" || app.status === "rejected")

  const stats = {
    total: applications.length,
    draft: draftApplications.length,
    active: activeApplications.length,
    approved: applications.filter((app) => app.status === "approved").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 text-foreground">Mis postualaciones</h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Mantente en contacto con les estados de tus postulaciones
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total de postualciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Edit className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.draft}</p>
                  <p className="text-xs text-muted-foreground">Borradores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-2/10">
                  <Clock className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">En progreso</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                  <p className="text-xs text-muted-foreground">Aprobada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Sin postualaciones aun</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Explora las distintas oportunidades que presenta la institucion.
                  </p>
                </div>
                <Link href="/scholarships">
                  <Button size="lg">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Buscar becas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({draftApplications.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {draftApplications.length > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Tu tienes {draftApplications.length} borradore de postulaciones{draftApplications.length > 1 ? "s" : ""} que
                    necesitan ser completadas.
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="draft">
              {draftApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Sin borradores de postulaciones</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {draftApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="active">
              {activeApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Sin postulaciones activas</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Sin postulaciones completadas</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Help Section */}
        {applications.length > 0 && (
          <Card className="mt-8 bg-muted/50">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Necesitas ayuda con tus postulaciones?</h3>
                  <p className="text-sm text-muted-foreground">
                    Existen encargados que pueden ayudarte con tus preguntas
                  </p>
                </div>
                <Link href="/services">
                  <Button variant="outline" className="bg-transparent">
                    Contactar al soporte
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
