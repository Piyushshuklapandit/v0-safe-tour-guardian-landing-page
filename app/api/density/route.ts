type DensityPoint = {
  lat: number
  lng: number
  weight: number // 0..1 normalized
}

export async function GET(request?: Request) {
  // simple mock distribution across a few metros
  const points: DensityPoint[] = [
    { lat: 28.6139, lng: 77.209, weight: 0.7 }, // Delhi
    { lat: 19.076, lng: 72.8777, weight: 0.9 }, // Mumbai
    { lat: 12.9716, lng: 77.5946, weight: 0.5 }, // Bengaluru
    { lat: 22.5726, lng: 88.3639, weight: 0.4 }, // Kolkata
    { lat: 28.4595, lng: 77.0266, weight: 0.3 }, // Gurugram
  ]

  const url = request ? new URL(request.url) : null
  const nwLat = url ? Number(url.searchParams.get("nwLat") ?? Number.NaN) : Number.NaN
  const nwLng = url ? Number(url.searchParams.get("nwLng") ?? Number.NaN) : Number.NaN
  const seLat = url ? Number(url.searchParams.get("seLat") ?? Number.NaN) : Number.NaN
  const seLng = url ? Number(url.searchParams.get("seLng") ?? Number.NaN) : Number.NaN

  let filtered = points
  if ([nwLat, nwLng, seLat, seLng].every((v) => !Number.isNaN(v))) {
    filtered = points.filter((p) => p.lat <= nwLat && p.lat >= seLat && p.lng >= nwLng && p.lng <= seLng)
  }

  return new Response(JSON.stringify({ points: filtered, ts: Date.now() }), {
    status: 200,
    headers: { "cache-control": "no-store", "content-type": "application/json" },
  })
}
