'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const modelImages = [
  '/models/model1.png',
  '/models/model2.png',
  '/models/model3.png',
  '/models/model4.png',
  '/models/model5.png',
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40, scale: 0.95 },
  onscreen: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: custom * 0.12,
    },
  }),
};

export default function ModelsMotion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black py-12">
      <h1 className="text-3xl font-bold mb-8 text-white">모델 갤러리</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
        {modelImages.map((src, idx) => (
          <motion.div
            key={idx}
            className="relative group bg-neutral-900 rounded-xl shadow-lg overflow-hidden border border-neutral-800 hover:shadow-2xl transition-shadow duration-300"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            custom={idx}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
          >
            <Image
              src={src}
              alt={`모델 이미지 ${idx + 1}`}
              width={600}
              height={384}
              className="object-cover w-full h-64 sm:h-72 md:h-80 transition-transform duration-300 group-hover:scale-105"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
              <span className="w-full text-center text-white text-lg font-semibold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                모델 {idx + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
