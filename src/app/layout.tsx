import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import '@/styles/globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: 'wsup.ai — Screen Library',
  description: 'wsup.ai UI screen library for dev handoff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <body className={rubik.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
