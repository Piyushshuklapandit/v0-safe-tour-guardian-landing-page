import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import type { Priority } from "@/lib/safety-types"

type Action = "call:112" | "navigate:safe-zone" | "notify:contacts" | "open:nearest-police" | "open:nearest-hospital"

interface AuditEvent {
  id: string
  action: Action
  ts: string
  priority?: Priority
  meta?: Record<string, unknown>
  actor?: { sub: string; role: string }
}

const LOGS: AuditEvent[] = []

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req) // optional
  const body = (await req.json()) as Omit<AuditEvent, "id" | "ts" | "actor">
  const ev: AuditEvent = {
    id: crypto.randomUUID(),
    action: body.action,
    ts: new Date().toISOString(),
    priority: body.priority,
    meta: body.meta,
    actor: auth ? { sub: auth.sub, role: auth.role } : undefined,
  }
  LOGS.unshift(ev)
  return NextResponse.json({ ok: true, id: ev.id })
}

export async function GET() {
  return NextResponse.json({ logs: LOGS.slice(0, 100) })
}
