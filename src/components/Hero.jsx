import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PlaceholderMedia from './PlaceholderMedia'
import { scrollToSection, useMotionSettings } from '../utils/motion'

// Чтобы добавить портрет или видео:
// 1. Положите файл в src/assets/portraits/ или src/assets/video/
// 2. Укажите путь ниже, например: import heroVideo from '../assets/video/hero.mp4'
const HERO_MEDIA_SRC = null
const HERO_MEDIA_TYPE = 'portrait' // 'portrait' | 'video' | 'image'

const directionCards = [
  'Визуалы',
  'Сайты',
  'Игры',
  'Приложения',
  'Боты',
  'Видео',
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const { fadeUp, prefersReducedMotion } = useMotionSettings()

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center section-padding pt-28 sm:pt-32 overflow-hidden"
    >
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-lavender/10 blur-[120px]"
        animate={prefersReducedMotion ? {} : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-apricot/8 blur-[100px]"
        animate={prefersReducedMotion ? {} : { x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div style={prefersReducedMotion ? {} : { y, opacity }}>
          <motion.p
            className="text-sm sm:text-base text-lavender/80 tracking-wide mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Татьяна Громова / ТА•ВИ Гром
          </motion.p>

          <motion.h1
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-milk leading-[1.15] tracking-tight"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Создаю визуалы, сайты, игры, приложения, ботов и проекты с нейросетями
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg text-soft-gray leading-relaxed max-w-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Я помогаю идеям получить форму: от визуальной концепции и сценария до готового сайта, приложения, игры, ролика или цифровой упаковки.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="px-7 py-3.5 bg-lavender/20 hover:bg-lavender/30 border border-lavender/30 text-milk font-medium rounded-xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(196,181,216,0.2)]"
            >
              Посмотреть проекты
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-milk font-medium rounded-xl transition-all duration-300"
            >
              Обсудить задачу
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden glass-panel shadow-2xl shadow-black/20">
            <PlaceholderMedia
              src={HERO_MEDIA_SRC}
              alt="Портрет Татьяны Громовой"
              caption="Здесь будет портрет или видео"
              type={HERO_MEDIA_TYPE}
              variant={0}
              aspectRatio="aspect-[4/5] sm:aspect-[3/4]"
              className="rounded-3xl"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {directionCards.map((label, i) => (
              <motion.div
                key={label}
                className="glass-panel rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-milk/90 font-medium shadow-lg"
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
