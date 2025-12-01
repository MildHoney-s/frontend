import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import Router from '@/routes'
import '@/styles/index.scss'

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop()

  return <Router />
}
