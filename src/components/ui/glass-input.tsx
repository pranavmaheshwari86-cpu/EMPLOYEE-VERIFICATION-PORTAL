"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ElementType;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, icon: Icon, required, disabled, value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value !== undefined && value !== "";

    return (
      <div className={cn("relative w-full pt-6", className)}>
        <div className="relative group">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-aetheris-muted group-focus-within:text-aetheris-cyan transition-colors z-10">
              <Icon size={18} />
            </div>
          )}
          
          <input
            ref={ref}
            type={props.type === "password" && showPassword ? "text" : props.type}
            className={cn(
              "w-full bg-[#161616]/80 backdrop-blur-[20px] border border-white/5 rounded-[2rem] px-6 py-4 text-aetheris-white text-sm transition-all duration-300",
              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_12px_rgba(0,0,0,0.5)]",
              "focus:outline-none focus:bg-[#2a2a2a]/60 focus:border-white/15",
              "focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_0_20px_rgba(255,255,255,0.03)]",
              "placeholder:text-transparent",
              Icon && "pl-11",
              props.type === "password" && "pr-11",
              error && "border-aetheris-rose/50 focus:border-aetheris-rose/50 focus:shadow-[inset_0_1px_0_rgba(244,63,94,0.2),_0_0_20px_rgba(244,63,94,0.1)]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            placeholder={label}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            {...props}
          />
          {props.type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-aetheris-muted hover:text-aetheris-cyan transition-colors z-10"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          <motion.label
            initial={false}
            animate={{
              y: isFocused || hasValue ? -36 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              x: isFocused || hasValue ? 0 : (Icon ? 36 : 8),
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-4 top-4 text-sm text-aetheris-muted pointer-events-none origin-left",
              (isFocused || hasValue) && "text-aetheris-cyan/80",
              error && "text-aetheris-rose/80"
            )}
          >
            {label}
            {required && <span className="text-aetheris-rose ml-1">*</span>}
          </motion.label>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-aetheris-rose">{error}</p>
        )}
      </div>
    );
  }
);
GlassInput.displayName = "GlassInput";
