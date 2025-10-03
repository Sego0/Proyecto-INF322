export interface Scholarship {
  id: string
  title: string
  amount: string
  deadline: string
  category: string
  eligibility: string[]
  description: string
  requirements: string[]
  benefits: string[]
  applicationUrl?: string
}

export const scholarships: Scholarship[] = [
  {
    id: "merit-excellence-2024",
    title: "Merit Excellence Scholarship",
    amount: "$5,000 per year",
    deadline: "April 30, 2024",
    category: "Academic Merit",
    eligibility: ["Minimum 3.5 GPA", "Full-time enrollment", "Undergraduate students"],
    description:
      "Recognizes outstanding academic achievement and leadership potential. This renewable scholarship supports students who demonstrate exceptional performance in their studies and contribute positively to the campus community.",
    requirements: [
      "Official transcript",
      "Two letters of recommendation",
      "Personal statement (500 words)",
      "Resume of activities",
    ],
    benefits: ["Renewable for up to 4 years", "Priority registration", "Mentorship program access"],
  },
  {
    id: "stem-innovation-2024",
    title: "STEM Innovation Grant",
    amount: "$3,000",
    deadline: "May 15, 2024",
    category: "STEM",
    eligibility: ["STEM major", "Minimum 3.0 GPA", "Sophomore or above"],
    description:
      "Supports students pursuing degrees in Science, Technology, Engineering, and Mathematics. Preference given to students engaged in research or innovative projects in their field.",
    requirements: [
      "Project proposal or research summary",
      "Faculty recommendation",
      "Academic transcript",
      "Statement of purpose",
    ],
    benefits: ["One-time award", "Research lab access", "Conference funding opportunity"],
  },
  {
    id: "first-gen-success-2024",
    title: "First Generation Success Award",
    amount: "$2,500 per semester",
    deadline: "March 31, 2024",
    category: "First Generation",
    eligibility: ["First-generation college student", "Financial need demonstrated", "Minimum 2.5 GPA"],
    description:
      "Dedicated to supporting first-generation college students in achieving their educational goals. This scholarship provides both financial assistance and access to specialized support services.",
    requirements: ["FAFSA completion", "Personal essay", "Proof of first-generation status", "Academic transcript"],
    benefits: ["Renewable annually", "Peer mentoring", "Academic coaching", "Career counseling"],
  },
  {
    id: "community-service-2024",
    title: "Community Service Leadership Scholarship",
    amount: "$2,000",
    deadline: "April 15, 2024",
    category: "Service",
    eligibility: ["Minimum 50 hours community service", "Any major", "Good academic standing"],
    description:
      "Honors students who demonstrate exceptional commitment to community service and social responsibility. Recognizes those who make meaningful contributions to their communities.",
    requirements: [
      "Service hours documentation",
      "Community organization letter",
      "Reflection essay",
      "Academic transcript",
    ],
    benefits: ["One-time award", "Service-learning opportunities", "Leadership training"],
  },
  {
    id: "international-excellence-2024",
    title: "International Student Excellence Award",
    amount: "$4,000 per year",
    deadline: "May 1, 2024",
    category: "International",
    eligibility: ["International student status", "Minimum 3.3 GPA", "Full-time enrollment"],
    description:
      "Celebrates the contributions of international students to campus diversity and global perspectives. Supports students who bridge cultures and enhance the university's international community.",
    requirements: [
      "Valid student visa documentation",
      "Academic transcript",
      "Cultural contribution essay",
      "Faculty recommendation",
    ],
    benefits: ["Renewable for up to 4 years", "Cultural exchange programs", "International student network"],
  },
  {
    id: "arts-creativity-2024",
    title: "Arts & Creativity Grant",
    amount: "$1,500",
    deadline: "April 20, 2024",
    category: "Arts",
    eligibility: ["Arts or humanities major", "Portfolio submission", "Any year"],
    description:
      "Supports creative students in the arts and humanities. Encourages artistic expression and innovation across visual arts, performing arts, music, and creative writing.",
    requirements: ["Portfolio or performance recording", "Artist statement", "Faculty recommendation", "Transcript"],
    benefits: ["One-time award", "Studio space access", "Exhibition opportunities"],
  },
  {
    id: "graduate-research-2024",
    title: "Graduate Research Fellowship",
    amount: "$8,000 per year",
    deadline: "March 15, 2024",
    category: "Graduate",
    eligibility: ["Graduate student", "Active research project", "Minimum 3.5 GPA"],
    description:
      "Prestigious fellowship for graduate students conducting significant research. Provides funding and resources to support advanced research projects and dissertation work.",
    requirements: [
      "Research proposal",
      "Two faculty recommendations",
      "CV",
      "Graduate transcript",
      "IRB approval (if applicable)",
    ],
    benefits: ["Renewable for up to 3 years", "Conference travel funding", "Research assistant position"],
  },
  {
    id: "athletic-academic-2024",
    title: "Student-Athlete Academic Achievement Award",
    amount: "$2,500",
    deadline: "May 10, 2024",
    category: "Athletics",
    eligibility: ["Varsity athlete", "Minimum 3.2 GPA", "Good athletic standing"],
    description:
      "Recognizes student-athletes who excel both in their sport and in the classroom. Celebrates the dedication required to balance athletic and academic commitments.",
    requirements: ["Athletic department verification", "Academic transcript", "Coach recommendation", "Personal essay"],
    benefits: ["One-time award", "Academic tutoring", "Time management workshops"],
  },
]
