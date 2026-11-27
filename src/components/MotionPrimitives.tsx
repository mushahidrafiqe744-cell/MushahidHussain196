'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

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
