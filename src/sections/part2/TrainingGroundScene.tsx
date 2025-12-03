import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onComplete: () => void;
}

export default function TrainingGroundScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 0. INITIAL SETUP ---
      gsap.set('.magic-text', { autoAlpha: 0, scale: 0.5 });
      gsap.set('.bully-group', { autoAlpha: 0 });
      gsap.set('.honey-group', { x: -100, autoAlpha: 0 });
      gsap.set('.honey-bubble', { scale: 0, opacity: 0, transformOrigin: 'bottom left' });
      gsap.set('.location-title', { y: 30, autoAlpha: 0 });
      // เพิ่ม: ซ่อนกลุ่มนักเรียนก่อน
      gsap.set('.group-students', { autoAlpha: 0 }); 

      // --- 1. INTRO ---
      const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300',
            scrub: 1,
        }
      });

      introTl
        .to('.black-overlay', { autoAlpha: 0, duration: 2 })
        .to('.location-title', { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out' }, "<0.5");


      // --- 2. MAGIC FAIL ---
      const magicTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.trigger-magic',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
      });
      magicTl.to('.location-title', { autoAlpha: 0, duration: 0.5 });

      magicTl
        .to('.magic-text-1', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out' })
        .to('.magic-text-1', { x: 5, duration: 0.1, repeat: 5, yoyo: true })
        .to('.magic-text-2', { autoAlpha: 1, scale: 1.2, color: '#ffaaaa', duration: 0.3 })
        .to('.magic-text-2', { filter: 'blur(10px)', opacity: 0, duration: 0.5, delay: 0.5 });


      // --- 3. BULLY SEQUENCE ---
      const bullyTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.trigger-bully',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
      });

      bullyTl
        .to('.magic-group', { autoAlpha: 0, duration: 0.3 })
        // ✅ เพิ่ม: โชว์กลุ่มนักเรียนขึ้นมาพร้อมคำด่า
        .to('.group-students', { autoAlpha: 1, duration: 0.5 }, "<") 
        .to('.bully-group', { autoAlpha: 1, duration: 0.1 }, "<")
        .fromTo('.bully-1', 
            { scale: 0, rotation: -20, opacity: 0 }, 
            { scale: 1, rotation: -5, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
        )
        .fromTo('.bully-2', 
            { scale: 0, rotation: 20, opacity: 0 }, 
            { scale: 1, rotation: 5, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' },
            "<0.2"
        )
        .fromTo('.bully-laugh', 
            { scale: 0, opacity: 0 }, 
            { scale: 1.5, opacity: 0.1, duration: 1, ease: 'power2.out' },
            "<0.3"
        );


      // --- 4. HONEY WATCHING ---
      const honeyTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.trigger-honey',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
      });

      honeyTl
        .to('.arena-bg', { filter: 'blur(5px) brightness(0.5)', duration: 1 })
        // ✅ เพิ่ม: ซ่อนกลุ่มนักเรียนเมื่อฮันนี่โผล่มา
        .to('.group-students', { autoAlpha: 0, duration: 0.5 }, "<")
        .to('.bully-group', { autoAlpha: 0, duration: 0.5 }, "<")
        .to('.honey-group', { x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "<")
        .to('.honey-bubble', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });


      // --- 5. EXIT ---
      ScrollTrigger.create({
        trigger: '.trigger-exit',
        start: 'top 80%',
        onEnter: () => {
           gsap.to('.black-overlay', { autoAlpha: 1, duration: 1, overwrite: true });
        },
        onLeaveBack: () => {
           gsap.to('.black-overlay', { autoAlpha: 0, duration: 1, overwrite: true });
        }
      });

      // จบ Scene
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete()
      });

    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] bg-black">
      
      {/* --- STICKY VIEWPORT --- */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden font-sans">
        
        {/* Layer 1: Background */}
        <div 
            className="arena-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/Part2/arena.png')" }}
        >
             <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Layer 1.5: Location Title */}
        <div className="location-title absolute bottom-10 left-10 z-10 pointer-events-none">
            <h2 className="text-3xl md:text-5xl font-serif text-white drop-shadow-xl tracking-wide">
                ณ ลานฝึกเวทมนตร์
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mt-2 rounded-full opacity-80"></div>
        </div>

        {/* ✅ Layer 1.8: Group Students (เพิ่มตรงนี้!) */}
        {/* วางไว้ตรงกลาง ล่างนิดหน่อย */}
        <img 
            src="/assets/Part2/group_students.png" 
            className="group-students absolute bottom-20 left-1/2 -translate-x-1/2 w-[80%] md:w-[50%] object-contain z-15 opacity-0 pointer-events-none"
            alt="Group Students"
        />

        {/* Layer 2: Magic Fail */}
        <div className="magic-group absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <h2 className="magic-text magic-text-1 text-6xl font-bold text-white drop-shadow-md mb-4">
                " ฮึบ...! "
            </h2>
            <h2 className="magic-text magic-text-2 text-8xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
                ไม่สำเร็จ!
            </h2>
            <p className="magic-text magic-text-2 text-gray-300 mt-8 italic text-xl">
                ( พลังเวทวูบดับลง... )
            </p>
        </div>

        {/* Layer 3: Bully */}
        <div className="bully-group absolute inset-0 pointer-events-none z-20">
            <div className="bully-1 absolute top-[30%] left-[5%] md:left-[15%] w-[80%] md:w-[40%] bg-black/80 p-6 rounded-tr-3xl rounded-bl-3xl border-l-4 border-red-500">
                <p className="text-red-400 font-bold mb-2 text-lg">นักเรียน 1:</p>
                <p className="text-white text-2xl md:text-3xl font-bold">
                    " ฝึกไปก็เหนื่อยเปล่า! <br/> คนขี้อายแบบเธอน่ะ "
                </p>
            </div>
            
            <div className="bully-2 absolute top-[55%] right-[5%] md:right-[15%] w-[80%] md:w-[40%] bg-black/80 p-6 rounded-tl-3xl rounded-br-3xl border-r-4 border-orange-500 text-right">
                <p className="text-orange-400 font-bold mb-2 text-lg">นักเรียน 2:</p>
                <p className="text-white text-2xl md:text-3xl font-bold">
                    " คิดจะเป็น <span className="text-yellow-400">จอมปราชญ์</span> <br/> รึไงกันยะ? "
                </p>
            </div>

            <div className="bully-laugh absolute inset-0 flex items-center justify-center z-[-1]">
                <h1 className="text-[200px] font-black text-white leading-none tracking-tighter opacity-10">
                    HAHA
                </h1>
            </div>
        </div>

        {/* Layer 4: Honey */}
        <div className="honey-group absolute bottom-0 left-0 md:left-20 w-[300px] h-[500px] z-30">
             <div className="relative w-full h-full">
                <img src="/assets/Part2/Honey/Body.PNG" className="absolute bottom-0 left-0 w-full object-contain" />
                <img src="/assets/Part2/Honey/Worry_Face.PNG" className="absolute top-[95px] left-1/2 -translate-x-1/2 w-[320px] object-contain" />
                
                <div className="honey-bubble absolute -top-[120px] -right-[200px] w-[350px] bg-white text-black p-8 rounded-[40px] shadow-2xl border-4 border-gray-100 origin-bottom-left">
                    <p className="text-gray-500 font-bold mb-2 uppercase text-xs tracking-wider">Honey's Mind</p>
                    <p className="text-xl leading-relaxed font-serif">
                      " นั่นมัน... เหมือนเราเมื่อก่อนเลย <br/>
                      <span className="text-blue-600 font-bold">มายด์</span> ต้องรู้สึกแย่มากแน่ๆ "
                    </p>
                    <div className="w-full h-[1px] bg-gray-200 my-4"></div>
                    <p className="text-lg text-gray-600 italic">
                        " เดี๋ยวเสร็จธุระแล้ว... <br/>
                        ฉันจะแวะไปหาเธอดีกว่า "
                    </p>
                    <div className="absolute -bottom-3 -left-2 w-8 h-8 bg-white rounded-full"></div>
                    <div className="absolute -bottom-8 -left-8 w-4 h-4 bg-white rounded-full"></div>
                </div>
             </div>
        </div>

        {/* Layer 5: Black Overlay */}
        <div className="black-overlay absolute inset-0 bg-black z-50 pointer-events-none"></div>

      </div>

      {/* --- SCROLL TRIGGERS --- */}
      <div className="trigger-magic absolute top-[50vh] w-full h-[10px]"></div>
      <div className="trigger-bully absolute top-[150vh] w-full h-[10px]"></div>
      <div className="trigger-honey absolute top-[250vh] w-full h-[10px]"></div>
      <div className="trigger-exit absolute top-[380vh] w-full h-[10px]"></div>

    </div>
  );
}