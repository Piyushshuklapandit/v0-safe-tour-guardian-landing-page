"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Mail, Users } from "lucide-react"

const teamMembers = [
  {
    name: "Piyush Shukla",
    role: "Lead AI Researcher",
    image: "/professional-indian-woman-ai-researcher.jpg",
    bio: "PhD in Machine Learning from IIT Delhi. Expert in predictive analytics and incident detection algorithms.",
    linkedin: "#",
    github: "#",
    email: "priya@safetourguardian.com",
  },
  {
    name: "Bhamini Tiwari",
    role: "UX/UI Designer",
    image: "/professional-indian-woman-ux-designer.jpg",
    bio: "Design thinking expert focused on creating intuitive safety interfaces for emergency situations.",
    linkedin: "#",
    github: "#",
    email: "ananya@safetourguardian.com",
  },
  {
    name: "Parth Shukla",
    role: "Backend Engineer",
    image: "/professional-indian-man-backend-engineer.jpg",
    bio: "Cloud infrastructure specialist ensuring 99.9% uptime for critical safety systems.",
    linkedin: "#",
    github: "#",
    email: "rohit@safetourguardian.com",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Meet the Safety Innovators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our diverse team of experts combines cutting-edge technology with deep understanding of tourist safety
            challenges.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-card rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-muted-foreground">Patents Filed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100+</div>
              <div className="text-muted-foreground">Research Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-safety-green mb-2">24/7</div>
              <div className="text-muted-foreground">Dedicated Support</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Mission</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make travel safer for everyone.
          </p>
          <Button size="lg" variant="outline">
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}
