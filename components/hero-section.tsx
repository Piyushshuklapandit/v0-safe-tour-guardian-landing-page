"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Phone, MapPin, Hospital, Clock, Globe2, CheckCircle } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-8 py-4 rounded-xl bg-blue-900 text-white border-2 border-orange-500 shadow-xl">
              <div className="w-12 h-12 mr-4 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/travomate-logo.png"
                  alt="Government of India Emblem"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-orange-300">Government of India</div>
                <div className="text-lg font-bold">Ministry of Tourism</div>
                <div className="text-xs text-blue-200">Digital India Initiative</div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 animate-slide-in-up text-balance leading-tight">
            Smart Tourist Safety &<br />
            <span className="text-orange-600">Emergency Response Platform</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-700 mb-8 max-w-5xl mx-auto animate-slide-in-up text-pretty font-medium leading-relaxed">
            Official AI-powered safety monitoring system providing comprehensive protection, verified digital identity,
            and instant emergency response for tourists across India.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-slide-in-up">
            <div className="flex items-center px-6 py-3 bg-white rounded-full border-2 border-green-200 shadow-md">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-sm font-semibold text-slate-800">Government Verified</span>
            </div>
            <div className="flex items-center px-6 py-3 bg-white rounded-full border-2 border-blue-200 shadow-md">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-slate-800">Secure & Trusted</span>
            </div>
            <div className="flex items-center px-6 py-3 bg-white rounded-full border-2 border-orange-200 shadow-md">
              <Globe2 className="w-5 h-5 mr-2 text-orange-600" />
              <span className="text-sm font-semibold text-slate-800">Pan-India Coverage</span>
            </div>
            <div className="flex items-center px-6 py-3 bg-white rounded-full border-2 border-purple-200 shadow-md">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm font-semibold text-slate-800">24/7 Monitoring</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-in-up">
            <Button
              size="lg"
              className="text-xl px-12 py-8 group bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white shadow-xl font-bold"
            >
              Get Started
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-xl px-12 py-8 group bg-white border-3 border-orange-500 text-orange-600 hover:bg-orange-50 shadow-xl font-bold"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Learn More
            </Button>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 border-3 border-red-300 rounded-2xl p-8 mb-12 animate-slide-in-up shadow-xl">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center justify-center">
              <Phone className="w-7 h-7 mr-3" />
              Emergency Quick Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white py-8 px-10 text-xl font-bold shadow-xl border-2 border-red-400 hover:border-red-300 transition-all"
                onClick={() => window.open("tel:112")}
              >
                <Phone className="w-8 h-8 mr-3" />
                Call 112
              </Button>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white py-8 px-10 text-xl font-bold shadow-xl border-2 border-blue-400 hover:border-blue-300 transition-all"
              >
                <MapPin className="w-8 h-8 mr-3" />
                Nearest Police Station
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white py-8 px-10 text-xl font-bold shadow-xl border-2 border-green-400 hover:border-green-300 transition-all"
              >
                <Hospital className="w-8 h-8 mr-3" />
                Nearest Hospital
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-slide-in-up">
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <div className="text-5xl sm:text-6xl font-bold text-blue-900 mb-3">5 Lakh+</div>
              <div className="text-slate-600 font-semibold text-lg">Tourists Protected</div>
              <div className="text-sm text-slate-500 mt-2">Across India</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-5xl sm:text-6xl font-bold text-orange-600 mb-3">15s</div>
              <div className="text-slate-600 font-semibold text-lg">Average Response Time</div>
              <div className="text-sm text-slate-500 mt-2">Emergency Services</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200 hover:border-green-300 transition-colors">
              <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-3">All States</div>
              <div className="text-slate-600 font-semibold text-lg">+ 150+ Countries Covered</div>
              <div className="text-sm text-slate-500 mt-2">Global Network</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-3 border-blue-900 rounded-full flex justify-center bg-white shadow-lg">
          <div className="w-2 h-4 bg-blue-900 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
