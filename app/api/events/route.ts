import type { NextRequest } from "next/server"
import { type RealtimeEvent, Priority, ZoneType } from "@/lib/safety-types"

export const runtime = "nodejs" // ensure timers work
export const dynamic = "force-dynamic"

function sseStream(controller: ReadableStreamDefaultController, encoder: TextEncoder, ev: RealtimeEvent) {
  const payload = `id: ${ev.id}\nevent: message\ndata: ${JSON.stringify(ev)}\n\n`
  controller.enqueue(encoder.encode(payload))
}

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder()
  let interval: any

  const stream = new ReadableStream({
    start(controller) {
      // initial hello
      sseStream(controller, encoder, {
        id: crypto.randomUUID(),
        kind: "system:heartbeat",
        data: { hello: true },
        ts: Date.now(),
      })

      interval = setInterval(() => {
        const now = Date.now()
        // mock incident occasionally
        if (Math.random() < 0.2) {
          sseStream(controller, encoder, {
            id: crypto.randomUUID(),
            kind: "incident:new",
            data: {
              id: crypto.randomUUID(),
              title: "Crowd surge reported",
              position: { lat: 28.622 + Math.random() * 0.01, lng: 77.212 + Math.random() * 0.01 },
            },
            priority: Math.random() > 0.5 ? Priority.Critical : Priority.Warning,
            ts: now,
          })
        }
        // mock geofence alert
        if (Math.random() < 0.15) {
          sseStream(controller, encoder, {
            id: crypto.randomUUID(),
            kind: "alert:geo-fence",
            data: {
              zoneId: "restricted-red",
              zoneName: "Restricted Security Perimeter",
              zoneType: ZoneType.Restricted,
              transition: Math.random() > 0.5 ? "enter" : "exit",
            },
            priority: Priority.Critical,
            ts: now,
          })
        }
        // heartbeat
        sseStream(controller, encoder, {
          id: crypto.randomUUID(),
          kind: "system:heartbeat",
          data: { t: now },
          ts: now,
        })
      }, 3000)
    },
    cancel() {
      if (interval) clearInterval(interval)
    },
  })

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-store",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  })
}
