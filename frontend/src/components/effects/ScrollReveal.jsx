import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const presets = {
    up:    { hidden: { opacity: 0, y: 44 },     visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -44 },    visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -52 },    visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 52 },     visible: { opacity: 1, x: 0 } },
    fade:  { hidden: { opacity: 0 },            visible: { opacity: 1 } },
    scale: { hidden: { opacity: 0, scale: 0.87 }, visible: { opacity: 1, scale: 1 } },
};

/**
 * Scroll-triggered reveal wrapper using Framer Motion + IntersectionObserver.
 * Animates children into view once when they enter the viewport.
 */
export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.58,
    className,
    style,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-6% 0px' });
    const variants = presets[direction] ?? presets.up;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
