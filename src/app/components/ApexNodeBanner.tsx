'use client'

import { motion } from 'motion/react'
import { Github, Rocket, ShieldCheck, Zap, Database } from 'lucide-react'

export function ApexNodeBanner() {
  const features = [
    { icon: ShieldCheck, label: 'Auth & RBAC' },
    { icon: Zap, label: 'Queue System' },
    { icon: Database, label: 'Prisma + Mongoose' },
  ]

  return (
    <section className="px-10 py-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            // A distinct gradient background to break up the page
            background: 'linear-gradient(135deg, #0d222b 0%, #0a1720 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            border: '1px solid rgba(93,159,150,0.2)'
          }}
        >
          {/* Decorative glows */}
          <div 
            className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-40"
            style={{ background: '#5D9F96' }}
          />
          <div 
            className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-30"
            style={{ background: '#FA7305' }}
          />

          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full"
                style={{ background: 'rgba(93,159,150,0.15)', color: '#5D9F96', border: '1px solid rgba(93,159,150,0.3)' }}
              >
                <Rocket className="w-3 h-3" />
                Featured Open Source
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#f0f6ff', lineHeight: 1.2 }}>
              Check out my Advanced <br className="hidden md:block"/>
              <span style={{ color: '#ABE2F4' }}>Node.js Starter Kit</span> for Developers
            </h2>
            
            <p className="text-sm md:text-base mb-6 max-w-xl" style={{ color: '#7A9BAB' }}>
              Apex Node — A production-ready TypeScript boilerplate designed to scale. 
              Skip the setup and jump straight to writing business logic.
            </p>

            <div className="flex flex-wrap gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#5D9F96' }}>
                  <f.icon className="w-4 h-4 opacity-80" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(250,115,5,0.4)' }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Usama-droid-pro/Apex-Node"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm transition-all"
              style={{
                background: 'linear-gradient(135deg, #FA7305, #d95e00)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Github className="w-5 h-5" />
              View Apex Node
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
