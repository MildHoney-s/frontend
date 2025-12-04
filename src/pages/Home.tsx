import { HomePageView } from '@/sections/home'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home | Mild-R HBD 2025</title>
      </Helmet>

      <HomePageView />
    </>
  )
}
