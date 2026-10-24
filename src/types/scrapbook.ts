export interface ScrapbookPhoto {
  id: string
  src: string
  alt: string
  caption?: string
  annotation?: string
  date?: string
  location?: string
  rotation: number // in degrees, e.g. -2, 1.5
  tapeColor?: 'blush' | 'sage' | 'butter'
  tapePosition?: 'top-center' | 'top-left' | 'top-right' | 'diagonal-left' | 'diagonal-right'
  aspectRatio?: 'square' | 'portrait' | 'landscape'
  sticker?: 'star' | 'disco' | 'flower' | 'sparkle'
  stickerPosition?: 'top-right' | 'bottom-left' | 'bottom-right'
}

export interface BirthdayNoteData {
  badge: string
  greeting: string
  paragraphs: string[]
  closing: string
  signature: string
}
