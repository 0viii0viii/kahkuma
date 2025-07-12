'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n-client';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-center mt-20 px-4 py-10"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('footer.cta')}</h3>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm md:text-base">{t('footer.contact')}</p>
      <motion.a
        href="https://www.instagram.com/kahkuma"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm md:text-base"
      >
        {t('footer.instagram')}
      </motion.a>
      <div className="mt-8 text-xs text-gray-500">{t('footer.copyright')}</div>
    </motion.div>
  );
}
