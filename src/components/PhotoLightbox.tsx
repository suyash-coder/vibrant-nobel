import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Calendar, Sparkles } from 'lucide-react'
import type { ScrapbookPhoto } from '../types/scrapbook'

interface PhotoLightboxProps {
  photo: ScrapbookPhoto | null
  onClose: () => void
}

export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (photo) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
        >
          {/* Lightbox Content Card (Polaroid Style) */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#EBE3D7] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close photo view"
              className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#55463F] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-xl bg-[#EBE3D7] flex items-center justify-center">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto max-h-[65vh] object-contain rounded-xl select-none"
              />
            </div>

            {/* Polaroid Bottom Notes */}
            <div className="pt-4 sm:pt-5 space-y-1.5">
              {photo.date && (
                <div className="flex items-center gap-1.5 text-xs font-sans text-[#84756F]">
                  <Calendar className="w-3.5 h-3.5 text-[#A8B7A0]" />
                  <span>{photo.date}</span>
                </div>
              )}

              {photo.caption && (
                <h3 className="font-serif text-lg sm:text-xl text-[#55463F] font-medium tracking-wide">
                  {photo.caption}
                </h3>
              )}

              {photo.annotation && (
                <p className="font-handwriting text-xl sm:text-2xl text-[#84756F] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E9D59C]" />
                  <span>{photo.annotation}</span>
                </p>
              )}
            </div>

            {/* Tap instruction */}
            <div className="mt-3 text-center">
              <span className="font-sans text-[11px] text-[#84756F]/60">
                tap anywhere outside or press Esc to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
