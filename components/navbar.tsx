"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Volume2, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import { AuthModal } from "@/components/auth-modal"
import { LanguageToggle } from "@/components/language-toggle"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Map Demo", href: "#map-demo" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Benefits", href: "#benefits" },
    { name: "Team", href: "#team" },
    { name: "TourFriend", href: "/tourfriend" },
    { name: "SOS", href: "/sos", isEmergency: true },
    { name: "Contact", href: "#contact" },
  ]

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 glass-morphism">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image src="/travomate-logo.png" alt="TravoMate Logo" width={40} height={40} className="rounded-full" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[color:var(--india-saffron)] rounded-full animate-pulse-glow"></div>
              </div>
              <Link href="/" className="text-xl font-bold font-serif gradient-text-india">
                TravoMate
              </Link>
              <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
                <span>•</span>
                <span className="text-[color:var(--digital-india)]">Digital India</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium text-muted-foreground hover:text-[color:var(--india-blue)] transition-colors relative group ${
                      item.isEmergency ? "text-red-600 hover:text-red-700 font-bold" : ""
                    }`}
                  >
                    {item.isEmergency && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--india-saffron)] transition-all group-hover:w-full ${
                        item.isEmergency ? "bg-red-500" : ""
                      }`}
                    ></span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium text-muted-foreground hover:text-[color:var(--india-blue)] transition-colors relative group ${
                      item.isEmergency ? "text-red-600 hover:text-red-700 font-bold" : ""
                    }`}
                  >
                    {item.isEmergency && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--india-saffron)] transition-all group-hover:w-full ${
                        item.isEmergency ? "bg-red-500" : ""
                      }`}
                    ></span>
                  </Link>
                ),
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle />
              <Button variant="ghost" size="icon" title="Voice Guide">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="ghost" onClick={() => openAuthModal("signin")}>
                Sign In
              </Button>
              <Button
                onClick={() => openAuthModal("signup")}
                className="bg-gradient-to-r from-[color:var(--india-blue)] to-[color:var(--india-saffron)] hover:opacity-90"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) =>
                      item.href.startsWith("#") ? (
                        <a
                          key={item.name}
                          href={item.href}
                          className={`text-lg font-medium text-muted-foreground hover:text-foreground transition-colors ${
                            item.isEmergency ? "text-red-600 hover:text-red-700 font-bold" : ""
                          }`}
                        >
                          {item.isEmergency && <AlertTriangle className="w-4 h-4 inline mr-2" />}
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`text-lg font-medium text-muted-foreground hover:text-foreground transition-colors ${
                            item.isEmergency ? "text-red-600 hover:text-red-700 font-bold" : ""
                          }`}
                        >
                          {item.isEmergency && <AlertTriangle className="w-4 h-4 inline mr-2" />}
                          {item.name}
                        </Link>
                      ),
                    )}
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <LanguageToggle />
                      <Button variant="ghost" onClick={() => openAuthModal("signin")}>
                        Sign In
                      </Button>
                      <Button onClick={() => openAuthModal("signup")}>Sign Up</Button>
                      <Button
                        variant="ghost"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="justify-start"
                      >
                        {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                        Toggle Theme
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
