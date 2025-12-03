import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeMonthsLaterScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade Text
      const texts = gsap.utils.toArray('.final-text');
      texts.forEach((text: any) => {
        gsap.fromTo(text, 
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: text, start: "top 85%" }}
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-gradient-to-b from-black to-gray-900 text-white pb-40">
      
      {/* Time Skip Header */}
      <div className="h-[50vh] flex items-center justify-center border-b border-gray-800">
         <h2 className="text-5xl md:text-7xl font-serif text-gray-400 final-text">3 เดือนผ่านไป...</h2>
      </div>

      {/* Dialogue Flow */}
      <div className="max-w-2xl mx-auto px-6 space-y-24 py-20">
         
         {/* มายด์กังวล */}
         <div className="final-text text-center">
            <p className="text-blue-300 mb-2">มายด์ (หน้ากลุ้มใจ)</p>
            <p className="text-2xl">"เฮ้อ... อีกแค่เดือนเดียวก็จะถึงงานแข่งแล้ว"</p>
            <p className="text-xl text-gray-400 mt-2">"ยังไม่ถึงไหนเลยจะทำไงดี... ฉันยังไม่พร้อมเลย"</p>
         </div>

         {/* ฮันนี่ปลอบ */}
         <div className="final-text bg-yellow-900/20 p-8 rounded-xl border border-yellow-600/30 text-center">
             <p className="text-yellow-500 font-bold mb-4">ฮันนี่ (เวทตัวอักษร)</p>
             <p className="text-lg leading-loose text-yellow-100">
               "อย่าไปกดดันตัวเองขนาดนั้นสิ<br/>
               ฉันเห็นความพยายามของเธอตลอด 3 เดือนที่ผ่านมาเลยนะ<br/>
               <span className="text-2xl font-bold">ดังนั้นฉันรู้ว่าเธอทำมันได้แน่ๆ</span><br/>
               มั่นใจในตัวเองเข้าไว้สิ"
             </p>
         </div>

         {/* บทสรุป */}
         <div className="final-text text-center space-y-6">
            <p className="text-gray-400">มายด์: "ก็มันไม่มั่นใจนี่หน่า..."</p>
            <p className="text-yellow-100">ฮันนี่: "งั้นพักการฝึกก่อน แล้วไปหาไรอร่อยๆ กินไหม ฉันเลี้ยงเอง"</p>
            <p className="text-3xl text-pink-400 font-bold">มายด์: "ก็ได้ค่ะ!" (ยิ้มแฉ่ง)</p>
         </div>

      </div>

      {/* ฉากจบ: ชานม */}
      <div className="final-text relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden mt-20">
          {/* BG ร้านชานม */}
          <div className="absolute inset-0 bg-orange-900/30"></div> 
          
          <div className="z-10 text-center">
             <div className="w-64 h-64 bg-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center text-black font-bold border-4 border-white shadow-lg">
                <span className="opacity-50">รูปดูดชานม</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif text-white mt-10 tracking-widest">
                ณ วันแข่งขัน
             </h2>
             <p className="text-gray-500 mt-4 text-sm uppercase tracking-[0.5em]">To be continued in Part 3</p>
          </div>
      </div>

    </div>
  );
}