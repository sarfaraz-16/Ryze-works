"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useTilt3D, UseTilt3DOptions } from "@/hooks/useTilt3D";

export interface TiltCard3DProps extends UseTilt3DOptions {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = "",
  href,
  onClick,
  style = {},
  ariaLabel,
  maxTilt = 12,
  scale = 1.02,
  perspective = 1000,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  speed = 400,
}) => {
  const {
    cardRef,
    cardStyle,
    glareStyle,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  } = useTilt3D({ maxTilt, scale, perspective, easing, speed });

  const cardContent = (
    <div
      ref={cardRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative [transform-style:preserve-3d] select-none ${className}`}
      style={{
        ...cardStyle,
        ...style,
      }}
      onClick={onClick}
    >
      {/* Dynamic Glare / Sheen Overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-30"
        style={glareStyle}
      />
      {children}
    </div>
  );

  return (
    <div
      className="relative [perspective:1000px] w-full h-full"
      style={{ perspective: `${perspective}px` }}
    >
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B896FF] rounded-2xl"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};
