"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, Shield, Phone, CheckCircle, ArrowRight, Play, Pause } from "lucide-react"

const storySteps = [
  {
    id: 1,
    title: "Tourist Enters Restricted Zone",
    description: "Sarah, a tourist in Bangkok, unknowingly walks into a restricted area while exploring the city.",
    icon: MapPin,
    color: "text-warning-amber",
    bgColor: "bg-warning-amber/10",
    image: "/tourist-walking-in-bangkok-street.jpg",
  },
  {
    id: 2,
    title: "Instant Geo-fence Alert",
    description: "TravoMate immediately detects the boundary violation and sends an instant alert to Sarah's phone.",
    icon: AlertTriangle,
    color: "text-danger-red",
    bgColor: "bg-danger-red/10",
    image: "/smartphone-showing-danger-alert-notification.jpg",
  },
  {
    id: 3,
    title: "AI Incident Analysis",
    description:
      "Our AI system analyzes the situation, assessing risk levels and determining the appropriate response protocol.",
    icon: Shield,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    image: "/ai-analysis-dashboard-with-risk-assessment.jpg",
  },
  {
    id: 4,
    title: "Blockchain ID Verification",
    description:
      "Sarah's digital identity is instantly verified through our secure blockchain system for emergency response.",
    icon: Shield,
    color: "text-trust-blue",
    bgColor: "bg-trust-blue/10",
    image: "/blockchain-verification-interface-with-security-ic.jpg",
  },
  {
    id: 5,
    title: "Authorities Notified",
    description:
      "Local authorities and emergency services are automatically notified with Sarah's location and situation details.",
    icon: Phone,
    color: "text-accent",
    bgColor: "bg-accent/10",
    image: "/emergency-services-dispatch-center-with-location-m.jpg",
  },
  {
    id: 6,
    title: "Safe Resolution",
    description:
      "Sarah receives guidance to safety, emergency contacts are notified, and the incident is logged for future prevention.",
    icon: CheckCircle,
    color: "text-safety-green",
    bgColor: "bg-safety-green/10",
    image: "/happy-tourist-with-safety-confirmation-on-phone.jpg",
  },
]

export function StorytellingSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < storySteps.length ? prev + 1 : 1))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const currentStoryStep = storySteps.find((step) => step.id === currentStep) || storySteps[0]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Play className="w-4 h-4 mr-2" />
            Real-World Scenario
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            See How We Protect Tourists
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Follow Sarah's journey as TravoMate transforms a potentially dangerous situation into a safe, managed
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Visualization */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-muted/20 to-card/40">
                  <img
                    src={currentStoryStep.image || "/placeholder.svg"}
                    alt={currentStoryStep.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Step Indicator */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${currentStoryStep.bgColor} border-2 border-white`}
                    >
                      <currentStoryStep.icon className={`w-6 h-6 ${currentStoryStep.color}`} />
                    </div>
                  </div>

                  {/* Step Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentStep} / {storySteps.length}
                  </div>

                  {/* Story Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{currentStoryStep.title}</h3>
                    <p className="text-sm opacity-90">{currentStoryStep.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Story
              </Button>
              <div className="flex space-x-2">
                {storySteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      step.id === currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Story Steps */}
          <div className="order-1 lg:order-2 space-y-4">
            {storySteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                  step.id === currentStep
                    ? "bg-card border-primary shadow-lg scale-105"
                    : "bg-muted/30 border-border hover:bg-card"
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                {/* Connection Line */}
                {index < storySteps.length - 1 && <div className="absolute left-8 top-16 w-0.5 h-8 bg-border" />}

                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}
                  >
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Active Indicator */}
                  {step.id === currentStep && <ArrowRight className="w-5 h-5 text-primary animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card rounded-xl">
            <div className="text-3xl font-bold text-safety-green mb-2">98%</div>
            <div className="text-muted-foreground">Incidents Prevented</div>
          </div>
          <div className="p-6 bg-card rounded-xl">
            <div className="text-3xl font-bold text-trust-blue mb-2">15s</div>
            <div className="text-muted-foreground">Average Response Time</div>
          </div>
          <div className="p-6 bg-card rounded-xl">
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-muted-foreground">Continuous Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  )
}
