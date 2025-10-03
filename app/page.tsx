import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ArrowRight, Award, Users, BookOpen } from "lucide-react"
import Link from "next/link"

const upcomingEvents = [
  {
    id: 1,
    title: "Career Fair 2024",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Student Center Hall",
    category: "Career",
    description: "Meet with top employers and explore internship and job opportunities.",
  },
  {
    id: 2,
    title: "Mental Health Awareness Workshop",
    date: "March 20, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Wellness Center Room 201",
    category: "Wellness",
    description: "Learn about mental health resources and coping strategies for academic stress.",
  },
  {
    id: 3,
    title: "International Student Mixer",
    date: "March 25, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Campus Commons",
    category: "Social",
    description: "Connect with international students and celebrate cultural diversity.",
  },
  {
    id: 4,
    title: "Research Symposium",
    date: "April 5, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Science Building Auditorium",
    category: "Academic",
    description: "Showcase of undergraduate and graduate research projects across all disciplines.",
  },
]

const quickLinks = [
  {
    icon: Award,
    title: "Scholarships",
    description: "Browse available scholarships and financial aid opportunities",
    href: "/scholarships",
    color: "text-chart-1",
  },
  {
    icon: Users,
    title: "Student Services",
    description: "Access health services, counseling, and mentoring programs",
    href: "/services",
    color: "text-chart-2",
  },
  {
    icon: BookOpen,
    title: "My Applications",
    description: "Track your scholarship and benefit applications",
    href: "/applications",
    color: "text-chart-3",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6 text-foreground">
              Portal de relaciones estudiantiles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
              En este sitio podras enterarte sobre eventos, sevicios estudiantiles, becas y beneficios. Todo lo que
              necesitas en tu viaje academico.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/scholarships">
                <Button size="lg" className="gap-2">
                  Explorar becas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Ver servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-secondary ${link.color}`}>
                      <link.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{link.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{link.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Proximos eventos</h2>
            <p className="text-muted-foreground">Este conectados con las actividades y opotunidades del campus</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-xl text-balance">{event.title}</CardTitle>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Ready to Apply for Scholarships?</h2>
            <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
              Create an account to access exclusive scholarship opportunities and track your applications in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/scholarships">
                <Button size="lg" variant="outline">
                  Browse Scholarships
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
