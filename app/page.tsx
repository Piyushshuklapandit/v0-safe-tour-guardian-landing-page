import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { MapDemoSection } from "@/components/map-demo-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { TeamSection } from "@/components/team-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { StakeholderBenefitsSection } from "@/components/stakeholder-benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background ashoka-pattern">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MapDemoSection />
        <WhyChooseSection />
        <StorytellingSection />
        <CaseStudiesSection />
        <StakeholderBenefitsSection />
        <TestimonialsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}
