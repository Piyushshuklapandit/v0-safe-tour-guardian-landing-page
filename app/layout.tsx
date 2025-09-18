import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Merriweather } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TravoMate - Smart Tourist Safety & Incident Response System",
  description:
    "AI-powered tourist safety platform with geo-fencing, blockchain identity, and emergency response capabilities. Built for Smart India Hackathon.",
  generator: "TravoMate",
  keywords: "tourist safety, AI, blockchain, geo-fencing, emergency response, Smart India Hackathon, Digital India",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${merriweather.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
