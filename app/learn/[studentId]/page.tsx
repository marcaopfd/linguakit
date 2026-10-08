import { MODULES } from '@/lib/curriculum'
import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { LearnView } from './view'

export default function Page() {
  return <LearnView ptModules={toCourseIndex(MODULES)} enModules={toCourseIndex(EN_MODULES)} />
}
