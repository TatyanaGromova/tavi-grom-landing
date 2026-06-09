import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import AssembleWaves from './AssembleWaves'
import DecorativeWaveLine from './DecorativeWaveLine'
import { assembleCards } from '../data/assemble'
import { itemViewport, sectionViewport, useMotionSettings } from '../utils/motion'

const assembleCardVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
            delayChildren: 0.08,
          },
        },
      }

const assembleCardContentVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -6 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }

export default function Assemble() {
  const { fadeUp, prefersReducedMotion } = useMotionSettings()
  const cardVariants = assembleCardVariants(prefersReducedMotion)
  const cardContentVariants = assembleCardContentVariants(prefersReducedMotion)

  return (
    <section id="assemble" className="section-padding section-alt relative overflow-hidden">
      <AssembleWaves />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <SectionTitle
          title="Что я собираю"
          subtitle="Не отдельные картинки и не разрозненные элементы. Я собираю цифровую форму идеи — образ, историю, интерфейс и систему."
        />

        <div className="relative max-w-4xl mx-auto">
          <svg
            className="assemble-grid-svg absolute inset-0 w-full h-full pointer-events-none opacity-45 sm:opacity-55 md:opacity-100"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <line x1="100" y1="100" x2="300" y2="100" className="assemble-line assemble-line--animated" />
            <line x1="100" y1="300" x2="300" y2="300" className="assemble-line assemble-line--animated" />
            <line x1="100" y1="100" x2="100" y2="300" className="assemble-line assemble-line--animated" />
            <line x1="300" y1="100" x2="300" y2="300" className="assemble-line assemble-line--animated" />
            <line x1="200" y1="100" x2="200" y2="300" className="assemble-line-dashed assemble-line--pulse" />
            <line x1="100" y1="200" x2="300" y2="200" className="assemble-line-dashed assemble-line--pulse" />
            <circle cx="200" cy="200" r="4" className="assemble-node-center assemble-node-center--glow" />
            <circle cx="100" cy="100" r="3" className="assemble-node" />
            <circle cx="300" cy="100" r="3" className="assemble-node" />
            <circle cx="100" cy="300" r="3" className="assemble-node" />
            <circle cx="300" cy="300" r="3" className="assemble-node" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-10">
            {assembleCards.map((card, index) => (
              <motion.article
                key={card.id}
                className={`assemble-card group ${index % 2 === 1 ? 'sm:translate-y-3 lg:translate-y-4' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={itemViewport}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              >
                <DecorativeWaveLine prefersReducedMotion={prefersReducedMotion} />
                <motion.div
                  className="assemble-card__content flex items-start gap-4"
                  variants={cardContentVariants}
                >
                  <span className="assemble-index" aria-hidden="true">
                    {String(card.id).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk group-hover:text-accent-soft transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-soft-gray leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          <motion.p
            className="mt-10 text-center text-xs sm:text-sm tracking-[0.14em] uppercase text-lavender/60"
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
          >
            Образ · История · Интерфейс · Система
          </motion.p>
        </div>
      </div>
    </section>
  )
}
