'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShieldOff, Users, Globe, Layers, ChevronDown, Car } from 'lucide-react'
import CarAdvisersImg from '@/assets/images/Screenshot 2026-03-21 at 3.51.56 AM.png'

const projects = [
    {
        icon: ShieldOff,
        title: 'Identity Verification API Platform',
        label: 'Confidential — NDA Protected',
        role: 'Backend Engineer · API-as-a-Product Module',
        image: '/project_identity_api.png',
        accentColor: '#5D9F96',
        stats: [{ value: '25,000+', label: 'Platform Users' }],
        tags: ['Node.js', 'REST API', 'Auth', 'Veriff', 'PostgreSQL'],
        bullets: [
            'Developed API-as-a-Product infrastructure enabling external businesses to integrate identity and verification services.',
            'Designed scalable REST APIs for third-party integrations inside partner applications.',
            'Implemented authentication, verification workflows, and request validation pipelines.',
            'Optimized API performance and DB queries for reliable high-volume processing.',
        ],
    },
    {
        icon: Globe,
        title: 'Global Retail Loyalty Platform',
        label: 'Confidential — NDA Protected · Pennsylvania, USA',
        role: 'Backend Engineer · Loyalty System Module',
        image: '/project_loyalty_platform.png',
        accentColor: '#FA7305',
        stats: [
            { value: '600+', label: 'Global Outlets' },
            { value: '10k', label: 'Daily Active Users' },
        ],
        tags: ['Node.js', 'MongoDB', 'Loyalty System', 'Redis', 'REST APIs'],
        bullets: [
            'Developed backend services for customer loyalty and rewards platform across a global retail franchise.',
            'Implemented points accumulation, reward redemption, and transaction tracking systems.',
            'Designed scalable APIs supporting mobile and web client applications.',
            'Built backend logic for customer engagement campaigns and reward calculations.',
            'Optimized database queries and APIs to support high daily transaction volume.',
        ],
    },
    {
        icon: Users,
        title: 'OBS Work Flow Manager',
        label: 'Internal Product · Enterprise',
        role: 'Full-Stack Engineer · Internal Tooling',
        image: '/project_workflow_manager.png',
        accentColor: '#ABE2F4',
        stats: [{ value: 'Internal', label: 'Enterprise Tool' }],
        tags: ['React.js', 'Node.js', 'MongoDB', 'Biometrics', 'Socket.io'],
        bullets: [
            'Architected and developed an internal workforce management system from scratch.',
            'Integrated biometric attendance devices for automated employee time tracking.',
            'Implemented project hour tracking, task monitoring, and productivity reporting.',
            'Developed automated salary calculation system including overtime, deductions, and adjustments.',
            'Built reporting dashboards summarizing employee activity and company project hours.',
        ],
    },
    {
        icon: Layers,
        title: 'Fleet Reservation & Scheduling Platform',
        label: 'Confidential — NDA Protected',
        role: 'Full-Stack Engineer · Web App + Admin Panel',
        image: '/project_fleet_platform.png',
        accentColor: '#5D9F96',
        stats: [{ value: 'Web + Admin', label: 'Platform' }],
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'RBAC', 'Calendar API'],
        bullets: [
            'Built Next.js fleet reservation platform with calendar-based truck booking.',
            'Implemented role-based authentication and approval-based company onboarding.',
            'Developed APIs for reservation transactions and availability scheduling.',
        ],
    },
    {
        icon: Car,
        title: 'Car Advisers Platform',
        label: 'caradvisers.com · Pakistan',
        role: 'MERN Stack Developer',
        image: CarAdvisersImg.src,
        accentColor: '#E63946',
        stats: [{ value: '10+', label: 'Products & Services' }],
        tags: ['MERN', 'Node.js', 'MongoDB', 'React', 'API Optimization'],
        bullets: [
            'Contributed to Pakistan’s largest automobile platform supporting classifieds, car inspections, auctions, and more.',
            'Architected and built a comprehensive blogging module from the ground up to boost engagement.',
            'Revamped and optimized all backend REST APIs for maximum speed and reduced response latency.',
        ],
    },
]

