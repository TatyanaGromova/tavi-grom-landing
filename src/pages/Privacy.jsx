import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-graphite">
      <div className="container-wide section-padding max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-milk mb-8">
            Политика конфиденциальности
          </h1>

          <div className="prose-space space-y-5 text-base text-soft-gray leading-relaxed">
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Татьяны Громовой (ТА•ВИ Гром).
            </p>
            <p>
              Администратор сайта обрабатывает персональные данные, которые пользователь добровольно предоставляет при заполнении формы обратной связи: имя, контактные данные и информацию о проекте.
            </p>
            <p>
              Персональные данные используются исключительно для связи с пользователем и обсуждения возможного сотрудничества. Данные не передаются третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством.
            </p>
            <p>
              Пользователь имеет право запросить уточнение, обновление или удаление своих персональных данных, обратившись к администратору сайта через контактные данные, указанные на главной странице.
            </p>
            <p className="text-lavender/70 text-sm italic border-l-2 border-lavender/30 pl-4">
              Текст политики будет дополнен и заменён на финальную юридическую версию.
            </p>
          </div>

          <Link
            to="/"
            className="inline-block mt-10 px-6 py-3 bg-lavender/20 hover:bg-lavender/30 border border-lavender/30 text-milk font-medium rounded-xl transition-all duration-300"
          >
            Вернуться на главную
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
