import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Token Studio',
  description:
    'A tiktoken-style tokenizer built with Next.js 15 and JavaScript',
  // Favicon and app icons
  icons: {
    icon: [{ url: '/Logo.png', type: 'image/png' }],
  },
  // Open Graph (used by WhatsApp, Facebook, etc.)
  openGraph: {
    title: 'Token Studio',
    description:
      'A tiktoken-style tokenizer built with Next.js 15 and JavaScript',
    url: 'https://tokenstudio-js.vercel.app/',
    siteName: 'Token Studio',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Studio preview',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  // Twitter Card (fallback for many platforms)
  twitter: {
    card: 'summary_large_image',
    title: 'Token Studio',
    description:
      'A tiktoken-style tokenizer built with Next.js 15 and JavaScript',
    images: ['/og-image.png'],
  },
  // Optional theme colors
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  metadataBase: new URL('https://tokenstudio-js.vercel.app/'),
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
