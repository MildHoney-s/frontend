import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onComplete: () => void;
}

export default function MildHouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const [isDoorOpened, setIsDoorOpened] = useState(false);
  const [knockCount, setKnockCount] = useState(0);

  // Animation ตอนเคาะประตู
  const handleKnock = () => {
    if (isDoorOpened) return;

    // เคาะ 3 ครั้งถึงจะเปิด
    if (knockCount < 2) {
      setKnockCount(prev => prev + 1);
      // สั่นประตู
      gsap.to(doorRef.current, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
      // TODO: ใส่เสียงเคาะประตูตรงนี้ playSound('knock')
    } else {
      // เปิดประตู
      setIsDoorOpened(true);
      gsap.to(doorRef.current, {
        rotateY: -110,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "left center" // จุดหมุนอยู่ซ้าย
      });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade In ฉากบ้าน
      gsap.fromTo('.house-bg', { autoAlpha: 0 }, {
        autoAlpha: 1, duration: 2,
        scrollTrigger: { trigger: containerRef.current, start: 'top 60%' }
      });

      // ถ้าเปิดประตูแล้ว ให้บทพูดลอยขึ้นมา
      if (isDoorOpened) {
        gsap.fromTo('.dialogue-section',
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 1, delay: 1 }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isDoorOpened]);

  return (
    <div ref={containerRef} className="w-full bg-black text-white pb-20 overflow-hidden">

      {/* ส่วนประตูบ้าน (Interactive) */}
      <div className="house-bg relative w-full h-screen flex flex-col items-center justify-center">
         <div className="absolute top-10 text-gray-400 text-sm animate-pulse">
            Scroll ลงมาแล้วเคาะประตูบ้าน...
         </div>

         {/* Container บ้าน */}
         <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px] border-8 border-gray-800 bg-gray-700 rounded-xl shadow-2xl overflow-hidden perspective-1000">
            {/* พื้นหลังในบ้าน (เห็นตอนประตูเปิด) */}
            <div className="absolute inset-0 bg-yellow-100 flex items-center justify-center">
               {isDoorOpened ? (
                 <div className="text-center animate-in fade-in zoom-in duration-500">
                    {/* ใส่รูปมายด์ตกใจ/ยิ้มตรงนี้ */}
                    <div className="w-48 h-48 bg-pink-200 rounded-full mx-auto mb-4 border-4 border-white"></div> 
                    <p className="text-black font-bold bg-white/80 px-2 rounded">มายด์: "เอ๊ะ คุณฮันนี่!?"</p>
                 </div>
               ) : (
                 <div className="text-black/30">ในบ้าน...</div>
               )}
            </div>

            {/* บานประตู (ตัวบัง) */}
            <div
              ref={doorRef}
              onClick={handleKnock}
              className="absolute inset-0 bg-[#5D4037] cursor-pointer flex items-center justify-center border-r-4 border-black/20"
              style={{ transformStyle: 'preserve-3d' }} // สำคัญสำหรับเปิดประตู 3D
            >
              {/* ลวดลายประตู */}
              <div className="border-2 border-[#3E2723] w-[80%] h-[90%] rounded opacity-50"></div>
              <div className="absolute right-4 w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div> {/* ลูกบิด */}

              {!isDoorOpened && (
                 <span className="absolute bottom-20 bg-black/50 px-3 py-1 rounded text-sm pointer-events-none">
                    {knockCount === 0 ? "คลิกเพื่อเคาะ" : "เคาะอีก!"}
                 </span>
              )}
            </div>
         </div>
      </div>

      {/* บทสนทนาหลังประตูเปิด (Manhwa Style) */}
      {isDoorOpened && (
        <div className="dialogue-section mt-10 px-6 space-y-20 max-w-2xl mx-auto pb-20">

          <div className="manhwa-panel bg-gray-900/80 p-6 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">มายด์ (เสียงเบาๆ)</p>
            <p className="text-xl">"ใครหรอคะ... เอ๊ะ คุณฮันนี่เองหรอ มีอะไรรึป่าวคะมาซะเย็นเชียว"</p>
          </div>

          <div className="manhwa-panel text-center">
             <p className="text-yellow-500 font-bold mb-2">✨ ฮันนี่ (เวทตัวอักษร) ✨</p>
             <p className="text-2xl md:text-3xl text-yellow-200 font-serif leading-relaxed">
               "ขอโทษนะที่มารบกวน...<br/>
               พอดีฉันตัดสินใจได้แล้วว่า<br/>
               จะเป็นอาจารย์ให้เธอเอง"
             </p>
          </div>

          <div className="manhwa-panel flex flex-col items-center">
             <p className="text-4xl mb-4">😲 ➝ 😄</p>
             <p className="text-3xl font-bold text-pink-400">"จริงหรอคะ!?"</p>
             <p className="text-gray-400 mt-4 text-sm">&lt; มายด์ยิ้มแย้มอย่างสดใสน่ารัก &gt;</p>
          </div>

          <div className="text-center pt-10">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold animate-bounce"
            >
              เริ่มการฝึกฝน (Next Scene) ▼
            </button>
          </div>

        </div>
      )}

    </div>
  );
}