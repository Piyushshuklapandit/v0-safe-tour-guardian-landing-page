import { jwtVerify } from "jose"
import type { NextRequest } from "next/server"
import { Role } from "./safety-types"

const encoder = new TextEncoder()

export interface AuthContext {
  sub: string
  role: Role
  lang?: "en" | "hi"
}

export async function verifyAuth(req: NextRequest): Promise<AuthContext | null> {
  const auth = req.headers.get("authorization")
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null
  const secret = process.env.JWT_SECRET
  if (!token || !secret) return null
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret))
    const role = (payload.role as Role) || Role.Tourist
    const sub = (payload.sub as string) || "anon"
    const lang = (payload.lang as "en" | "hi") || "en"
    return { sub, role, lang }
  } catch {
    return null
  }
}

export function requireRole(ctx: AuthContext | null, allowed: Role[]): asserts ctx is AuthContext {
  if (!ctx || !allowed.includes(ctx.role)) {
    const err: any = new Error("Unauthorized")
    err.status = 401
    throw err
  }
}
