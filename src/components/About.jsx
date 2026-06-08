import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import SectionTitle from './SectionTitle'
import { useMotionSettings } from '../utils/motion'

// Чтобы добавить фото профиля:
// 1. Положите файл в src/assets/portraits/
// 2. Укажите путь ниже
const PROFILE_IMAGE_SRC = null

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
          <motion.p
            className="text-base sm:text-lg text-soft-gray leading-relaxed lg:leading-loose"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Я Татьяна Громова, креатор нейросетевых и цифровых проектов. Работаю с визуалом, видео, сайтами, играми, приложениями, ботами и креативными концепциями. Мне важно не просто сделать красиво, а собрать образ, смысл и структуру так, чтобы проект запоминался и работал на задачу.
          </motion.p>

          <motion.div
            className="rounded-2xl overflow-hidden glass-panel max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <PlaceholderMedia
              src={PROFILE_IMAGE_SRC}
              alt="Фото Татьяны Громовой"
              caption="Здесь будет портрет"
              type="portrait"
              variant={1}
              aspectRatio="aspect-[3/4]"
            />
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
              className="premium-card rounded-xl px-5 py-4 text-sm sm:text-base text-milk hover:border-lavender/15 transition-all duration-300"
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
