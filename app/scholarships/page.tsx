"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { scholarships } from "@/lib/scholarships-data"
import { Search, DollarSign, Calendar, Award, Filter } from "lucide-react"
import Link from "next/link"

const categories = [
  "All",
  "Academic Merit",
  "STEM",
  "First Generation",
  "Service",
  "International",
  "Arts",
  "Graduate",
  "Athletics",
]

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 text-foreground">
              Becas y beneficios
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Explora las oportunidades de ayuda financiera para apoyar tu educación.
              Consulta becas, subvenciones y beneficios disponibles para estudiantes.
              Inicia sesión para solicitar y dar seguimiento a tus solicitudes.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar becas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredScholarships.length} {filteredScholarships.length === 1 ? "scholarship" : "scholarships"}
          </p>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-xl text-balance">{scholarship.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {scholarship.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">{scholarship.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Limite</p>
                      <p className="text-sm font-semibold text-foreground">{scholarship.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Elegibilidad:</p>
                  <ul className="space-y-1">
                    {scholarship.eligibility.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">Beneficios:</p>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link href={`/scholarships/${scholarship.id}`}>
                    <Button className="w-full">
                      <Award className="h-4 w-4 mr-2" />
                      Ver detalles y postular
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No se han encontrado becas con los filtros.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need Help Finding the Right Scholarship?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our financial aid advisors are here to help you navigate scholarship opportunities and maximize your
              funding options.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services">
                <Button variant="outline">Contact Financial Aid</Button>
              </Link>
              <Button variant="outline">Schedule Appointment</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
