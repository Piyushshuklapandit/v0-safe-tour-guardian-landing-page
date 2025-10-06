import SafetyMapDashboard from "@/components/safety-map-dashboard"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-balance">TravoMate Live Safety Map</h1>
        <AccessibilityControls />
      </header>
      <SafetyMapDashboard />
    </main>
  )
}
