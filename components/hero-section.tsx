"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Globe, Shield, Zap } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* World Map Background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/world-map-outline-with-glowing-safety-zones.jpg"
          alt="World Map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-foreground text-sm font-medium mb-8 animate-slide-in-up">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            Smart Tourist Safety Platform
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-in-up text-balance">
            Smart Safety for Every Tourist,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Anywhere 🌍
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-up text-pretty">
            Revolutionary AI-powered platform combining{" "}
            <span className="text-foreground font-semibold bg-primary/10 px-2 py-1 rounded">Geo-fencing</span>,{" "}
            <span className="text-foreground font-semibold bg-secondary/10 px-2 py-1 rounded">Blockchain Identity</span>
            , and{" "}
            <span className="text-foreground font-semibold bg-accent/10 px-2 py-1 rounded">Emergency Response</span> for
            unprecedented tourist safety.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-up">
            <div className="flex items-center px-4 py-2 bg-card rounded-full border">
              <Zap className="w-4 h-4 mr-2 text-warning-amber" />
              <span className="text-sm font-medium">Real-time Alerts</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-card rounded-full border">
              <Globe className="w-4 h-4 mr-2 text-trust-blue" />
              <span className="text-sm font-medium">Global Coverage</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-card rounded-full border">
              <Shield className="w-4 h-4 mr-2 text-safety-green" />
              <span className="text-sm font-medium">24/7 Protection</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up">
            <Button size="lg" className="text-lg px-8 py-6 group">
              Try Live Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 group bg-transparent"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 animate-slide-in-up">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Incident Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">&lt;30s</div>
              <div className="text-muted-foreground">Emergency Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Countries Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
