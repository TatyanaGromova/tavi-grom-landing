import { resolveMedia } from './media'

import neuroVideo from '../assets/video/neuro-video.mp4'
import aiVideoDino from '../assets/video/ai-video-dino.mp4'
import aiVideoMaslenitsa from '../assets/video/ai-video-maslenitsa.mp4'
import aiVideoPolyglot from '../assets/video/ai-video-polyglot.mp4'
import aiVideoSatkaChocolate from '../assets/video/ai-video-satka-chocolate.mp4'

const paths = {
  kotelCover: 'projects/kotel-cover.png',
  kotelCarousel: 'projects/kotel-carousel.png',
  kotelSite: 'projects/kotel-site.png',
  kotelGame: 'projects/kotel-game.png',
  kotelGameScreen: 'projects/kotel-game-screen.png',
  kotelGamePromo: 'projects/kotel-game-promo.png',
  plannerApp: 'projects/planner-app.png',
  plannerCalendar: 'projects/planner-calendar.png',
  plannerTasks: 'projects/planner-tasks.png',
  nightInternet: 'projects/night-internet.png',
  nightInternetHome: 'projects/night-internet-home.png',
  nightInternetSputnik: 'projects/night-internet-sputnik.png',
  nightInternetArchive: 'projects/night-internet-archive.png',
  neuroPhoto: 'projects/neuro-photo.jpg',
  neuroPhoto01: 'projects/neuro-photo-01.jpg',
  neuroPhoto02: 'projects/neuro-photo-02.jpg',
  neuroPhoto03: 'projects/neuro-photo-03.jpg',
}

export const projects = [
  {
    id: 1,
    title: 'Сервисный центр «КотёлЪ»',
    category: 'упаковка, визуал, контент, сайт',
    description:
      'Визуальная упаковка, обложки, карусели, посты, структура сайта и логика заявок для сервисного центра.',
    image: resolveMedia(paths.kotelCover),
    gallery: [
      { src: resolveMedia(paths.kotelCarousel), alt: 'Карусель для соцсетей сервисного центра «КотёлЪ»' },
      { src: resolveMedia(paths.kotelSite), alt: 'Структура сайта сервисного центра «КотёлЪ»' },
    ],
    video: null,
    videoGallery: null,
    alt: 'Проект визуальной упаковки сервисного центра «КотёлЪ»',
    objectPosition: 'center top',
  },
  {
    id: 2,
    title: 'Игра для «КотёлЪ»',
    category: 'мини-игра, механика, промокоды',
    description:
      'Игра, где пользователь соединяет трубопровод от котла к радиатору, проходит уровни и получает бонус или промокод.',
    image: resolveMedia(paths.kotelGame),
    gallery: [
      { src: resolveMedia(paths.kotelGameScreen), alt: 'Игровой экран мини-игры для «КотёлЪ»' },
      { src: resolveMedia(paths.kotelGamePromo), alt: 'Экран с промокодом в игре для «КотёлЪ»' },
    ],
    video: null,
    videoGallery: null,
    alt: 'Мини-игра для сервисного центра «КотёлЪ»',
    objectPosition: 'center',
  },
  {
    id: 3,
    title: 'Приложение-планер',
    category: 'приложение, задачи, бюджет',
    description:
      'Приложение для дел и бюджета с задачами, операциями, календарём и мягким современным интерфейсом.',
    image: resolveMedia(paths.plannerApp),
    gallery: [
      { src: resolveMedia(paths.plannerCalendar), alt: 'Экран календаря приложения-планера' },
      { src: resolveMedia(paths.plannerTasks), alt: 'Экран задач приложения-планера' },
    ],
    video: null,
    videoGallery: null,
    alt: 'Приложение-планер для задач и бюджета',
    objectPosition: 'center top',
  },
  {
    id: 4,
    title: 'Ночной Интернет',
    category: 'иммерсивный сайт, цифровой помощник',
    description:
      'Атмосферный проект с личным архивом, архивом снов, метафорическими картами и цифровым Спутником.',
    image: resolveMedia(paths.nightInternet),
    gallery: [
      { src: resolveMedia(paths.nightInternetHome), alt: 'Главный экран проекта «Ночной Интернет»' },
      { src: resolveMedia(paths.nightInternetSputnik), alt: 'Цифровой помощник Спутник' },
      { src: resolveMedia(paths.nightInternetArchive), alt: 'Архив снов в проекте «Ночной Интернет»' },
    ],
    video: null,
    videoGallery: null,
    alt: 'Иммерсивный проект «Ночной Интернет»',
    objectPosition: 'center',
  },
  {
    id: 5,
    title: 'Нейрофотосессии',
    category: 'визуальный образ, личный бренд',
    description:
      'Серии изображений для личного бренда, соцсетей, афиш и творческих проектов.',
    image: resolveMedia(paths.neuroPhoto),
    gallery: [
      { src: resolveMedia(paths.neuroPhoto01), alt: 'Нейрофотосессия — образ 1' },
      { src: resolveMedia(paths.neuroPhoto02), alt: 'Нейрофотосессия — образ 2' },
      { src: resolveMedia(paths.neuroPhoto03), alt: 'Нейрофотосессия — образ 3' },
    ],
    video: neuroVideo,
    videoGallery: null,
    alt: 'Нейрофотосессии для личного бренда',
    objectPosition: 'center top',
  },
  {
    id: 6,
    title: 'AI-клипы и визуальные истории',
    category: 'видео, раскадровка, промпты',
    description:
      'Визуальные истории от идеи и сценария до кадров, анимации и монтажной логики.',
    image: null,
    gallery: [],
    video: null,
    videoGallery: [
      {
        title: 'Ролик про динозавра',
        src: aiVideoDino,
        description: 'Кинематографичный AI-ролик с персонажем, движением и атмосферой.',
      },
      {
        title: 'Клип «Масленица»',
        src: aiVideoMaslenitsa,
        description: 'Праздничная визуальная история с огнём, движением и народной атмосферой.',
      },
      {
        title: 'Нейрофотосессия',
        src: neuroVideo,
        description: 'Динамичное видео на основе визуального образа и нейрофотосессии.',
      },
      {
        title: 'Сказки / Полиглот',
        src: aiVideoPolyglot,
        description: 'Сказочный проект с персонажами, книгой и волшебной атмосферой.',
      },
      {
        title: 'Сатка в шоколаде',
        src: aiVideoSatkaChocolate,
        description: 'Имиджевый ролик с городом, шоколадом и атмосферной подачей.',
      },
    ],
    alt: 'AI-клипы и визуальные истории',
    objectPosition: 'center',
  },
]

export const kotelCaseStudy = {
  mainImage: resolveMedia(paths.kotelCover),
  mainAlt: 'Визуальная упаковка сервисного центра «КотёлЪ»',
  gallery: [
    { src: resolveMedia(paths.kotelCarousel), alt: 'Карусель для соцсетей «КотёлЪ»' },
    { src: resolveMedia(paths.kotelSite), alt: 'Структура сайта «КотёлЪ»' },
  ],
}
