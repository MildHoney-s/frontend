import { useState } from 'react';
import SchoolManhwaScene from './SchoolScene';
import TrainingGroundScene from './TrainingGroundScene';
import MildHouseScene from './MildHouseScene';
import TrainingMontageScene from './TrainingMontageScene';
import ThreeMonthsLaterScene from './ThreeMonthsLaterScene';

export default function Part2Content() {
  const [stage, setStage] = useState(0);
  // 0: School, 1: Training, 2: House, 3: Montage, 4: Finale

  return (
    <div className="w-full bg-black text-white min-h-screen">

      {/* แต่ละ Scene จะปลดล็อค Scene ถัดไปเมื่อ onComplete */}

      <SchoolManhwaScene onComplete={() => setStage(prev => Math.max(prev, 1))} />

      {stage >= 1 && (
        <div className="animate-in fade-in duration-1000">
          <TrainingGroundScene onComplete={() => setStage(prev => Math.max(prev, 2))} />
        </div>
      )}

      {stage >= 2 && (
        <div className="animate-in fade-in duration-1000">
          <MildHouseScene onComplete={() => setStage(prev => Math.max(prev, 3))} />
        </div>
      )}

      {stage >= 3 && (
        <div className="animate-in fade-in duration-1000">
          <TrainingMontageScene onComplete={() => setStage(prev => Math.max(prev, 4))} />
        </div>
      )}

      {stage >= 4 && (
        <div className="animate-in fade-in duration-1000">
          <ThreeMonthsLaterScene />
        </div>
      )}

    </div>
  );
}