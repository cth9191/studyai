import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StudyAI',
  description: 'Transform your study materials into interactive learning tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                StudyAI
              </Link>
              <div className="space-x-4">
                <Link href="/upload" className="hover:text-gray-600">
                  Upload
                </Link>
                <Link href="/documents" className="hover:text-gray-600">
                  Documents
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
