'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Command, Sparkles, Terminal, X, Bot, Network, Zap, Shield, GitBranch, FileCode } from 'lucide-react'
import { ReactFlow, Background, Handle, Position, NodeProps, Node, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const aiResponseText = `[SYS_LOG] Initializing AI-Augmented Workspace... SUCCESS.
[SYS_LOG] Mapping .agent/skills & CLAUDE.md rules... FOUND.
[SYS_LOG] Syncing Git Worktrees & Parallel iTerm instances... ACTIVE.

> Analyzing Usama's Advanced AI Development Workflow...

Usama leverages a professional AI-driven ecosystem featuring Claude Code and Cursor. His workflow starts with 'Plan Mode First' (Shift+Tab) to navigate the codebase using 'Specific Context'—focusing solely on relevant files to minimize bloat.

He utilizes '.agent' skill files for repeatable patterns and custom MCP servers for live business logic access. His 'Parallel Development' strategy employs multiple terminal instances and Git worktrees for safe concurrency.

Execution follows an 'Iterative Testing Loop' to ensure stability, coupled with '/se security.review' for enterprise-grade changes. If an edit diverges, 'Checkpointing' allows for rapid rewinding and debugging.

CONCLUSION: Usama's orchestration of custom MCPs and advanced AI guardrails ensures rapid, stable, and architectural full-stack delivery.`

/* ----------------------------------------------------------------
   Custom Node Component for React Flow
---------------------------------------------------------------- */
const CustomNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 rounded-lg border bg-[#0d131f] shadow-lg flex items-center gap-3 min-w-[150px]"
         style={{ borderColor: data.color as string || '#5D9F96' }}>
      <div className="p-1.5 rounded-md bg-white/5">
        {React.cloneElement(data.icon as React.ReactElement, { size: 18, color: data.color as string || '#5D9F96' })}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-white/40 uppercase font-black tracking-tighter leading-none mb-1">{data.label as string}</span>
        <span className="text-xs text-white font-bold leading-none">{data.description as string}</span>
      </div>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

/* ----------------------------------------------------------------
   Workflow Diagram Internal Component
---------------------------------------------------------------- */
function WorkflowDiagram() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'custom',
      position: { x: 250, y: 0 },
      data: { label: 'Foundation', description: '.agent/skills & CLAUDE.md', icon: <FileCode />, color: '#FA7305' },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 250, y: 100 },
      data: { label: 'Analysis', description: 'Plan Mode & Context', icon: <Bot />, color: '#5D9F96' },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 50, y: 200 },
      data: { label: 'Context', description: 'Custom MCP Servers', icon: <Network />, color: '#ABE2F4' },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 450, y: 200 },
      data: { label: 'Concurrency', description: 'Git Worktrees', icon: <GitBranch />, color: '#ABE2F4' },
    },
    {
      id: '5',
      type: 'custom',
      position: { x: 250, y: 300 },
      data: { label: 'Verification', description: 'Iterative Testing Loop', icon: <Zap />, color: '#FA7305' },
    },
    {
      id: '6',
      type: 'custom',
      position: { x: 250, y: 400 },
      data: { label: 'Stability', description: 'Checkpointing & Review', icon: <Shield />, color: '#5D9F96' },
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#5D9F96' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#5D9F96' } },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#5D9F96' } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#5D9F96' } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#5D9F96' } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#5D9F96' } },
  ]

  return (
    <div className="w-full h-[450px] mt-4 rounded-xl border border-white/5 bg-black/20 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
         <span className="px-2 py-1 rounded bg-[#5D9F96]/10 text-[#5D9F96] text-[10px] font-bold border border-[#5D9F96]/20 uppercase">AI-Augmented Architecture</span>
      </div>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll={false}
        zoomOnScroll={false}
        draggable={false}
        nodesDraggable={false}
        elementsSelectable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e293b" gap={20} />
      </ReactFlow>
    </div>
  )
}

