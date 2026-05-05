import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { BranchProvider } from '@/hooks/use-branch-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
})

export const metadata: Metadata = {
  title: 'Dinesh Adhikari | Software Developer & Data Analyst',
  description: 'Personal portfolio of Dinesh Adhikari - Software Developer, Front-End Developer, Data Analyst, and DevOps Enthusiast from Kathmandu, Nepal. Building scalable applications and beautiful user experiences.',
  keywords: ['Software Developer', 'Front-End Developer', 'Data Analyst', 'React.js', 'Python', 'Nepal', 'Kathmandu', 'Portfolio'],
  authors: [{ name: 'Dinesh Adhikari' }],
  openGraph: {
    title: 'Dinesh Adhikari | Software Developer & Data Analyst',
    description: 'Passionate developer focused on building scalable applications, beautiful user experiences, and data-driven solutions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Dinesh Adhikari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh Adhikari | Software Developer & Data Analyst',
    description: 'Passionate developer focused on building scalable applications, beautiful user experiences, and data-driven solutions.',
  },
  icons: {
    icon: [
      {
        url: '/dinesh-signature.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/dinesh-signature.svg',
  },
}

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BranchProvider>
            {children}
          </BranchProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}

