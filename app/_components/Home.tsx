'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const welcomeText = "Welcome to Kahkuma's Studio";
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
    <div className="flex flex-col items-center justify-center bg-black pt-16">
      {/* 웰컴 텍스트 단어별 애니메이션 */}
      <motion.div
        className="mb-8 text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg flex flex-wrap justify-center"
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

      {/* 이미지 및 효과 - 텍스트 애니메이션이 끝난 후 등장 (delay: 1.2초 + 단어 개수*0.15초) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 1 + words.length * 0.15,
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        className="relative group"
      >
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
        >
          <Image src="/kahkuma1.jpeg" alt="Kahkuma" width={400} height={400} className="object-cover" priority />

          {/* 그라데이션 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />

          {/* 글로우 효과 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-xl"
          />
        </motion.div>

        {/* 플로팅 요소들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
        />
      </motion.div>
    </div>
  );
}
