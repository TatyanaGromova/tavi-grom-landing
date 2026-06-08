import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Consent() {
  return (
    <div className="min-h-screen bg-graphite">
      <div className="container-wide section-padding max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-milk mb-8">
            Согласие на обработку персональных данных
          </h1>

          <div className="space-y-5 text-base text-soft-gray leading-relaxed">
            <p>
              Настоящим я даю своё согласие Татьяне Громовой (ТА•ВИ Гром) на обработку моих персональных данных, указанных в форме обратной связи на сайте.
            </p>
            <p>
              Согласие распространяется на следующие данные: имя, контактная информация (телефон, email, мессенджер) и сведения о проекте, которые я добровольно предоставляю.
            </p>
            <p>
              Цель обработки — связь со мной для обсуждения проекта и возможного сотрудничества. Обработка осуществляется с использованием средств автоматизации и без них.
            </p>
            <p>
              Согласие действует до момента его отзыва. Для отзыва согласия достаточно направить соответствующее обращение через контактные данные, указанные на главной странице сайта.
            </p>
            <p className="text-lavender/70 text-sm italic border-l-2 border-lavender/30 pl-4">
              Текст согласия будет дополнен и заменён на финальную юридическую версию.
            </p>
          </div>

          <Link
            to="/"
            className="btn-primary inline-block mt-10"
          >
            Вернуться на главную
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
