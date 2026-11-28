'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'motion/react';

export const STUDIO_EASE = [0.16, 1, 0.3, 1] as const;

export const STUDIO_SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 26,
  mass: 0.9,
};

interface RevealItemProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  hoverY?: number;
  className?: string;
  immediate?: boolean;
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  delay = 0,
  duration = 0.58,
  y = 32,
  x = 0,
  scale = 0.97,
  hoverY,
  className = '',
  immediate = false,
  ...rest
}) => {
  const initialState = { opacity: 0, y, x, scale };
  const targetState = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      initial={initialState}
      animate={immediate ? targetState : undefined}
      whileInView={immediate ? undefined : targetState}
      viewport={immediate ? undefined : { once: true, amount: 0.05 }}
      whileHover={
        hoverY !== undefined
          ? { y: hoverY, transition: { duration: 0.24, ease: STUDIO_EASE } }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: STUDIO_EASE,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface RevealCardProps extends Omit<RevealItemProps, 'delay'> {
  index?: number;
  columns?: number;
  staggerStep?: number;
}

export const RevealCard: React.FC<RevealCardProps> = ({
  index = 0,
  columns = 4,
  staggerStep = 0.075,
  hoverY = -6,
  ...props
}) => {
  const colIndex = columns > 0 ? index % columns : index;
  const delay = Math.min(colIndex * staggerStep, 0.35);

  return <RevealItem delay={delay} hoverY={hoverY} {...props} />;
};

interface TypewriterWordsProps {
  text: string;
  delayMs?: number;
  wordSpeedMs?: number;
  showCursor?: boolean;
  active?: boolean;
  className?: string;
  cursorColorClass?: string;
}

export const TypewriterWords: React.FC<TypewriterWordsProps> = ({
  text,
  delayMs = 80,
  wordSpeedMs = 40,
  showCursor = true,
  active = true,
  className = '',
  cursorColorClass = 'bg-[#C5A059]',
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const normalized = (text || '').trim();
  const words = normalized ? normalized.split(/\s+/) : [];
  const totalWords = words.length;

  const [visibleCount, setVisibleCount] = useState<number>(() =>
    prefersReducedMotion ? totalWords : 0
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(totalWords);
      return;
    }
    if (!active) {
      setVisibleCount(0);
      return;
    }
    if (!isInView || totalWords === 0) return;

    setVisibleCount(0);
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      let count = 0;
      intervalId = setInterval(() => {
        count += 1;
        setVisibleCount(count);
        if (count >= totalWords && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, wordSpeedMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, active, totalWords, delayMs, wordSpeedMs, prefersReducedMotion, normalized]);

  if (totalWords === 0) return null;

  const isTyping = !prefersReducedMotion && active && visibleCount > 0 && visibleCount < totalWords;

  return (
    <span ref={containerRef} className={`inline ${className}`} aria-label={normalized}>
      {words.map((word, idx) => {
        const isShown = idx < visibleCount;
        const isCurrentWord = idx === visibleCount - 1;
        return (
          <React.Fragment key={`${idx}-${word}`}>
            <span
              aria-hidden="true"
              className={`inline-block transition-all duration-150 ${
                isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none select-none'
              }`}
            >
              {word}
            </span>
            {showCursor && isTyping && isCurrentWord && (
              <span
                aria-hidden="true"
                className="relative inline-block w-0 h-[0.85em] align-middle"
              >
                <span
                  className={`absolute left-0.5 top-0 w-[2px] h-full ${cursorColorClass} rounded-full animate-pulse`}
                />
              </span>
            )}
            {idx < totalWords - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </span>
  );
};
