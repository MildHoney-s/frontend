// src/pages/HomeViewPage.tsx
import { StoryPageView } from '@/sections/story'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function StoryPage() {
  return (
    <>
      <Helmet>
        <title>เนื้อเรื่อง | Mild-R HBD 2025</title>
      </Helmet>

      <StoryPageView />
    </>
  )
}
