import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PlaceholderMedia from './PlaceholderMedia'
import SectionTitle from './SectionTitle'
import { portraits } from '../data/portraits'
import { useMotionSettings } from '../utils/motion'

// ЗАМЕНИТЕ ССЫЛКИ НА РЕАЛЬНЫЕ:
const SOCIAL_LINKS = {
  vk: 'https://vk.com/',       // ← ваша ссылка ВКонтакте
  telegram: 'https://t.me/',   // ← ваша ссылка Telegram
}

const initialForm = {
  name: '',
  contact: '',
  task: '',
  about: '',
  consent: false,
}

const errors = {
  name: 'Укажите ваше имя',
  contact: 'Укажите, как с вами связаться',
  task: 'Опишите, что нужно сделать',
  consent: 'Необходимо согласие на обработку данных',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { fadeUp } = useMotionSettings()

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = errors.name
    if (!form.contact.trim()) newErrors.contact = errors.contact
    if (!form.task.trim()) newErrors.task = errors.task
    if (!form.consent) newErrors.consent = errors.consent
    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm(initialForm)
    setFieldErrors({})
  }

  const handleChange = (field) => (e) => {
    const value = field === 'consent' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="section-padding section-surface">
      <div className="container-wide max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start mb-8">
          <div>
            <SectionTitle title="Обсудим ваш проект?" />

            <motion.p
              className="text-base sm:text-lg text-soft-gray leading-relaxed -mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Есть идея, которую хочется превратить в сайт, визуал, ролик, игру, приложение или цифровую упаковку? Напишите мне — разберём задачу и найдём форму, в которой проект будет звучать сильнее.
            </motion.p>
          </div>

          {portraits.profile && (
            <motion.div
              className="hidden lg:block w-36 xl:w-44 rounded-2xl overflow-hidden premium-card shrink-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <PlaceholderMedia
                src={portraits.profile}
                alt="Татьяна Громова"
                caption="Здесь будет портрет"
                type="portrait"
                aspectRatio="aspect-[3/4]"
                objectPosition="center top"
              />
            </motion.div>
          )}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <a
            href={SOCIAL_LINKS.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-center"
          >
            Написать ВКонтакте
          </a>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 text-center"
          >
            Написать в Телеграм
          </a>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex-1 px-6 py-3.5 font-medium rounded-xl transition-all duration-300 border text-milk"
            style={{
              background: 'rgba(201, 130, 85, 0.12)',
              borderColor: 'rgba(201, 130, 85, 0.28)',
            }}
          >
            Оставить заявку
          </button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5"
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block text-sm text-milk mb-2">
                    Ваше имя <span className="text-lavender">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    className={`input-field ${fieldErrors.name ? 'border-red-400/60' : ''}`}
                    placeholder="Как к вам обращаться"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400/80" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm text-milk mb-2">
                    Как с вами связаться <span className="text-lavender">*</span>
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={form.contact}
                    onChange={handleChange('contact')}
                    className={`input-field ${fieldErrors.contact ? 'border-red-400/60' : ''}`}
                    placeholder="Telegram, телефон или email"
                    aria-invalid={!!fieldErrors.contact}
                    aria-describedby={fieldErrors.contact ? 'contact-error' : undefined}
                  />
                  {fieldErrors.contact && (
                    <p id="contact-error" className="mt-1.5 text-sm text-red-400/80" role="alert">
                      {fieldErrors.contact}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="task" className="block text-sm text-milk mb-2">
                    Что нужно сделать <span className="text-lavender">*</span>
                  </label>
                  <input
                    id="task"
                    type="text"
                    value={form.task}
                    onChange={handleChange('task')}
                    className={`input-field ${fieldErrors.task ? 'border-red-400/60' : ''}`}
                    placeholder="Сайт, визуал, игра, приложение..."
                    aria-invalid={!!fieldErrors.task}
                    aria-describedby={fieldErrors.task ? 'task-error' : undefined}
                  />
                  {fieldErrors.task && (
                    <p id="task-error" className="mt-1.5 text-sm text-red-400/80" role="alert">
                      {fieldErrors.task}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm text-milk mb-2">
                    Кратко о проекте
                  </label>
                  <textarea
                    id="about"
                    value={form.about}
                    onChange={handleChange('about')}
                    rows={4}
                    className="input-field resize-y"
                    placeholder="Расскажите подробнее, если хотите"
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={handleChange('consent')}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-bg-elevated text-lavender focus:ring-lavender/40"
                      aria-invalid={!!fieldErrors.consent}
                    />
                    <span className="text-sm text-soft-gray leading-relaxed group-hover:text-milk/80 transition-colors">
                      Я соглашаюсь на обработку персональных данных.{' '}
                      <Link to="/privacy" className="text-lavender hover:text-lavender-soft underline underline-offset-2">
                        Политика конфиденциальности
                      </Link>
                      {' · '}
                      <Link to="/consent" className="text-lavender hover:text-lavender-soft underline underline-offset-2">
                        Согласие на обработку персональных данных
                      </Link>
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <p className="mt-1.5 text-sm text-red-400/80" role="alert">
                      {fieldErrors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto"
                >
                  Отправить заявку
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 glass-panel rounded-2xl p-6 text-center"
              role="status"
            >
              <p className="text-milk font-medium">
                Спасибо! Ваша заявка принята. Я свяжусь с вами.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
