"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">DailyBoost</h1>
        <p className="text-muted-foreground mt-1">{currentDate}</p>
        <p className="text-sm text-muted-foreground">Start your day with a quote, weather, a to-do, and a smile.</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/settings">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="outline" size="sm">
            About
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}
