// Автоматически подхватывает файлы из src/assets/ при сборке.
// Если файл ещё не добавлен — resolveMedia вернёт null, и покажется заглушка.

const mediaModules = import.meta.glob(
  '../assets/**/*.{jpg,jpeg,png,mp4,webp}',
  { eager: true, import: 'default' },
)

export function resolveMedia(relativePath) {
  const key = `../assets/${relativePath}`
  return mediaModules[key] ?? null
}
