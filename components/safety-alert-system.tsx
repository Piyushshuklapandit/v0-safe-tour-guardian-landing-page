"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Phone, X, MapPin, Clock } from "lucide-react"
import type { Zone } from "@/app/api/zones/route"

interface SafetyAlert {
  id: string
  type: "zone-enter" | "zone-exit" | "emergency" | "safety-tip"
  zone?: Zone
  message: string
  timestamp: Date
  priority: "low" | "medium" | "high" | "critical"
  autoClose?: boolean
  duration?: number
}

export function SafetyAlertSystem() {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Add new alert
  const addAlert = (alert: Omit<SafetyAlert, "id" | "timestamp">) => {
    const newAlert: SafetyAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]) // Keep max 5 alerts
    setIsVisible(true)

    // Auto-close if specified
    if (alert.autoClose && alert.duration) {
      setTimeout(() => {
        removeAlert(newAlert.id)
      }, alert.duration)
    }

    // Play sound and vibrate for critical alerts
    if (alert.priority === "critical") {
      playAlertSound()
      vibrateDevice([200, 100, 200, 100, 200])
    } else if (alert.priority === "high") {
      vibrateDevice([100, 50, 100])
    }
  }

  // Remove alert
  const removeAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  // Clear all alerts
  const clearAllAlerts = () => {
    setAlerts([])
    setIsVisible(false)
  }

  // Play alert sound
  const playAlertSound = () => {
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      audio.play().catch(() => {}) // Ignore errors if audio fails
    } catch (error) {
      console.log("Audio not supported:", error)
    }
  }

  // Vibrate device
  const vibrateDevice = (pattern: number[]) => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(pattern)
      }
    } catch (error) {
      console.log("Vibration not supported:", error)
    }
  }

  // Get alert styling based on priority
  const getAlertStyling = (priority: SafetyAlert["priority"]) => {
    switch (priority) {
      case "critical":
        return {
          container: "bg-red-600 border-red-500 text-white animate-pulse",
          icon: "text-white",
          badge: "bg-red-800 text-white",
        }
      case "high":
        return {
          container: "bg-orange-100 border-orange-400 text-orange-900 dark:bg-orange-950/50",
          icon: "text-orange-600",
          badge: "bg-orange-600 text-white",
        }
      case "medium":
        return {
          container: "bg-yellow-100 border-yellow-400 text-yellow-900 dark:bg-yellow-950/50",
          icon: "text-yellow-600",
          badge: "bg-yellow-600 text-white",
        }
      case "low":
        return {
          container: "bg-green-100 border-green-400 text-green-900 dark:bg-green-950/50",
          icon: "text-green-600",
          badge: "bg-green-600 text-white",
        }
    }
  }

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  // Handle emergency call
  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  // Auto-hide when no alerts
  useEffect(() => {
    if (alerts.length === 0) {
      setIsVisible(false)
    }
  }, [alerts])

  //added code 
  // Listen for global safety-alert events
useEffect(() => {
  const handleAlertEvent = (event: Event) => {
    const customEvent = event as CustomEvent<Omit<SafetyAlert, "id" | "timestamp">>
    addAlert(customEvent.detail)
  }

  window.addEventListener("safety-alert", handleAlertEvent)

  return () => {
    window.removeEventListener("safety-alert", handleAlertEvent)
  }
}, [])


  // Demo alerts for testing (remove in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      addAlert({
        type: "safety-tip",
        message: "Welcome to TravoMate! Your location is being monitored for safety.",
        priority: "low",
        autoClose: true,
        duration: 5000,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || alerts.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-md space-y-3">
      {alerts.map((alert) => {
        const styling = getAlertStyling(alert.priority)

        return (
          <Card key={alert.id} className={`border-2 shadow-lg ${styling.container} animate-slide-in-up`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`mt-1 ${styling.icon}`}>
                    {alert.type === "zone-enter" && alert.zone?.type === "restricted" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : alert.type === "zone-enter" && alert.zone?.type === "safe" ? (
                      <Shield className="h-5 w-5" />
                    ) : alert.type === "emergency" ? (
                      <Phone className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={`text-xs ${styling.badge}`}>{alert.priority.toUpperCase()}</Badge>
                      <div className="flex items-center text-xs opacity-75">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimeAgo(alert.timestamp)}
                      </div>
                    </div>

                    <p className="text-sm font-medium mb-2">{alert.message}</p>

                    {alert.zone && (
                      <div className="text-xs opacity-90 mb-2">
                        <strong>{alert.zone.name}</strong>
                        {alert.zone.description && <div className="mt-1">{alert.zone.description}</div>}
                      </div>
                    )}

                    {alert.zone?.emergencyContacts && alert.priority === "critical" && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.zone.emergencyContacts.slice(0, 2).map((contact, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs bg-white/20 border-white/30 hover:bg-white/30"
                            onClick={() => {
                              const number = contact.split(":")[1]?.trim() || contact
                              handleEmergencyCall(number)
                            }}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.split(":")[0] || contact}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-white/20"
                  onClick={() => removeAlert(alert.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {alerts.length > 1 && (
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white text-slate-700 border-slate-300"
            onClick={clearAllAlerts}
          >
            Clear All ({alerts.length})
          </Button>
        </div>
      )}
    </div>
  )
}

// Hook for using the alert system
export function useSafetyAlerts() {
  const [alertSystem, setAlertSystem] = useState<{
    addAlert: (alert: Omit<SafetyAlert, "id" | "timestamp">) => void
  } | null>(null)

  const addAlert = (alert: Omit<SafetyAlert, "id" | "timestamp">) => {
    // This would be connected to the SafetyAlertSystem component
    // For now, we'll use a custom event
    window.dispatchEvent(new CustomEvent("safety-alert", { detail: alert }))
  }

  const showZoneAlert = (zone: Zone, action: "enter" | "exit") => {
    if (action === "enter" && zone.type === "restricted") {
      addAlert({
        type: "zone-enter",
        zone,
        message: zone.alertMessage || `CAUTION: You have entered ${zone.name}. Exercise extra caution.`,
        priority: "critical",
        autoClose: false,
      })
    } else if (action === "enter" && zone.type === "safe") {
      addAlert({
        type: "zone-enter",
        zone,
        message: `Welcome to ${zone.name} - a safe zone with security monitoring.`,
        priority: "low",
        autoClose: true,
        duration: 4000,
      })
    } else if (action === "exit") {
      addAlert({
        type: "zone-exit",
        zone,
        message: `You have left ${zone.name}. Stay alert and safe.`,
        priority: "medium",
        autoClose: true,
        duration: 3000,
      })
    }
  }

  const showEmergencyAlert = (message: string) => {
    addAlert({
      type: "emergency",
      message,
      priority: "critical",
      autoClose: false,
    })
  }

  const showSafetyTip = (message: string) => {
    addAlert({
      type: "safety-tip",
      message,
      priority: "low",
      autoClose: true,
      duration: 5000,
    })
  }

  return {
    addAlert,
    showZoneAlert,
    showEmergencyAlert,
    showSafetyTip,
  }
}
