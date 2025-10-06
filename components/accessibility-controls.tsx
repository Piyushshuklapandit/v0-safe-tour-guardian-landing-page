"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type FontSize = "normal" | "large" | "xl"

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [highContrast, setHighContrast] = useState(false)
  const [voiceGuide, setVoiceGuide] = useState(false)
  const [announce, setAnnounce] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("accessibility")
    if (saved) {
      const parsed = JSON.parse(saved)
      setFontSize(parsed.fontSize ?? "normal")
      setHighContrast(!!parsed.highContrast)
      setVoiceGuide(!!parsed.voiceGuide)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.fontSize = fontSize
    if (highContrast) root.dataset.contrast = "high"
    else root.removeAttribute("data-contrast")
    localStorage.setItem("accessibility", JSON.stringify({ fontSize, highContrast, voiceGuide }))
    setAnnounce(
      `Accessibility updated: font ${fontSize}, ${highContrast ? "high contrast on" : "high contrast off"}, ${
        voiceGuide ? "voice guide on" : "voice guide off"
      }`,
    )
  }, [fontSize, highContrast, voiceGuide])

  function speakSample() {
    if (!voiceGuide) return
    const text = "Voice guidance enabled. Important alerts will be read out automatically."
    try {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = "en-IN"
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
    } catch {
      // no-op if not supported
    }
  }

  useEffect(() => {
    speakSample()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceGuide])

  return (
    <TooltipProvider>
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
      <div className="flex items-center gap-2" role="group" aria-label="Accessibility controls">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Decrease font size"
                onClick={() => setFontSize((prev) => (prev === "xl" ? "large" : "normal"))}
              >
                A-
              </Button>
            </TooltipTrigger>
            <TooltipContent>Decrease font size</TooltipContent>
          </Tooltip>
          <span className="sr-only">Current font size: {fontSize}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Increase font size"
                onClick={() => setFontSize((prev) => (prev === "normal" ? "large" : "xl"))}
              >
                A+
              </Button>
            </TooltipTrigger>
            <TooltipContent>Increase font size</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1 pl-2 border-l" role="group" aria-label="Contrast and voice">
          <label className="flex items-center gap-1 text-sm">
            <span className="sr-only">High contrast</span>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} aria-label="Toggle high contrast mode" />
            <span className="text-xs">High Contrast</span>
          </label>

          <label className="flex items-center gap-1 text-sm">
            <span className="sr-only">Voice guide</span>
            <Switch checked={voiceGuide} onCheckedChange={setVoiceGuide} aria-label="Toggle voice guidance" />
            <span className="text-xs">Voice Guide</span>
          </label>
        </div>
      </div>
    </TooltipProvider>
  )
}
