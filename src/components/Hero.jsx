import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroMedia from './HeroMedia'
import Logo from './Logo'
import heroLoop from '../assets/video/hero-loop.mp4'
import { portraits } from '../data/portraits'
import { scrollToSection, useMotionSettings } from '../utils/motion'

const factTags = ['Визуал', 'Видео', 'Сайты', 'Игры', 'Приложения', 'Боты']

function Accent({ children }) {
  return <span className="accent-word">{children}</span>
}

function HeroVisual({ prefersReducedMotion }) {
  return (
    <div className="relative w-full">
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-br from-accent/[0.07] via-transparent to-accent-warm/[0.06] blur-[56px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className="relative rounded-2xl sm:rounded-[1.75rem] lg:rounded-[2rem] overflow-hidden hero-media-frame"
        whileHover={prefersReducedMotion ? {} : { scale: 1.008 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <HeroMedia
          videoSrc={heroLoop}
          imageSrc={portraits.main}
          alt="Портрет Татьяны Громовой"
          caption="Здесь будет портрет или видео"
          aspectRatio="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4]"
          className="rounded-[inherit]"
          objectPosition="center 20%"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-graphite/30 via-transparent to-graphite/10 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>
    </div>
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
      className="relative min-h-[88vh] flex items-center overflow-hidden hero-bg"
    >
      <div className="absolute inset-0 hero-noise pointer-events-none opacity-80" aria-hidden="true" />

      <div
        className="absolute top-[18%] left-[8%] w-[420px] h-[320px] rounded-full bg-accent-soft/[0.08] blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] right-[5%] w-[480px] h-[480px] rounded-full bg-gradient-to-br from-accent-soft/[0.07] to-accent-warm/[0.08] blur-[100px] pointer-events-none"
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

      <div className="container-wide w-full px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 pb-12 sm:pb-14 relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] gap-10 lg:gap-14 xl:gap-16 items-center">
          <motion.div
            className="relative max-w-xl lg:max-w-[32rem]"
            style={prefersReducedMotion ? {} : { y, opacity }}
          >
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
              className="font-heading text-[1.7rem] sm:text-[2.35rem] md:text-[2.65rem] lg:text-[2.85rem] xl:text-[3rem] font-bold text-milk leading-[1.12] tracking-[-0.025em] max-w-[18ch] sm:max-w-[22ch]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              Создаю цифровые проекты <Accent>с визуальным характером</Accent>
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-5 text-base sm:text-lg text-soft-gray leading-[1.7] max-w-lg"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Визуалы, сайты, игры, приложения, боты и ролики — собираю из идеи цельный цифровой образ, который хочется рассматривать и запоминать.
            </motion.p>

            <motion.div
              className="mt-5 author-line author-line-enhanced max-w-md"
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
            className="w-full lg:min-h-[min(72vh,640px)] flex items-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
          >
            <HeroVisual prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
