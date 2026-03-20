'use client'

import { motion } from 'motion/react';
import { Building2, MapPin, Calendar } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  index: number;
}

export function ExperienceCard({ 
  title, 
  company, 
  location, 
  period, 
  achievements,
  index 
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#6FB896] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <motion.h3 
            className="text-xl text-gray-900 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {title}
          </motion.h3>
          <div className="flex items-center gap-2 text-[#6FB896] mb-2">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{company}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{period}</span>
            </div>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {achievements.map((achievement, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            className="flex items-start gap-2 text-gray-700 text-sm"
          >
            <span className="text-[#6FB896] mt-1">•</span>
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
