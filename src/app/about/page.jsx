import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6">About DailyBoost</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg">
          DailyBoost is your personal dashboard designed to start your day with positivity and focus.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <ul className="space-y-2">
          <li>Daily motivational quotes to inspire you</li>
          <li>Local weather information to plan your day</li>
          <li>Simple to-do list to keep track of important tasks</li>
          <li>Dark/light mode toggle for comfortable viewing</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Technology</h2>
        <p>DailyBoost is built with modern web technologies:</p>
        <ul className="space-y-2">
          <li>Next.js for the framework</li>
          <li>Tailwind CSS for styling</li>
          <li>MongoDB for data storage</li>
          <li>Public APIs for quotes and weather data</li>
        </ul>
      </div>
    </div>
  )
}
