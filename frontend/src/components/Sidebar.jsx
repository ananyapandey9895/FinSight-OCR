import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Upload,
    Package,
    Scale,
    FileText,
    Sparkles,
    BarChart2,
    Zap,
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard',     icon: LayoutDashboard },
    { id: 'upload',    label: 'Upload Invoice', icon: Upload },
    { id: 'data',      label: 'Product Data',   icon: Package },
    { id: 'compare',   label: 'Compare Bills',  icon: Scale },
    { id: 'generate',  label: 'Generate Bill',  icon: FileText },
    { id: 'insights',  label: 'AI Insights',    icon: Sparkles },
    { id: 'reports',   label: 'Reports & ITR',  icon: BarChart2 },
];

export default function Sidebar({ activeTab, onTabChange }) {
    return (
        <aside className="sidebar">
            {/* ── Logo ── */}
            <div className="sidebar-logo">
                <motion.div
                    className="sidebar-logo-icon"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                    <Zap size={17} />
                </motion.div>
                <div>
                    <h1>FinSight OCR</h1>
                    <p>Smart Store Analytics</p>
                </div>
            </div>

            {/* ── Nav ── */}
            <nav className="sidebar-nav">
                {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            id={`nav-${item.id}`}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => onTabChange(item.id)}
                            initial={{ opacity: 0, x: -18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: idx * 0.055,
                                duration: 0.38,
                                ease: 'easeOut',
                            }}
                            whileHover={{ x: 3 }}
                        >
                            {/* Sliding active pill via layoutId */}
                            {isActive && (
                                <motion.div
                                    className="nav-active-bg"
                                    layoutId="sidebar-active-pill"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 340,
                                        damping: 32,
                                    }}
                                />
                            )}

                            {/* Icon + Label */}
                            <span className="nav-item-content">
                                <motion.span
                                    whileHover={{ scale: 1.12 }}
                                    transition={{ duration: 0.14 }}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Icon size={17} className="nav-icon" />
                                </motion.span>
                                <span className="nav-label">{item.label}</span>
                            </span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* ── Footer ── */}
            <div className="sidebar-footer">
                <p>Powered by Gemini AI + OCR</p>
            </div>
        </aside>
    );
}
