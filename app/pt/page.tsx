import { MODULES } from '@/lib/curriculum'
import { toCourseIndex } from '@/lib/curriculum-index'
import { PtHomeView } from './view'

export default function PtHomePage() {
  return <PtHomeView modules={toCourseIndex(MODULES)} />
}
