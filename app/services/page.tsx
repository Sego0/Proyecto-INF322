import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Brain,
  Users,
  BookOpen,
  Briefcase,
  Globe,
  Home,
  DollarSign,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react"

const services = [
  {
    id: 1,
    title: "Servicio de salud",
    icon: Heart,
    category: "Bienestar",
    description:
      "Atención médica integral que incluye atención primaria, vacunación y educación para la salud. Nuestro centro de salud del campus cuenta con profesionales médicos colegiados.",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM",
    contact: "sansanitoh@usm.cl",
    phone: "(555) 123-4567",
    location: "SanSanito",
    services: ["Atencion primaria", "Inmunizacion", "Farmacia"],
  },
  {
    id: 2,
    title: "Salud mental",
    icon: Brain,
    category: "Bienestar",
    description:
      "Apoyo de salud mental confidencial que incluye asesoramiento individual, terapia de grupo, intervención en crisis y talleres de bienestar.",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM, 24/7 Crisis Line",
    contact: "SanSnito@usm.cl",
    phone: "(555) 123-4568",
    location: "Edifico de consulta, Valdes",
    services: ["Terapia", "Ayuda"],
  },
  {
    id: 3,
    title: "Mentorias",
    icon: BookOpen,
    category: "Academico",
    description:
      "Programa de mejoramiento academico",
    hours: "Mon-Thu: 10:00 AM - 8:00 PM, Fri: 10:00 AM - 4:00 PM",
    contact: "Ciac@usm.cl",
    phone: "(555) 123-4569",
    location: "CIAC",
    services: ["Tutoria", "Estudio", "Acompañamiento academico"],
  },

  {
    id: 7,
    title: "Oficinas de consulta financiera",
    icon: DollarSign,
    category: "Financiero",
    description:
      "Orientación sobre ayuda financiera, becas, subvenciones y préstamos estudiantiles. Nuestros asesores te ayudan a explorar las opciones de financiación para tu educación.",
    hours: "Mon-Fri: 9:00 AM - 4:00 PM",
    contact: "sireb@usm.cl",
    phone: "(555) 123-4573",
    location: "Edificion N",
    services: ["Ayuda", "Becas"],
  },
  {
    id: 8,
    title: "Federacion estudiantil",
    icon: Users,
    category: "Comunidad",
    description:
      "Únete a más de 200 clubes y organizaciones estudiantiles. Desde sociedades académicas hasta grupos culturales, encuentra tu comunidad en el campus.",
    hours: "Office: Mon-Fri: 10:00 AM - 6:00 PM",
    contact: "fedeusm@usm.cl",
    phone: "(555) 123-4574",
    location: "Federacion estudiantil, Valdes 158",
    services: [ "Planeacion de eventos", "Cultural"],
  },
]

const categoryColors: Record<string, string> = {
  Wellness: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Academic: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Career: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Support: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Financial: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Engagement: "bg-accent/10 text-accent-foreground border-accent/20",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 text-foreground">Student Services</h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Accede a servicios de apoyo integrales diseñados para ayudarte a alcanzar el éxito académico, profesional y personal a lo largo de tu trayectoria universitaria.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="outline" className={categoryColors[service.category]}>
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Service List */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Servicios disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{service.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href={`mailto:${service.contact}`} className="hover:text-primary transition-colors">
                      {service.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href={`tel:${service.phone}`} className="hover:text-primary transition-colors">
                      {service.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <span>{service.location}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Aprender mas
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Need Immediate Help?</h3>
              <p className="text-muted-foreground">24/7 crisis support and emergency services available</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Emergency: (555) 911-0000
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Crisis Line: (555) 123-4568
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
