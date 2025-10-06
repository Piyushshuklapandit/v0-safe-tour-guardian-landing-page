export enum Role {
  Tourist = "tourist",
  Operator = "operator",
  Admin = "admin",
}

export enum ZoneType {
  Safe = "safe",
  Restricted = "restricted",
  Caution = "caution",
}

export enum Priority {
  Info = "info",
  Warning = "warning",
  Critical = "critical",
}

export type Lang = "en" | "hi"

export interface LatLng {
  lat: number
  lng: number
}

export interface Tourist {
  id: string
  name: string
  avatarUrl?: string
  position: LatLng
  lastSeenAt: string // ISO
}

export interface Zone {
  id: string
  name: string
  type: ZoneType
  polygon: LatLng[] // simple polygon for demo
  updatedAt: string
}

export interface EmergencyPoint {
  id: string
  name: string
  type: "police" | "hospital" | "sos-post" | "safe-hub"
  location: LatLng
}

export interface Incident {
  id: string
  title: string
  description?: string
  position: LatLng
  priority: Priority
  createdAt: string
}

export interface DensityCell {
  id: string
  bounds: { nw: LatLng; se: LatLng }
  value: number // 0-1 normalized density
}

export type EventKind = "tourist:position" | "incident:new" | "zone:update" | "alert:geo-fence" | "system:heartbeat"

export interface RealtimeEvent<T = unknown> {
  id: string
  kind: EventKind
  data: T
  ts: number
  priority?: Priority
}

export interface GeoFenceAlertData {
  zoneId: string
  zoneName: string
  zoneType: ZoneType
  touristId?: string
  transition: "enter" | "exit"
}

export const isCritical = (p?: Priority) => p === Priority.Critical
