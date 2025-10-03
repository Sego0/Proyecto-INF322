"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { scholarships } from "@/lib/scholarships-data"
import { useAuth } from "@/lib/auth-context"
import { useApplications } from "@/lib/applications-context"
import { ArrowLeft, Save, Send, CheckCircle, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { createApplication, updateApplication, submitApplication, getApplicationByScholarship } = useApplications()

  const scholarshipId = params.scholarshipId as string
  const scholarship = scholarships.find((s) => s.id === scholarshipId)

  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [personalStatement, setPersonalStatement] = useState("")
  const [academicGoals, setAcademicGoals] = useState("")
  const [financialNeed, setFinancialNeed] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [documents, setDocuments] = useState({
    transcript: false,
    recommendation1: false,
    recommendation2: false,
    resume: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!scholarship) {
      router.push("/scholarships")
      return
    }

    // Check for existing application
    const existingApp = getApplicationByScholarship(scholarshipId)
    if (existingApp) {
      if (existingApp.status !== "draft") {
        router.push("/applications")
        return
      }
      setApplicationId(existingApp.id)
      setPersonalStatement(existingApp.data.personalStatement)
      setAcademicGoals(existingApp.data.academicGoals)
      setFinancialNeed(existingApp.data.financialNeed || "")
      setAdditionalInfo(existingApp.data.additionalInfo || "")
      setDocuments(existingApp.documents)
    } else {
      // Create new application
      const newId = createApplication(scholarshipId, scholarship.title)
      setApplicationId(newId)
    }
  }, [user, scholarship, scholarshipId, router, getApplicationByScholarship, createApplication])

  const handleSave = () => {
    if (!applicationId) return

    setIsSaving(true)
    updateApplication(applicationId, {
      data: {
        personalStatement,
        academicGoals,
        financialNeed,
        additionalInfo,
      },
      documents,
    })

    setSaveMessage("Draft saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
    setIsSaving(false)
  }

  const handleSubmit = () => {
    if (!applicationId) return

    // Validate required fields
    if (!personalStatement.trim() || !academicGoals.trim()) {
      setSaveMessage("Please complete all required fields")
      return
    }

    setIsSubmitting(true)
    updateApplication(applicationId, {
      data: {
        personalStatement,
        academicGoals,
        financialNeed,
        additionalInfo,
      },
      documents,
    })
    submitApplication(applicationId)

    setTimeout(() => {
      router.push("/applications")
    }, 1000)
  }

  const calculateProgress = () => {
    let completed = 0
    const total = 4

    if (personalStatement.trim()) completed++
    if (academicGoals.trim()) completed++
    if (Object.values(documents).some((v) => v)) completed++
    if (financialNeed.trim() || additionalInfo.trim()) completed++

    return (completed / total) * 100
  }

  if (!user || !scholarship) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link href={`/scholarships/${scholarshipId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a becas
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Postula a {scholarship.title}</CardTitle>
                <CardDescription>
                  Completa tu postulacion abajo, tus avances quedaran guardados de forma automatica
                </CardDescription>
              </CardHeader>
            </Card>

            {saveMessage && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{saveMessage}</AlertDescription>
              </Alert>
            )}

            {/* Personal Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estado personal *</CardTitle>
                <CardDescription>
                  Hablanos de ti... (500-1000 words)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your story..."
                  value={personalStatement}
                  onChange={(e) => setPersonalStatement(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {personalStatement.split(" ").filter(Boolean).length} palabras
                </p>
              </CardContent>
            </Card>

            {/* Academic Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Logros & objetivos academicos *</CardTitle>
                <CardDescription>
                 Describe tus objetivos academicos (300-500 words)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your goals..."
                  value={academicGoals}
                  onChange={(e) => setAcademicGoals(e.target.value)}
                  className="min-h-[150px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {academicGoals.split(" ").filter(Boolean).length} palabras
                </p>
              </CardContent>
            </Card>

            {/* Financial Need */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estado financiero (Optional)</CardTitle>
                <CardDescription>Explica tu situacion y como podria ayudante este beneficio</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe tu estado financiero..."
                  value={financialNeed}
                  onChange={(e) => setFinancialNeed(e.target.value)}
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informacion adicional (Optional)</CardTitle>
                <CardDescription>Any other information you'd like the committee to know</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Additional details..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documento requeridos</CardTitle>
                <CardDescription>Revisa que tus documento esten listo para ser subidos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scholarship.requirements.map((req, index) => {
                  const docKey = req.toLowerCase().includes("transcript")
                    ? "transcript"
                    : req.toLowerCase().includes("recommendation") && !documents.recommendation1
                      ? "recommendation1"
                      : req.toLowerCase().includes("recommendation")
                        ? "recommendation2"
                        : req.toLowerCase().includes("resume")
                          ? "resume"
                          : null

                  if (!docKey) return null

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Checkbox
                        id={docKey}
                        checked={documents[docKey as keyof typeof documents]}
                        onCheckedChange={(checked) =>
                          setDocuments((prev) => ({
                            ...prev,
                            [docKey]: checked === true,
                          }))
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor={docKey} className="text-sm font-medium cursor-pointer">
                          {req}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Check this box to confirm you have this document ready
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progreso de postulacion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold">{Math.round(calculateProgress())}%</span>
                  </div>
                  <Progress value={calculateProgress()} />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {personalStatement.trim() ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={personalStatement.trim() ? "text-foreground" : "text-muted-foreground"}>
                      Estado personal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {academicGoals.trim() ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={academicGoals.trim() ? "text-foreground" : "text-muted-foreground"}>
                      Objetivos academicos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {Object.values(documents).some((v) => v) ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span
                      className={Object.values(documents).some((v) => v) ? "text-foreground" : "text-muted-foreground"}
                    >
                      Documentos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button onClick={handleSave} variant="outline" className="w-full bg-transparent" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isSubmitting || !personalStatement.trim() || !academicGoals.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>

                {(!personalStatement.trim() || !academicGoals.trim()) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">Completa todos los campos obligatorios</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Tips de postulacion
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                <p>• Se autentico y especifico</p>
                <p>• Revisa antes de subir</p>
                <p>• Guarda tu borrador con frecuencia</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
