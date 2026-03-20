'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const skillCategories = [
    {
        id: 'frontend',
        label: 'Frontend & Mobile',
        skills: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'React Native', 'Redux', 'Tailwind', 'CSS', 'Radix UI', 'Shadcn', 'Material UI', 'Bootstrap']
    },
    {
        id: 'backend',
        label: 'Backend & APIs',
        skills: ['Node.js', 'GraphQL', 'REST APIs', 'Socket.io', 'WebRTC']
    },
    {
        id: 'database',
        label: 'Database & ORM',
        skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma', 'Sequelize', 'NoSQL', 'Redis']
    },
    {
        id: 'cloud',
        label: 'Cloud & DevOps',
        skills: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'Cpanel', 'Cron Jobs', 'AWS S3', 'Firebase', 'Wasabi', 'Cloudinary']
    },
    {
        id: 'tools',
        label: 'Services & Integrations',
        skills: ['Stripe', 'Twilio', 'Veriff', 'Docusign', 'SMTP', 'Auth', 'Payment Integrations', 'Agile/Scrum']
    },
    {
        id: 'ai',
        label: 'AI Copilots',
        skills: ['Claude Code', 'Cursor', 'Trae AI', 'Windsurf', 'Qoder', 'Antigravity']
    }
]

export function SkillsSection() {
    const [activeTab, setActiveTab] = useState(skillCategories[0].id)

    return (
        <section id="skills" className="py-5 px-10 relative overflow-hidden z-10 w-full" style={{ background: '#0a0f1a' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="text-4xl font-bold mb-4"
                            style={{ color: '#f0f6ff' }}
                        >
                            Technical <span style={{ color: '#5D9F96' }}>Expertise</span>
                        </h2>
                        <div
                            className="w-20 h-1 rounded-full mb-6 mx-auto md:mx-0"
                            style={{ background: 'linear-gradient(90deg, #5D9F96, transparent)' }}
                        />

                    </motion.div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    {skillCategories.map((category) => {
                        const isActive = activeTab === category.id
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className="relative px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors"
                                style={{
                                    color: isActive ? '#f0f6ff' : '#7090a0',
                                }}
                            >
                                {category.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-[-1px] left-0 right-0 h-[2px]"
                                        style={{ background: '#5D9F96' }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Tab Content Grid */}
                <div className="min-h-[200px]">
                    <AnimatePresence mode="wait">
                        {skillCategories.map((category) => {
                            if (category.id !== activeTab) return null

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                                >
                                    {category.skills.map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.03 }}
                                            whileHover={{
                                                scale: 1.05,
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                borderColor: 'rgba(93, 159, 150, 0.4)',
                                                color: '#5D9F96'
                                            }}
                                            className="flex items-center justify-center p-4 rounded-xl border text-center transition-all cursor-default"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                borderColor: 'rgba(255, 255, 255, 0.05)',
                                                color: '#94a3b8',
                                            }}
                                        >
                                            <span className="text-sm font-semibold truncate px-1">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

            </div>

            {/* Custom scrollbar utility for the tabs (in case global hide-scrollbar is missing) */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}
