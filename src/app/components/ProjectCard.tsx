'use client'

import { motion } from 'motion/react';
import { Users, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  role: string;
  scale?: string;
  description: string[];
  index: number;
}

export function ProjectCard({ title, role, scale, description, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(111, 184, 150, 0.2)" }}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-[#6FB896] transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <motion.h3 
          className="text-xl text-gray-900 flex-1"
          whileHover={{ color: "#6FB896" }}
        >
          {title}
        </motion.h3>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          className="text-[#6FB896]"
        >
          <ExternalLink className="w-5 h-5" />
        </motion.div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-[#6FB896] font-medium mb-1">{role}</p>
        {scale && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{scale}</span>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {description.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            className="flex items-start gap-2 text-gray-700 text-sm"
          >
            <span className="text-[#6FB896] mt-1">→</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
