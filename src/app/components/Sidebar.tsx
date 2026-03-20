'use client'

import { useState, useEffect } from 'react';
import ProfileImg from '@/assets/images/profilepic.jpeg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Switch from '@radix-ui/react-switch';
import {
  User,
  Briefcase,
  Award,
  FileText,
  Code,
  Mail,
  GraduationCap,
  ChevronDown,
  Send,
  Linkedin,
  Github,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';


export function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const menuItems = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -40% 0px' });

    menuItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[380px] bg-primary text-white flex flex-col h-screen sticky top-0"
    >
      {/* Profile Section */}
      <div className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="w-[325px] h-[325px] rounded-full overflow-hidden mx-auto mb-6 border-4 border-white/20"
        >
          <img
            src={ProfileImg.src}
            alt="Usama"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>


        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-3 mb-8"
        >
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/usama-khan-703109239/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <Linkedin className="w-5 h-5 text-secondary" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Usama-droid-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <Github className="w-5 h-5 text-secondary" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="tel:03093485497"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <Phone className="w-5 h-5 text-secondary" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:uk5458622@gmail.com"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <Mail className="w-5 h-5 text-secondary" />
          </motion.a>
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-6">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <motion.a
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-all ${activeSection === item.id
                  ? 'bg-secondary text-white font-bold'
                  : 'text-white/80 hover:bg-secondary/15'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'text-secondary'}`} />
                <span>{item.label}</span>
              </motion.a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center gap-3 px-4 py-3 rounded text-white/80 hover:bg-secondary/15 transition-colors w-full">
                <ChevronDown className="w-5 h-5 text-secondary" />
                <span>More</span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] z-50"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none w-full text-left" asChild>
                    <a href="https://www.credly.com/badges/96d6239c-95dd-4d25-a08c-ab0ca7c5bd65" target="_blank" rel="noopener noreferrer" className="block w-full">Certifications</a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none w-full text-left" asChild>
                    <a href="#" className="block w-full">Blog</a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none w-full text-left" asChild>
                    <a href="https://docs.google.com/document/d/1EMaAutjjJNBaiQskFS4Jm3l627UcES7N/export?format=pdf" className="block w-full">Download CV</a>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </motion.li>
        </ul>

        {/* Hire Me Button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-secondary hover:bg-citrine/90 text-white px-6 py-3 rounded mt-6 flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
        >
          <Send className="w-5 h-5" />
          <span>Hire Me</span>
        </motion.a>
      </nav>

    </motion.aside>
  );
}