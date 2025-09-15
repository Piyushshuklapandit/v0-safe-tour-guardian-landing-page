"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Brain, Shield, Phone, Share2, BarChart3, Zap, Globe, Lock, Users } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Geo-fencing Alerts",
    description: "Smart boundary detection with instant notifications when entering restricted or dangerous areas.",
    color: "text-trust-blue",
    bgColor: "bg-trust-blue/10",
    details: ["Real-time location monitoring", "Custom safety zones", "Instant boundary alerts"],
  },
  {
    icon: Brain,
    title: "AI Incident Detection",
    description:
      "Advanced machine learning algorithms that predict and detect potential safety incidents before they escalate.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    details: ["Predictive analytics", "Pattern recognition", "Behavioral analysis"],
  },
  {
    icon: Shield,
    title: "Blockchain Digital ID",
    description:
      "Secure, tamper-proof digital identity verification for trusted emergency response and authentication.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    details: ["Immutable identity records", "Secure verification", "Privacy protection"],
  },
  {
    icon: Phone,
    title: "Emergency Response",
    description: "Instant connection to local emergency services with automated location sharing and incident details.",
    color: "text-danger-red",
    bgColor: "bg-danger-red/10",
    details: ["One-tap emergency calls", "Auto location sharing", "Multi-language support"],
  },
  {
    icon: Share2,
    title: "Real-time Location Sharing",
    description: "Share your location with trusted contacts and receive safety updates from your travel network.",
    color: "text-safety-green",
    bgColor: "bg-safety-green/10",
    details: ["Trusted contact network", "Live location updates", "Safety check-ins"],
  },
  {
    icon: BarChart3,
    title: "Travel History & Analytics",
    description: "Comprehensive travel insights, safety scores, and personalized recommendations for safer journeys.",
    color: "text-warning-amber",
    bgColor: "bg-warning-amber/10",
    details: ["Safety score tracking", "Travel insights", "Personalized recommendations"],
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Advanced Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Safety Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our cutting-edge platform combines multiple technologies to create an unprecedented level of tourist safety
            and security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-pretty">{feature.description}</p>

                {/* Feature Details */}
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${feature.bgColor} mr-3`}></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 p-6 bg-card rounded-2xl border">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-trust-blue" />
              <span className="text-sm font-medium">Global Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-safety-green" />
              <span className="text-sm font-medium">End-to-End Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
