import { CoursePicker } from '@/components/CoursePicker'

/**
 * The public front door. The teacher dashboard used to live here, which meant
 * anyone handed the site address landed on a login form for an account they do
 * not have; it now sits at /painel.
 */
export default function HomePage() {
  return <CoursePicker />
}
