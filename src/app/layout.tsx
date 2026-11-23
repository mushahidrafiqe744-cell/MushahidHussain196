import type { Metadata, Viewport } from 'next';
import '../index.css';

export const viewport: Viewport = {
  themeColor: '#0A3D22',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Mushahid Hussain - Web Developer Portfolio',
  description: 'Professional Web & Full-Stack Developer portfolio of Mushahid Hussain featuring responsive projects, GitHub repositories, technical skills showcase, interactive resume, and contact channels.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mushahid Dev',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Mushahid Hussain - Web Developer Portfolio',
    description: 'Professional Web & Full-Stack Developer portfolio of Mushahid Hussain featuring responsive projects, GitHub repositories, technical skills showcase, interactive resume, and contact channels.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F8F5EE] text-[#11261B] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
