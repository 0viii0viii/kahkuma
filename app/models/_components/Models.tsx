'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const modelData = [
  {
    id: 1,
    image: '/models/model1.png',
    title: 'Type #1',
    description: 'To Be Updated',
    category: 'To Be Updated',
    year: '2025',
  },
  {
    id: 2,
    image: '/models/model2.png',
    title: 'Type #2',
    description: 'To Be Updated',
    category: 'To Be Updated',
    year: '2025',
  },
  {
    id: 3,
    image: '/models/model3.png',
    title: 'Type #3',
    description: 'To Be Updated',
    category: 'To Be Updated',
    year: '2025',
  },
  {
    id: 4,
    image: '/models/model4.png',
    title: 'Type #4',
    description: 'To Be Updated',
    category: 'To Be Updated',
    year: '2025',
  },
  {
    id: 5,
    image: '/models/model5.png',
    title: 'Type #5',
    description: 'To Be Updated',
    category: 'To Be Updated',
    year: '2025',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function ModelsMotion() {
  return (
    <div id="works" className="min-h-screen bg-black py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Works</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">각각의 작품은 독특한 스토리와 비전을 담고 있습니다</p>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="space-y-8">
          {modelData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl"
              style={{ willChange: 'transform' }}
            >
              {/* Image Container */}
              <motion.div
                className="relative overflow-hidden aspect-[4/3] md:aspect-[3/2]"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.1 }}
                style={{ willChange: 'transform' }}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover" priority={idx < 2} />
              </motion.div>

              {/* Content */}
              <motion.div
                className="p-6 md:p-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                  <span className="text-gray-400 text-sm font-medium">{item.year}</span>
                </div>

                <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-3">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-20 px-4"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">함께 작업해보시겠습니까?</h3>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm md:text-base">Instagram으로 문의해주세요</p>
        <motion.a
          href="https://www.instagram.com/kahkuma"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm md:text-base"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          @kahkuma
        </motion.a>
      </motion.div>
    </div>
  );
}
