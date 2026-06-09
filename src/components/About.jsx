import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import AboutGraph from './AboutGraph'
import { portraits } from '../data/portraits'
import { useMotionSettings } from '../utils/motion'

export default function About() {
  const { fadeUp } = useMotionSettings()

  return (
    <section id="about" className="about-section">
      <div className="container-wide">
        <div className="about-layout">
          <motion.div
            className="about-head"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <h2 className="about-title font-heading text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-milk tracking-[-0.03em] leading-[1.12]">
              Обо мне
            </h2>
            <div className="about-title-line" aria-hidden="true" />

            <div className="about-text space-y-3.5 sm:space-y-4 text-sm sm:text-base text-soft-gray leading-relaxed">
              <p>
                Я Татьяна Громова. Создаю проекты на стыке визуала, нейросетей и цифровой сборки. Мне интересно не просто сделать красиво, а найти форму для идеи: образ, структуру, настроение, сценарий и путь пользователя.
              </p>
              <p>
                В одном проекте я могу думать как арт-директор, специалист по промптам, сценарист, дизайнер интерфейса и вайбкодер — поэтому результат получается цельным, а не собранным из разрозненных кусочков.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-photo"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            transition={{ delay: 0.06 }}
          >
            <div className="about-photo-frame relative rounded-2xl overflow-hidden">
              <PlaceholderMedia
                src={portraits.about}
                alt="Татьяна Громова — креатор цифровых проектов"
                caption="Здесь будет портрет"
                type="portrait"
                variant={1}
                aspectRatio="aspect-[3/4] lg:aspect-[4/5]"
                objectPosition="center 10%"
                premium
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-graphite/35 via-transparent to-graphite/5 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <AboutGraph />
        </div>
      </div>
    </section>
  )
}
