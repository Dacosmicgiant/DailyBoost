"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Quote {
  content: string
  author: string
}

export function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/quote")
      const text = await response.text()
      const data = text ? JSON.parse(text) : null

      if (data && data.content && data.author) {
        setQuote(data)
      } else {
        setQuote(null)
      }
    } catch (error) {
      console.error("Error fetching quote:", error)
      setQuote(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Daily Inspiration</CardTitle>
          <CardDescription>Your motivational quote for today</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchQuote} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh quote</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
          </div>
        ) : quote ? (
          <div className="space-y-4">
            <blockquote className="border-l-4 border-primary pl-4 italic">
              <p className="text-lg">{quote.content}</p>
            </blockquote>
            <p className="text-right text-sm text-muted-foreground">— {quote.author}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Unable to load quote. Please try again.</p>
        )}
      </CardContent>
    </Card>
  )
}
