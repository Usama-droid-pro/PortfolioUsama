'use client'

import { motion } from 'motion/react'
import { Send, CheckCircle, XCircle } from 'lucide-react'
import { sendEmailAction } from '../actions/sendEmail'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${pending ? 'bg-[rgba(93,159,150,0.5)] cursor-not-allowed' : 'bg-[#5D9F96] hover:bg-[#4a8880]'
        } text-white shadow-lg`}
    >
      {pending ? 'Sending...' : 'Send Message'}
      {!pending && <Send className="w-5 h-5" />}
    </button>
  )
}

export function ContactSection() {
  const [state, formAction] = useFormState(sendEmailAction, null)

  return (
    <section id="contact" className="py-24 px-10 relative z-10 w-full" style={{ background: '#0a0f1a' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#f0f6ff' }}>
            Get in <span style={{ color: '#5D9F96' }}>Touch</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mb-6 mx-auto"
            style={{ background: 'linear-gradient(90deg, #5D9F96, transparent)' }}
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-2xl border backdrop-blur-sm shadow-xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(93,159,150,0.15)',
            boxShadow: '0 0 30px rgba(93,159,150,0.05)',
          }}
        >
          {state?.success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-[#5D9F96] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-[#7090a0]">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{state.error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold" style={{ color: '#ABE2F4' }}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[#0a1320] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5D9F96] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold" style={{ color: '#ABE2F4' }}>Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#0a1320] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5D9F96] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold" style={{ color: '#ABE2F4' }}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  className="w-full bg-[#0a1320] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5D9F96] transition-colors"
                  placeholder="Opportunity / Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold" style={{ color: '#ABE2F4' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#0a1320] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5D9F96] transition-colors resize-none"
                  placeholder="I'd like to discuss..."
                />
              </div>

              <SubmitButton />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
