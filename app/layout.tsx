import NavigationBar from '@/components/navigation-bar';
import LanguageSelector from '@/components/language-selector';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kahkuma Studio',
  description: 'Kahkuma Studio',
  icons: {
    icon: '/kahkuma2.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/denim.png" />
      </head>
      <body className="h-screen w-full bg-black overscroll-none flex flex-col">
        <NavigationBar />
        <div className="flex-1 w-full max-w-6xl mx-auto bg-black overscroll-none px-4 md:px-8 lg:px-12">{children}</div>

        {/* Fixed Language Selector */}
        <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
          <LanguageSelector />
        </div>
      </body>
    </html>
  );
}
