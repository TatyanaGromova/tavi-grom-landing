import neuroVideo from '../assets/video/neuro-video.mp4'
import aiVideoCoverImport from '../assets/projects/ai-video-cover.jpg'
import aiVideoMain from '../assets/video/ai-video-main.mp4'
import aiVideoDino from '../assets/video/ai-video-dino.mp4'
import aiVideoMaslenitsa from '../assets/video/ai-video-maslenitsa.mp4'
import aiVideoPolyglot from '../assets/video/ai-video-polyglot.MP4'
import aiVideoSatkaChocolate from '../assets/video/ai-video-satka-chocolate.MP4'
import { resolveMedia } from './media'

const aiVideoMainResolved = aiVideoMain ?? resolveMedia('video/ai-video-main.mp4')
const aiVideoCover = aiVideoCoverImport ?? resolveMedia('projects/ai-video-cover.jpg')

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
    task: 'Сделать технический сервис понятным, современным и вызывающим доверие.',
    work: 'Разработаны визуальная подача, обложки, карусели, посты, идеи роликов, структура сайта и логика заявок.',
    result:
      'Проект получил единый визуальный стиль и понятную подачу: что делает сервис, когда обращаться и как оставить заявку.',
    image: resolveMedia(paths.kotelCover),
    gallery: [
      {
        src: resolveMedia(paths.kotelCarousel),
        alt: 'Карусель для соцсетей сервисного центра «КотёлЪ»',
        mediaFit: 'contain',
        mediaPosition: 'center top',
      },
      {
        src: resolveMedia(paths.kotelSite),
        alt: 'Структура сайта сервисного центра «КотёлЪ»',
        mediaFit: 'contain',
        mediaPosition: 'center top',
      },
    ],
    video: null,
    videoGallery: null,
    alt: 'Проект визуальной упаковки сервисного центра «КотёлЪ»',
    mediaFit: 'cover',
    mediaPosition: 'center top',
  },
  {
    id: 2,
    title: 'Игра для «КотёлЪ»',
    category: 'мини-игра, механика, промокоды',
    description:
      'Игра, где пользователь соединяет трубопровод от котла к радиатору, проходит уровни и получает бонус или промокод.',
    task: 'Создать игровую механику, которая вовлекает пользователя и приводит к заявке или бонусу.',
    work: 'Придумана мини-игра с трубопроводом, уровнями, бонусами и промокодами. Собраны игровые экраны и промо-материалы.',
    result:
      'Появился интерактивный способ знакомства с сервисом — пользователь проходит уровни и получает понятный бонус.',
    image: resolveMedia(paths.kotelGame),
    gallery: [
      {
        src: resolveMedia(paths.kotelGameScreen),
        alt: 'Игровой экран мини-игры для «КотёлЪ»',
        mediaFit: 'contain',
        mediaPosition: 'center',
      },
      {
        src: resolveMedia(paths.kotelGamePromo),
        alt: 'Экран с промокодом в игре для «КотёлЪ»',
        mediaFit: 'contain',
        mediaPosition: 'center',
      },
    ],
    video: null,
    videoGallery: null,
    alt: 'Мини-игра для сервисного центра «КотёлЪ»',
    mediaFit: 'contain',
    mediaPosition: 'center',
  },
  {
    id: 3,
    title: 'Приложение-планер',
    category: 'приложение, задачи, бюджет',
    description:
      'Приложение для дел и бюджета с задачами, операциями, календарём и мягким современным интерфейсом.',
    task: 'Сделать простой и спокойный инструмент для задач, бюджета и планирования без перегруза.',
    work: 'Спроектированы экраны задач, календаря и бюджета. Собран мягкий интерфейс с понятной логикой вкладок.',
    result:
      'Получилось приложение с единым визуальным тоном — задачи, деньги и календарь в одной системе.',
    image: resolveMedia(paths.plannerApp),
    gallery: [
      {
        src: resolveMedia(paths.plannerCalendar),
        alt: 'Экран календаря приложения-планера',
        mediaFit: 'contain',
        mediaPosition: 'center top',
      },
      {
        src: resolveMedia(paths.plannerTasks),
        alt: 'Экран задач приложения-планера',
        mediaFit: 'contain',
        mediaPosition: 'center top',
      },
    ],
    video: null,
    videoGallery: null,
    alt: 'Приложение-планер для задач и бюджета',
    mediaFit: 'contain',
    mediaPosition: 'center',
  },
  {
    id: 4,
    title: 'Ночной Интернет',
    category: 'иммерсивный сайт, цифровой помощник',
    description:
      'Атмосферный проект с личным архивом, архивом снов, метафорическими картами и цифровым Спутником.',
    task: 'Создать атмосферный цифровой мир с личным архивом, снами и помощником.',
    work: 'Разработаны главный экран, архив снов, метафорические карты и цифровой Спутник.',
    result: 'Проект стал иммерсивной средой — пользователь погружается в личную цифровую историю.',
    image: resolveMedia(paths.nightInternet),
    gallery: [
      {
        src: resolveMedia(paths.nightInternetHome),
        alt: 'Главный экран проекта «Ночной Интернет»',
        mediaFit: 'cover',
        mediaPosition: 'center top',
      },
      {
        src: resolveMedia(paths.nightInternetSputnik),
        alt: 'Цифровой помощник Спутник',
        mediaFit: 'contain',
        mediaPosition: 'center',
      },
      {
        src: resolveMedia(paths.nightInternetArchive),
        alt: 'Архив снов в проекте «Ночной Интернет»',
        mediaFit: 'cover',
        mediaPosition: 'center',
      },
    ],
    video: null,
    videoGallery: null,
    alt: 'Иммерсивный проект «Ночной Интернет»',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
  {
    id: 5,
    title: 'Нейрофотосессии',
    category: 'визуальный образ, личный бренд',
    description:
      'Серии изображений для личного бренда, соцсетей, афиш и творческих проектов.',
    task: 'Собрать серию визуальных образов для личного бренда и соцсетей.',
    work: 'Созданы серии изображений с единым стилем, ракурсами и настроением. Подготовлено динамичное видео на основе образов.',
    result: 'Появилась визуальная линия для публикаций, афиш и творческих проектов.',
    image: resolveMedia(paths.neuroPhoto),
    gallery: [
      {
        src: resolveMedia(paths.neuroPhoto01),
        alt: 'Нейрофотосессия — образ 1',
        mediaFit: 'cover',
        mediaPosition: 'center top',
      },
      {
        src: resolveMedia(paths.neuroPhoto02),
        alt: 'Нейрофотосессия — образ 2',
        mediaFit: 'cover',
        mediaPosition: 'center top',
      },
      {
        src: resolveMedia(paths.neuroPhoto03),
        alt: 'Нейрофотосессия — образ 3',
        mediaFit: 'cover',
        mediaPosition: 'center top',
      },
    ],
    video: neuroVideo,
    videoGallery: null,
    alt: 'Нейрофотосессии для личного бренда',
    mediaFit: 'cover',
    mediaPosition: 'center top',
  },
  {
    id: 6,
    title: 'AI-клипы и визуальные истории',
    category: 'видео, раскадровка, промпты',
    description:
      'Короткие визуальные истории: динозавр, Масленица, Полиглот, Сатка в шоколаде и нейрофотосессии.',
    task: 'Превратить идеи в короткие визуальные истории с кинематографичной подачей.',
    work: 'Собраны сценарии, промпты, раскадровки и визуальные сцены. Смонтированы ролики на разные темы.',
    result: 'Получилась видео-витрина с разными настроениями — от сказки до имиджевого клипа.',
    image: null,
    cover: aiVideoCover,
    poster: aiVideoCover,
    gallery: [],
    video: null,
    heroVideo: aiVideoMainResolved || aiVideoDino,
    previewVideo: aiVideoMainResolved || aiVideoDino,
    previewVideoFallback: aiVideoDino,
    verticalVideos: true,
    videoGallery: [
      {
        title: 'Ролик про динозавра',
        src: aiVideoDino,
        description: 'Кинематографичный AI-ролик с персонажем, движением и атмосферой.',
        mediaFit: 'cover',
        mediaPosition: 'center',
      },
      {
        title: 'Клип «Масленица»',
        src: aiVideoMaslenitsa,
        description: 'Праздничная визуальная история с огнём, движением и народной атмосферой.',
        mediaFit: 'cover',
        mediaPosition: 'center',
      },
      {
        title: 'Нейрофотосессия',
        src: neuroVideo,
        description: 'Динамичное видео на основе визуального образа и нейрофотосессии.',
        mediaFit: 'cover',
        mediaPosition: 'center top',
      },
      {
        title: 'Сказки / Полиглот',
        src: aiVideoPolyglot,
        description: 'Сказочный проект с персонажами, книгой и волшебной атмосферой.',
        mediaFit: 'cover',
        mediaPosition: 'center',
      },
      {
        title: 'Сатка в шоколаде',
        src: aiVideoSatkaChocolate,
        description: 'Имиджевый ролик с городом, шоколадом и атмосферной подачей.',
        mediaFit: 'cover',
        mediaPosition: 'center',
      },
    ],
    alt: 'Видео-превью проекта AI-клипы и визуальные истории',
    mediaFit: 'cover',
    mediaPosition: 'center',
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
