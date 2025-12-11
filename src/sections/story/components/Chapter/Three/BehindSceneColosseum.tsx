import CutSceneOne from './components/CutSceneOne'
import CutSceneTwo from './components/CutSceneTwo'
import InColosseumBehind from './components/InColosseumBehind'

// ✅ 1. กำหนด Props
interface SceneProps {
  onComplete?: () => void
}

export default function BehindSceneColosseum({ onComplete }: SceneProps) {
  return (
    // ✅ 2. สร้าง Wrapper หลักเป็นสีดำ (bg-black) เพื่อไม่ให้เห็นสีขาวแทรกระหว่างเปลี่ยนฉาก
    <div className="relative w-full bg-black">
      {/* ฉากที่ 1: เล่นเสร็จแล้วปล่อยผ่าน */}
      <InColosseumBehind />

      {/* ฉากที่ 2: เล่นต่อจากฉากแรกทันที */}
      <CutSceneOne />

      {/* ฉากที่ 3 (สุดท้าย): เมื่อเล่นจบ ให้เรียก onComplete เพื่อบอก Parent ว่าจบ Sequence แล้ว */}
      {/* (ต้องเข้าไปแก้ CutSceneTwo ให้รับ Props onComplete ด้วยนะครับ) */}
      <CutSceneTwo onComplete={onComplete} />
    </div>
  )
}
