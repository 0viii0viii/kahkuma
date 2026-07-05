// The curated collection. Each artwork maps to an optimized GLB in /public/models.
// `accent` drives the per-work lighting + UI tint; tweak titles/captions freely.
export const works = [
  {
    id: 'cometboy',
    title: 'Comet Boy',
    file: '/models/cometboy-split.glb', // auto-split into 69 loose parts
    year: '2024',
    medium: '3D Sculpture · GLB',
    caption: '궤도를 벗어난 소년, 스스로 빛나는 잔상.',
    accent: '#ff6b4a',
    // Per-part colors mapped by spatial region: panda cap, blue visor,
    // black biker jacket, grey gloves, blue jeans, pink/white sneakers.
    palette: {
      // --- 얼굴 피부 (3haku 얼굴색과 동일) ---
      part000: '#d4a276',

      // --- 상체: 재킷 몸통 (기존 검정 -> 피규어의 메인 야구점퍼 핑크) ---
      part001: '#F1A1C4',

      // --- 하체: 바지 (기존 #9ab6d6 라이트블루 -> 피규어 청바지 블루) ---
      part002: '#6FAEE2',

      // --- 상체: 장갑/손 (기존 #6e7176 회색 -> 피규어의 로봇 글러브 핑크 및 피부톤 반영) ---
      part003: '#E583B0', // 왼손 (글러브 핑크)
      part004: '#F2D1C4', // 오른손 (피부톤)

      // --- 머리: 머리 뒤/헤어 (기존 #2b2b30 다크 -> 다크 차콜) ---
      part005: '#CE3A2E',

      // --- 머리: 헤드캡/헬멧 돔 (기존 #9a9ea3 회색 -> 곰 모자 핑크) ---
      part006: '#F1A1C4',

      // --- 머리: 얼굴/바이저(눈가) (기존 블루 -> 피규어 바이저 하늘색) ---
      part007: '#86C5DA',

      // --- 머리: 캡 앞 로고/별 (기존 검정 -> 포인트 핑크) ---
      part008: '#E583B0',

      // --- 머리: 캡 디테일 (기존 #9a9ea3 회색 -> 다크 차콜 음영) ---
      part009: '#3A3A3C',
      part010: '#3A3A3C',

      // --- 머리: 귀 (기존 검정 -> 부드러운 곰 귀 핑크) ---
      part011: '#6E7176',
      part012: '#6E7176',
      part013: '#6E7176',
      part014: '#6E7176',

      // --- 하체: 신발 갑피 (기존 핑크 -> 피규어 운동화 핑크) ---
      part015: '#E583B0',
      part016: '#E583B0',
      part017: '#E583B0',
      part018: '#E583B0',

      // --- 상체: 재킷 디테일 (지퍼·주머니 등 기존 검정 -> 포인트 핑크/차콜) ---
      part019: '#E583B0', // 재킷 주머니/지퍼 라인 포인트 핑크

      // --- 하체: 신발 밑창/끈 (기존 화이트 -> 밝은 화이트 그레이) ---
      part020: '#EAEAEA',
      part021: '#EAEAEA',

      // --- 머리: 캡 앞 로고/별 ---
      part022: '#E583B0',

      // --- 머리: 귀 ---
      part023: '#6E7176',
      part024: '#6E7176',

      // --- 하체: 신발 밑창/끈 ---
      part025: '#EAEAEA',
      part026: '#EAEAEA',

      // --- 상체: 재킷 디테일 ---
      part027: '#E583B0',

      // --- 상체: 헤어/후드/목 ---
      part028: '#CE3A2E',
      part029: '#CE3A2E',

      // --- 상체: 벨트/재킷 하단 (기존 검정 -> 벨트 버클 및 밴드 포인트) ---
      part030: '#E8D277', // 벨트 버클 옐로우
      part031: '#E583B0', // 재킷 디테일 (차콜)
      part032: '#E583B0',
      part033: '#E583B0',
      part034: '#E583B0',

      // --- 하체: 신발 밑창/끈 디테일 ---
      part035: '#EAEAEA',
      part036: '#EAEAEA',
      part037: '#EAEAEA',
      part038: '#EAEAEA',
      part039: '#EAEAEA',
      part040: '#EAEAEA',

      // --- 상체: 벨트/재킷 하단 ---
      part041: '#3A3A3C',

      // --- 머리: 머리 뒤/헤어 ---
      part042: '#CE3A2E',
      part043: '#CE3A2E',

      // --- 상체: 재킷 디테일 ---
      part044: '#E583B0',

      // --- 상체: 헤어/후드/목 ---
      part045: '#3A3A3C',

      // --- 상체: 재킷 디테일 ---
      part046: '#E583B0',
      part047: '#E583B0',

      // --- 머리: 캡 디테일 ---
      part048: '#3A3A3C',
      part049: '#3A3A3C',

      // --- 상체: 재킷 디테일 ---
      part050: '#E583B0',
      part051: '#E583B0',

      // --- 상체: 헤어/후드/목 ---
      part052: '#3A3A3C',
      part053: '#3A3A3C',

      // --- 상체: 재킷 디테일 ---
      part054: '#E583B0',
      part055: '#E583B0',
      part056: '#E583B0',
      part057: '#E583B0',

      // --- 상체: 벨트/재킷 하단 ---
      part058: '#3A3A3C',

      // --- 하체: 신발 밑창/끈 ---
      part059: '#EAEAEA',
      part060: '#EAEAEA',
      part061: '#EAEAEA',

      // --- 상체: 벨트/재킷 하단 ---
      part062: '#3A3A3C',
      part063: '#3A3A3C',

      // --- 하체: 신발 밑창/끈 ---
      part064: '#EAEAEA',

      // --- 상체: 벨트/재킷 하단 ---
      part065: '#3A3A3C',
      part066: '#3A3A3C',
      part067: '#3A3A3C',

      // --- 상체: 재킷 디테일 ---
      part068: '#E583B0',
    },
  },
  {
    id: 'double-lovers',
    title: 'Double Lovers',
    file: '/models/deeperent_double_lovers-split.glb', // auto-split into 46 parts
    year: '2024',
    medium: '3D Sculpture · GLB',
    caption: '겹쳐진 두 형상, 하나의 온도.',
    accent: '#e35d8a',
    // Per-part colors mapped by spatial region (cowboy reference):
    // brown hat/boots, blonde hair, blue denim shirt, tan gloves, denim jeans.
    palette: {
      part000: '#3f8ed0',
      part001: '#2e3f6b',
      part002: '#d8a878',
      part003: '#6e4a2c',
      part004: '#d4bd6e',
      part005: '#d4bd6e',
      part006: '#d9bd4e',
      part007: '#6b4a2f',
      part008: '#6b4a2f',
      part009: '#d9bd4e',
      part010: '#3f8ed0',
      part011: '#6b4a2f',
      part012: '#6b4a2f',
      part013: '#d9bd4e',
      part014: '#d8a878',
      part015: '#2e3f6b',
      part016: '#2e3f6b',
      part017: '#2e3f6b',
      part018: '#2e3f6b',
      part019: '#3f8ed0',
      part020: '#2e3f6b',
      part021: '#2e3f6b',
      part022: '#2e3f6b',
      part023: '#2e3f6b',
      part024: '#1c1c20',
      part025: '#1c1c20',
      part026: '#3f7ca8',
      part027: '#3f7ca8',
      part028: '#3f7ca8',
      part029: '#3f7ca8',
      part030: '#3f7ca8',
      part031: '#3f7ca8',
      part032: '#6e4a2c',
      part033: '#6e4a2c',
      part034: '#3f7ca8',
      part035: '#3f7ca8',
      part036: '#3f8ed0',
      part037: '#3f8ed0',
      part038: '#3f8ed0',
      part039: '#3f8ed0',
      part040: '#3f8ed0',
      part041: '#3f8ed0',
      part042: '#3f8ed0',
      part043: '#3f8ed0',
      part044: '#3f8ed0',
      part045: '#3f8ed0',
    },
  },
  {
    id: 'ice-boy',
    title: 'Ice Boy',
    file: '/models/ice-boy-split.glb', // auto-split into 56 parts
    year: '2023',
    medium: '3D Sculpture · GLB',
    caption: '얼어붙은 순간에도 흐르는 표정.',
    accent: '#5aa9ff',
    // Per-part colors mapped by spatial region (reference):
    // orange ears, white helmet, blue face paint, brown hair, black shirt/pants,
    // brown gloves/boots.
    palette: {
      part000: '#d4a276', // 피부 몸체 (얼굴·팔·목) 살색
      part001: '#1c1c1e',
      part002: '#5a3d28',
      part003: '#5a3d28',
      part004: '#e9e4da',
      part005: '#3a291d',
      part006: '#dd6a2a',
      part007: '#dd6a2a',
      part008: '#1c1c1e',
      part009: '#6b4a2f',
      part010: '#6b4a2f',
      part011: '#6b4a2f',
      part012: '#6b4a2f',
      part013: '#3f7ca8',
      part014: '#e4dfd4',
      part015: '#e4dfd4',
      part016: '#1c1c1e',
      part017: '#1c1c1e',
      part018: '#1c1c1e',
      part019: '#e4dfd4',
      part020: '#e4dfd4',
      part021: '#1c1c1e',
      part022: '#1c1c1e',
      part023: '#1c1c1e',
      part024: '#e4dfd4',
      part025: '#e4dfd4',
      part026: '#1c1c1e',
      part027: '#1c1c1e',
      part028: '#e4dfd4',
      part029: '#e4dfd4',
      part030: '#e4dfd4',
      part031: '#e4dfd4',
      part032: '#1c1c1e',
      part033: '#1c1c1e',
      part034: '#1c1c1e',
      part035: '#1c1c1e',
      part036: '#1c1c1e',
      part037: '#1c1c1e',
      part038: '#1c1c1e',
      part039: '#1c1c1e',
      part040: '#1c1c1e',
      part041: '#1c1c1e',
      part042: '#1c1c1e',
      part043: '#1c1c1e',
      part044: '#e4dfd4',
      part045: '#1c1c1e',
      part046: '#e4dfd4',
      part047: '#1c1c1e',
      part048: '#e4dfd4',
      part049: '#e4dfd4',
      part050: '#1c1c1e',
      part051: '#1c1c1e',
      part052: '#1c1c1e',
      part053: '#1c1c1e',
      part054: '#1c1c1e',
      part055: '#1c1c1e',
    },
  },
  {
    id: 'samboypen',
    title: 'Samboy Pen',
    file: '/models/samboypen-split.glb', // auto-split into 62 parts
    year: '2023',
    medium: '3D Sculpture · GLB',
    caption: '손끝에서 태어난 캐릭터, 선의 무게.',
    accent: '#7bd88f',
    // Per-part colors mapped by spatial region (bomb-head reference):
    // black bomb head/jacket/gloves, red visor, tan skin, white shirt/emblem,
    // tan belt, khaki pants, black/white shoes.
    palette: {
      part000: '#1c1c1e',
      part001: '#1c1c1e',
      part002: '#cdb088',
      part003: '#1c1c1e',
      part004: '#55565a',
      part005: '#55565a',
      part006: '#e8e4dc',
      part007: '#1c1c1e',
      part008: '#1c1c1e',
      part009: '#1c1c1e',
      part010: '#1c1c1e',
      part011: '#1c1c1e',
      part012: '#3a3a3e',
      part013: '#b83232',
      part014: '#1c1c1e',
      part015: '#1c1c1e',
      part016: '#c9a878',
      part017: '#1c1c1e',
      part018: '#1c1c1e',
      part019: '#1c1c1e',
      part020: '#1c1c1e',
      part021: '#1c1c1e',
      part022: '#55565a',
      part023: '#55565a',
      part024: '#1c1c1e',
      part025: '#1c1c1e',
      part026: '#1c1c1e',
      part027: '#1c1c1e',
      part028: '#e8e4dc',
      part029: '#e8e4dc',
      part030: '#e8e4dc',
      part031: '#e8e4dc',
      part032: '#e8e4dc',
      part033: '#e8e4dc',
      part034: '#1c1c1e',
      part035: '#d8a878',
      part036: '#e8e4dc',
      part037: '#e8e4dc',
      part038: '#1c1c1e',
      part039: '#1c1c1e',
      part040: '#1c1c1e',
      part041: '#1c1c1e',
      part042: '#1c1c1e',
      part043: '#1c1c1e',
      part044: '#1c1c1e',
      part045: '#1c1c1e',
      part046: '#1c1c1e',
      part047: '#c9a878',
      part048: '#d8a878',
      part049: '#d8a878',
      part050: '#1c1c1e',
      part051: '#1c1c1e',
      part052: '#c9a878',
      part053: '#1c1c1e',
      part054: '#1c1c1e',
      part055: '#c9a878',
      part056: '#e8e4dc',
      part057: '#c9a878',
      part058: '#e8e4dc',
      part059: '#c9a878',
      part060: '#c9a878',
      part061: '#c9a878',
    },
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
