"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Shield, Hospital, Phone, Navigation, Users } from "lucide-react"

export function MapDemoSection() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null)
  const [touristPosition, setTouristPosition] = useState({ x: 20, y: 60 })

  // Simulate tourist movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTouristPosition((prev) => ({
        x: Math.min(80, prev.x + 2),
        y: prev.y + (Math.random() - 0.5) * 4,
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Trigger alert when tourist enters danger zone
  useEffect(() => {
    if (touristPosition.x > 60 && touristPosition.x < 75) {
      setActiveAlert("danger-zone")
    } else {
      setActiveAlert(null)
    }
  }, [touristPosition])

  const safeZones = [
    { id: "safe-1", x: 10, y: 30, width: 25, height: 20, label: "Tourist District" },
    { id: "safe-2", x: 15, y: 70, width: 20, height: 15, label: "Hotel Zone" },
  ]

  const dangerZones = [
    { id: "danger-1", x: 60, y: 45, width: 15, height: 25, label: "Restricted Area" },
    { id: "danger-2", x: 80, y: 20, width: 15, height: 20, label: "High Crime Zone" },
  ]

  const emergencyServices = [
    { id: "police", x: 45, y: 25, type: "Police", icon: Shield },
    { id: "hospital", x: 30, y: 80, type: "Hospital", icon: Hospital },
    { id: "emergency", x: 70, y: 70, type: "Emergency", icon: Phone },
  ]

  return (
    <section id="map-demo" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            See TravoMate in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Watch how our real-time monitoring system protects tourists with intelligent geo-fencing and instant
            emergency response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Safety Map</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-safety-green rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full relative">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-card/40">
                  {/* Safe Zones */}
                  {safeZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="absolute bg-safety-green/20 border-2 border-safety-green/40 rounded-lg flex items-center justify-center"
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                      }}
                    >
                      <span className="text-xs font-medium text-safety-green">{zone.label}</span>
                    </div>
                  ))}

                  {/* Danger Zones */}
                  {dangerZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="absolute bg-danger-red/20 border-2 border-danger-red/40 rounded-lg flex items-center justify-center animate-pulse-glow"
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                      }}
                    >
                      <span className="text-xs font-medium text-danger-red">{zone.label}</span>
                    </div>
                  ))}

                  {/* Emergency Services */}
                  {emergencyServices.map((service) => (
                    <div
                      key={service.id}
                      className="absolute w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                      style={{
                        left: `${service.x}%`,
                        top: `${service.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                  ))}

                  {/* Tourist Avatar */}
                  <div
                    className="absolute w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all duration-2000 ease-in-out"
                    style={{
                      left: `${touristPosition.x}%`,
                      top: `${touristPosition.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Users className="w-3 h-3 text-white" />
                  </div>

                  {/* Alert Popup */}
                  {activeAlert && (
                    <div
                      className="absolute bg-danger-red text-white p-3 rounded-lg shadow-xl animate-slide-in-up"
                      style={{
                        left: `${touristPosition.x + 5}%`,
                        top: `${touristPosition.y - 10}%`,
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">Danger Zone Alert!</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tourist Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Safety Level</span>
                  <Badge variant={activeAlert ? "destructive" : "default"} className="bg-safety-green text-white">
                    {activeAlert ? "Alert" : "Safe"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">Downtown Area</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Check-in</span>
                  <span className="text-sm font-medium">2 min ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Services
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate to Safety
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Alert Emergency Contacts
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-safety-green/40 border border-safety-green rounded"></div>
                  <span className="text-sm">Safe Zones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-danger-red/40 border border-danger-red rounded"></div>
                  <span className="text-sm">Danger Zones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-trust-blue rounded-full"></div>
                  <span className="text-sm">Emergency Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <span className="text-sm">Tourist Location</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
