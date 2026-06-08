import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { audienceCards, audienceNote } from '../data/audience'
import { useMotionSettings } from '../utils/motion'

export default function Audience() {
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="audience" className="section-padding">
      <div className="container-wide">
        <SectionTitle title="Кому это подходит" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {audienceCards.map((card) => (
            <motion.div
              key={card.id}
              className="group glass-panel rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(196,181,216,0.1)]"
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <span className="text-2xl text-lavender/50 group-hover:text-lavender transition-colors" aria-hidden="true">
                {card.icon}
              </span>
              <p className="mt-4 font-heading text-base sm:text-lg font-medium text-milk capitalize">
                {card.title}
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
