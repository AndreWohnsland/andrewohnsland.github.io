import { readAndCompressImage } from 'browser-image-resizer'

const maxPixelSize = parseInt(import.meta.env.maxPixelSize || '800')
const resizeConfig = {
  quality: 0.7,
  maxWidth: maxPixelSize,
  maxHeight: maxPixelSize,
}

export const resizeImage = async (image: File): Promise<Blob> => {
  return readAndCompressImage(image, resizeConfig)
}
