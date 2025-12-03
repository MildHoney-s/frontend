import Part2Content from './Part2Content'; // Import ตัวที่เพิ่งสร้าง

export default function HomePageView() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/assets/background/honey_pattern.png')",
      }}
    >
      <div className="mx-auto min-h-screen max-w-[1150px] ...">
        <Part2Content />

      </div>
    </div>
  )
}