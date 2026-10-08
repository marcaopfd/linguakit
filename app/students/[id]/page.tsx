import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { StudentDetailView } from './view'

export default function Page() {
  return <StudentDetailView ptModules={toCourseIndex(MODULES)} enModules={toCourseIndex(EN_MODULES)} />
}
