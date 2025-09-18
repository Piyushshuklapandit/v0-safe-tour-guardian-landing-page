"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, MapPin, Shield, Phone, Info, User, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function TourFriendChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi, I'm TourFriend! How can I help you on your trip today?",
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

  const quickActions = [
    { icon: MapPin, text: "Find nearby attractions", action: "attractions" },
    { icon: Shield, text: "Safety alerts", action: "safety" },
    { icon: Phone, text: "Emergency contacts", action: "emergency" },
    { icon: Info, text: "Local information", action: "info" },
  ]

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Emergency responses - highest priority
    if (
      message.includes("emergency") ||
      message.includes("help") ||
      message.includes("danger") ||
      message.includes("accident") ||
      message.includes("lost") ||
      message.includes("stolen")
    ) {
      if (message.includes("passport") || message.includes("id")) {
        return "🛂 Stay calm! For lost passport/ID:\n• Report to nearest police station immediately\n• Contact your embassy/consulate\n• Call Tourist Helpline: 1363\n• Emergency: 112\n\nI can guide you to the nearest police station. Share your location!"
      }
      if (
        message.includes("medical") ||
        message.includes("hospital") ||
        message.includes("doctor") ||
        message.includes("sick")
      ) {
        return "🚑 Medical Emergency Protocol:\n• Call 108 (Ambulance) immediately\n• Nearest hospital: AIIMS - 2.5km from your location\n• Emergency: 112\n• Tourist Medical Helpline: 1363\n\nStay calm, help is on the way!"
      }
      return "🚨 Emergency Assistance:\n• Police: 112\n• Medical: 108\n• Tourist Helpline: 1363\n• Fire: 101\n\nStay in a safe, public place. Share your exact location with authorities. I'm here to guide you!"
    }

    // Travel guidance
    if (
      message.includes("attraction") ||
      message.includes("place") ||
      message.includes("visit") ||
      message.includes("sightseeing")
    ) {
      if (message.includes("delhi")) {
        return "🏛️ Top Delhi attractions:\n• Red Fort - Opens 9:30 AM, ₹35 entry\n• India Gate - 24/7 open, free\n• Qutub Minar - 7 AM-5 PM, ₹30\n• Lotus Temple - 9 AM-7 PM, free\n\nBest time: Early morning. Need directions to any?"
      }
      return "🗺️ Popular nearby attractions:\n• Historical monuments\n• Cultural sites\n• Gardens & parks\n• Museums\n\nWhich type interests you? I can provide specific recommendations with timings and ticket info!"
    }

    // Safety and security
    if (
      message.includes("safety") ||
      message.includes("safe") ||
      message.includes("secure") ||
      message.includes("area")
    ) {
      return "🛡️ Your Safety Status:\n• Current area: ✅ Safe Zone\n• Nearest police: 800m away\n• Tourist help center: 1.2km\n\nSafety tips:\n• Stay in well-lit areas\n• Keep emergency contacts ready\n• Use verified transport\n• Share location with family"
    }

    // Food recommendations
    if (
      message.includes("food") ||
      message.includes("restaurant") ||
      message.includes("eat") ||
      message.includes("hungry")
    ) {
      return "🍽️ Recommended restaurants nearby:\n• Karim's - Authentic Mughlai (₹₹)\n• Paranthe Wali Gali - Traditional parathas (₹)\n• Haldiram's - Vegetarian delights (₹)\n• The Imperial - Fine dining (₹₹₹)\n\nAll have hygiene certificates and tourist-friendly staff!"
    }

    // Accommodation
    if (
      message.includes("hotel") ||
      message.includes("stay") ||
      message.includes("accommodation") ||
      message.includes("room")
    ) {
      return "🏨 Verified accommodations:\n• The Imperial - Luxury (₹₹₹₹)\n• Hotel Tara Palace - Mid-range (₹₹)\n• Zostel Delhi - Backpacker (₹)\n\nAll have safety certifications, 24/7 security, and tourist services. Need booking assistance?"
    }

    // Transportation
    if (
      message.includes("transport") ||
      message.includes("taxi") ||
      message.includes("metro") ||
      message.includes("bus") ||
      message.includes("direction")
    ) {
      return "🚗 Transportation options:\n• Delhi Metro - Safest, ₹10-60\n• Ola/Uber - Verified drivers\n• Auto-rickshaw - Negotiate fare\n• Tourist buses - AC, guided\n\nAlways check driver ID and share trip details with someone!"
    }

    // Digital ID and blockchain
    if (
      message.includes("id") ||
      message.includes("identity") ||
      message.includes("blockchain") ||
      message.includes("verification")
    ) {
      return "🪪 Your Digital Tourist ID:\n• Blockchain-secured identity\n• Scan at checkpoints & hotels\n• Prevents fraud & ensures safety\n• Works offline too\n\nShow QR code for instant verification. Need help accessing it?"
    }

    // Local culture and language
    if (
      message.includes("culture") ||
      message.includes("language") ||
      message.includes("hindi") ||
      message.includes("local")
    ) {
      return "🇮🇳 Local Culture Tips:\n• Namaste = Hello/Goodbye\n• Remove shoes at temples\n• Dress modestly at religious sites\n• Bargaining is common in markets\n\nUseful Hindi phrases:\n• Dhanyawad = Thank you\n• Kitna paisa? = How much?\n• Madad chahiye = Need help"
    }

    // Weather
    if (message.includes("weather") || message.includes("temperature") || message.includes("rain")) {
      return "🌤️ Current weather update:\n• Temperature: 28°C\n• Condition: Partly cloudy\n• Air quality: Moderate\n• UV index: 6 (wear sunscreen)\n\nBest time to visit outdoor attractions: Early morning or evening!"
    }

    // Default helpful response
    return "👋 I'm TourFriend, your travel buddy! I can help with:\n• 🗺️ Travel guidance & directions\n• 🛡️ Safety alerts & secure routes\n• 🚨 Emergency contacts & response\n• 🍽️ Food & accommodation recommendations\n• 🪪 Digital ID verification\n• 🇮🇳 Local culture & language tips\n\nWhat would you like to know about your trip?"
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

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      attractions: "Show me nearby attractions",
      safety: "What are the safety alerts for this area?",
      emergency: "I need emergency contact information",
      info: "Tell me about local culture and tips",
    }

    setInputValue(actionMessages[action as keyof typeof actionMessages])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text-india mb-2">TourFriend AI Assistant</h1>
        <p className="text-muted-foreground">Your smart travel companion for safe and enjoyable trips</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 p-6 overflow-hidden">
          {/* Messages Area */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser
                          ? "bg-[color:var(--india-blue)] text-white"
                          : "bg-[color:var(--india-saffron)] text-white"
                      }`}
                    >
                      {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isUser ? "bg-[color:var(--india-blue)] text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
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
                    <div className="w-8 h-8 rounded-full bg-[color:var(--india-saffron)] text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-1 text-xs"
                >
                  <action.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{action.text}</span>
                </Button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your trip..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-[color:var(--india-blue)] to-[color:var(--india-saffron)] hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <MapPin className="w-8 h-8 mx-auto mb-2 text-[color:var(--india-blue)]" />
          <h3 className="font-semibold mb-1">Travel Guidance</h3>
          <p className="text-xs text-muted-foreground">Directions, attractions, restaurants</p>
        </Card>
        <Card className="p-4 text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-[color:var(--india-saffron)]" />
          <h3 className="font-semibold mb-1">Safety Alerts</h3>
          <p className="text-xs text-muted-foreground">Area alerts, safe routes</p>
        </Card>
        <Card className="p-4 text-center">
          <Phone className="w-8 h-8 mx-auto mb-2 text-[color:var(--india-green)]" />
          <h3 className="font-semibold mb-1">Emergency Response</h3>
          <p className="text-xs text-muted-foreground">Quick access to help</p>
        </Card>
        <Card className="p-4 text-center">
          <Info className="w-8 h-8 mx-auto mb-2 text-[color:var(--digital-india)]" />
          <h3 className="font-semibold mb-1">Local Information</h3>
          <p className="text-xs text-muted-foreground">Culture, language, tips</p>
        </Card>
      </div>
    </div>
  )
}
