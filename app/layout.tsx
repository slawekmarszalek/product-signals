import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Product Signals',
  description: 'A lightweight intelligence dashboard for tracking modern developer tools through GitHub signals',
  generator: 'v0.app',
  openGraph: {
    title: 'Product Signals',
    description: 'Tracking OSS developer tools through public GitHub signals.',
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Product Signals – Tracking OSS developer tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Signals',
    description: 'Tracking OSS developer tools through public GitHub signals.',
    images: ['/thumbnail.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
