"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Clock, TrendingUp } from "lucide-react"

export function CaseStudiesSection() {
  const caseStudies = [
    {
      id: 1,
      title: "Rajasthan Heritage Circuit",
      location: "Jaipur, Udaipur, Jodhpur",
      duration: "6 months pilot",
      tourists: "50,000+",
      improvement: "85% faster response",
      description: "Implemented geo-fencing around major heritage sites with AI-powered crowd monitoring.",
      metrics: [
        { label: "Incidents Prevented", value: "127" },
        { label: "Response Time", value: "3.2 min" },
        { label: "Tourist Satisfaction", value: "94%" },
      ],
      status: "Completed",
      image: "/rajasthan-heritage-sites-with-tourists.jpg",
    },
    {
      id: 2,
      title: "Kerala Backwaters Safety",
      location: "Alleppey, Kumarakom",
      duration: "4 months pilot",
      tourists: "25,000+",
      improvement: "70% reduction in water incidents",
      description: "Blockchain-based identity verification for houseboat operators and water activity monitoring.",
      metrics: [
        { label: "Water Incidents", value: "↓70%" },
        { label: "Verified Operators", value: "100%" },
        { label: "Emergency Alerts", value: "45" },
      ],
      status: "Ongoing",
      image: "/kerala-backwaters-with-houseboats.jpg",
    },
    {
      id: 3,
      title: "Himachal Adventure Tourism",
      location: "Manali, Shimla, Dharamshala",
      duration: "8 months pilot",
      tourists: "75,000+",
      improvement: "90% better tracking",
      description: "High-altitude geo-fencing with weather integration and adventure activity monitoring.",
      metrics: [
        { label: "Rescue Operations", value: "23" },
        { label: "Weather Alerts", value: "156" },
        { label: "Safe Returns", value: "100%" },
      ],
      status: "Expanding",
      image: "/himachal-pradesh-mountains-with-trekkers.jpg",
    },
  ]

  return (
    <section id="case-studies" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-[color:var(--india-blue)] border-[color:var(--india-blue)]">
            Proven Results
          </Badge>
          <h2 className="text-4xl font-bold font-serif mb-4 gradient-text-india">Pilot Project Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world implementations across India showcasing the effectiveness of SafeTour Guardian in diverse tourism
            environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card
              key={study.id}
              className="group hover:shadow-xl transition-all duration-300 animate-fade-in-scale border-l-4 border-l-[color:var(--india-saffron)]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={
                      study.status === "Completed" ? "default" : study.status === "Ongoing" ? "secondary" : "outline"
                    }
                    className="mb-2"
                  >
                    {study.status}
                  </Badge>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {study.duration}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-serif group-hover:text-[color:var(--india-blue)] transition-colors">
                  {study.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {study.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{study.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[color:var(--safety-green)]">
                    <Users className="h-4 w-4 mr-1" />
                    {study.tourists} tourists
                  </div>
                  <div className="flex items-center text-[color:var(--india-blue)]">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {study.improvement}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-bold text-lg text-[color:var(--india-blue)]">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[color:var(--india-blue)]/10 to-[color:var(--india-saffron)]/10 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--india-blue)]">150,000+</div>
              <div className="text-sm text-muted-foreground">Total Tourists Protected</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--safety-green)]">195</div>
              <div className="text-sm text-muted-foreground">Incidents Prevented</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[color:var(--india-saffron)]">2.8 min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
