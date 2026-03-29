import type { TripSummary } from '../types/plan'
import PortalHome from './PortalHome'

interface Props {
  trips: TripSummary[]
}

export default function PortalHomeClient({ trips }: Props) {
  return <PortalHome trips={trips} />
}
