
import { ChapterTwo } from '@/sections/home/components'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function ChapterTwoTestPage() {
  return (
    <>
      <Helmet>
        <title> Part 2: Training | Mild-R HBD 2025 </title>
      </Helmet>

      <ChapterTwo />
    </>
  )
}
