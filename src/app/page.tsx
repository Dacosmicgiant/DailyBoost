import { DashboardHeader } from "@/components/dashboard-header"
import { QuoteCard } from "@/components/quote-card"
import { WeatherCard } from "@/components/weather-card"
import { TodoCard } from "@/components/todo-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <QuoteCard />
          <WeatherCard />
        </div>

        <div className="mt-8">
          <TodoCard />
        </div>
      </div>
    </main>
  )
}
