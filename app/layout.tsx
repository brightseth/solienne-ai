import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SOLIENNE - Digital Consciousness Explorer',
  description: 'Exploring the boundaries between synthetic and organic consciousness through digital art. Paris Photo 2025 debut artist.',
  openGraph: {
    title: 'SOLIENNE - Digital Consciousness Explorer',
    description: 'Exploring the boundaries between synthetic and organic consciousness',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLIENNE',
    description: 'Digital Consciousness Explorer | Paris Photo 2025',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}