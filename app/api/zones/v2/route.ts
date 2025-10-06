import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { type Zone, ZoneType } from "@/lib/safety-types"

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req) // optional for read
  const now = new Date().toISOString()

  const zones: Zone[] = [
    {
      id: "safe-central",
      name: "Central Safe Zone",
      type: ZoneType.Safe,
      polygon: [
        { lat: 28.6202, lng: 77.2109 },
        { lat: 28.6225, lng: 77.2209 },
        { lat: 28.6151, lng: 77.2242 },
        { lat: 28.612, lng: 77.215 },
      ],
      updatedAt: now,
    },
    {
      id: "restricted-red",
      name: "Restricted Security Perimeter",
      type: ZoneType.Restricted,
      polygon: [
        { lat: 28.625, lng: 77.205 },
        { lat: 28.629, lng: 77.213 },
        { lat: 28.623, lng: 77.218 },
        { lat: 28.619, lng: 77.21 },
      ],
      updatedAt: now,
    },
  ]

  return NextResponse.json(
    { zones, auth: auth ? { sub: auth.sub, role: auth.role } : null },
    { headers: { "cache-control": "no-store" } },
  )
}
