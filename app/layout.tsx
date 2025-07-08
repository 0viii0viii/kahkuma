import NavigationBar from '@/components/navigation-bar';
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
      <body className="min-h-screen w-full bg-black overscroll-none">
        <NavigationBar />
        <div className="min-h-screen w-full bg-black overscroll-none">{children}</div>
      </body>
    </html>
  );
}
