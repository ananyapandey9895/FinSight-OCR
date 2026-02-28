import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CursorFollower.module.css';

export default function CursorFollower() {
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    /* Dot tracks tightly */
    const dotX = useSpring(mouseX, { stiffness: 520, damping: 34 });
    const dotY = useSpring(mouseY, { stiffness: 520, damping: 34 });

    /* Ring lags behind for depth */
    const ringX = useSpring(mouseX, { stiffness: 160, damping: 22 });
    const ringY = useSpring(mouseY, { stiffness: 160, damping: 22 });

    useEffect(() => {
        const onMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
            setIsPointer(!!e.target.closest('a, button, input, select, textarea, [role="button"]'));
        };
        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <>
            {/* Inner white dot — mix-blend-mode: difference for X-ray effect */}
            <motion.div
                className={styles.dot}
                style={{ x: dotX, y: dotY }}
                animate={{ scale: isPointer ? 0 : (isVisible ? 1 : 0), opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.12 }}
            />
            {/* Outer indigo ring — expands on hover */}
            <motion.div
                className={styles.ring}
                style={{ x: ringX, y: ringY }}
                animate={{
                    scale: isPointer ? 1.75 : (isVisible ? 1 : 0),
                    opacity: isVisible ? 1 : 0,
                    borderColor: isPointer
                        ? 'rgba(99, 102, 241, 0.95)'
                        : 'rgba(99, 102, 241, 0.5)',
                    backgroundColor: isPointer
                        ? 'rgba(99, 102, 241, 0.06)'
                        : 'transparent',
                }}
                transition={{ duration: 0.18 }}
            />
        </>
    );
}
