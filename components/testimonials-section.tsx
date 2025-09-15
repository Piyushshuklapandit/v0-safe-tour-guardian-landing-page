"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      title: "Secretary, Ministry of Tourism",
      organization: "Government of India",
      image: "/government-official-portrait.jpg",
      rating: 5,
      quote:
        "SafeTour Guardian represents the future of tourism safety in India. The integration of AI, blockchain, and geo-fencing creates an unprecedented level of security for our visitors. This aligns perfectly with our Digital India initiatives.",
      category: "Government",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Director of Operations",
      organization: "Incredible India Tours",
      image: "/tourism-industry-executive.jpg",
      rating: 5,
      quote:
        "Since implementing SafeTour Guardian in our Rajasthan circuit, we've seen a 40% increase in international bookings. Tourists feel more confident knowing they're protected by cutting-edge technology.",
      category: "Industry",
    },
    {
      id: 3,
      name: "Prof. Amit Patel",
      title: "Technology Innovation Expert",
      organization: "IIT Delhi",
      image: "/technology-expert-portrait.jpg",
      rating: 5,
      quote:
        "The technical architecture of SafeTour Guardian is impressive. The seamless integration of multiple technologies while maintaining user privacy and data security sets a new standard for smart city applications.",
      category: "Academic",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      title: "Travel Blogger & Safety Advocate",
      organization: "International Tourist",
      image: "/international-tourist-portrait.jpg",
      rating: 5,
      quote:
        "As someone who travels extensively in India, SafeTour Guardian gave me unprecedented peace of mind. The real-time alerts and instant emergency response made my solo trip to Himachal Pradesh worry-free.",
      category: "Tourist",
    },
    {
      id: 5,
      name: "Inspector Vikram Singh",
      title: "Tourist Police Coordinator",
      organization: "Rajasthan Police",
      image: "/police-officer-portrait.jpg",
      rating: 5,
      quote:
        "The system has revolutionized our response capabilities. We can now prevent incidents before they occur and respond 3x faster when emergencies arise. It's a game-changer for tourist safety.",
      category: "Law Enforcement",
    },
    {
      id: 6,
      name: "Maya Gupta",
      title: "Local Business Owner",
      organization: "Udaipur Tourism Association",
      image: "/local-business-owner.jpg",
      rating: 5,
      quote:
        "SafeTour Guardian has brought more tourists to our city and made them feel safer. Our local businesses have seen a 35% increase in revenue since the pilot program started.",
      category: "Community",
    },
  ]

  const categoryColors = {
    Government: "var(--india-blue)",
    Industry: "var(--india-saffron)",
    Academic: "var(--digital-india)",
    Tourist: "var(--safety-green)",
    "Law Enforcement": "var(--danger-red)",
    Community: "var(--india-green)",
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-[color:var(--india-blue)] border-[color:var(--india-blue)]">
            Trusted by Leaders
          </Badge>
          <h2 className="text-4xl font-bold font-serif mb-4 gradient-text-india">What Stakeholders Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from government officials, industry leaders, and tourists about their experience with SafeTour
            Guardian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 animate-fade-in-scale relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: categoryColors[testimonial.category as keyof typeof categoryColors] }}
              ></div>

              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-[color:var(--india-blue)]/10 text-[color:var(--india-blue)]">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: `${categoryColors[testimonial.category as keyof typeof categoryColors]}20`,
                        }}
                      >
                        {testimonial.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    <p className="text-xs text-muted-foreground font-medium">{testimonial.organization}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[color:var(--india-saffron)] text-[color:var(--india-saffron)]"
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-[color:var(--india-blue)]/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4 italic">"{testimonial.quote}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 p-6 bg-gradient-to-r from-[color:var(--india-blue)]/10 to-[color:var(--india-saffron)]/10 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-[color:var(--india-blue)]">98%</div>
              <div className="text-sm text-muted-foreground">Stakeholder Satisfaction</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[color:var(--india-saffron)]">50+</div>
              <div className="text-sm text-muted-foreground">Government Endorsements</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[color:var(--safety-green)]">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
