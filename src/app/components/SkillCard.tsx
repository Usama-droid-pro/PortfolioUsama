'use client'

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export function SkillCard({ icon, title, description, index }: SkillCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 40px rgba(111, 184, 150, 0.3)",
        scale: 1.03
      }}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#6FB896] transition-all cursor-pointer"
    >
      <motion.div 
        className="mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl mb-3 text-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}