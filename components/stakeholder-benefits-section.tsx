"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Users, Zap, Globe, Award } from "lucide-react"

export function StakeholderBenefitsSection() {
  const stakeholderGroups = [
    {
      title: "Government & Tourism Boards",
      icon: Shield,
      color: "var(--india-blue)",
      benefits: [
        {
          title: "Enhanced Tourism Revenue",
          description: "Increase tourist confidence leading to 25% higher visitor numbers",
          metric: "+25% visitors",
        },
        {
          title: "Reduced Emergency Costs",
          description: "Proactive prevention reduces emergency response expenditure by 40%",
          metric: "40% cost reduction",
        },
        {
          title: "Digital India Alignment",
          description: "Supports national digitization goals with blockchain and AI integration",
          metric: "100% digital",
        },
      ],
    },
    {
      title: "Tourism Industry",
      icon: TrendingUp,
      color: "var(--india-saffron)",
      benefits: [
        {
          title: "Improved Safety Ratings",
          description: "Higher safety scores attract premium tourists and international visitors",
          metric: "4.8/5 safety rating",
        },
        {
          title: "Operational Efficiency",
          description: "Automated monitoring reduces manual oversight costs by 60%",
          metric: "60% efficiency gain",
        },
        {
          title: "Insurance Benefits",
          description: "Lower incident rates lead to reduced insurance premiums",
          metric: "30% lower premiums",
        },
      ],
    },
    {
      title: "Local Communities",
      icon: Users,
      color: "var(--india-green)",
      benefits: [
        {
          title: "Employment Opportunities",
          description: "Creates jobs in tech support, monitoring, and emergency response",
          metric: "500+ jobs created",
        },
        {
          title: "Community Safety",
          description: "Enhanced security infrastructure benefits local residents too",
          metric: "100% coverage",
        },
        {
          title: "Economic Growth",
          description: "Increased tourism drives local business growth and development",
          metric: "35% business growth",
        },
      ],
    },
  ]

  const overallImpact = [
    { icon: Globe, title: "National Tourism Growth", value: "₹2.5L Cr", description: "Additional tourism revenue" },
    { icon: Shield, title: "Safety Incidents", value: "85%", description: "Reduction in tourist incidents" },
    { icon: Zap, title: "Response Time", value: "3x", description: "Faster emergency response" },
    { icon: Award, title: "International Recognition", value: "#1", description: "Safest tourism destination" },
  ]

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-[color:var(--india-blue)] border-[color:var(--india-blue)]">
            Stakeholder Impact
          </Badge>
          <h2 className="text-4xl font-bold font-serif mb-4 gradient-text-india">Benefits for Every Stakeholder</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SafeTour Guardian creates value across the entire tourism ecosystem, from government agencies to local
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {stakeholderGroups.map((group, groupIndex) => (
            <Card
              key={group.title}
              className="group hover:shadow-xl transition-all duration-300 animate-fade-in-scale"
              style={{ animationDelay: `${groupIndex * 0.2}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-muted/50 w-fit">
                  <group.icon className="h-8 w-8" style={{ color: group.color }} />
                </div>
                <CardTitle className="text-xl font-serif">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {group.benefits.map((benefit, benefitIndex) => (
                  <div key={benefit.title} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{benefit.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {benefit.metric}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[color:var(--india-blue)]/10 via-[color:var(--india-saffron)]/10 to-[color:var(--india-green)]/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-serif mb-2">National Impact Projection</h3>
            <p className="text-muted-foreground">Expected outcomes from nationwide SafeTour Guardian implementation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overallImpact.map((impact, index) => (
              <div
                key={impact.title}
                className="text-center p-6 bg-background/50 rounded-xl hover:bg-background/70 transition-colors animate-bounce-gentle"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="mx-auto mb-4 p-3 rounded-full bg-[color:var(--india-blue)]/10 w-fit">
                  <impact.icon className="h-6 w-6 text-[color:var(--india-blue)]" />
                </div>
                <div className="text-3xl font-bold text-[color:var(--india-blue)] mb-1">{impact.value}</div>
                <div className="font-semibold text-sm mb-1">{impact.title}</div>
                <div className="text-xs text-muted-foreground">{impact.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 p-4 bg-[color:var(--india-green)]/10 rounded-lg">
            <Award className="h-5 w-5 text-[color:var(--india-green)]" />
            <span className="text-sm font-medium">
              Supporting India's vision of becoming the world's safest tourism destination by 2030
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
