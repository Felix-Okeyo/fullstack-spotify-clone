import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProviders'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWIthPrices from '@/actions/getActiveProductsWIthPrices'

const font = Figtree({ subsets: ['latin'] }) //rename import from font to figtree

export const metadata: Metadata = {
  title: 'Spotify Clone', //change the title name in the app wrapper - this changes the tab name in the browser
  description: 'Listen to music!' //change the description in the app wrapper,
}

export const revalidate = 0; // ensure the layout is not cached and always is updated

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();

  const products = await getActiveProductsWIthPrices();
    
  // throw new Error('Test')

  return (
    <>
      <html lang="en">
        <body className={font.className}>
          {/* wrap the layout of the app with the sidebar 
          component kind of like you do with the navbar */}
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
                <Sidebar songs={userSongs}> 
                  {children}
                </Sidebar>
                <Player />
            </UserProvider>
          </SupabaseProvider>
        </body>
      </html>
    </>
    
  )
}
