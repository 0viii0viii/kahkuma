import LanguageSelector from '@/components/language-selector';
import NavigationBar from '@/components/navigation-bar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const SUPPORTED_LANGS = ['ko', 'en', 'ja'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const metaByLang: Record<Lang, { title: string; description: string; keywords: string[] }> = {
  ko: {
    title: 'Kahkuma Studio - 3D 모델링 피규어 아트',
    description:
      'Kahkuma Studio는 3D 모델링, 피규어, 아트워크를 전문으로 하는 창의적인 스튜디오입니다. 독특한 3D 피규어와 예술적 모델링 작품을 만나보세요.',
    keywords: ['3D 모델링', 'kahkuma', '피규어', '3D figure', '3D modeling', '아트워크', 'figure art', '3D artist'],
  },
  en: {
    title: 'Kahkuma Studio - 3D Modeling Figure Art',
    description:
      'Kahkuma Studio is a creative studio specializing in 3D modeling, figures, and artwork. Discover unique 3D figures and artistic modeling works.',
    keywords: ['3D modeling', 'kahkuma', 'figure', '3D figure', 'artwork', 'figure art', '3D artist'],
  },
  ja: {
    title: 'Kahkuma Studio - 3Dモデリング フィギュアアート',
    description:
      'Kahkuma Studioは3Dモデリング、フィギュア、アートワークを専門とするクリエイティブスタジオです。独自の3Dフィギュアと芸術的なモデリング作品をご覧ください。',
    keywords: ['3Dモデリング', 'kahkuma', 'フィギュア', '3D figure', 'アートワーク', 'figure art', '3D artist'],
  },
};

export async function generateMetadata({ params }: { params: { lang?: string } }) {
  let lang: Lang = 'ko';
  if (params?.lang && SUPPORTED_LANGS.includes(params.lang as Lang)) {
    lang = params.lang as Lang;
  }
  const meta = metaByLang[lang];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    icons: { icon: '/kahkuma2.jpeg' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: ['/kahkuma2.jpeg'],
      type: 'website',
      url: 'https://kahkuma.vercel.app',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/kahkuma2.jpeg'],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  const lang = params?.lang || 'ko';
  return (
    <html lang={lang}>
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
        <SpeedInsights />
      </body>
    </html>
  );
}
