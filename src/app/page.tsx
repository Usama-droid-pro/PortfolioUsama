'use client'

import { Sidebar } from './components/Sidebar'
import { SkillOrbit } from './components/SkillOrbit'
import { SkillsSection } from './components/SkillsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ApexNodeBanner } from './components/ApexNodeBanner'
import { FolderStructureSection } from './components/FolderStructureSection'
import { ClicksSection } from './components/ClicksSection'
import { ContactSection } from './components/ContactSection'
import { motion } from 'motion/react'
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github
} from 'lucide-react'



export default function Page() {
  const SHOW_OPEN_TO_WORK_BANNER = true;

  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden" style={{ background: '#0a0f1a' }}>
      {SHOW_OPEN_TO_WORK_BANNER && (
        <div className="w-full shrink-0 bg-gradient-to-r from-[#FA7305] to-[#D95B04] text-white py-2 px-4 shadow-xl text-center text-sm font-bold flex justify-center items-center gap-2 z-50 tracking-wide border-b border-orange-400/30">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          Hey Recruiters , I am open to work these days. I would love to connect with you.
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main
          className="flex-1 overflow-y-auto relative"
          style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1e2d 50%, #0a1320 100%)' }}
        >
          {/* Persistent grid overlay for the entire main area */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(93,159,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(93,159,150,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {/* Hero Section */}
          <section
            id="about"
            className="relative overflow-hidden px-6 lg:px-10 py-12 lg:py-2 z-10 text-center lg:text-left"
            style={{ minHeight: '30vh' }}
          >

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
              {/* LEFT — Text Content */}
              <motion.div
                className="flex-1 max-w-xl"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{
                    background: 'rgba(93,159,150,0.12)',
                    border: '1px solid rgba(93,159,150,0.35)',
                    color: '#5D9F96',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#5D9F96' }}
                  />
                  Available for new opportunities
                </motion.div>

                <motion.h1
                  className="font-bold mb-3 leading-tight"
                  style={{ fontSize: '3.4rem', color: '#f0f6ff', lineHeight: 1.15 }}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Hi, I&apos;m{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #5D9F96, #ABE2F4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Usama
                  </span>
                </motion.h1>

                <motion.h2
                  className="font-medium mb-6"
                  style={{ fontSize: '1.25rem', color: '#7A9BAB', letterSpacing: '0.02em' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Senior Software Engineer · MERN / Full-Stack JavaScript
                </motion.h2>

                <motion.p
                  className="leading-relaxed mb-8 text-sm"
                  style={{ color: '#7090a0', maxWidth: '480px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  4+ years building enterprise-grade applications, REST APIs, and SaaS platforms
                  that serve tens of thousands of users. I specialize in scalable systems and clean,
                  maintainable code.
                </motion.p>

                {/* Contact info */}
                <motion.div
                  className="flex flex-wrap items-center gap-4 mb-8 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="mailto:uk5458622@gmail.com"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(93,159,150,0.08)',
                      border: '1px solid rgba(93,159,150,0.2)',
                      color: '#ABE2F4',
                    }}
                  >
                    <Mail className="w-4 h-4" style={{ color: '#5D9F96' }} />
                    uk5458622@gmail.com
                  </a>
                  <a
                    href="tel:03093485497"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(93,159,150,0.08)',
                      border: '1px solid rgba(93,159,150,0.2)',
                      color: '#ABE2F4',
                    }}
                  >
                    <Phone className="w-4 h-4" style={{ color: '#5D9F96' }} />
                    0309-3485497
                  </a>
                  <span
                    className="flex items-center gap-2 text-sm"
                    style={{ color: '#506070' }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: '#5D9F96' }} />
                    Islamabad, Pakistan
                  </span>
                </motion.div>

                {/* CTAs */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(93,159,150,0.4)' }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #5D9F96, #4a8880)',
                      color: '#fff',
                      boxShadow: '0 0 18px rgba(93,159,150,0.25)',
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View Projects
                  </motion.a>
                  <motion.a
                    href="https://docs.google.com/document/d/1EMaAutjjJNBaiQskFS4Jm3l627UcES7N/export?format=pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(250,115,5,0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: 'rgba(250,115,5,0.12)',
                      border: '1px solid rgba(250,115,5,0.4)',
                      color: '#FA7305',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </motion.a>
                </motion.div>


              </motion.div>

              {/* RIGHT — 3D Skill Orbit */}
              <motion.div
                className="flex-shrink-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[620px] lg:h-[590px]"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {/* Outer glow halo behind canvas */}
                <div
                  className="relative w-full h-full"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(93,159,150,0.20))',
                  }}
                >
                  <SkillOrbit />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured OSS Banner */}
          <ApexNodeBanner />

          {/* Folder Structure Highlight (Apex Node Architecture) */}
          <FolderStructureSection />
          <SkillsSection />


          {/* Experience Section */}
          <ExperienceSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Clicks Collage Section */}
          <ClicksSection />

          {/* Skills Section (Bottom) */}
          {/* Contact Us Section */}
          <ContactSection />
        </main>
      </div>
    </div>
  )
}
