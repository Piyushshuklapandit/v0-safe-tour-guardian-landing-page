import type { NextRequest } from "next/server"
import { Priority } from "@/lib/safety-types"

type Incident = {
  id: string
  type: "SOS" | "Medical" | "Police" | "Fire"
  severity: "low" | "medium" | "high" | "critical"
  lat: number
  lng: number
  status: "open" | "acknowledged" | "resolved"
  timestamp: string
  description?: string
  priority?: Priority
}

const INCIDENTS: Incident[] = [
  {
    id: "inc_001",
    type: "SOS",
    severity: "high",
    lat: 28.6139,
    lng: 77.209,
    status: "open",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    description: "Tourist pressed SOS near India Gate.",
    priority: Priority.Critical,
  },
  {
    id: "inc_002",
    type: "Medical",
    severity: "medium",
    lat: 19.076,
    lng: 72.8777,
    status: "acknowledged",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    description: "Minor injury reported near Gateway of India.",
    priority: Priority.Warning,
  },
]

export async function GET(request?: Request) {
  const url = request ? new URL(request.url) : null
  const limit = url ? Number(url.searchParams.get("limit") ?? "0") : 0
  const status = url?.searchParams.get("status") as Incident["status"] | null
  let list = INCIDENTS
  if (status) list = list.filter((i) => i.status === status)
  if (limit && limit > 0) list = list.slice(0, limit)
  return new Response(JSON.stringify({ incidents: list }), {
    status: 200,
    headers: { "cache-control": "no-store", "content-type": "application/json" },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, severity, lat, lng, description } = body as Partial<Incident>

    if (!type || !severity || typeof lat !== "number" || typeof lng !== "number") {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const priority =
      severity === "critical"
        ? Priority.Critical
        : severity === "high"
          ? Priority.Critical
          : severity === "medium"
            ? Priority.Warning
            : Priority.Info

    const newIncident: Incident = {
      id: `inc_${Date.now()}`,
      type: type as Incident["type"],
      severity: severity as Incident["severity"],
      lat,
      lng,
      description,
      status: "open",
      timestamp: new Date().toISOString(),
      priority,
    }
    INCIDENTS.unshift(newIncident)
    return Response.json({ incident: newIncident }, { status: 201, headers: { "cache-control": "no-store" } })
  } catch (e) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
