"use client";
import dynamic from "next/dynamic";

export const AIWidgetWrapper = dynamic(() => import("./ai-widget").then(mod => mod.AIWidget), {
  ssr: false
});
