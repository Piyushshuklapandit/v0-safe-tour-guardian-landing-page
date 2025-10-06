"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SafetyMapLayers } from "./safety-map-layers"
import { Badge } from "@/components/ui/badge"
import { useRealtimeEvents } from "@/hooks/use-realtime-events"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function SafetyMapDashboard() {
  const { data: incidentsData } = useSWR("/api/incidents", fetcher, { refreshInterval: 5000 })
  const { connected, events } = useRealtimeEvents()
  const recent = incidentsData?.incidents?.slice(0, 5) ?? []
  const criticalCount = events.filter((e: any) => e.priority === 2 /* Priority.Critical enum value */).length

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SafetyMapLayers />
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="text-balance">Recent Incidents</CardTitle>
            <CardDescription>Live updates every few seconds</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={connected ? "default" : "secondary"} aria-label="Realtime connection status">
              {connected ? "Live" : "Offline"}
            </Badge>
            {criticalCount > 0 ? <Badge variant="destructive">Critical: {criticalCount}</Badge> : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent incidents.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map((inc: any) => (
                <li
                  key={inc.id}
                  className="rounded-md border p-3 leading-tight"
                  aria-label={`${inc.type} incident, severity ${inc.severity}, status ${inc.status}`}
                >
                  <div className="text-sm font-medium">
                    {inc.type} • {inc.severity}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(inc.timestamp).toLocaleString()} • {inc.status}
                  </div>
                  {inc.description ? <div className="text-sm mt-1">{inc.description}</div> : null}
                  <div className="text-xs mt-1">
                    Lat {inc.lat.toFixed(3)}, Lng {inc.lng.toFixed(3)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