/* ----------------------------------------------------------------
   Main Component
---------------------------------------------------------------- */
export function SuperpowerPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [queryText, setQueryText] = useState('')
  const [isTypingQuery, setIsTypingQuery] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [showDiagram, setShowDiagram] = useState(false)
  
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
      setShowDiagram(false)
      
      const defaultQuery = "Analyze Usama's AI Workflow Architecture..."
      
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
      }, 40) // speed of typing query
      
      return () => clearInterval(qInterval)
    }
  }, [isOpen])

  // Streaming Response Effect
  useEffect(() => {
    if (showResponse) {
      let rIndex = 0
      const rInterval = setInterval(() => {
        rIndex += 6 // speed of streaming text (slightly faster for longer text)
        if (rIndex <= aiResponseText.length) {
          setDisplayedResponse(aiResponseText.slice(0, rIndex))
        } else {
          setDisplayedResponse(aiResponseText)
          clearInterval(rInterval)
          setTimeout(() => setShowDiagram(true), 800) // Reveal diagram at the end
        }
      }, 10) // MS per chunk
      
      return () => clearInterval(rInterval)
    }
  }, [showResponse])

  // Process the displayed response to add styling to generic text
  const formattedResponse = displayedResponse
    .replace(/\[SYS_LOG\]/g, '<span style="color: #FA7305">[SYS_LOG]</span>')
    .replace(/> Analyzing Usama's Advanced AI Development Workflow\.\.\./g, `<span style="color: #ABE2F4; font-weight: bold;">> Analyzing Usama's Advanced AI Development Workflow...</span>`)

  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedResponse, showDiagram])

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
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 overflow-y-auto pb-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0a0f1a]/85 backdrop-blur-md"
            />
            
            {/* Modal Content - Expanded width (max-w-4xl) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl flex flex-col"
              style={{
                background: 'rgba(13, 19, 31, 0.98)',
                border: '1px solid rgba(93,159,150,0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(93,159,150,0.1) inset'
              }}
            >
              {/* Top Input Bar */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-white/5">
                <Terminal className="w-6 h-6 text-[#5D9F96]" />
                <div className="flex-1 text-base md:text-xl font-mono text-[#f0f6ff] h-8 flex items-center">
                  {queryText}
                  {isTypingQuery && (
                    <span className="ml-1 w-2.5 h-7 bg-[#5D9F96] animate-pulse" />
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Streaming AI Output Area */}
              <div
                ref={scrollRef}
                className="p-6 md:p-10 text-[#7A9BAB] font-mono text-sm md:text-base leading-relaxed overflow-y-auto max-h-[70vh] custom-scrollbar"
              >
                {!showResponse ? (
                  <div className="flex items-center gap-3 text-white/40 h-10">
                    <Sparkles className="w-5 h-5 animate-spin text-[#5D9F96]" />
                    <span className="animate-pulse tracking-widest text-xs">COLLECTING_LATEST_CONTEXT...</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#5D9F96]/10 border border-[#5D9F96]/30 flex items-center justify-center shadow-[0_0_15px_rgba(93,159,150,0.2)]">
                        <Bot className="w-5 h-5 text-[#5D9F96]" />
                      </div>
                      <div className="flex-1 whitespace-pre-wrap">
                        <span dangerouslySetInnerHTML={{ __html: formattedResponse }} />
                        {!showDiagram && <span className="ml-1 inline-block w-2.5 h-5 bg-[#ABE2F4] animate-pulse align-middle" style={{ marginTop: '-4px' }} />}
                      </div>
                    </div>

                    {/* Reveal Diagram using React Flow */}
                    <AnimatePresence>
                      {showDiagram && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                        >
                           <WorkflowDiagram />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/5 text-[12px] text-white/40 flex justify-between bg-black/30 font-medium tracking-widest uppercase">
                <div className="flex items-center gap-4">
                   <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Enterprise Guard</span>
                   <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> High Velocity</span>
                </div>
                <span>ESC_TO_ABORT</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
