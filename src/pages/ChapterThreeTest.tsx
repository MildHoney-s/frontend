import { ChapterThree } from '@/sections/story/components'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function ChapterThreeTest() {
  return (
    <>
      <Helmet>
        <title> Part 3: tournament | Mild-R HBD 2025 </title>
      </Helmet>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: "url('/assets/background/honey_pattern.png')",
        }}
      >
        {/* กรอบกลาง */}
        <div className="mx-auto min-h-screen max-w-[1150px] bg-[#f5f5fa] px-4">
          <ChapterThree />
        </div>
      </div>

    </>
  )
}
