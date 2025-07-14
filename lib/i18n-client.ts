'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      // Navigation
      'nav.home': '홈',
      'nav.works': '작품',
      'nav.about': '소개',
      'nav.contact': '연락처',

      // Home page
      'home.title': 'KAHKUMA',
      'home.subtitle': '3D 아티스트 & 크리에이터',
      'home.description': '혁신적인 3D 아트와 창의적인 디자인으로 새로운 경험을 만들어갑니다.',

      // Works section
      'works.title': '3D WORKS',
      'works.interact.on': 'INTERACT ON',
      'works.interact.off': 'INTERACT OFF',

      // Model descriptions
      'model.cometboy.name': 'Comet Boy',
      'model.cometboy.description': 'comet boy',
      'model.iceboy.name': 'Ice Boy',
      'model.iceboy.description': 'ice boy',
      'model.samboypen.name': 'SamBoy Pen',
      'model.samboypen.description': 'sam boy pen',
      'model.deeperent.name': 'Deeperent Double Lovers',
      'model.deeperent.description': 'deeperent double lovers',

      // Footer
      'footer.copyright': '© 2025 KAHKUMA. All rights reserved',
      'footer.rights': 'All rights reserved',
      'footer.cta': '함께 작업해보시겠습니까?',
      'footer.contact': 'Instagram으로 문의해주세요',
      'footer.instagram': 'Instagram',

      // Home page details
      'home.role': '3D 모델러',
      'home.artist_name': '김희현 (Heehyun Kim)',
      'home.artist_desc':
        '아쿠마 그 자체인 3D 모델러입니다. 독특한 시각적 스타일과 창의적인 표현으로 새로운 예술적 경험을 선사합니다.',
      'home.instagram_desc': '최신 작품과 소식을 인스타그램에서 확인하세요',
      'home.instagram_id': '@kahkuma',

      // Works section details
      'works.description': '각각의 작품은 독특한 스토리와 비전을 담고 있습니다',

      // Call to action
      'call_to_action.title': '함께 작업해보시겠습니까?',
      'call_to_action.description': 'Instagram으로 문의해주세요',
      'call_to_action.instagram_link': '@kahkuma',

      // Model types
      'model.type1.title': 'Type #1',
      'model.type1.description': 'To Be Updated',
      'model.type1.category': 'To Be Updated',
      'model.type2.title': 'Type #2',
      'model.type2.description': 'To Be Updated',
      'model.type2.category': 'To Be Updated',
      'model.type3.title': 'Type #3',
      'model.type3.description': 'To Be Updated',
      'model.type3.category': 'To Be Updated',
      'model.type4.title': 'Type #4',
      'model.type4.description': 'To Be Updated',
      'model.type4.category': 'To Be Updated',
      'model.type5.title': 'Type #5',
      'model.type5.description': 'To Be Updated',
      'model.type5.category': 'To Be Updated',
    },
  },
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.works': 'Works',
      'nav.about': 'About',
      'nav.contact': 'Contact',

      // Home page
      'home.title': 'KAHKUMA',
      'home.subtitle': '3D Artist & Creator',
      'home.description': 'Creating new experiences through innovative 3D art and creative design.',

      // Works section
      'works.title': '3D WORKS',
      'works.interact.on': 'INTERACT ON',
      'works.interact.off': 'INTERACT OFF',

      // Model descriptions
      'model.cometboy.name': 'Comet Boy',
      'model.cometboy.description': 'comet boy',
      'model.iceboy.name': 'Ice Boy',
      'model.iceboy.description': 'ice boy',
      'model.samboypen.name': 'SamBoy Pen',
      'model.samboypen.description': 'sam boy pen',
      'model.deeperent.name': 'Deeperent Double Lovers',
      'model.deeperent.description': 'deeperent double lovers',

      // Footer
      'footer.copyright': '© 2025 KAHKUMA. All rights reserved.',
      'footer.rights': 'All rights reserved.',
      'footer.cta': 'Would you like to work together?',
      'footer.contact': 'Contact via Instagram',
      'footer.instagram': 'Instagram',

      // Home page details
      'home.role': '3D Modeller',
      'home.artist_name': 'Heehyun Kim',
      'home.artist_desc':
        'A 3D modeller who embodies Akuma. Creating new artistic experiences with a unique visual style and creative expression.',
      'home.instagram_desc': 'Check out the latest works and news on Instagram',
      'home.instagram_id': '@kahkuma',

      // Works section details
      'works.description': 'Each work contains a unique story and vision',

      // Call to action
      'call_to_action.title': 'Would you like to work together?',
      'call_to_action.description': 'Contact via Instagram',
      'call_to_action.instagram_link': '@kahkuma',

      // Model types
      'model.type1.title': 'Type #1',
      'model.type1.description': 'To Be Updated',
      'model.type1.category': 'To Be Updated',
      'model.type2.title': 'Type #2',
      'model.type2.description': 'To Be Updated',
      'model.type2.category': 'To Be Updated',
      'model.type3.title': 'Type #3',
      'model.type3.description': 'To Be Updated',
      'model.type3.category': 'To Be Updated',
      'model.type4.title': 'Type #4',
      'model.type4.description': 'To Be Updated',
      'model.type4.category': 'To Be Updated',
      'model.type5.title': 'Type #5',
      'model.type5.description': 'To Be Updated',
      'model.type5.category': 'To Be Updated',
    },
  },
  ja: {
    translation: {
      // Navigation
      'nav.home': 'ホーム',
      'nav.works': '作品',
      'nav.about': 'について',
      'nav.contact': 'お問い合わせ',

      // Home page
      'home.title': 'KAHKUMA',
      'home.subtitle': '3Dアーティスト & クリエイター',
      'home.description': '革新的な3Dアートとクリエイティブデザインで新しい体験を作り出します。',

      // Works section
      'works.title': '3D WORKS',
      'works.interact.on': 'INTERACT ON',
      'works.interact.off': 'INTERACT OFF',

      // Model descriptions
      'model.cometboy.name': 'Comet Boy',
      'model.cometboy.description': 'comet boy',
      'model.iceboy.name': 'Ice Boy',
      'model.iceboy.description': 'ice boy',
      'model.samboypen.name': 'SamBoy Pen',
      'model.samboypen.description': 'sam boy pen',
      'model.deeperent.name': 'Deeperent Double Lovers',
      'model.deeperent.description': 'deeperent double lovers',

      // Footer
      'footer.copyright': '© 2025 KAHKUMA. 全著作権所有.',
      'footer.rights': '全著作権所有.',
      'footer.cta': '一緒にお仕事しませんか？',
      'footer.contact': 'Instagramでお問い合わせください',
      'footer.instagram': 'Instagram',

      // Home page details
      'home.role': '3Dモデラー',
      'home.artist_name': 'キム・ヒヒョン (Heehyun Kim)',
      'home.artist_desc':
        'アクマそのものの3Dモデラーです。独特なビジュアルスタイルと創造的な表現で新しい芸術体験を提供します。',
      'home.instagram_desc': '最新の作品やニュースはInstagramでご覧ください',
      'home.instagram_id': '@kahkuma',

      // Works section details
      'works.description': 'それぞれの作品は独特なストーリーとビジョンを持っています',

      // Call to action
      'call_to_action.title': '一緒にお仕事しませんか？',
      'call_to_action.description': 'Instagramでお問い合わせください',
      'call_to_action.instagram_link': '@kahkuma',

      // Model types
      'model.type1.title': 'Type #1',
      'model.type1.description': 'To Be Updated',
      'model.type1.category': 'To Be Updated',
      'model.type2.title': 'Type #2',
      'model.type2.description': 'To Be Updated',
      'model.type2.category': 'To Be Updated',
      'model.type3.title': 'Type #3',
      'model.type3.description': 'To Be Updated',
      'model.type3.category': 'To Be Updated',
      'model.type4.title': 'Type #4',
      'model.type4.description': 'To Be Updated',
      'model.type4.category': 'To Be Updated',
      'model.type5.title': 'Type #5',
      'model.type5.description': 'To Be Updated',
      'model.type5.category': 'To Be Updated',
    },
  },
};

// i18n이 이미 초기화되었는지 확인
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ko',
      debug: false,

      interpolation: {
        escapeValue: false,
      },

      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },

      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
