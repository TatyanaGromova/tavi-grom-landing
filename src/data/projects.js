import projectCoverKotel from '../assets/projects/project-cover-kotel.png'
import projectCoverKotelGame from '../assets/projects/project-cover-kotel-game.png'
import projectCoverPlanner from '../assets/projects/project-cover-planner.png'
import projectCoverNightInternet from '../assets/projects/project-cover-night-internet.png'
import projectCoverNeuroPhoto from '../assets/projects/project-cover-neuro-photo.jpg'
import aiVideoMain from '../assets/video/ai-video-main.mp4'
import neuroVideo from '../assets/video/neuro-video.mp4'
import aiVideoDino from '../assets/video/ai-video-dino.mp4'
import aiVideoMaslenitsa from '../assets/video/ai-video-maslenitsa.mp4'
import aiVideoPolyglot from '../assets/video/ai-video-polyglot.MP4'
import aiVideoSatkaChocolate from '../assets/video/ai-video-satka-chocolate.MP4'
import { resolveMedia } from './media'

const paths = {
  kotelCarousel: 'projects/kotel-carousel.png',
  kotelSite: 'projects/kotel-site.png',
  kotelGameScreen: 'projects/kotel-game-screen.png',
  kotelGamePromo: 'projects/kotel-game-promo.png',
  plannerCalendar: 'projects/planner-calendar.png',
  plannerTasks: 'projects/planner-tasks.png',
  nightInternetHome: 'projects/night-internet-home.png',
  nightInternetSputnik: 'projects/night-internet-sputnik.png',
  nightInternetArchive: 'projects/night-internet-archive.png',
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
    cover: projectCoverKotel,
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
    task: 'Сделать технический сервис понятным, современным и вызывающим доверие.',
    work: 'Разработаны визуальная подача, обложки, карусели, посты, идеи роликов, структура сайта и логика заявок.',
    result:
      'Проект получил единый визуальный стиль и понятную подачу: что делает сервис, когда обращаться и как оставить заявку.',
    alt: 'Обложка проекта сервисного центра «КотёлЪ»',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
  {
    id: 2,
    title: 'Игра для «КотёлЪ»',
    category: 'мини-игра, механика, промокоды',
    description:
      'Игра, где пользователь соединяет трубопровод от котла к радиатору, проходит уровни и получает бонус или промокод.',
    cover: projectCoverKotelGame,
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
    task: 'Создать игровую механику, которая вовлекает пользователя и приводит к заявке или бонусу.',
    work: 'Придумана мини-игра с трубопроводом, уровнями, бонусами и промокодами. Собраны игровые экраны и промо-материалы.',
    result:
      'Появился интерактивный способ знакомства с сервисом — пользователь проходит уровни и получает понятный бонус.',
    alt: 'Обложка проекта «Игра для КотёлЪ»',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
  {
    id: 3,
    title: 'Приложение-планер',
    category: 'приложение, задачи, бюджет',
    description:
      'Приложение для дел и бюджета с задачами, операциями, календарём и мягким современным интерфейсом.',
    cover: projectCoverPlanner,
    gallery: [
      {
        src: resolveMedia(paths.plannerCalendar),
        alt: 'Экран календаря приложения-планера',
        mediaFit: 'contain',
        mediaPosition: 'center',
      },
      {
        src: resolveMedia(paths.plannerTasks),
        alt: 'Экран задач приложения-планера',
        mediaFit: 'contain',
        mediaPosition: 'center',
      },
    ],
    task: 'Сделать простой и спокойный инструмент для задач, бюджета и планирования без перегруза.',
    work: 'Спроектированы экраны задач, календаря и бюджета. Собран мягкий интерфейс с понятной логикой вкладок.',
    result:
      'Получилось приложение с единым визуальным тоном — задачи, деньги и календарь в одной системе.',
    alt: 'Обложка проекта «Приложение-планер»',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
  {
    id: 4,
    title: 'Ночной Интернет',
    category: 'иммерсивный сайт, цифровой помощник',
    description:
      'Атмосферный проект с личным архивом, архивом снов, метафорическими картами и цифровым Спутником.',
    cover: projectCoverNightInternet,
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
    task: 'Создать атмосферный цифровой мир с личным архивом, снами и помощником.',
    work: 'Разработаны главный экран, архив снов, метафорические карты и цифровой Спутник.',
    result: 'Проект стал иммерсивной средой — пользователь погружается в личную цифровую историю.',
    alt: 'Обложка проекта «Ночной Интернет»',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
  {
    id: 5,
    title: 'Нейрофотосессии',
    category: 'визуальный образ, личный бренд',
    description:
      'Серии изображений для личного бренда, соцсетей, афиш и творческих проектов.',
    cover: projectCoverNeuroPhoto,
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
    task: 'Собрать серию визуальных образов для личного бренда и соцсетей.',
    work: 'Созданы серии изображений с единым стилем, ракурсами и настроением. Подготовлено динамичное видео на основе образов.',
    result: 'Появилась визуальная линия для публикаций, афиш и творческих проектов.',
    alt: 'Обложка проекта «Нейрофотосессии»',
    mediaFit: 'cover',
    mediaPosition: 'center top',
  },
  {
    id: 6,
    title: 'AI-клипы и визуальные истории',
    category: 'видео, раскадровка, промпты',
    description:
      'Короткие визуальные истории: динозавр, Масленица, Полиглот, Сатка в шоколаде и нейрофотосессии.',
    previewVideo: aiVideoMain,
    previewVideoFallback: aiVideoDino,
    heroVideo: aiVideoMain,
    verticalVideos: true,
    gallery: [],
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
    task: 'Показать идею через атмосферу, движение, персонажей и визуальную драматургию.',
    work: 'Созданы сценарии, раскадровки, визуальные кадры, промпты и видеопревью.',
    result: 'Получились короткие AI-истории с настроением, образом и выразительной подачей.',
    alt: 'Видео-обложка проекта AI-клипы и визуальные истории',
    mediaFit: 'cover',
    mediaPosition: 'center',
  },
]
