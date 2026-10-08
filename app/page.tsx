import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { DashboardView } from './view'

export default function DashboardPage() {
  return <DashboardView ptModules={toCourseIndex(MODULES)} enModules={toCourseIndex(EN_MODULES)} />
}
