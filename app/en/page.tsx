import { EN_MODULES } from '@/lib/curriculum-en'
import { toCourseIndex } from '@/lib/curriculum-index'
import { EnHomeView } from './view'

export default function EnHomePage() {
  return <EnHomeView modules={toCourseIndex(EN_MODULES)} />
}
