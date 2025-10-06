"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export type LayersState = {
  zones: boolean
  incidents: boolean
  density: boolean
}

export function SafetyMapLayers() {
  const [layers, setLayers] = useState<LayersState>({
    zones: true,
    incidents: true,
    density: false,
  })

  const { data: zonesData } = useSWR(layers.zones ? "/api/zones/v2" : null, fetcher)
  const { data: incidentsData } = useSWR(layers.incidents ? "/api/incidents" : null, fetcher, { refreshInterval: 5000 })
  const { data: densityData } = useSWR(layers.density ? "/api/density" : null, fetcher, { refreshInterval: 10000 })

  const zoneCount = zonesData?.zones?.length ?? 0
  const incidentCount = incidentsData?.incidents?.length ?? 0
  const densityCount = densityData?.points?.length ?? 0

  const legend = useMemo(
    () => [
      { label: "Safe Zone", color: "bg-[color:var(--chart-2)]" },
      { label: "Restricted Zone", color: "bg-[color:var(--chart-3)]" },
      { label: "Critical Zone", color: "bg-[color:var(--chart-4)]" },
      { label: "Incident", color: "bg-[color:var(--chart-1)]" },
      { label: "Density", color: "bg-[color:var(--muted-foreground)]" },
    ],
    [],
  )

  function toggleLayer(key: keyof LayersState) {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-balance">Map Layers & Live Data</CardTitle>
        <CardDescription>Toggle overlays and see live counts</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center justify-between p-3 rounded-md border">
            <span className="font-medium">Zones</span>
            <Switch
              checked={layers.zones}
              onCheckedChange={() => toggleLayer("zones")}
              aria-label="Toggle zones layer"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-md border">
            <span className="font-medium">Incidents</span>
            <Switch
              checked={layers.incidents}
              onCheckedChange={() => toggleLayer("incidents")}
              aria-label="Toggle incidents layer"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-md border">
            <span className="font-medium">Tourist Density</span>
            <Switch
              checked={layers.density}
              onCheckedChange={() => toggleLayer("density")}
              aria-label="Toggle density layer"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2" aria-live="polite">
          <Badge variant="secondary">Zones: {zoneCount}</Badge>
          <Badge variant="secondary">Incidents: {incidentCount}</Badge>
          <Badge variant="secondary">Density points: {densityCount}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 items-center" aria-label="Legend">
          {legend.map((l) => (
            <span key={l.label} className="inline-flex items-center gap-2">
              <span className={`inline-block h-3 w-3 rounded ${l.color}`} aria-hidden />
              <span className="text-sm">{l.label}</span>
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Tip: Use this panel along with the Safety Map to switch overlays and monitor live updates.
        </div>

        <div className="flex gap-2">
          <Button asChild variant="default">
            <a href="/safety-map">Open Safety Map</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="/safety-map/dashboard">Open Dashboard</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
