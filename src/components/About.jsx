import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import SectionTitle from './SectionTitle'
import { portraits } from '../data/portraits'
import { useMotionSettings } from '../utils/motion'

const roles = [
  'Креатор нейросетевых проектов',
  'Специалист по промптам',
  'Нейродизайнер',
  'Вайбкодер',
  'Автор визуальных концепций',
  'Создатель цифровых продуктов',
]

export default function About() {
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <SectionTitle title="Обо мне" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12 sm:mb-16">
          <motion.div
            className="space-y-5 text-base sm:text-lg text-soft-gray leading-relaxed lg:leading-loose"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p>
              Я Татьяна Громова. Создаю проекты на стыке визуала, нейросетей и цифровой сборки. Мне интересно не просто сделать красиво, а найти форму для идеи: образ, структуру, настроение, сценарий и путь пользователя.
            </p>
            <p>
              В одном проекте я могу думать как арт-директор, специалист по промптам, сценарист, дизайнер интерфейса и вайбкодер — поэтому результат получается цельным, а не собранным из разрозненных кусочков.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden premium-frame max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <PlaceholderMedia
              src={portraits.about}
              alt="Татьяна Громова — креатор цифровых проектов"
              caption="Здесь будет портрет"
              type="portrait"
              variant={1}
              aspectRatio="aspect-[3/4]"
              objectPosition="center 15%"
              premium
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/25 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {roles.map((role, i) => (
            <motion.div
              key={role}
              className="premium-card rounded-xl px-5 py-4 text-sm sm:text-base text-milk hover:border-accent/25 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(214,185,140,0.08)]"
              variants={fadeUp}
            >
              <span className="text-lavender/50 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {role}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
