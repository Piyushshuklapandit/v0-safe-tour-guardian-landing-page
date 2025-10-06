import SafetyMapDashboard from "@/components/safety-map-dashboard"

export const metadata = {
  title: "Safety Map Dashboard • TravoMate",
  description: "Interactive layers, live incidents, and accessibility-friendly controls.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-balance mb-4">Safety Map Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Monitor geo-fenced zones, live incidents, and tourist density. Use the layers panel to toggle overlays.
      </p>
      <SafetyMapDashboard />
    </main>
  )
}
