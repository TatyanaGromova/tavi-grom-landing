import SectionTitle from './SectionTitle'
import ServicePrimaryCard from './ServicePrimaryCard'
import ServiceExtraGroup from './ServiceExtraGroup'
import { extraServices, primaryServices } from '../data/services'

const OFFSET_CLASSES = [
  '',
  'service-primary-card--offset-b',
  'service-primary-card--offset-a',
  '',
]

export default function Services() {
  return (
    <section id="services" className="section-padding section-surface">
      <div className="container-wide">
        <SectionTitle
          title="Что я делаю"
          subtitle="Собираю проекты там, где идея должна стать образом, структурой и цифровой формой."
          entryOffset={16}
        />

        <div className="service-primary-grid">
          {primaryServices.map((service, index) => (
            <ServicePrimaryCard
              key={service.id}
              index={service.id}
              title={service.title}
              description={service.description}
              offsetClass={OFFSET_CLASSES[index]}
            />
          ))}
        </div>

        <ServiceExtraGroup items={extraServices} />
      </div>
    </section>
  )
}
