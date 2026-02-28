import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

/* Orb definitions — position, color, size, animation */
const orbs = [
    {
        color: 'rgba(99, 102, 241, 0.24)',
        size: 720,
        left: '2%',
        top: '0%',
        duration: 12,
        delay: 0,
        parallaxStrength: 1,
    },
    {
        color: 'rgba(139, 92, 246, 0.16)',
        size: 580,
        left: '62%',
        top: '10%',
        duration: 16,
        delay: 2.5,
        parallaxStrength: 0.7,
    },
    {
        color: 'rgba(20, 184, 166, 0.12)',
        size: 520,
        left: '72%',
        top: '58%',
        duration: 11,
        delay: 5,
        parallaxStrength: 0.5,
    },
    {
        color: 'rgba(244, 63, 94, 0.08)',
        size: 440,
        left: '12%',
        top: '65%',
        duration: 14,
        delay: 3,
        parallaxStrength: 0.8,
    },
    {
        color: 'rgba(99, 102, 241, 0.09)',
        size: 400,
        left: '42%',
        top: '38%',
        duration: 19,
        delay: 7,
        parallaxStrength: 0.4,
    },
];

export default function AnimatedBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    /* Slow spring so orbs drift subtly */
    const springX = useSpring(mouseX, { stiffness: 22, damping: 16 });
    const springY = useSpring(mouseY, { stiffness: 22, damping: 16 });

    useEffect(() => {
        const handleMove = (e) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 44);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 44);
        };
        window.addEventListener('mousemove', handleMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMove);
    }, [mouseX, mouseY]);

    return (
        <div className={styles.container} aria-hidden="true">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={styles.orb}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.left,
                        top: orb.top,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
                        x: springX,
                        y: springY,
                    }}
                    animate={{ scale: [1, 1.09, 1], opacity: [0.65, 1, 0.65] }}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Subtle dot-grid texture */}
            <div className={styles.grid} />

            {/* Edge vignette to focus content */}
            <div className={styles.vignette} />
        </div>
    );
}
