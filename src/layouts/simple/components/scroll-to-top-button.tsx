import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300); // แสดงปุ่มเมื่อเลื่อนลง > 300px
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`
        fixed
        w-12 h-12
        right-5
        bottom-[80px] sm:bottom-[50px]   /* mobile 80px, desktop 50px */
        rounded-full bg-[#e44b90]
        flex items-center justify-center
        text-white 
        shadow-lg
        transition-all duration-300
        z-50
        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      <FaArrowUpLong size={22} />
    </button>
  );
}
