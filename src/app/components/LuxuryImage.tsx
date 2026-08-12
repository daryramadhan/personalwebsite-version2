import { useState, useEffect } from "react";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LuxuryImage({ src, alt, className = "", style }: LuxuryImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded status if src changes (e.g. switching projects/images)
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div 
      className="w-full h-full relative overflow-hidden bg-gray-50 flex items-center justify-center"
      style={style}
    >
      {/* Shimmer skeleton screen */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded 
            ? "opacity-100 blur-0 scale-100" 
            : "opacity-0 blur-[12px] scale-[1.03]"
        }`}
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
