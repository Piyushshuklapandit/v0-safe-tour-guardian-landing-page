"use client"

import { useEffect, useState, useRef } from "react"
import type { Zone } from "@/app/api/zones/route"
import { useSafetyAlerts } from "@/components/safety-alert-system"

interface GeoFenceWatcherProps {
  onZoneEnter?: (zone: Zone) => void
  onZoneExit?: (zone: Zone) => void
  onLocationUpdate?: (position: GeolocationPosition) => void
  onError?: (error: GeolocationPositionError) => void
}

interface LocationState {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export function GeoFenceWatcher({ onZoneEnter, onZoneExit, onLocationUpdate, onError }: GeoFenceWatcherProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationState | null>(null)
  const [activeZones, setActiveZones] = useState<Zone[]>([])
  const [allZones, setAllZones] = useState<Zone[]>([])
  const [isWatching, setIsWatching] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt">("prompt")

  const watchIdRef = useRef<number | null>(null)
  const previousZonesRef = useRef<Set<string>>(new Set())

  const { showZoneAlert } = useSafetyAlerts()

  // Fetch zones from API
  const fetchZones = async (lat?: number, lng?: number) => {
    try {
      const url =
        lat && lng
          ? `/api/zones?lat=${lat}&lng=${lng}&radius=50000` // 50km radius
          : "/api/zones"

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setAllZones(data.zones)
        return data.zones
      }
    } catch (error) {
      console.error("[v0] Error fetching zones:", error)
    }
    return []
  }

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distance in meters
  }

  // Check which zones the user is currently in
  const checkZones = (location: LocationState, zones: Zone[]) => {
    const currentZoneIds = new Set<string>()
    const currentActiveZones: Zone[] = []

    zones.forEach((zone) => {
      const distance = calculateDistance(location.latitude, location.longitude, zone.latitude, zone.longitude)

      if (distance <= zone.radius) {
        currentZoneIds.add(zone.id)
        currentActiveZones.push(zone)
      }
    })

    // Check for zone entries
    currentZoneIds.forEach((zoneId) => {
      if (!previousZonesRef.current.has(zoneId)) {
        const zone = zones.find((z) => z.id === zoneId)
        if (zone) {
          onZoneEnter?.(zone)
          showZoneAlert(zone, "enter")
        }
      }
    })

    // Check for zone exits
    previousZonesRef.current.forEach((zoneId) => {
      if (!currentZoneIds.has(zoneId)) {
        const zone = zones.find((z) => z.id === zoneId)
        if (zone) {
          onZoneExit?.(zone)
          showZoneAlert(zone, "exit")
        }
      }
    })

    previousZonesRef.current = currentZoneIds
    setActiveZones(currentActiveZones)
  }

  // Handle location updates
  const handleLocationUpdate = (position: GeolocationPosition) => {
    const newLocation: LocationState = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    }

    console.log("[v0] Location updated:", newLocation)
    setCurrentLocation(newLocation)

    if (onLocationUpdate) {
      onLocationUpdate(position)
    }

    // Check zones with current location
    if (allZones.length > 0) {
      checkZones(newLocation, allZones)
    }
  }

  // Handle geolocation errors
  const handleLocationError = (error: GeolocationPositionError) => {
    console.error("[v0] Geolocation error:", error)
    setIsWatching(false)

    if (onError) {
      onError(error)
    }
  }

  // Start watching location
  const startWatching = async () => {
    if (!navigator.geolocation) {
      console.error("[v0] Geolocation not supported")
      return
    }

    try {
      // Check permission
      const permission = await navigator.permissions.query({ name: "geolocation" })
      setPermissionStatus(permission.state)

      if (permission.state === "denied") {
        console.error("[v0] Geolocation permission denied")
        return
      }

      // Fetch zones first
      await fetchZones()

      // Start watching position
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000, // 30 seconds
      }

      watchIdRef.current = navigator.geolocation.watchPosition(handleLocationUpdate, handleLocationError, options)

      setIsWatching(true)
      console.log("[v0] Started geo-fence watching")
    } catch (error) {
      console.error("[v0] Error starting geo-fence watcher:", error)
    }
  }

  // Stop watching location
  const stopWatching = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsWatching(false)
    console.log("[v0] Stopped geo-fence watching")
  }

  // Initialize on mount
  useEffect(() => {
    startWatching()

    // Cleanup on unmount
    return () => {
      stopWatching()
    }
  }, [])

  // Update zones when location changes significantly
  useEffect(() => {
    if (currentLocation) {
      // Fetch nearby zones when location updates
      fetchZones(currentLocation.latitude, currentLocation.longitude)
    }
  }, [currentLocation])

  // This component doesn't render anything visible
  return null
}

// Hook for using geo-fence watcher in components
export function useGeoFenceWatcher() {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null)
  const [activeZones, setActiveZones] = useState<Zone[]>([])
  const [isWatching, setIsWatching] = useState(false)

  const { showZoneAlert } = useSafetyAlerts()

  const handleZoneEnter = (zone: Zone) => {
    showZoneAlert(zone, "enter")
  }

  const handleZoneExit = (zone: Zone) => {
    showZoneAlert(zone, "exit")
  }

  const handleLocationUpdate = (position: GeolocationPosition) => {
    setCurrentLocation(position)
  }

  const handleError = (error: GeolocationPositionError) => {
    console.error("[v0] Geo-fence error:", error)
  }

  return {
    currentLocation,
    activeZones,
    isWatching,
    GeoFenceWatcher: () => (
      <GeoFenceWatcher
        onZoneEnter={handleZoneEnter}
        onZoneExit={handleZoneExit}
        onLocationUpdate={handleLocationUpdate}
        onError={handleError}
      />
    ),
  }
}
