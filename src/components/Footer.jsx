import { Link } from 'react-router-dom'
import { scrollToSection } from '../utils/motion'

const footerNav = [
  { label: 'Обо мне', id: 'about' },
  { label: 'Что я делаю', id: 'services' },
  { label: 'Проекты', id: 'projects' },
  { label: 'Связаться', id: 'contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite-light/20">
      <div className="container-wide section-padding !py-12 sm:!py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <p className="font-heading text-xl font-bold text-milk">
              ТА<span className="text-lavender">•</span>ВИ Гром
            </p>
            <p className="mt-2 text-sm text-soft-gray">
              Креатор нейросетевых и цифровых проектов
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-soft-gray hover:text-milk transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-soft-gray space-y-2">
            <p>© 2026 Татьяна Громова. Все права защищены.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link to="/privacy" className="hover:text-milk transition-colors underline underline-offset-2 decoration-white/20">
                Политика конфиденциальности
              </Link>
              <Link to="/consent" className="hover:text-milk transition-colors underline underline-offset-2 decoration-white/20">
                Согласие на обработку персональных данных
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
