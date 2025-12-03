import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onComplete: () => void;
}

export default function SchoolScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // --- 1. INTRO SEQUENCE ---
      gsap.to('.intro-overlay', {
        autoAlpha: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
        }
      });

      // --- 2. CHARACTER ENTRANCE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=300',
        }
      });

      tl.fromTo('.honey-character',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Setup
      gsap.set(['.bubble-1', '.bubble-middle', '.bubble-2'], { scale: 0, opacity: 0, transformOrigin: 'bottom left' });
      gsap.set('.face-worry, .face-sweat', { autoAlpha: 0 });
      gsap.set('.face-normal', { autoAlpha: 1 });
      gsap.set('.arena-bg-img', { autoAlpha: 0 });
      gsap.set('.lost-text', { autoAlpha: 0, scale: 0.5 });


      // --- TRIGGER 1: WORRY ---
      ScrollTrigger.create({
        trigger: '.trigger-1',
        start: 'top 60%',
        onEnter: () => {
           gsap.to('.face-normal', { autoAlpha: 0, duration: 0.3, overwrite: true });
           gsap.to('.face-worry', { autoAlpha: 1, duration: 0.3, overwrite: true });
           gsap.to('.bubble-1', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', overwrite: true });
           gsap.to('.bubble-middle', { scale: 0, opacity: 0, duration: 0.1, overwrite: true });
        },
        onLeaveBack: () => {
           gsap.to('.face-normal', { autoAlpha: 1, duration: 0.3, overwrite: true });
           gsap.to('.face-worry', { autoAlpha: 0, duration: 0.3, overwrite: true });
           gsap.to('.bubble-1', { scale: 0, opacity: 0, duration: 0.3, overwrite: true });
        }
      });


      // --- TRIGGER MIDDLE ---
      ScrollTrigger.create({
        trigger: '.trigger-middle',
        start: 'top 60%',
        onEnter: () => {
           gsap.to('.face-worry', { autoAlpha: 0, duration: 0.3, overwrite: true });
           gsap.to('.face-normal', { autoAlpha: 1, duration: 0.3, overwrite: true });
           gsap.to('.bubble-1', { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
           gsap.to('.bubble-middle', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1, overwrite: true });
           gsap.to('.bubble-2', { scale: 0, opacity: 0, duration: 0.1, overwrite: true });
        },
        onLeaveBack: () => {
           gsap.to('.face-normal', { autoAlpha: 0, duration: 0.3, overwrite: true });
           gsap.to('.face-worry', { autoAlpha: 1, duration: 0.3, overwrite: true });
           gsap.to('.bubble-middle', { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
           gsap.to('.bubble-1', { scale: 1, opacity: 1, duration: 0.3, delay: 0.1, overwrite: true });
        }
      });


      // --- TRIGGER 2: SWEAT ---
      ScrollTrigger.create({
        trigger: '.trigger-2',
        start: 'top 60%',
        onEnter: () => {
           gsap.to('.face-normal', { autoAlpha: 0, duration: 0.2, overwrite: true });
           gsap.to('.face-sweat', { autoAlpha: 1, duration: 0.2, overwrite: true });
           gsap.to('.honey-face-group', { rotation: 5, duration: 0.5, overwrite: true });
           gsap.to('.bubble-middle', { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
           gsap.to('.bubble-2', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1, overwrite: true });
        },
        onLeaveBack: () => {
           gsap.to('.face-sweat', { autoAlpha: 0, duration: 0.2, overwrite: true });
           gsap.to('.face-normal', { autoAlpha: 1, duration: 0.2, overwrite: true });
           gsap.to('.honey-face-group', { rotation: 0, duration: 0.5, overwrite: true });
           gsap.to('.bubble-2', { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
           gsap.to('.bubble-middle', { scale: 1, opacity: 1, duration: 0.3, delay: 0.1, overwrite: true });
        }
      });


      // --- TRIGGER 3: WALKING LOST (เข้า Arena) ---
      ScrollTrigger.create({
        trigger: '.trigger-3',
        start: 'top 60%',
        onEnter: () => {
           // เอา overwrite: true ออก เพื่อไม่ให้ background panning หยุดชะงัก
           gsap.to('.school-bg-img', { autoAlpha: 0, duration: 1 });
           gsap.to('.arena-bg-img', { autoAlpha: 1, duration: 1 });

           gsap.to('.lost-text', { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", overwrite: true });
           gsap.to('.bubble-2', { scale: 0, opacity: 0, duration: 0.3, overwrite: true });
        },
        onLeaveBack: () => {
           gsap.to('.school-bg-img', { autoAlpha: 1, duration: 1 });
           gsap.to('.arena-bg-img', { autoAlpha: 0, duration: 1 });

           gsap.to('.lost-text', { autoAlpha: 0, scale: 0.5, duration: 0.5, overwrite: true });
           gsap.to('.bubble-2', { scale: 1, opacity: 1, duration: 0.3, overwrite: true });
        }
      });


      // --- TRIGGER 4: EXIT SCENE (ออกจาก Arena -> มืดสนิท) ---
      // ✅ เพิ่มส่วนนี้ครับ: เมื่อไถเกือบสุดทาง ให้ทุกอย่าง Fade Out เป็นสีดำ
      ScrollTrigger.create({
        trigger: '.trigger-exit',
        start: 'top 80%', // เริ่ม Fade Out ก่อนจบ Scene นิดหน่อย
        onEnter: () => {
           // สั่งทุกอย่างให้หายไป
           gsap.to(['.arena-bg-img', '.lost-text', '.honey-character'], {
               autoAlpha: 0,
               duration: 1,
               ease: 'power1.inOut',
               overwrite: true // บังคับให้หายไปเลย
           });
        },
        onLeaveBack: () => {
           // ถ้าไถกลับขึ้นมา ให้โชว์กลับมา
           gsap.to(['.arena-bg-img', '.lost-text', '.honey-character'], {
               autoAlpha: 1,
               duration: 0.5,
               overwrite: true
           });
        }
      });


      // --- ANIMATION เดิน ---
      gsap.to('.honey-body', { scaleY: 1.02, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

      gsap.to('.honey-character-container', {
         x: 650,
         ease: 'none',
         scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom bottom', scrub: true }
      });

      gsap.to(['.school-bg-img', '.arena-bg-img'], {
        yPercent: 10,
        xPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom bottom', scrub: true }
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
    // เพิ่มความสูงอีกนิดเป็น 480vh เพื่อเผื่อที่ให้ Fade Out ตอนจบ
    <div ref={containerRef} className="relative w-full h-[480vh] bg-black">

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Backgrounds */}
        <div className="school-img-container relative w-full h-full">
            <div
                className="school-bg-img absolute inset-0 bg-cover bg-center scale-125 origin-left"
                style={{ backgroundImage: "url('/assets/Part2/Hall_School.png')" }}
            />
            <div
                className="arena-bg-img absolute inset-0 bg-cover bg-center scale-125 origin-left"
                style={{ backgroundImage: "url('/assets/Part2/arena.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>

        {/* Character + Bubbles */}
        <div className="honey-character-container absolute bottom-0 left-0 md:left-20 w-[300px] h-[500px] z-20">
            <div className="honey-character relative w-full h-full opacity-0">
                <img src="/assets/Part2/Honey/Body.PNG" className="honey-body absolute bottom-0 left-0 w-full object-contain origin-bottom" />

                <div className="honey-face-group absolute top-[95px] left-1/2 -translate-x-1/2 w-[320px] origin-bottom">
                    <img src="/assets/Part2/Honey/Normal_Face.PNG" className="face-normal absolute top-0 left-0 w-full object-contain" />
                    <img src="/assets/Part2/Honey/Worry_Face.PNG" className="face-worry absolute top-0 left-0 w-full object-contain opacity-0" />
                    <img src="/assets/Part2/Honey/Sweat_Face.PNG" className="face-sweat absolute top-0 left-0 w-full object-contain opacity-0" />
                </div>

                {/* Bubbles */}
                <div className="bubble-1 absolute -top-[60px] -right-[150px] w-[300px] bg-white text-black p-6 rounded-[30px] shadow-xl border-4 border-gray-100 z-30 origin-bottom-left scale-0 opacity-0">
                    <p className="text-lg font-medium leading-relaxed font-serif">
                      " เห้อ... ตาลุงนั่นชอบใช้ให้ไปทำเรื่องที่วุ่นวายตลอดเลย "
                    </p>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full"></div>
                    <div className="absolute -bottom-5 -left-6 w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="bubble-middle absolute -top-[80px] -right-[180px] w-[300px] bg-white text-black p-6 rounded-[30px] shadow-xl border-4 border-gray-100 z-30 origin-bottom-left scale-0 opacity-0">
                    <p className="text-lg font-medium leading-relaxed font-serif">
                      " จะว่าไปไม่ได้กลับมาซะนาน... <br/>
                      <span className="text-blue-600 font-bold">ที่นี่เองก็เปลี่ยนไปเยอะเหมือนกันนะ</span> "
                    </p>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full"></div>
                    <div className="absolute -bottom-5 -left-6 w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="bubble-2 absolute -top-[50px] -right-[150px] w-[300px] bg-white text-black p-6 rounded-[30px] shadow-xl border-4 border-gray-100 z-30 origin-bottom-left scale-0 opacity-0">
                    <p className="text-2xl font-bold leading-relaxed font-serif text-center">
                      " แล้วห้องอาจารย์ใหญ่ <br/>
                      <span className="text-red-500">ไปทางไหนเนี่ย?</span> "
                    </p>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full"></div>
                    <div className="absolute -bottom-5 -left-6 w-3 h-3 bg-white rounded-full"></div>
                </div>
            </div>
        </div>

        {/* Lost Text */}
        <div className="lost-text absolute inset-0 flex items-center justify-center z-40 pointer-events-none opacity-0">
            <div className="text-center space-y-6 animate-float -translate-y-32">
                 <h2 className="text-8xl md:text-9xl font-black text-white/80 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] blur-[2px]">. . .</h2>
                 <p className="text-2xl text-white-300 font-light tracking-widest uppercase opacity-70">( หลงทางซะแล้ว )</p>
            </div>
        </div>

        {/* Intro Overlay */}
        <div className="intro-overlay absolute inset-0 bg-black z-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest animate-pulse">โรงเรียนเวทมนตร์</h1>
        </div>
      </div>

      {/* --- SCROLL TRIGGERS --- */}
      <div className="trigger-1 absolute top-[100vh] w-full h-[10px] bg-transparent"></div>
      <div className="trigger-middle absolute top-[190vh] w-full h-[10px] bg-transparent"></div>
      <div className="trigger-2 absolute top-[280vh] w-full h-[10px] bg-transparent"></div>
      <div className="trigger-3 absolute top-[360vh] w-full h-[10px] bg-transparent"></div>

      {/* Trigger Exit: อยู่ท้ายสุด เพื่อ Fade Out ทุกอย่าง */}
      <div className="trigger-exit absolute top-[440vh] w-full h-[10px] bg-transparent"></div>

    </div>
  );
}