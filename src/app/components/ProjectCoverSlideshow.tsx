import React, { useState, useEffect } from "react";

interface ProjectCoverSlideshowProps {
  coverImages?: string[];
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  intervalMs?: number;
}

export default function ProjectCoverSlideshow({
  coverImages,
  src,
  alt = "Project Cover",
  className = "w-full h-full relative overflow-hidden",
  imgClassName = "w-full h-full object-cover object-center",
  style,
  intervalMs = 1000,
}: ProjectCoverSlideshowProps) {
  const images =
    coverImages && coverImages.length > 0
      ? coverImages
      : src
      ? [src]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return <div className={`bg-[#f4f4f6] ${className}`} style={style} />;
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className={imgClassName}
        style={style}
      />
    );
  }

  return (
    <div className={className} style={style}>
      {images.map((imgSrc, idx) => {
        const isActive = idx === currentIndex;
        return (
          <img
            key={`${imgSrc}-${idx}`}
            src={imgSrc}
            alt={`${alt} ${idx + 1}`}
            className={`${imgClassName} absolute inset-0 transition-opacity duration-400 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        );
      })}
    </div>
  );
}
