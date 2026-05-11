import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isHidden && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 border border-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            animate={{
              x: position.x - 12,
              y: position.y - 12,
              scale: isHovering ? 2.5 : 1,
              backgroundColor: isHovering ? 'rgba(197, 160, 89, 0.1)' : 'rgba(197, 160, 89, 0)'
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
            animate={{
              x: position.x - 2,
              y: position.y - 2,
              scale: isHovering ? 0 : 1
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
