'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const welcomeText = "Kahkuma's Studio";
const words = welcomeText.split(' ');

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeMotion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-8">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Welcome Text Animation */}
          <motion.div
            className="mb-8 text-4xl md:text-6xl font-bold text-white drop-shadow-lg flex flex-wrap justify-center lg:justify-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, idx) => (
              <motion.span key={idx} variants={wordVariants} className="inline-block mr-2">
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          >
            독창적인 예술적 비전을 통해 새로운 경험을 창조하는 브랜드입니다
          </motion.p>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="space-y-6"
          >
            {/* Artist Info */}
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Artist</h2>
              <p className="text-white mb-2">
                <span className="font-semibold">
                  김희현 <span className="text-sky-300">(Heehyun Kim)</span>
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                카쿠마의 창작자이자 아티스트입니다. 독특한 시각적 스타일과 창의적인 표현으로 새로운 예술적 경험을
                선사합니다.
              </p>
            </div>

            {/* Follow Us */}
            <div className="p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <div>
                  <p className="text-white font-semibold cursor-pointer hover:text-pink-500">
                    <a href="https://www.instagram.com/kahkuma" target="_blank" rel="noopener noreferrer">
                      @kahkuma
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm">최신 작품과 소식을 인스타그램에서 확인하세요</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            // 기본 ease 옵션들:
            // 'linear' - 일정한 속도로 진행
            // 'easeIn' - 천천히 시작해서 빨라짐
            // 'easeOut' - 빠르게 시작해서 느려짐
            // 'easeInOut' - 천천히 시작했다가 빨라졌다가 다시 느려짐
            // 'circIn' - 원형 곡선으로 천천히 시작
            // 'circOut' - 원형 곡선으로 빠르게 시작
            // 'circInOut' - 원형 곡선으로 부드럽게 시작과 끝
            // 'backIn' - 뒤로 당겼다가 앞으로 진행
            // 'backOut' - 앞으로 진행했다가 뒤로 살짝 당김
            // 'backInOut' - 양방향으로 당기는 효과
            // 'anticipate' - 뒤로 당겼다가 앞으로 튀어나감
            duration: 1.2,
            delay: 0.8,
            ease: 'easeIn',
          }}
          className="flex-1 relative group"
        >
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{
              duration: 0.8,
            }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src="/kahkuma1.jpeg"
              alt="Kahkuma Studio"
              width={500}
              height={600}
              className="object-contain w-full h-[500px] lg:h-[600px]"
              priority
            />

            {/* Gradient Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
