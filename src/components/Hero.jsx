import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import PlaceholderMedia from './PlaceholderMedia'
import HeroMediaInterior from './HeroMediaInterior'
import Logo from './Logo'
import { scrollToSection, useMotionSettings } from '../utils/motion'

const HERO_MEDIA_SRC = null
const HERO_MEDIA_TYPE = 'portrait'

const floatingCards = [
  { label: 'Визуалы', position: 'top-[10%] left-[2%]', z: 30, delay: 0.5 },
  { label: 'Сайты', position: 'top-[5%] right-[4%]', z: 40, delay: 0.6 },
  { label: 'Игры', position: 'top-[42%] left-[-2%]', z: 22, delay: 0.7 },
  { label: 'Приложения', position: 'bottom-[32%] right-[0%]', z: 36, delay: 0.8 },
  { label: 'Боты', position: 'bottom-[12%] left-[6%]', z: 28, delay: 0.9 },
  { label: 'Видео', position: 'bottom-[8%] right-[12%]', z: 32, delay: 1.0 },
]

const factTags = ['Визуал', 'Видео', 'Сайты', 'Игры', 'Приложения', 'Боты']

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
    mouseX.set(x * 10)
    mouseY.set(y * 10)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <>
      <div
        ref={containerRef}
        className="hidden sm:block relative w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto h-[400px] lg:h-[430px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] rounded-full bg-accent/[0.08] blur-[80px] pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={prefersReducedMotion ? {} : { x: springX, y: springY }}
        >
          <div className="absolute w-[72%] h-[78%] rounded-[2rem] border border-accent/12 bg-accent/[0.03]" aria-hidden="true" />
          <div className="absolute w-[76%] h-[82%] rounded-[2.25rem] border border-white/[0.04]" aria-hidden="true" />

          <motion.div
            className="relative w-[66%] z-20 rounded-[1.75rem] overflow-hidden premium-frame"
            whileHover={prefersReducedMotion ? {} : { scale: 1.012 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent z-20 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-lavender/70 font-medium">
                Главный визуал
              </span>
              <span className="flex gap-1" aria-hidden="true">
                <span className="w-1 h-1 rounded-full bg-lavender/40" />
                <span className="w-1 h-1 rounded-full bg-apricot/40" />
                <span className="w-1 h-1 rounded-full bg-powder/40" />
              </span>
            </div>

            <div className="absolute top-12 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lavender/25 to-transparent z-20" aria-hidden="true" />

            <div className="relative">
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
              <HeroMediaInterior />
            </div>
          </motion.div>

          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`floating-card absolute ${card.position}`}
              style={{ zIndex: card.z }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.delay, duration: 0.5 }}
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.04 }}
            >
              <motion.span
                className="block"
                animate={prefersReducedMotion ? {} : { y: [0, i % 2 === 0 ? -3 : 3, 0] }}
                transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {card.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="sm:hidden relative w-full max-w-sm mx-auto">
        <div className="relative rounded-2xl overflow-hidden premium-frame">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.05] to-transparent z-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.15em] text-lavender/70 font-medium">
              Главный визуал
            </span>
            <span className="flex gap-1" aria-hidden="true">
              <span className="w-1 h-1 rounded-full bg-lavender/40" />
              <span className="w-1 h-1 rounded-full bg-apricot/40" />
            </span>
          </div>
          <div className="relative">
            <PlaceholderMedia
              src={HERO_MEDIA_SRC}
              alt="Портрет Татьяны Громовой"
              caption="Здесь будет портрет или видео"
              type={HERO_MEDIA_TYPE}
              variant={0}
              premium
              aspectRatio="aspect-[5/4]"
              className="rounded-2xl"
            />
            <HeroMediaInterior compact />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {floatingCards.map((card) => (
            <div key={card.label} className="floating-card text-center text-[11px] py-2 px-1.5">
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4])
  const { fadeUp, prefersReducedMotion } = useMotionSettings()

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[85vh] flex items-center overflow-hidden hero-bg"
    >
      <div className="absolute inset-0 hero-noise pointer-events-none opacity-80" aria-hidden="true" />

      <div
        className="absolute top-[18%] left-[8%] w-[420px] h-[320px] rounded-full bg-accent-soft/[0.08] blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] right-[5%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-accent-soft/[0.07] to-accent-warm/[0.08] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full bg-accent/[0.05] blur-[100px]"
        animate={prefersReducedMotion ? {} : { x: [0, 20, 0], y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-64 h-64 rounded-full bg-accent-warm/[0.05] blur-[100px]"
        animate={prefersReducedMotion ? {} : { x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container-wide w-full px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 pb-10 sm:pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center">
          <motion.div
            className="relative"
            style={prefersReducedMotion ? {} : { y, opacity }}
          >
            <div
              className="absolute -top-8 -left-8 w-64 h-48 rounded-full bg-accent/[0.06] blur-[70px] pointer-events-none hidden lg:block"
              aria-hidden="true"
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-badge mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lavender/60" aria-hidden="true" />
              Креатор нейросетевых и цифровых проектов
            </motion.div>

            <motion.p
              className="text-xs sm:text-sm text-soft-gray/80 tracking-wide mb-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
            >
              Татьяна Громова / <Logo className="text-soft-gray/90" />
            </motion.p>

            <motion.h1
              className="font-heading text-[1.7rem] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3.05rem] font-bold text-milk leading-[1.12] tracking-[-0.025em] max-w-[18ch] sm:max-w-none"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              Создаю цифровые проекты <Accent>с визуальным характером</Accent>
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-5 text-base sm:text-lg text-soft-gray leading-[1.7] max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Визуалы, сайты, игры, приложения, боты, ролики и проекты с нейросетями — от идеи до готовой формы.
            </motion.p>

            <motion.div
              className="mt-4 author-line"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
            >
              <span>Идея</span>
              <span className="author-dot" aria-hidden="true" />
              <span>Образ</span>
              <span className="author-dot" aria-hidden="true" />
              <span>Цифровая форма</span>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-primary w-full sm:w-auto sm:shrink-0"
              >
                Посмотреть проекты
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-secondary w-full sm:w-auto sm:shrink-0"
              >
                Обсудить задачу
              </button>
            </motion.div>

            <motion.div
              className="mt-5 flex flex-wrap gap-2"
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
