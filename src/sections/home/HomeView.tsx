import { ChapterOne, ChapterTwo } from './components'

// ----------------------------------------------------------------------

export default function HomePageView() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/assets/background/honey_pattern.png')",
      }}
    >
      {/* กรอบกลาง */}
      <div className="mx-auto min-h-screen max-w-[1150px] bg-[#f5f5fa] px-4 py-8">
        <ChapterOne />
        <ChapterTwo />
      </div>
    </div>
  )
}
