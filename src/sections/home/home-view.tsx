import { ChapterOne } from './components'
import ChapterThree from './components/ChapterThree/chapter-three'

export default function HomePageView() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/assets/background/honey_pattern.png')",
      }}
    >
      {/* กรอบกลาง */}
      <div className="mx-auto h-screen max-w-[1150px] bg-[#f5f5fa] px-4 py-8">
        <ChapterOne />
        <ChapterThree />
      </div>
    </div>
  )
}
