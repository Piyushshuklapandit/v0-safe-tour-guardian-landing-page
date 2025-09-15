"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Shield, Brain, Headphones, BarChart3, Zap, CheckCircle, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Real-time Safety",
    description: "Instant alerts and monitoring 24/7",
    stats: "< 30 seconds response time",
    color: "text-trust-blue",
    bgColor: "bg-trust-blue/10",
  },
  {
    icon: Shield,
    title: "Blockchain Trust",
    description: "Immutable security and privacy",
    stats: "99.9% security rating",
    color: "text-safety-green",
    bgColor: "bg-safety-green/10",
  },
  {
    icon: Brain,
    title: "AI Monitoring",
    description: "Predictive incident detection",
    stats: "95% accuracy rate",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Headphones,
    title: "24×7 Assistance",
    description: "Round-the-clock support team",
    stats: "Multi-language support",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Travel Analytics",
    description: "Comprehensive safety insights",
    stats: "Personalized recommendations",
    color: "text-warning-amber",
    bgColor: "bg-warning-amber/10",
  },
  {
    icon: Zap,
    title: "Emergency Tracking",
    description: "Instant location sharing",
    stats: "GPS accuracy ±3 meters",
    color: "text-danger-red",
    bgColor: "bg-danger-red/10",
  },
]

const timeline = [
  {
    step: "01",
    title: "Tourist Registration",
    description: "Secure blockchain-based identity verification and profile setup",
    icon: Shield,
  },
  {
    step: "02",
    title: "Real-time Monitoring",
    description: "AI-powered location tracking with geo-fencing technology",
    icon: Brain,
  },
  {
    step: "03",
    title: "Incident Detection",
    description: "Automatic threat assessment and risk evaluation",
    icon: Zap,
  },
  {
    step: "04",
    title: "Emergency Response",
    description: "Instant alerts to authorities and emergency contacts",
    icon: Clock,
  },
]

export function WhyChooseSection() {
  return (
    <section id="use-cases" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Unmatched Safety Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our comprehensive platform delivers superior protection through cutting-edge technology and proven
            methodologies.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${benefit.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground mb-4">{benefit.description}</p>
                <div className={`text-sm font-semibold ${benefit.color}`}>{benefit.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="bg-card rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">How SafeTour Guardian Works</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures maximum safety with minimal complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connection Line */}
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
                    <item.icon className="w-6 h-6 text-foreground" />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
