import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import PlaceholderMedia from './PlaceholderMedia'
import { scrollToSection, useMotionSettings } from '../utils/motion'

// Чтобы добавить портрет или видео:
// 1. Положите файл в src/assets/portraits/ или src/assets/video/
// 2. Укажите путь ниже, например: import heroVideo from '../assets/video/hero.mp4'
const HERO_MEDIA_SRC = null
const HERO_MEDIA_TYPE = 'portrait'

const floatingCards = [
  { label: 'Визуалы', position: 'top-[6%] left-[-2%] sm:left-[0%]', z: 30, delay: 0.5 },
  { label: 'Сайты', position: 'top-[2%] right-[-4%] sm:right-[0%]', z: 40, delay: 0.6 },
  { label: 'Игры', position: 'top-[38%] left-[-8%] sm:left-[-4%]', z: 20, delay: 0.7 },
  { label: 'Приложения', position: 'bottom-[28%] right-[-6%] sm:right-[-2%]', z: 35, delay: 0.8 },
  { label: 'Боты', position: 'bottom-[8%] left-[2%]', z: 25, delay: 0.9 },
  { label: 'Видео', position: 'bottom-[4%] right-[8%]', z: 30, delay: 1.0 },
]

const factTags = ['Визуал', 'Видео', 'Сайты', 'Игры', 'Боты']

function Accent({ children }) {
  return <span className="accent-word">{children}</span>
}

function HeroVisualComposition({ prefersReducedMotion }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    mouseX.set(x * 12)
    mouseY.set(y * 12)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <>
      {/* Desktop: layered composition */}
      <div
        ref={containerRef}
        className="hidden sm:block relative w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto h-[420px] lg:h-[460px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={prefersReducedMotion ? {} : { x: springX, y: springY }}
        >
          <div className="absolute w-[72%] h-[78%] rounded-[2rem] border border-lavender/10 bg-lavender/5 blur-sm" />

          <motion.div
            className="relative w-[68%] z-20 rounded-[1.75rem] overflow-hidden"
            style={{
              boxShadow:
                '0 0 0 1px rgba(196,181,216,0.2), 0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-lavender/70 font-medium">
                Главный визуал
              </span>
              <span className="flex gap-1" aria-hidden="true">
                <span className="w-1 h-1 rounded-full bg-lavender/40" />
                <span className="w-1 h-1 rounded-full bg-apricot/40" />
                <span className="w-1 h-1 rounded-full bg-powder/40" />
              </span>
            </div>

            <div className="absolute top-12 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lavender/25 to-transparent" aria-hidden="true" />

            <PlaceholderMedia
              src={HERO_MEDIA_SRC}
              alt="Портрет Татьяны Громовой"
              caption="Здесь будет портрет или видео"
              type={HERO_MEDIA_TYPE}
              variant={0}
              premium
              aspectRatio="aspect-[3/4]"
              className="rounded-[1.75rem]"
            />

            <div
              className="absolute top-16 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-lavender/15 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-12 left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-apricot/10 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`floating-card absolute ${card.position}`}
              style={{ zIndex: card.z }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.delay, duration: 0.5 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -6, scale: 1.05, boxShadow: '0 12px 40px rgba(196,181,216,0.15)' }
              }
            >
              <motion.span
                animate={prefersReducedMotion ? {} : { y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {card.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: compact stack */}
      <div className="sm:hidden relative w-full">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              '0 0 0 1px rgba(196,181,216,0.2), 0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2.5 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.15em] text-lavender/70 font-medium">
              Главный визуал
            </span>
            <span className="flex gap-1" aria-hidden="true">
              <span className="w-1 h-1 rounded-full bg-lavender/40" />
              <span className="w-1 h-1 rounded-full bg-apricot/40" />
            </span>
          </div>
          <PlaceholderMedia
            src={HERO_MEDIA_SRC}
            alt="Портрет Татьяны Громовой"
            caption="Здесь будет портрет или видео"
            type={HERO_MEDIA_TYPE}
            variant={0}
            premium
            aspectRatio="aspect-[4/3]"
            className="rounded-2xl"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {floatingCards.map((card) => (
            <div key={card.label} className="floating-card text-center text-xs py-2 px-2">
              {card.label}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4])
  const { fadeUp, prefersReducedMotion } = useMotionSettings()

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[85vh] flex items-center overflow-hidden hero-bg"
    >
      <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

      <motion.div
        className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full bg-lavender/[0.07] blur-[100px]"
        animate={prefersReducedMotion ? {} : { x: [0, 25, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[40%] right-[8%] w-56 h-56 rounded-full bg-powder/[0.06] blur-[90px]"
        animate={prefersReducedMotion ? {} : { x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-64 h-64 rounded-full bg-apricot/[0.06] blur-[110px]"
        animate={prefersReducedMotion ? {} : { x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container-wide w-full px-5 sm:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
          <motion.div style={prefersReducedMotion ? {} : { y, opacity }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-badge mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lavender/60" aria-hidden="true" />
              Креатор нейросетевых и цифровых проектов
            </motion.div>

            <motion.p
              className="text-xs sm:text-sm text-soft-gray/80 tracking-wide mb-5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
            >
              Татьяна Громова / ТА•ВИ Гром
            </motion.p>

            <motion.h1
              className="font-heading text-[1.75rem] sm:text-[2.5rem] md:text-[2.85rem] lg:text-[3.1rem] font-bold text-milk leading-[1.14] tracking-tight max-w-xl lg:max-w-none"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              Создаю цифровые проекты с <Accent>визуальным характером</Accent>
            </motion.h1>

            <motion.p
              className="mt-5 sm:mt-6 text-base sm:text-lg text-soft-gray leading-relaxed max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Визуалы, сайты, игры, приложения, боты, ролики и проекты с нейросетями — от идеи до готовой формы.
            </motion.p>

            <motion.div
              className="mt-7 sm:mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-primary w-full sm:w-auto text-center"
              >
                Посмотреть проекты
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Обсудить задачу
              </button>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              aria-label="Направления работы"
            >
              {factTags.map((tag) => (
                <span key={tag} className="fact-tag">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
          >
            <HeroVisualComposition prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
