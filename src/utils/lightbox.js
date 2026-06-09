export function buildCoverLightboxItem(project) {
  if (project?.cover) {
    return {
      type: 'image',
      src: project.cover,
      alt: project.alt || project.title,
      mediaFit: 'contain',
      mediaPosition: project.mediaPosition ?? 'center',
      title: project.title,
    }
  }

  if (project?.previewVideo) {
    return {
      type: 'video',
      src: project.previewVideo,
      alt: project.alt || project.title,
      mediaFit: 'cover',
      mediaPosition: project.mediaPosition ?? 'center',
      title: project.title,
      vertical: Boolean(project.verticalVideos),
    }
  }

  return null
}

export function buildGalleryLightboxItems(gallery = []) {
  return gallery
    .filter((item) => item?.src)
    .map((item) => ({
      type: 'image',
      src: item.src,
      alt: item.alt || 'Изображение проекта',
      mediaFit: item.mediaFit ?? 'contain',
      mediaPosition: item.mediaPosition ?? 'center',
      title: item.alt,
    }))
}

export function buildVideoGalleryLightboxItems(videoGallery = []) {
  return videoGallery
    .filter((item) => item?.src)
    .map((item) => ({
      type: 'video',
      src: item.src,
      alt: item.title || 'Видео проекта',
      mediaFit: item.mediaFit ?? 'cover',
      mediaPosition: item.mediaPosition ?? 'center',
      title: item.title,
      description: item.description,
      vertical: true,
    }))
}
