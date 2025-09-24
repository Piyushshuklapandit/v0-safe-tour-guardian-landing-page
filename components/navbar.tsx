"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Volume2, AlertTriangle, Plus, Minus } from "lucide-react"
import { useTheme } from "next-themes"
import { AuthModal } from "@/components/auth-modal"
import { LanguageToggle } from "@/components/language-toggle"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [fontSize, setFontSize] = useState(16)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Map Demo", href: "#map-demo" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Benefits", href: "#benefits" },
    { name: "Team", href: "#team" },
    { name: "TourFriend", href: "/tourfriend" },
    { name: "Contact", href: "#contact" },
  ]

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24))
    document.documentElement.style.fontSize = `${Math.min(fontSize + 2, 24)}px`
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12))
    document.documentElement.style.fontSize = `${Math.max(fontSize - 2, 12)}px`
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b-4 border-orange-500 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center border-3 border-orange-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/travomate-logo.png"
                    alt="TravoMate Logo"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="text-white">
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-200 via-orange-300 to-blue-200 bg-clip-text text-transparent">
                  TravoMate
                </h1>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-orange-300 transition-all duration-300 text-sm font-semibold px-4 py-3 rounded-lg hover:bg-blue-800/50 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-orange-300 transition-all duration-300 text-sm font-semibold px-4 py-3 rounded-lg hover:bg-blue-800/50 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                  </Link>
                ),
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Accessibility Controls Group */}
              <div className="flex items-center space-x-2 bg-blue-800/50 rounded-xl p-2 border border-blue-700">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseFontSize}
                    className="text-white hover:bg-blue-700 p-2 rounded-lg transition-all duration-200"
                    title="Decrease Font Size"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseFontSize}
                    className="text-white hover:bg-blue-700 p-2 rounded-lg transition-all duration-200"
                    title="Increase Font Size"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="w-px h-6 bg-blue-600"></div>

                <LanguageToggle />

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700 p-2 rounded-lg transition-all duration-200"
                  title="Voice Guide"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-white hover:bg-blue-700 p-2 rounded-lg transition-all duration-200"
                  title="Toggle Theme"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal("signin")}
                  className="text-white hover:bg-blue-800 font-medium px-4 py-2 rounded-lg border border-blue-600 hover:border-orange-400 transition-all duration-300"
                >
                  Sign In
                </Button>

                <Button
                  onClick={() => openAuthModal("signup")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-400"
                >
                  Register
                </Button>
              </div>

              <Link href="/sos">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-400 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-red-400 opacity-30 animate-ping rounded-lg"></div>
                  <AlertTriangle className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">SOS</span>
                </Button>
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <Link href="/sos">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-lg shadow-lg relative"
                >
                  <div className="absolute inset-0 bg-red-400 opacity-30 animate-ping rounded-lg"></div>
                  <AlertTriangle className="w-4 h-4 relative z-10" />
                </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800 rounded-lg">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-gradient-to-b from-blue-900 to-blue-800 text-white border-l-4 border-orange-500"
                >
                  <div className="flex flex-col space-y-6 mt-8">
                    <div className="space-y-2">
                      {navItems.map((item) =>
                        item.href.startsWith("#") ? (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block text-lg font-semibold text-white hover:text-orange-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-blue-800/50 border-l-4 border-transparent hover:border-orange-400"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-lg font-semibold text-white hover:text-orange-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-blue-800/50 border-l-4 border-transparent hover:border-orange-400"
                          >
                            {item.name}
                          </Link>
                        ),
                      )}
                    </div>

                    <div className="flex flex-col space-y-4 pt-6 border-t-2 border-blue-700">
                      <Button
                        variant="ghost"
                        onClick={() => openAuthModal("signin")}
                        className="text-white justify-start font-medium py-3 px-4 rounded-lg border border-blue-600 hover:border-orange-400 hover:bg-blue-800/50 transition-all duration-300"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => openAuthModal("signup")}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
                      >
                        Register
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