export function ProjectsSection() {
    const [expanded, setExpanded] = useState<number | null>(null)

    return (
        <section id="projects" className="py-24 px-10 relative z-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4" style={{ color: '#f0f6ff' }}>
                        Key Project <span style={{ color: '#5D9F96' }}>Contributions</span>
                    </h2>
                    <div
                        className="w-20 h-1 rounded-full mb-6"
                        style={{ background: 'linear-gradient(90deg, #5D9F96, transparent)' }}
                    />
                    <p className="text-lg" style={{ color: '#7090a0' }}>
                        Selected high-impact projects delivered at production scale.
                    </p>
                </motion.div>

                {/* Accordion Cards */}
                <div className="space-y-3">
                    {projects.map((project, i) => {
                        const isOpen = expanded === i

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                onClick={() => setExpanded(isOpen ? null : i)}
                                className="rounded-2xl border overflow-hidden cursor-pointer transition-colors duration-300"
                                style={{
                                    background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
                                    borderColor: isOpen ? `${project.accentColor}33` : 'rgba(255,255,255,0.07)',
                                }}
                            >
                                {/* Collapsed Row — always visible */}
                                <div className="flex items-center gap-6 px-6 py-5 select-none">
                                    {/* Step number */}
                                    <span
                                        className="text-xs font-black tabular-nums w-7 flex-shrink-0"
                                        style={{ color: `${project.accentColor}66` }}
                                    >
                                        0{i + 1}
                                    </span>

                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: `${project.accentColor}12`,
                                            border: `1px solid ${project.accentColor}28`,
                                        }}
                                    >
                                        <project.icon className="w-5 h-5" style={{ color: project.accentColor }} />
                                    </div>

                                    {/* Title + role */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold truncate" style={{ color: '#f0f6ff' }}>
                                            {project.title}
                                        </h3>
                                        <p className="text-xs mt-0.5 truncate" style={{ color: '#506070' }}>
                                            {project.role}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                                        {project.stats.map((s, j) => (
                                            <div key={j} className="text-right">
                                                <div className="text-sm font-bold" style={{ color: project.accentColor }}>
                                                    {s.value}
                                                </div>
                                                <div className="text-[11px]" style={{ color: '#506070' }}>{s.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tags pill preview */}
                                    <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] px-2.5 py-1 rounded-md"
                                                style={{
                                                    background: `${project.accentColor}0e`,
                                                    border: `1px solid ${project.accentColor}22`,
                                                    color: project.accentColor,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="text-[11px]" style={{ color: '#506070' }}>
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Chevron */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown className="w-5 h-5" style={{ color: '#506070' }} />
                                    </motion.div>
                                </div>

                                {/* Expanded Panel */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div
                                                className="border-t mx-6"
                                                style={{ borderColor: `${project.accentColor}18` }}
                                            />
                                            <div className="flex gap-8 p-6">
                                                {/* Left — Image */}
                                                <div className="flex-shrink-0 w-64 h-44 rounded-xl overflow-hidden relative">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Subtle vignette overlay */}
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(10,15,26,0.35) 0%, transparent 60%)',
                                                        }}
                                                    />
                                                    {/* Accent tag bottom-left */}
                                                    <div className="absolute bottom-3 left-3">
                                                        <span
                                                            className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider"
                                                            style={{
                                                                background: `${project.accentColor}22`,
                                                                border: `1px solid ${project.accentColor}44`,
                                                                color: project.accentColor,
                                                                backdropFilter: 'blur(6px)',
                                                            }}
                                                        >
                                                            {project.label.split('—')[0].trim()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Right — Details */}
                                                <div className="flex-1 min-w-0 flex flex-col gap-4">
                                                    {/* Bullets */}
                                                    <ul className="space-y-2.5">
                                                        {project.bullets.map((b, j) => (
                                                            <motion.li
                                                                key={j}
                                                                initial={{ opacity: 0, x: -8 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.05 * j + 0.15 }}
                                                                className="flex items-start gap-3 text-sm"
                                                                style={{ color: '#7090a0' }}
                                                            >
                                                                <span
                                                                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                    style={{ background: project.accentColor }}
                                                                />
                                                                {b}
                                                            </motion.li>
                                                        ))}
                                                    </ul>

                                                    {/* All Tags */}
                                                    <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                                        {project.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="text-xs px-2.5 py-1 rounded-md"
                                                                style={{
                                                                    background: `${project.accentColor}0e`,
                                                                    border: `1px solid ${project.accentColor}25`,
                                                                    color: project.accentColor,
                                                                }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
