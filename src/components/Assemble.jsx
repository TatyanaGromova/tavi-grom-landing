import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { assembleCards } from '../data/assemble'
import { useMotionSettings } from '../utils/motion'

export default function Assemble() {
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="assemble" className="section-padding section-alt relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative">
        <SectionTitle
          title="Что я собираю"
          subtitle="Не отдельные картинки и не разрозненные элементы. Я собираю цифровую форму идеи — образ, историю, интерфейс и систему."
        />

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {/* Connecting lines — desktop */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <line x1="100" y1="100" x2="300" y2="100" className="assemble-line" />
            <line x1="100" y1="300" x2="300" y2="300" className="assemble-line" />
            <line x1="100" y1="100" x2="100" y2="300" className="assemble-line" />
            <line x1="300" y1="100" x2="300" y2="300" className="assemble-line" />
            <line x1="200" y1="100" x2="200" y2="300" className="assemble-line-dashed" />
            <line x1="100" y1="200" x2="300" y2="200" className="assemble-line-dashed" />
            <circle cx="200" cy="200" r="4" className="assemble-node-center" />
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
                variants={fadeUp}
              >
                <div className="flex items-start gap-4">
                  <span className="assemble-index" aria-hidden="true">
                    {String(card.id).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk group-hover:text-accent-soft transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-soft-gray leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.p
            className="mt-10 text-center text-xs sm:text-sm tracking-[0.14em] uppercase text-lavender/60"
            variants={fadeUp}
          >
            Образ · История · Интерфейс · Система
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
