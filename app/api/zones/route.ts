import { NextResponse } from "next/server"

export interface Zone {
  id: string
  name: string
  type: "safe" | "restricted"
  latitude: number
  longitude: number
  radius: number // in meters
  description: string
  alertMessage?: string
  emergencyContacts?: string[]
}

// Mock zone data for major Indian tourist destinations
const zones: Zone[] = [
  // Delhi - Safe Zones
  {
    id: "delhi-red-fort",
    name: "Red Fort Area",
    type: "safe",
    latitude: 28.6562,
    longitude: 77.241,
    radius: 500,
    description: "Well-patrolled tourist area with security personnel and emergency services nearby.",
  },
  {
    id: "delhi-india-gate",
    name: "India Gate",
    type: "safe",
    latitude: 28.6129,
    longitude: 77.2295,
    radius: 800,
    description: "Central Delhi landmark with high security and tourist police presence.",
  },

  // Delhi - Restricted Zones
  {
    id: "delhi-old-delhi-night",
    name: "Old Delhi (Night Hours)",
    type: "restricted",
    latitude: 28.6506,
    longitude: 77.2334,
    radius: 1000,
    description: "Crowded area with limited visibility during night hours.",
    alertMessage: "CAUTION: You are entering a restricted zone. Exercise extra caution and stay in groups.",
    emergencyContacts: ["112", "Delhi Police: 100"],
  },

  // Mumbai - Safe Zones
  {
    id: "mumbai-gateway-of-india",
    name: "Gateway of India",
    type: "safe",
    latitude: 18.922,
    longitude: 72.8347,
    radius: 600,
    description: "Major tourist hub with constant police patrolling and emergency services.",
  },
  {
    id: "mumbai-marine-drive",
    name: "Marine Drive",
    type: "safe",
    latitude: 18.9439,
    longitude: 72.8236,
    radius: 1200,
    description: "Well-lit promenade with regular security patrols and CCTV coverage.",
  },

  // Mumbai - Restricted Zones
  {
    id: "mumbai-dharavi",
    name: "Dharavi Area",
    type: "restricted",
    latitude: 19.037,
    longitude: 72.857,
    radius: 2000,
    description: "Dense residential area with narrow lanes and limited emergency access.",
    alertMessage:
      "WARNING: You are entering a high-risk area. Please contact local authorities if assistance is needed.",
    emergencyContacts: ["112", "Mumbai Police: 100", "Tourist Helpline: 1363"],
  },

  // Goa - Safe Zones
  {
    id: "goa-baga-beach",
    name: "Baga Beach",
    type: "safe",
    latitude: 15.5557,
    longitude: 73.7516,
    radius: 800,
    description: "Popular beach destination with lifeguards and tourist police.",
  },
  {
    id: "goa-calangute-beach",
    name: "Calangute Beach",
    type: "safe",
    latitude: 15.5435,
    longitude: 73.7516,
    radius: 1000,
    description: "Main beach area with excellent safety infrastructure and emergency services.",
  },

  // Rajasthan - Safe Zones
  {
    id: "jaipur-amber-fort",
    name: "Amber Fort",
    type: "safe",
    latitude: 26.9855,
    longitude: 75.8513,
    radius: 700,
    description: "UNESCO World Heritage site with dedicated security and tourist assistance.",
  },
  {
    id: "jaipur-city-palace",
    name: "City Palace Jaipur",
    type: "safe",
    latitude: 26.926,
    longitude: 75.8237,
    radius: 500,
    description: "Royal palace complex with comprehensive security arrangements.",
  },

  // Rajasthan - Restricted Zones
  {
    id: "rajasthan-desert-remote",
    name: "Remote Desert Area",
    type: "restricted",
    latitude: 27.0238,
    longitude: 73.3119,
    radius: 5000,
    description: "Remote desert region with limited connectivity and emergency services.",
    alertMessage:
      "DANGER: You are entering a remote area with limited emergency services. Ensure you have adequate supplies and communication.",
    emergencyContacts: ["112", "Rajasthan Police: 100", "Desert Rescue: 108"],
  },

  // Kerala - Safe Zones
  {
    id: "kerala-munnar",
    name: "Munnar Hill Station",
    type: "safe",
    latitude: 10.0889,
    longitude: 77.0595,
    radius: 2000,
    description: "Popular hill station with good infrastructure and emergency services.",
  },
  {
    id: "kerala-alleppey-backwaters",
    name: "Alleppey Backwaters",
    type: "safe",
    latitude: 9.4981,
    longitude: 76.3388,
    radius: 1500,
    description: "Tourist backwater destination with boat safety measures and rescue services.",
  },

  // Agra - Safe Zone
  {
    id: "agra-taj-mahal",
    name: "Taj Mahal",
    type: "safe",
    latitude: 27.1751,
    longitude: 78.0421,
    radius: 1000,
    description: "World Heritage monument with highest level of security and tourist facilities.",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius")

    // If coordinates provided, filter zones within range
    if (lat && lng && radius) {
      const userLat = Number.parseFloat(lat)
      const userLng = Number.parseFloat(lng)
      const searchRadius = Number.parseFloat(radius)

      const nearbyZones = zones.filter((zone) => {
        const distance = calculateDistance(userLat, userLng, zone.latitude, zone.longitude)
        return distance <= searchRadius
      })

      return NextResponse.json({
        success: true,
        zones: nearbyZones,
        total: nearbyZones.length,
        userLocation: { lat: userLat, lng: userLng },
        searchRadius,
      })
    }

    // Return all zones
    return NextResponse.json({
      success: true,
      zones,
      total: zones.length,
    })
  } catch (error) {
    console.error("Error fetching zones:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch zones" }, { status: 500 })
  }
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}
