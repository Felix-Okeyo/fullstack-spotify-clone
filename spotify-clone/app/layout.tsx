import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'

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
      <body className={font.className}>
        {/* wrap the layout of the app with the sidebar 
        component kind of like you do with the navbar */}
        <SupabaseProvider>
          <Sidebar> 
            {children}
          </Sidebar>
        </SupabaseProvider>
        
      </body>
    </html>
  )
}
