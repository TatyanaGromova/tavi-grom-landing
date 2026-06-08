import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import ServiceCard from './ServiceCard'
import { services } from '../data/services'
import { useMotionSettings } from '../utils/motion'

export default function Services() {
  const { stagger } = useMotionSettings()

  return (
    <section id="services" className="section-padding bg-graphite-light/30">
      <div className="container-wide">
        <SectionTitle title="Что я делаю" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
