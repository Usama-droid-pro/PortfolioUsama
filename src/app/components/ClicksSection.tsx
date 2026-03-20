'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const images = [
  '/clicks/IMG_20260321_021202.jpg',
  '/clicks/IMG_20260320_223554.jpg',
  '/clicks/IMG_20260320_224025.jpg',
  '/clicks/IMG-20241219-WA0055.jpg',
  '/clicks/FB_IMG_1773958304808.jpg',
  '/clicks/FB_IMG_1773958329785.jpg',
  '/clicks/IMG_20260321_021132.jpg',
  '/clicks/IMG_20260321_021230.jpg',
  '/clicks/20250517_173323.jpg',
  '/clicks/IMG-20241219-WA0023.jpg',
  '/clicks/IMG_20260321_021312.jpg',

]

export function ClicksSection() {
  return (
    <section id="clicks" className="py-24 px-10 relative z-10 w-full" style={{ background: '#0a0f1a' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#f0f6ff' }}>
            Some Clicks <span style={{ color: '#FA7305' }}>Along the Journey</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #FA7305, transparent)' }}
          />
          <p className="text-lg" style={{ color: '#7090a0' }}>
            A glimpse into my professional and personal adventures.
          </p>
        </motion.div>

        {/* Masonry Collage Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl border break-inside-avoid group"
              style={{
                borderColor: 'rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
              }}
            >
              <div className="relative w-full h-auto">
                {/* Using an unoptimized img tag gives easiest masonry natural sizing, 
                    but next/image with layout fill requires knowing height. 
                    Standard img tag is perfectly responsive for a simple masonry layout. */}
                <img
                  src={src}
                  alt={`Journey Click ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />

                {/* Subtle vignette / glossy overlay */}
                <div
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,15,26,0.8) 0%, transparent 40%)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
