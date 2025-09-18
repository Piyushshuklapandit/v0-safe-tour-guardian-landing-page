"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Phone, MapPin, Shield, Hospital, Users, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function SOSPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🚨 SOS Activated! I'm TourFriend Emergency Assistant. Please describe your emergency so I can guide you immediately.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const emergencyContacts = [
    { icon: Phone, label: "Police", number: "112", color: "text-red-600" },
    { icon: Hospital, label: "Medical", number: "108", color: "text-blue-600" },
    { icon: Shield, label: "Tourist Help", number: "1363", color: "text-green-600" },
    { icon: AlertTriangle, label: "Fire", number: "101", color: "text-orange-600" },
  ]

  const generateSOSResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (
      message.includes("medical") ||
      message.includes("hospital") ||
      message.includes("doctor") ||
      message.includes("sick") ||
      message.includes("injured")
    ) {
      return "🚑 MEDICAL EMERGENCY:\n• Call 108 NOW for ambulance\n• Nearest hospital: AIIMS - 2.5km\n• Stay calm, don't move if injured\n• Someone should stay with you\n\nI'm alerting nearby medical services!"
    }

    if (
      message.includes("police") ||
      message.includes("theft") ||
      message.includes("robbery") ||
      message.includes("harassment") ||
      message.includes("crime")
    ) {
      return "🚨 POLICE EMERGENCY:\n• Call 112 IMMEDIATELY\n• Stay in public, safe area\n• Don't chase thieves\n• Note descriptions if safe\n\nNearest police station: 800m away. Sending location!"
    }

    if (message.includes("lost") || message.includes("missing") || message.includes("can't find")) {
      if (message.includes("passport") || message.includes("documents")) {
        return "🛂 LOST DOCUMENTS:\n• Report to police station NOW\n• Call your embassy immediately\n• Tourist helpline: 1363\n• Don't panic, this can be resolved\n\nI'm locating nearest police station for you!"
      }
      return "🗺️ LOST/MISSING PERSON:\n• Call 112 for police help\n• Stay where you are if safe\n• Contact family/friends\n• Tourist helpline: 1363\n\nSharing your location with authorities!"
    }

    if (message.includes("fire") || message.includes("smoke") || message.includes("burning")) {
      return "🔥 FIRE EMERGENCY:\n• Call 101 IMMEDIATELY\n• Evacuate the area NOW\n• Stay low if smoke present\n• Don't use elevators\n\nFire services alerted! Get to safety!"
    }

    if (message.includes("accident") || message.includes("crash") || message.includes("collision")) {
      return "🚗 ACCIDENT EMERGENCY:\n• Call 112 & 108 NOW\n• Don't move injured persons\n• Turn on hazard lights\n• Clear traffic if possible\n\nEmergency services dispatched!"
    }

    if (
      message.includes("unsafe") ||
      message.includes("danger") ||
      message.includes("threat") ||
      message.includes("scared")
    ) {
      return "⚠️ SAFETY THREAT:\n• Move to public, crowded area\n• Call 112 if immediate danger\n• Contact someone you trust\n• Tourist helpline: 1363\n\nYour safety is priority. Stay alert!"
    }

    return "🚨 EMERGENCY PROTOCOL:\n• For immediate danger: Call 112\n• Medical emergency: Call 108\n• Describe your situation clearly\n• Share your exact location\n\nI'm here to guide you through this. What's your emergency?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Immediate response for emergency
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSOSResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Emergency Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <AlertTriangle className="w-16 h-16 text-red-600 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-red-600 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">SOS Emergency</h1>
          <p className="text-lg text-muted-foreground">Immediate assistance for tourists in distress</p>
        </div>

        {/* Emergency Contacts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {emergencyContacts.map((contact, index) => (
            <Card
              key={index}
              className="border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer"
              onClick={() => handleEmergencyCall(contact.number)}
            >
              <CardContent className="p-4 text-center">
                <contact.icon className={`w-8 h-8 mx-auto mb-2 ${contact.color}`} />
                <h3 className="font-bold text-sm mb-1">{contact.label}</h3>
                <p className="text-2xl font-bold text-red-600">{contact.number}</p>
                <p className="text-xs text-muted-foreground">Tap to call</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Interface */}
        <Card className="h-[500px] flex flex-col border-2 border-red-200">
          <CardContent className="flex-1 p-6 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser ? "bg-red-600 text-white" : "bg-orange-500 text-white"
                        }`}
                      >
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.isUser
                            ? "bg-red-600 text-white"
                            : "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line font-medium">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your emergency..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border-red-200 focus:border-red-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center border-orange-200">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold mb-1">Share Location</h3>
            <p className="text-xs text-muted-foreground">Always share your exact location with emergency services</p>
          </Card>
          <Card className="p-4 text-center border-red-200">
            <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-semibold mb-1">Stay Safe</h3>
            <p className="text-xs text-muted-foreground">Move to public areas and stay calm during emergencies</p>
          </Card>
          <Card className="p-4 text-center border-green-200">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Contact Family</h3>
            <p className="text-xs text-muted-foreground">Inform trusted contacts about your situation</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
