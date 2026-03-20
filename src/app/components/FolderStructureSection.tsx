'use client'

import { motion } from 'motion/react'
import { FolderTree, Terminal } from 'lucide-react'

const treeStructure = `.
├── Dockerfile
├── docker-compose.yml
├── docker-compose.services.yml
├── jest.config.js
├── README.md
├── .gitignore
├── .env
├── .env.example
├── .prettierrc
├── eslint.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma
├── tests/
│   └── setup.ts
├── docs/
│   ├── architecture.md
│   └── api-spec.yaml
├── logs/
│   ├── error.log
│   └── combined.log
├── scripts/
│   ├── dev.sh
│   └── migrate.sh
├── .vscode/
│   └── settings.json
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── database/
│   │   ├── index.ts
│   │   ├── prisma/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   └── mongoose/
│   │       ├── connection.ts
│   │       ├── index.ts
│   │       └── models/
│   │           ├── user.model.ts
│   │           ├── refresh-token.model.ts
│   │           └── role.model.ts
│   ├── logger/
│   │   ├── http-logger.ts
│   │   ├── winston.ts
│   │   └── daily-rotate.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   ├── cors.config.ts
│   │   └── mail.config.ts
│   ├── constants/
│   │   └── index.ts
│   ├── emails/
│   │   ├── email.dispatcher.ts
│   │   ├── email.service.ts
│   │   └── templates/
│   ├── middlewares/
│   │   ├── csrf.middleware.ts
│   │   ├── security.middleware.ts
│   │   ├── rbac.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── auth.middleware.ts
│   │   └── rate-limit.middleware.ts
│   ├── utils/
│   │   └── async-handler.ts
│   ├── common/
│   │   ├── types/
│   │   ├── responses/
│   │   └── exceptions/
│   ├── queues/
│   │   ├── email.processor.ts
│   │   └── email.queue.ts
│   ├── jobs/
│   │   ├── email.job.ts
│   │   └── cleanup.job.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── strategies/
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.routes.ts
│   │       └── user.validator.ts
│   └── loaders/
│       ├── redis.loader.ts
│       ├── rbac.loader.ts
│       ├── mongoose.loader.ts
│       └── prisma.loader.ts`

export function FolderStructureSection() {
  return (
    <section className="px-10 py-12 relative z-10 w-full" style={{ background: '#0a0f1a' }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left: Description */}
        <motion.div 
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: 'rgba(93,159,150,0.1)', border: '1px solid rgba(93,159,150,0.2)' }}
            >
              <FolderTree className="w-5 h-5" style={{ color: '#5D9F96' }} />
            </span>
            <h2 className="text-3xl font-bold" style={{ color: '#f0f6ff' }}>
              Architecture <span style={{ color: '#5D9F96' }}>Blueprint</span>
            </h2>
          </div>
          
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#7090a0' }}>
            This is my standard approach for structuring enterprise-grade backend systems. I utilize a <strong>domain-driven design</strong> with heavily encapsulated modules for massive scalability.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FA7305' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f0f6ff' }}>Modular Modules:</strong> Business logic is heavily encapsulated into standalone modules (e.g., <code style={{ color: '#ABE2F4' }}>auth</code>, <code style={{ color: '#ABE2F4' }}>user</code>).
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FA7305' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f0f6ff' }}>Robust Common Layer:</strong> Shared types, standardized API responses, and custom exception handling.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FA7305' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f0f6ff' }}>Queue & Jobs:</strong> Integrated background processing via dedicated queues for emails and cleanup tasks.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FA7305' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f0f6ff' }}>Dual Database Support:</strong> Out-of-the-box loaders for both Prisma (SQL) and Mongoose (NoSQL).
              </p>
            </li>
          </ul>
        </motion.div>

        {/* Right: IDE Window */}
        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="rounded-2xl overflow-hidden border shadow-2xl"
            style={{ 
              background: '#0d131f', 
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Window Header */}
            <div 
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: '#111827', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
              </div>
              <div className="mx-auto flex items-center gap-2 opacity-60">
                <Terminal className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: '#94a3b8' }}>~/architecture-blueprint</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-5 overflow-y-auto custom-scrollbar" style={{ maxHeight: '450px' }}>
              <pre className="text-[13px] leading-[1.6] font-mono">
                {treeStructure.split('\n').map((line, i) => {
                  // Basic syntax highlighting for the tree
                  const isFolder = line.endsWith('/')
                  const isConfig = line.includes('.json') || line.includes('.rc') || line.includes('.config') || line.includes('.yml')
                  const isTS = line.includes('.ts')
                  
                  let color = '#7090a0' // default text
                  if (isFolder) color = '#5D9F96' // Teal folders
                  else if (isConfig) color = '#FA7305' // Orange config files
                  else if (isTS) color = '#ABE2F4' // Light blue typescript files
                  
                  // Keep tree connectors dimmed
                  const connectors = line.match(/^[│├└─\s]+/)
                  const text = line.replace(/^[│├└─\s]+/, '')

                  return (
                    <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors duration-150">
                      <span style={{ color: '#334155', opacity: 0.7 }}>{connectors?.[0]}</span>
                      <span style={{ color, fontWeight: isFolder ? 'bold' : 'normal' }}>{text}</span>
                    </div>
                  )
                })}
              </pre>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
