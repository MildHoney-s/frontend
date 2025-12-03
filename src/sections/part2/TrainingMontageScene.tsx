import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onComplete: () => void;
}

export default function TrainingMontageScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const trainingSteps = [
    { title: "Stone Simulator", desc: "ฝึกจิตใจให้นิ่งดั่งหินผา", color: "bg-gray-800" },
    { title: "Theory Class", desc: "สอนหลักการใช้เวทมนตร์", color: "bg-blue-900" },
    { title: "First Monster", desc: "ฝึกใช้เวทจริงกับมอนสเตอร์", color: "bg-red-900" },
    { title: "Physical Training", desc: "ออกกำลังกาย (ชุดกีฬา)", color: "bg-green-800" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.training-card');
      
      // Animation แบบ Stack Cards: เลื่อนลงมาทับกัน
      cards.forEach((card: any, i) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 100, scale: 0.9 }, 
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            }
          }
        );
      });

      // Trigger จบ
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete()
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black text-white py-20 px-4">
      <h2 className="text-4xl text-center mb-20 font-bold text-yellow-500">Training Montage</h2>
      
      <div className="max-w-4xl mx-auto space-y-[40vh]"> {/* เว้นระยะห่างเยอะๆ ให้ Scroll สนุก */}
        {trainingSteps.map((step, index) => (
          <div key={index} className={`training-card sticky top-20 w-full h-[60vh] rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-white/20 shadow-2xl ${step.color}`}>
            <div className="text-9xl opacity-20 font-bold absolute right-4 bottom-4">{index + 1}</div>
            <h3 className="text-4xl md:text-6xl font-bold mb-4">{step.title}</h3>
            <p className="text-xl md:text-2xl text-gray-200">{step.desc}</p>

            {/* Placeholder รูป */}
            <div className="w-full h-1/2 bg-black/30 mt-8 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-white/30">
               Image Asset Here
            </div>
          </div>
        ))}
      </div>

      <div className="h-[20vh] flex items-center justify-center text-gray-500 mt-20">
        (Scroll ต่อเพื่อข้ามเวลา)
      </div>
    </div>
  );
}