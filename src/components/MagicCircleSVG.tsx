import { CSSProperties } from "react";

interface MagicCircleProps {
  className?: string;
  style?: CSSProperties;
}

const MagicCircleSVG = ({ className, style }: MagicCircleProps) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible", ...style }}
    >
      {/* วงแหวนรอบนอกสุด */}
      <circle
        cx="250"
        cy="250"
        r="245"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.8"
      />
      
      {/* วงแหวนรอง */}
      <circle
        cx="250"
        cy="250"
        r="230"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeDasharray="10 5"
      />

      {/* กลุ่มรูปทรงตรงกลาง (ดาว 6 แฉก) */}
      <g className="magic-star">
        <path
          d="M250 50 L423.2 350 H76.8 L250 50Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M250 450 L76.8 150 H423.2 L250 450Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* วงกลมเล็กตรงกลาง */}
      <circle
        cx="250"
        cy="250"
        r="50"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* ลวดลายตกแต่งวงใน */}
      <circle
        cx="250"
        cy="250"
        r="120"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
};

export default MagicCircleSVG;