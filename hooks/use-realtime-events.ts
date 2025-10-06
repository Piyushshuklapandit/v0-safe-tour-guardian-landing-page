"use client"

import { useEffect, useRef, useState } from "react"
import { Priority, type RealtimeEvent } from "@/lib/safety-types"

export function useRealtimeEvents() {
  const [events, setEvents] = useState<RealtimeEvent[]>([])
  const [connected, setConnected] = useState(false)
  const sourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const src = new EventSource("/api/events")
    sourceRef.current = src

    src.onopen = () => setConnected(true)
    src.onerror = () => setConnected(false)
    src.onmessage = (e) => {
      try {
        const ev: RealtimeEvent = JSON.parse(e.data)
        setEvents((prev) => [ev, ...prev].slice(0, 200))
        if (ev.priority === Priority.Critical) {
          // vibration and sound for critical alerts
          if (typeof window !== "undefined" && "vibrate" in navigator) navigator.vibrate(200)
          const audio = new Audio("/sounds/alert-critical.mp3")
          audio.volume = 0.7
          audio.play().catch(() => {})
        }
      } catch {}
    }

    return () => {
      src.close()
    }
  }, [])

  return { events, connected }
}
