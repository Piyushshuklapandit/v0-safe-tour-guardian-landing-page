"use client"

import { useEffect, useState, useRef } from "react"
import type { Zone } from "@/app/api/zones/route"

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
        if (zone && onZoneEnter) {
          console.log("[v0] Entered zone:", zone.name)
          onZoneEnter(zone)
        }
      }
    })

    // Check for zone exits
    previousZonesRef.current.forEach((zoneId) => {
      if (!currentZoneIds.has(zoneId)) {
        const zone = zones.find((z) => z.id === zoneId)
        if (zone && onZoneExit) {
          console.log("[v0] Exited zone:", zone.name)
          onZoneExit(zone)
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
  }, [currentLocation?.latitude, currentLocation?.longitude])

  // This component doesn't render anything visible
  return null
}

// Hook for using geo-fence watcher in components
export function useGeoFenceWatcher() {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null)
  const [activeZones, setActiveZones] = useState<Zone[]>([])
  const [isWatching, setIsWatching] = useState(false)

  const handleZoneEnter = (zone: Zone) => {
    // Trigger zone entry alert
    if (zone.type === "restricted") {
      // Show critical alert for restricted zones
      showZoneAlert(zone, "enter")
    } else {
      // Show friendly notification for safe zones
      showZoneNotification(zone, "enter")
    }
  }

  const handleZoneExit = (zone: Zone) => {
    showZoneNotification(zone, "exit")
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

// Alert functions
function showZoneAlert(zone: Zone, action: "enter" | "exit") {
  // Create critical alert for restricted zones
  const alertDiv = document.createElement("div")
  alertDiv.className = `
    fixed top-4 left-1/2 transform -translate-x-1/2 z-50
    bg-red-600 text-white p-4 rounded-lg shadow-lg
    animate-pulse border-2 border-red-400
    max-w-md w-full mx-4
  `

  alertDiv.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="text-2xl">⚠️</div>
      <div>
        <div class="font-bold text-lg">RESTRICTED ZONE ALERT</div>
        <div class="text-sm">${zone.alertMessage || `You have ${action}ed ${zone.name}`}</div>
        ${
          zone.emergencyContacts
            ? `
          <div class="mt-2 text-xs">
            Emergency: ${zone.emergencyContacts.join(", ")}
          </div>
        `
            : ""
        }
      </div>
    </div>
  `

  document.body.appendChild(alertDiv)

  // Play alert sound and vibrate
  try {
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }

    // Play alert sound
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
    audio.play().catch(() => {}) // Ignore errors if audio fails
  } catch (error) {
    console.log("[v0] Alert effects not supported:", error)
  }

  // Remove alert after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv)
    }
  }, 5000)
}

function showZoneNotification(zone: Zone, action: "enter" | "exit") {
  // Create friendly notification for safe zones
  const notificationDiv = document.createElement("div")
  const isEntering = action === "enter"
  const bgColor = zone.type === "safe" ? "bg-green-600" : "bg-blue-600"

  notificationDiv.className = `
    fixed top-4 right-4 z-50
    ${bgColor} text-white p-4 rounded-lg shadow-lg
    transform transition-all duration-300 ease-in-out
    max-w-sm w-full
  `

  notificationDiv.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="text-xl">${zone.type === "safe" ? "✅" : "📍"}</div>
      <div>
        <div class="font-semibold">${isEntering ? "Entered" : "Exited"} ${zone.type === "safe" ? "Safe Zone" : "Zone"}</div>
        <div class="text-sm opacity-90">${zone.name}</div>
        ${
          zone.description && isEntering
            ? `
          <div class="text-xs opacity-75 mt-1">${zone.description}</div>
        `
            : ""
        }
      </div>
    </div>
  `

  document.body.appendChild(notificationDiv)

  // Remove notification after 4 seconds
  setTimeout(() => {
    if (notificationDiv.parentNode) {
      notificationDiv.parentNode.removeChild(notificationDiv)
    }
  }, 4000)
}
