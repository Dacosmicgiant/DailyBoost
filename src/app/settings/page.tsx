"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner" // ✅ Import from Sonner

export default function SettingsPage() {
  const [location, setLocation] = useState("")
  const [autoDetectLocation, setAutoDetectLocation] = useState(true)

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    const savedAutoDetect = localStorage.getItem("autoDetectLocation")

    if (savedLocation) setLocation(savedLocation)
    if (savedAutoDetect !== null) setAutoDetectLocation(savedAutoDetect === "true")
  }, [])

  const saveSettings = () => {
    localStorage.setItem("userLocation", location)
    localStorage.setItem("autoDetectLocation", autoDetectLocation.toString())

    toast.success("Settings saved", {
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Weather Settings</CardTitle>
          <CardDescription>Configure your location preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-detect" className="flex flex-col space-y-1">
              <span>Auto-detect location</span>
              <span className="text-sm text-muted-foreground">Use your device location for weather</span>
            </Label>
            <Switch id="auto-detect" checked={autoDetectLocation} onCheckedChange={setAutoDetectLocation} />
          </div>

          {!autoDetectLocation && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter city name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={autoDetectLocation}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
