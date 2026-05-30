"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  splitBy?: "word" | "char" | "line";
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  as: Component = "div",
  splitBy = "word",
  staggerDelay = 0.05,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getTokens = () => {
    if (splitBy === "word") {
      return children.split(/(\s+)/); // Split by space but keep the space
    } else if (splitBy === "char") {
      return children.split("");
    }
    return [children]; // Default: line
  };

  const tokens = getTokens();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const childVariants: any = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <Component ref={ref} className={cn("overflow-hidden block", className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn("flex flex-wrap", className?.includes("text-center") ? "justify-center" : "")}
        style={{ gap: '0.1em 0.25em' }}
      >
        {tokens.map((token, index) => {
          // If the token is just whitespace, render it directly without animation wrapper
          if (splitBy === "word" && /^\s+$/.test(token)) {
            return <span key={index}>{token}</span>;
          }

          return (
            <span key={index} className="overflow-clip pb-1 pt-1 inline-block relative flex-shrink-0 whitespace-nowrap" style={{ width: 'max-content' }}>
              <motion.span variants={childVariants} className="inline-block relative" style={{ width: 'max-content' }}>
                {token}
              </motion.span>
            </span>
          );
        })}
      </motion.div>
    </Component>
  );
}
