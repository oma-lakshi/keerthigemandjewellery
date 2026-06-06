import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CinematicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function CinematicButton({
  children,
  onClick,
  variant = 'gold',
  size = 'md',
  className = '',
  disabled = false
}: CinematicButtonProps) {
  const baseStyles = "relative overflow-hidden font-display font-medium transition-all duration-500";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full"
  };

  const variants = {
    gold: `
      bg-gradient-to-r from-[hsl(43,74%,45%)] via-[hsl(43,74%,55%)] to-[hsl(43,74%,45%)]
      text-white
      shadow-[0_0_20px_rgba(212,175,55,0.5)]
      hover:shadow-[0_0_40px_rgba(212,175,55,0.8)]
      hover:scale-105
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
      before:opacity-0 hover:before:opacity-30 before:transition-opacity before:duration-500
      before:translate-x-[-100%] hover:before:translate-x-[100%] before:duration-1000
    `,
    outline: `
      border-2 border-[hsl(43,74%,49%)]
      text-[hsl(43,74%,49%)]
      hover:bg-[hsl(43,74%,49%)]
      hover:text-white
      hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
      before:opacity-0 hover:before:opacity-20 before:transition-opacity
    `,
    ghost: `
      text-white
      hover:text-[hsl(43,74%,60%)]
      hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]
      transition-colors
    `
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}

export function GlowingIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,70%)] opacity-0 group-hover:opacity-50 transition-opacity" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
