// The curated collection. Each artwork maps to an optimized GLB in /public/models.
// `accent` drives the per-work lighting + UI tint; tweak titles/captions freely.
export const works = [
  {
    id: 'cometboy',
    title: 'Comet Boy',
    file: '/models/cometboy.glb',
    year: '2024',
    medium: '3D Sculpture · GLB',
    caption: '궤도를 벗어난 소년, 스스로 빛나는 잔상.',
    accent: '#ff6b4a',
  },
  {
    id: 'double-lovers',
    title: 'Double Lovers',
    file: '/models/deeperent_double_lovers.glb',
    year: '2024',
    medium: '3D Sculpture · GLB',
    caption: '겹쳐진 두 형상, 하나의 온도.',
    accent: '#e35d8a',
  },
  {
    id: 'ice-boy',
    title: 'Ice Boy',
    file: '/models/ice-boy.glb',
    year: '2023',
    medium: '3D Sculpture · GLB',
    caption: '얼어붙은 순간에도 흐르는 표정.',
    accent: '#5aa9ff',
  },
  {
    id: 'samboypen',
    title: 'Samboy Pen',
    file: '/models/samboypen.glb',
    year: '2023',
    medium: '3D Sculpture · GLB',
    caption: '손끝에서 태어난 캐릭터, 선의 무게.',
    accent: '#7bd88f',
  },
  {
    id: '3haku',
    title: '3haku',
    file: '/models/3haku.glb',
    year: '2024',
    medium: '3D Sculpture · GLB',
    caption: '세 겹의 여백, 비워서 완성한 형태.',
    accent: '#e8b04b',
    // Per-part colors keyed by mesh name (identified via a debug render).
    // Based on the reference toy: orange ears, white helmet, blue eye-paint,
    // brown vest, tan skin, grey gloves, black pants, grey/white sneakers.
    palette: {
      obj001: '#d9682a', // 귀 ears
      obj002: '#e9e4da', // 헬멧 helmet
      obj003: '#3f7ca8', // 눈가 블루 페인트 face paint (eyes)
      obj004: '#d4a276', // 얼굴 피부 face skin
      obj0: '#38271b', // 머리카락 hair
      obj005: '#47301f', // 조끼 vest
      obj006: '#d4a276', // 팔 arms (skin)
      obj007: '#6a6e72', // 장갑 gloves
      obj008: '#1c1c1e', // 바지 pants
      obj009: '#33333a', // 신발 shoes
      obj010: '#cfc9bb', // 신발 중창 midsole
      obj011: '#e4dfd4', // 밑창 soles
      obj012: '#2a2a2f', // 발목 디테일 ankle detail
    },
  },
];
