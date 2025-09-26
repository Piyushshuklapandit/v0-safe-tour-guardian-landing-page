import { Navbar } from "@/components/navbar"
import { SafetyMapComponent } from "@/components/safety-map-component"
import { Footer } from "@/components/footer"

export default function SafetyMapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <SafetyMapComponent />
      </main>
      <Footer />
    </div>
  )
}
