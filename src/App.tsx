import './index.css'
import planData from './data/plan.json'
import type { PlanData } from './types/plan'
import HeroSection from './components/HeroSection'
import FlightInfo from './components/FlightInfo'
import DayTimeline from './components/DayTimeline'
import BudgetPanel from './components/BudgetPanel'
import TipsNotes from './components/TipsNotes'

const data = planData as PlanData

export default function App() {
  const { trip } = data

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HeroSection trip={trip} />
      <FlightInfo flights={trip.flights} />
      <DayTimeline days={trip.days} />
      <BudgetPanel budget={trip.budget} defaultMembers={trip.members.count} />
      <TipsNotes tips={trip.tips} notes={trip.notes} />
      <footer className="text-center text-xs text-gray-400 py-8">
        林北旅行社出品 · 資料由 AI 輔助整理
      </footer>
    </div>
  )
}
