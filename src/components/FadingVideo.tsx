"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function FadingVideo({ src, className, style, ...props }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.play().catch(() => {});
      controls.start({ opacity: 1, transition: { duration: 1, ease: "easeOut" } });
    };

    if (video.readyState >= 2) {
      handleLoadedData();
    } else {
      video.addEventListener("loadeddata", handleLoadedData);
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [controls]);

  return (
    <motion.video
      ref={videoRef}
      src={src}
      className={className}
      style={{ 
        ...style, 
        willChange: "opacity",
        imageRendering: "high-quality",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden"
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      {...(props as any)}
    />
  );
}
