'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Command, Sparkles, Terminal, X, Bot } from 'lucide-react'

const aiResponseText = `[SYS_LOG] Connecting to Custom MCP Servers... SUCCESS.
[SYS_LOG] Loading local workspace context... SUCCESS.
[SYS_LOG] Fetching Architectural Prompt Library... ACTIVE.

> Analyzing Usama's AI Workflow Architecture...

Usama utilizes a highly optimized AI-driven development environment. He leverages advanced AI code editors like Claude Code and Cursor to achieve 10x development speed. 

His workflow is augmented by custom MCP (Model Context Protocol) servers, allowing the AI to directly interact with his proprietary business logic, databases, and APIs in real-time. 

Furthermore, he maintains a centralized Architectural Prompt Library—a powerful collection of sophisticated AI context instructions, tailored architecture rules, and reusable MCP alignments. This ensures the AI generates production-ready, highly complex enterprise code accurately on the first pass.

CONCLUSION: Usama is not just a Full-Stack Engineer; he is an AI-Augmented Developer capable of delivering enterprise systems at unprecedented speed.`

export function SuperpowerPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [queryText, setQueryText] = useState('')
  const [isTypingQuery, setIsTypingQuery] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState('')

  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-typing effect sequence
  useEffect(() => {
    if (isOpen) {
      // Reset state
      setQueryText('')
      setShowResponse(false)
      setDisplayedResponse('')
      setIsTypingQuery(true)

      const defaultQuery = "Analyze Usama's AI Workflow..."

      let qIndex = 0
      const qInterval = setInterval(() => {
        if (qIndex <= defaultQuery.length) {
          setQueryText(defaultQuery.slice(0, qIndex))
          qIndex++
        } else {
          clearInterval(qInterval)
          setIsTypingQuery(false)
          setTimeout(() => setShowResponse(true), 600) // slight pause to "think"
        }
      }, 50) // speed of typing query

      return () => clearInterval(qInterval)
    }
  }, [isOpen])

  // Streaming Response Effect
  useEffect(() => {
    if (showResponse) {
      let rIndex = 0
      const rInterval = setInterval(() => {
        rIndex += 4 // speed of streaming text
        if (rIndex <= aiResponseText.length) {
          setDisplayedResponse(aiResponseText.slice(0, rIndex))
        } else {
          setDisplayedResponse(aiResponseText)
          clearInterval(rInterval)
        }
      }, 15) // MS per chunk

      return () => clearInterval(rInterval)
    }
  }, [showResponse])

  // Process the displayed response to add styling to generic text
  const formattedResponse = displayedResponse
    .replace(/\[SYS_LOG\]/g, '<span style="color: #FA7305">[SYS_LOG]</span>')
    .replace(/> Analyzing Usama's AI Workflow Architecture\.\.\./g, '<span style="color: #ABE2F4; font-weight: bold;">> Analyzing Usama\'s AI Workflow Architecture...</span>')

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(93,159,150,0.95), rgba(10,15,26,0.95))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(93,159,150,0.4)',
          boxShadow: '0 10px 30px rgba(93,159,150,0.3)'
        }}
      >
        <Sparkles className="w-5 h-5 text-[#ABE2F4]" />
        <span className="text-sm font-bold text-white tracking-wide pr-2">AI Workflow</span>
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-xs text-white/90 font-mono border border-white/10 hidden md:flex">
          <Command className="w-3.5 h-3.5" /> K
        </div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0a0f1a]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl flex flex-col"
              style={{
                background: 'rgba(13, 19, 31, 0.95)',
                border: '1px solid rgba(93,159,150,0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(93,159,150,0.1) inset'
              }}
            >
              {/* Top Input Bar */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
                <Terminal className="w-5 h-5 text-[#5D9F96]" />
                <div className="flex-1 text-base md:text-lg font-mono text-[#f0f6ff] h-7 flex items-center">
                  {queryText}
                  {isTypingQuery && (
                    <span className="ml-1 w-2.5 h-6 bg-[#5D9F96] animate-pulse" />
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Streaming AI Output Area */}
              <div
                className="p-6 md:p-8 text-[#7A9BAB] font-mono text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] custom-scrollbar"
              >
                {!showResponse ? (
                  <div className="flex items-center gap-3 text-white/40 h-10">
                    <Sparkles className="w-4 h-4 animate-spin text-[#5D9F96]" />
                    <span className="animate-pulse">Waiting for command...</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#5D9F96]/10 border border-[#5D9F96]/30 flex items-center justify-center shadow-[0_0_10px_rgba(93,159,150,0.2)]">
                      <Bot className="w-4 h-4 text-[#5D9F96]" />
                    </div>
                    <div className="flex-1 whitespace-pre-wrap">
                      <span dangerouslySetInnerHTML={{ __html: formattedResponse }} />
                      <span className="ml-1 inline-block w-2 h-4 bg-[#ABE2F4] animate-pulse align-middle" style={{ marginTop: '-2px' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/5 text-[11px] text-white/40 flex justify-between bg-black/20 font-medium tracking-wide">
                <span>Claude Code / Custom MCP Integrations</span>
                <span>Press ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
