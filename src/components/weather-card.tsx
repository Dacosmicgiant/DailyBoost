"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  MapPin,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition?: string
  icon?: string
  humidity: number
  windSpeed: number
}

export function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const autoDetect = localStorage.getItem("autoDetectLocation") !== "false"
      let locationParam = ""

      if (!autoDetect) {
        const savedLocation = localStorage.getItem("userLocation")
        if (savedLocation) {
          locationParam = `?location=${encodeURIComponent(savedLocation)}`
        }
      }

      const response = await fetch(`/api/weather${locationParam}`)
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error("Error fetching weather:", error)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const renderWeatherIcon = () => {
    if (!weather) return <Cloud className="h-8 w-8" />

    if (weather.icon) {
      return (
        <Image
  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
  alt="Weather icon"
  width={50}
  height={50}
/>
      )
    }

    const condition = weather.condition?.toLowerCase() || ""

    if (condition.includes("clear") || condition.includes("sunny")) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    } else if (condition.includes("rain")) {
      return <CloudRain className="h-8 w-8 text-blue-400" />
    } else if (condition.includes("snow")) {
      return <CloudSnow className="h-8 w-8 text-blue-200" />
    } else if (condition.includes("thunder") || condition.includes("lightning")) {
      return <CloudLightning className="h-8 w-8 text-yellow-400" />
    } else if (condition.includes("wind")) {
      return <Wind className="h-8 w-8 text-gray-400" />
    } else {
      return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Current conditions for your area</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchWeather} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh weather</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-2">
            <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-1/3 bg-muted rounded animate-pulse mt-2"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse mt-2"></div>
          </div>
        ) : weather ? (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{weather.location}</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <div className="flex items-center">
                  {renderWeatherIcon()}
                  <div className="ml-4">
                    <div className="text-3xl font-bold">{weather.temperature}°C</div>
                    <div className="text-muted-foreground">{weather.condition || "Unknown"}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Humidity:</span>
                  <span>{weather.humidity}%</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Wind:</span>
                  <span>{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Unable to load weather data.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchWeather}>
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
