import { useScrollToTop } from '@/hooks'
import Router from '@/routes'
import '@/styles/index.scss'

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop()

  return <Router />
}
