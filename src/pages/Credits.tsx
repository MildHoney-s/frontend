import { CreditPageView } from '@/sections/credit'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function CreditPage() {
  return (
    <>
      <Helmet>
        <title>Credits | Mild-R HBD 2025</title>
      </Helmet>

      <CreditPageView />
    </>
  )
}
