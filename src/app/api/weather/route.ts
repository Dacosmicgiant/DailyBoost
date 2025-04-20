import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const apiKey = process.env.OPENWEATHER_API_KEY

    if (!apiKey) {
      throw new Error("OpenWeather API key is not configured")
    }

    let url: string

    if (location) {
      // Use the provided location
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`
    } else {
      // Get user's IP address from headers for geolocation
      const headersList = await headers()
      // Renamed forwardedFor to _forwardedFor
      const _forwardedFor = headersList.get("x-forwarded-for")
      // The original code already had a commented-out line suggesting this fix:
      // // Remove the unused variable or prefix with underscore
      // // const _ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1"

      // For demo purposes, if we can't determine location, default to a major city
      // In a production app, you might want to use an IP geolocation service
      url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Transform the OpenWeatherMap response to our app's format
    const weatherData = {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}