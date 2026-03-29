import tripsIndex from '@/data/trips.index.json'
import type { TripsIndex } from '@/types/plan'
import PortalHomeClient from '@/components/PortalHomeClient'

const index = tripsIndex as TripsIndex

export default function HomePage() {
  return <PortalHomeClient trips={index.trips} />
}
