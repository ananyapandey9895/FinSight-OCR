import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UploadInvoice from './components/UploadInvoice';
import DataTable from './components/DataTable';
import InsightsPanel from './components/InsightsPanel';
import CompareBills from './components/CompareBills';
import GenerateInvoice from './components/GenerateInvoice';
import ReportsITR from './components/ReportsITR';
import CursorFollower from './components/effects/CursorFollower';
import AnimatedBackground from './components/effects/AnimatedBackground';

/* Page transition variants */
const pageVariants = {
    initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
    exit:    { opacity: 0, y: -10, filter: 'blur(4px)' },
};

/**
 * Global glass-card spotlight effect.
 * Sets CSS background-image on each .glass-card based on cursor position,
 * so every card glows where the cursor enters — no per-component changes needed.
 */
function useCardGlow() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.querySelectorAll('.glass-card').forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const inside =
                    x >= 0 && x <= rect.width &&
                    y >= 0 && y <= rect.height;

                if (inside) {
                    card.style.backgroundImage = `radial-gradient(
                        290px circle at ${x}px ${y}px,
                        rgba(99, 102, 241, 0.09),
                        transparent 72%
                    )`;
                } else {
                    card.style.backgroundImage = '';
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);
}

const PAGE_MAP = {
    dashboard: <Dashboard />,
    upload:    <UploadInvoice />,
    data:      <DataTable />,
    compare:   <CompareBills />,
    generate:  <GenerateInvoice />,
    insights:  <InsightsPanel />,
    reports:   <ReportsITR />,
};

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    useCardGlow();

    return (
        <div className="app-layout">
            {/* Global visual effects — rendered at root level */}
            <CursorFollower />
            <AnimatedBackground />

            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="main-content">
                <div className="page-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        >
                            {PAGE_MAP[activeTab] ?? <Dashboard />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default App;
