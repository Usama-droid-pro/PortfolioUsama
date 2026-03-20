'use client'

import { motion } from 'motion/react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { SkillsSection } from './SkillsSection'
const experiences = [
    {
        role: 'Senior Software Engineer (MERN Stack)',
        company: 'OBS Technologia',
        logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGYrqrDzHmmLQ/company-logo_200_200/company-logo_200_200/0/1652871747886/obs_technologia_logo?e=1775692800&v=beta&t=NIEJr-JEmJpuKO0ONM1WzqmNFJC6k7B9f8RX3NPkL1g',
        location: 'Islamabad I9, PK',
        period: '05/2025 – Present',
        current: true,
        bullets: [
            'Contributed to backend services supporting 25k+ platform users.',
            'Developed API-as-a-Product module enabling external business integrations.',
            'Implemented identity verification and authentication APIs for partner applications.',
            'Worked on backend services for a global retail platform with 600+ outlets.',
            'Contributed to loyalty rewards system supporting ~10k daily active users.',
            'Built internal workforce management tool with biometric attendance integration.',
            'Implemented automated payroll calculations including overtime and deductions.',
        ],
    },
    {
        role: 'Senior MERN Developer',
        company: '92Devs',
        logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHOa_cNI8pCXQ/company-logo_200_200/company-logo_200_200/0/1683356245002/92devs_logo?e=1775692800&v=beta&t=aN2oBWIeeYhL6c5WtdJRPA61DoCbply_u08UrACXpOg',
        location: 'Rawalpindi, PK',
        period: '01/2024 – 05/2025',
        current: false,
        bullets: [
            'Built multiple production MERN applications including dashboards, CMS, and SaaS platforms.',
            'Developed scalable Node.js REST APIs supporting complex business logic.',
            'Led React Native mobile app development for cross-platform applications.',
            'Managed production deployments using Linux servers, PM2, and VPS hosting.',
            'Integrated third-party services including Stripe, Twilio, Firebase, and DocuSign.',
            'Optimized backend performance through API and database query improvements.',
        ],
    },
    {
        role: 'MERN Stack Developer',
        company: 'AutoAdvisers.com',
        logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGjhXK3K1D1_w/company-logo_200_200/B4EZozsv6zIwAI-/0/1761803960828/caradviserspakistan_logo?e=1775692800&v=beta&t=_GtApi94JUF586CfeRFJPElpbEPWnp5a3FLsukqCgZU',
        location: 'Islamabad F6, PK',
        period: '10/2023 – 12/2023',
        current: false,
        bullets: [
            'Developed and optimized product website using MERN stack, improving performance by 30%.',
            'Enhanced data efficiency, reducing load times by 20%.',
            'Optimized Node.js APIs across the application, increasing response time by 70%.',
            'Designed and developed a blogging module, boosting user engagement by 15%.',
        ],
    },
    {
        role: 'Node.js Developer',
        company: 'M TECHUB LLC.',
        logo: 'https://media.licdn.com/dms/image/v2/C560BAQEw4uZDvzCH7w/company-logo_200_200/company-logo_200_200/0/1679916086272?e=1775692800&v=beta&t=Xrtq-Hko03XIKKUvvEqMxfRH9jtHzcjAo2sNspO_4mU',
        location: 'Rawalpindi, PK',
        period: '06/2022 – 08/2023',
        current: false,
        bullets: [
            'Built scalable backend services using Node.js, MongoDB, and PostgreSQL.',
            'Designed secure REST APIs for multiple international client applications.',
            'Implemented authentication and role-based access control systems.',
            'Developed real-time messaging systems using Socket.io.',
            'Integrated third-party services including payments, messaging, and document signing.',
        ],
    },
]

const education = {
    degree: 'Bachelor of Computer Sciences',
    institution: 'PMAS Arid University',
    location: 'Rawalpindi, PK',
    period: '10/2019 – 08/2023',
    bullets: [
        'Major in Programming',
        'CGPA: 3.63 / 4.00',
    ],
}

export function ExperienceSection() {
    return (
        <section id="experience" className="py-24 px-10 relative z-10">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4" style={{ color: '#f0f6ff' }}>
                        Work <span style={{ color: '#5D9F96' }}>Experience</span>
                    </h2>
                    <div
                        className="w-20 h-1 rounded-full mb-6"
                        style={{ background: 'linear-gradient(90deg, #5D9F96, transparent)' }}
                    />
                    <p className="text-lg" style={{ color: '#7090a0' }}>
                        4 years of hands-on engineering across startups, agencies, and enterprise platforms.
                    </p>
                </motion.div>

                <div className="flex gap-16">
                    {/* Timeline */}
                    <div className="flex-1 relative">
                        {/* Vertical line */}
                        <div
                            className="absolute left-[7px] top-2 bottom-2 w-px"
                            style={{ background: 'rgba(93,159,150,0.15)' }}
                        />

                        <div className="space-y-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative pl-10 group"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                                        style={{
                                            borderColor: exp.current ? '#5D9F96' : 'rgba(93,159,150,0.4)',
                                            background: exp.current ? '#5D9F96' : '#0a0f1a',
                                            boxShadow: exp.current ? '0 0 12px rgba(93,159,150,0.5)' : 'none',
                                        }}
                                    />

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="p-6 rounded-xl border transition-all duration-300 group-hover:border-[rgba(93,159,150,0.25)]"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: 'rgba(255,255,255,0.07)',
                                        }}
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-4">
                                                {/* Logo Container */}
                                                {exp.logo && (
                                                    <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 flex-shrink-0">
                                                        <img
                                                            src={exp.logo}
                                                            alt={`${exp.company} logo`}
                                                            className="w-full h-full object-contain p-1 rounded"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-lg font-bold mb-1" style={{ color: '#f0f6ff' }}>
                                                        {exp.role}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-sm" style={{ color: '#5D9F96' }}>
                                                            {exp.company}
                                                        </span>
                                                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                                                        <span className="flex items-center gap-1 text-xs" style={{ color: '#506070' }}>
                                                            <MapPin className="w-3 h-3" />
                                                            {exp.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.04)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        color: '#94a3b8',
                                                    }}
                                                >
                                                    <Calendar className="w-3 h-3" />
                                                    {exp.period}
                                                </span>
                                                {exp.current && (
                                                    <span
                                                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                                                        style={{
                                                            background: 'rgba(93,159,150,0.12)',
                                                            border: '1px solid rgba(93,159,150,0.3)',
                                                            color: '#5D9F96',
                                                        }}
                                                    >
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <ul className="space-y-2">
                                            {exp.bullets.map((b, j) => (
                                                <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: '#7090a0' }}>
                                                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#5D9F96' }} />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
