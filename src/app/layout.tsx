import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.upperjets.com'),
  title: 'Upper Jets | Private Aviation Charter',
  description:
    'Florida-based FAA Part 135 operator. On-demand private charter across the Americas. ARGUS Gold certified. 24/7 dispatch.',
  keywords: ['private jet charter', 'FAA Part 135', 'ARGUS Gold', 'Florida aviation', 'charter broker'],
  openGraph: {
    title: 'Upper Jets | Private Aviation Charter',
    description:
      'On-demand private aviation across the Americas. ARGUS Gold certified, FAA Part 135, 24/7 dispatch.',
    url: 'https://www.upperjets.com',
    siteName: 'Upper Jets',
    type: 'website',
    images: [{ url: '/images/exterior.jpg', width: 1200, height: 630, alt: 'Upper Jets aircraft on tarmac' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Jets | Private Aviation Charter',
    description: 'On-demand private aviation across the Americas.',
    images: ['/images/exterior.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/Heromotion/ezgif-frame-001.jpg" />
        <link rel="preload" as="image" href="/images/exterior.jpg" />
        <link rel="preload" as="image" href="/images/interior.jpg" />
      </head>
      <body className="font-inter bg-brand-bg text-brand-cream antialiased">
        {children}
      </body>
    </html>
  )
}
