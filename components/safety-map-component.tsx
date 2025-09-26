"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Zone } from "@/app/api/zones/route"
import { MapPin, Shield, AlertTriangle, Navigation, Phone, Hospital, Users } from "lucide-react"

interface UserLocation {
  latitude: number
  longitude: number
  accuracy: number
}

export function SafetyMapComponent() {
  const [zones, setZones] = useState<Zone[]>([])
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  // Fetch zones from API
  const fetchZones = async (lat?: number, lng?: number) => {
    try {
      const url =
        lat && lng
          ? `/api/zones?lat=${lat}&lng=${lng}&radius=100000` // 100km radius
          : "/api/zones"

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setZones(data.zones)
      }
    } catch (error) {
      console.error("Error fetching zones:", error)
      setMapError("Failed to load safety zones")
    }
  }

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }
        setUserLocation(location)
        fetchZones(location.latitude, location.longitude)
      },
      (error) => {
        console.error("Error getting location:", error)
        setMapError("Unable to get your location. Please enable location services.")
        // Still fetch all zones even without user location
        fetchZones()
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  // Initialize map (using a simple HTML/CSS map for now, can be replaced with Leaflet/Google Maps)
  const initializeMap = () => {
    if (!mapRef.current) return

    // For this demo, we'll create a visual representation
    // In production, this would integrate with Leaflet.js or Google Maps API
    setIsLoading(false)
  }

  useEffect(() => {
    getCurrentLocation()
    initializeMap()
  }, [])

  // Calculate distance between user and zone
  const calculateDistance = (zone: Zone): number => {
    if (!userLocation) return 0

    const R = 6371e3 // Earth's radius in meters
    const φ1 = (userLocation.latitude * Math.PI) / 180
    const φ2 = (zone.latitude * Math.PI) / 180
    const Δφ = ((zone.latitude - userLocation.latitude) * Math.PI) / 180
    const Δλ = ((zone.longitude - userLocation.longitude) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distance in meters
  }

  // Sort zones by distance from user
  const sortedZones = userLocation ? [...zones].sort((a, b) => calculateDistance(a) - calculateDistance(b)) : zones

  const safeZones = sortedZones.filter((zone) => zone.type === "safe")
  const restrictedZones = sortedZones.filter((zone) => zone.type === "restricted")

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`
    }
    return `${(distance / 1000).toFixed(1)}km`
  }

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading safety map...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 gradient-text-india">Live Safety Map</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Real-time visualization of safety zones and your current location. Stay informed about safe areas and
          restricted zones in your vicinity.
        </p>
      </div>

      {/* Emergency Quick Access */}
      <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <Phone className="h-5 w-5" />
            Emergency Quick Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => handleEmergencyCall("112")} className="bg-red-600 hover:bg-red-700 text-white h-12">
              <Phone className="h-4 w-4 mr-2" />
              Call 112
            </Button>
            <Button
              onClick={() => handleEmergencyCall("100")}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 h-12"
            >
              <Shield className="h-4 w-4 mr-2" />
              Police (100)
            </Button>
            <Button
              onClick={() => handleEmergencyCall("108")}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 h-12"
            >
              <Hospital className="h-4 w-4 mr-2" />
              Ambulance (108)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Safety Map
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-0">
              {mapError ? (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <div>
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">{mapError}</p>
                    <Button onClick={getCurrentLocation} className="mt-4 bg-transparent" variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      Retry Location
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg overflow-hidden">
                  {/* Map Placeholder - In production, replace with actual map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">In production, this would show a live map with:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Your current location (blue dot)</li>
                        <li>• Safe zones (green circles)</li>
                        <li>• Restricted zones (red circles)</li>
                        <li>• Emergency services nearby</li>
                      </ul>
                    </div>
                  </div>

                  {/* Location Status */}
                  {userLocation && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">Your Location</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Accuracy: ±{Math.round(userLocation.accuracy)}m
                      </div>
                    </div>
                  )}

                  {/* Zone Indicators */}
                  <div className="absolute bottom-4 left-4 space-y-2">
                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Safe Zones ({safeZones.length})</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full text-sm">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Restricted Zones ({restrictedZones.length})</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location Status</span>
                  <Badge variant={userLocation ? "default" : "secondary"}>{userLocation ? "Active" : "Inactive"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Safety Zones</span>
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    {safeZones.length} Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Restricted Areas</span>
                  <Badge variant="outline" className="text-red-600 border-red-300">
                    {restrictedZones.length} Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safe Zones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Shield className="h-5 w-5" />
                Safe Zones
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {safeZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950/20 cursor-pointer hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors"
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800 dark:text-green-300">{zone.name}</h4>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">{zone.description}</p>
                      </div>
                      {userLocation && (
                        <Badge variant="outline" className="text-xs ml-2">
                          {formatDistance(calculateDistance(zone))}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {safeZones.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No safe zones found in your area</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Restricted Zones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Restricted Zones
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {restrictedZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20 cursor-pointer hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors"
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-red-800 dark:text-red-300">{zone.name}</h4>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{zone.description}</p>
                        {zone.emergencyContacts && (
                          <div className="text-xs text-red-500 mt-2">
                            Emergency: {zone.emergencyContacts.join(", ")}
                          </div>
                        )}
                      </div>
                      {userLocation && (
                        <Badge variant="outline" className="text-xs ml-2">
                          {formatDistance(calculateDistance(zone))}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {restrictedZones.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No restricted zones found in your area
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zone Details Modal */}
      {selectedZone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedZone.type === "safe" ? (
                  <Shield className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                {selectedZone.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Badge variant={selectedZone.type === "safe" ? "default" : "destructive"} className="mb-2">
                    {selectedZone.type === "safe" ? "Safe Zone" : "Restricted Zone"}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{selectedZone.description}</p>
                </div>

                {selectedZone.alertMessage && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">{selectedZone.alertMessage}</p>
                  </div>
                )}

                {selectedZone.emergencyContacts && (
                  <div>
                    <h4 className="font-medium mb-2">Emergency Contacts:</h4>
                    <div className="space-y-1">
                      {selectedZone.emergencyContacts.map((contact, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleEmergencyCall(contact.split(":")[1]?.trim() || contact)}
                          className="w-full justify-start"
                        >
                          <Phone className="h-3 w-3 mr-2" />
                          {contact}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={() => setSelectedZone(null)} variant="outline" className="flex-1">
                    Close
                  </Button>
                  {userLocation && (
                    <Button
                      onClick={() => {
                        const distance = formatDistance(calculateDistance(selectedZone))
                        alert(`Distance to ${selectedZone.name}: ${distance}`)
                      }}
                      className="flex-1"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
