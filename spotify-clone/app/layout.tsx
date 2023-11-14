import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

const font = Figtree({ subsets: ['latin'] }) //rename import from font to figtree

export const metadata: Metadata = {
  title: 'Spotify Clone', //change the title name in the app wrapper - this changes the tab name in the browser
  description: 'Listen to music!' //change the description in the app wrapper,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
