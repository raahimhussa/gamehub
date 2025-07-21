import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game App',
  description: 'Created with v0',
  generator: 'Game.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
