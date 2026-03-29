import { notFound } from 'next/navigation'
import type { Trip } from '@/types/plan'
import TripHero from '@/components/TripHero'
import FlightInfo from '@/components/FlightInfo'
import DayTimeline from '@/components/DayTimeline'
import BudgetPanel from '@/components/BudgetPanel'
import TipsNotes from '@/components/TipsNotes'
import tripsIndex from '@/data/trips.index.json'

// 靜態路由：build 時產生所有旅遊頁面
export async function generateStaticParams() {
  return tripsIndex.trips.map((t) => ({ id: t.id }))
}

async function getTripData(id: string): Promise<Trip | null> {
  try {
    const mod = await import(`@/data/trips/${id}/plan.json`)
    return mod.default.trip as Trip
  } catch {
    return null
  }
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = await getTripData(id)
  if (!trip) notFound()

  return (
    <div className="min-h-screen">
      <TripHero trip={trip} />
      <FlightInfo flights={trip.flights} />
      <DayTimeline days={trip.days} />
      <BudgetPanel budget={trip.budget} defaultMembers={trip.members.count} />
      <TipsNotes tips={trip.tips} notes={trip.notes} />
      <footer className="text-center text-xs text-slate-600 py-8">
        林北旅行社出品 · 資料由 AI 輔助整理
      </footer>
    </div>
  )
}
