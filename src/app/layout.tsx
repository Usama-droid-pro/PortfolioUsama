import type { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'Usama - Senior Software Engineer',
  description: 'Portfolio of Usama, Senior MERN Stack Developer with 4+ years of experience building enterprise applications.',
  icons: {
    icon: '/icon.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
