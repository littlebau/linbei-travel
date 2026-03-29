// ─── Portal 首頁用的旅遊清單項目 ───────────────────────────
export interface TripSummary {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  durationDays: number
  memberCount: number
  coverGradient: string   // Tailwind gradient class
  emoji: string
  tags: string[]
  status: 'upcoming' | 'completed' | 'planning'
}

export interface TripsIndex {
  trips: TripSummary[]
}

// ─── 旅遊詳細資料 ────────────────────────────────────────────

export interface FlightItem {
  type: 'outbound' | 'return' | 'domestic'
  airline: string
  flightNumber: string
  from: string
  departureTime: string
  to: string
  arrivalTime: string
  notes: string
}

export interface Reference {
  title: string
  url: string
}

export interface ActivityItem {
  name: string
  description: string
  duration: string
  references: Reference[]
  cost: number | null
}

export interface DayItem {
  dayNumber: number
  date: string
  dayOfWeek: string
  route: string
  meals: {
    breakfast: string
    lunch: string
    dinner: string
  }
  accommodation: {
    name: string
    url: string
    checkIn: boolean
    checkOut: boolean
  }
  activities: ActivityItem[]
  notes: string
}

export type BudgetCategory =
  | 'flights'
  | 'accommodation'
  | 'simCard'
  | 'insurance'
  | 'activity'
  | 'transport'
  | 'misc'

export interface BudgetItem {
  category: BudgetCategory
  label: string
  unitPrice: number | null
  quantity: number | null
  unit: string
  total: number
  url: string
  notes: string
}

export interface FamilyBudget {
  name: string
  adults: number
  children: number
  items: BudgetItem[]
}

export interface BudgetSection {
  currency: string
  mode: 'single' | 'multi-family'
  totalAll: number
  totalPerPerson: number
  includes: string[]
  excludes: string[]
  items: BudgetItem[]
  families: FamilyBudget[]
}

export interface TipItem {
  title: string
  content: string
  icon: string
}

export interface Trip {
  title: string
  destination: string
  startDate: string
  endDate: string
  durationDays: number
  members: {
    count: number
    adults: number
    children: number
    names: string[]
  }
  summary: string
  coverImage: string
  flights: FlightItem[]
  days: DayItem[]
  budget: BudgetSection
  tips: TipItem[]
  notes: string
}

export interface PlanData {
  trip: Trip
}
