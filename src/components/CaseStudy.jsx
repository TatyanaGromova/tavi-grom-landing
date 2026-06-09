import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import SectionTitle from './SectionTitle'
import { kotelCaseStudy } from '../data/projects'
import { useMotionSettings } from '../utils/motion'

const caseBlocks = [
  {
    title: 'Задача',
    text: 'Сделать технический сервис понятным, современным и вызывающим доверие.',
  },
  {
    title: 'Что было сделано',
    text: 'Разработана визуальная подача, обложки, карусели, посты, идеи роликов, структура сайта и логика заявок.',
  },
  {
    title: 'Подход',
    text: 'Без перегруза сложными техническими формулировками. Коммуникация строится через понятные ситуации клиента: котёл шумит, плохо греет, появилась ошибка, нужен запуск или обслуживание.',
  },
  {
    title: 'Результат',
    text: 'Проект получил единый визуальный стиль и понятную подачу: что делает сервис, когда обращаться и как оставить заявку.',
  },
]

export default function CaseStudy() {
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="case-study" className="section-padding">
      <div className="container-wide">
        <SectionTitle title="Разбор проекта: сервисный центр «КотёлЪ»" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            className="rounded-3xl overflow-hidden premium-card shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <PlaceholderMedia
              src={kotelCaseStudy.mainImage}
              alt={kotelCaseStudy.mainAlt}
              caption="Здесь будет изображение проекта"
              variant={0}
              aspectRatio="aspect-[4/3] lg:aspect-auto lg:min-h-[480px]"
              objectPosition="center top"
              eager
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: stagger }}
          >
            {caseBlocks.map((block) => (
              <motion.div
                key={block.title}
                className="premium-card rounded-2xl p-5 sm:p-6 hover:border-accent/20 transition-colors duration-300"
                variants={fadeUp}
              >
                <h3 className="font-heading text-base sm:text-lg font-semibold text-lavender mb-3">
                  {block.title}
                </h3>
                <p className="text-sm sm:text-base text-soft-gray leading-relaxed">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: stagger }}
        >
          {kotelCaseStudy.gallery.map((item, i) => (
            <motion.div
              key={item.alt}
              className="rounded-2xl overflow-hidden premium-card"
              variants={fadeUp}
            >
              <PlaceholderMedia
                src={item.src}
                alt={item.alt}
                caption="Здесь будет изображение проекта"
                variant={i + 1}
                aspectRatio="aspect-[16/10]"
                objectPosition="center top"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
