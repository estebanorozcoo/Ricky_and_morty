import type { Metadata } from 'next'
// @ts-ignore
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Browse characters from Rick and Morty API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}