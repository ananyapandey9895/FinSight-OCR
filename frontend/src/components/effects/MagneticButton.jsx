import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Wraps any button/div and pulls it magnetically toward the cursor
 * when the pointer hovers within the element's bounds.
 */
export default function MagneticButton({
    children,
    className = '',
    strength = 0.32,
    tag = 'button',
    onClick,
    style,
    ...rest
}) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 190, damping: 15 });
    const springY = useSpring(y, { stiffness: 190, damping: 15 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const MotionTag = motion[tag] || motion.div;

    return (
        <MotionTag
            ref={ref}
            className={className}
            style={{ x: springX, y: springY, ...style }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.96 }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}
