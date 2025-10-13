import './globals.css'
import { Baloo_Tammudu_2 } from 'next/font/google'

const balooTammudu = Baloo_Tammudu_2({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-baloo',
})

export const metadata = {
  title: 'Yaari',
  description: 'Yaari mobile application',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-content',
  },
  themeColor: '#FF6B35',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Yaari',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={balooTammudu.variable}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={balooTammudu.className}>
        <div className="mobile-container">
          {children}
        </div>
      </body>
    </html>
  )
}