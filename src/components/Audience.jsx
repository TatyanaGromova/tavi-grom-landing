import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { audienceCards, audienceNote } from '../data/audience'
import { useMotionSettings } from '../utils/motion'

export default function Audience() {
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="audience" className="section-padding section-alt">
      <div className="container-wide">
        <SectionTitle title="Кому это подходит" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {audienceCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`group premium-card rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(214,185,140,0.12)] ${
                index % 3 === 1 ? 'sm:translate-y-2' : ''
              }`}
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <span className="text-2xl text-lavender/50 group-hover:text-lavender transition-colors" aria-hidden="true">
                {card.icon}
              </span>
              <p className="mt-4 font-heading text-base sm:text-lg font-semibold text-milk">
                {card.title}
              </p>
              <p className="mt-2 text-sm text-soft-gray leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 sm:mt-12 text-base sm:text-lg text-soft-gray leading-relaxed max-w-3xl text-center mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {audienceNote}
        </motion.p>
      </div>
    </section>
  )
}
