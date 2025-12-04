import Part2View from '@/sections/part2/view'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function Part2Page() {
  return (
    <>
      <Helmet>
        <title> Part 2: Training | Mild-R HBD 2025 </title>
      </Helmet>

      <Part2View />
    </>
  )
}
