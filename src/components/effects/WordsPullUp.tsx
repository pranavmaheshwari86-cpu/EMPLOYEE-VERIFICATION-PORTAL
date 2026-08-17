"use client";

import React from "react";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = "", showAsterisk = false }: WordsPullUpProps) {
  if (!showAsterisk) {
    return <WordsPullUpMultiStyle segments={[{ text }]} className={className} />;
  }

  const words = text.split(" ");
  const mainText = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <WordsPullUpMultiStyle
      className={className}
      segments={[
        ...(mainText ? [{ text: `${mainText} ` }] : []),
        { text: lastWord, className: "relative pr-2 after:content-['*'] after:absolute after:top-1 after:right-0 after:text-[0.4em]" }
      ]}
    />
  );
}

