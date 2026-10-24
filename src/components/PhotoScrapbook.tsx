import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Eye, Heart } from 'lucide-react'
import { SCRAPBOOK_PHOTOS } from '../data/scrapbookData'
import type { ScrapbookPhoto } from '../types/scrapbook'
import { PhotoLightbox } from './PhotoLightbox'

export function PhotoScrapbook() {
  const [activePhoto, setActivePhoto] = useState<ScrapbookPhoto | null>(null)
  const reducedMotion = useReducedMotion()

  const featuredPhoto = SCRAPBOOK_PHOTOS[0]
  const otherPhotos = SCRAPBOOK_PHOTOS.slice(1)

  return (
    <section
      className="relative z-10 w-full py-16 sm:py-24 px-4 sm:px-6 bg-transparent"
      aria-label="Photo Scrapbook"
    >

      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-12 sm:mb-16 select-none relative">
          {/* HALFTONE CAMERA WITH RED FLASH (User Accessory) */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            className="absolute -top-14 -left-8 sm:-left-20 w-24 sm:w-32 h-auto select-none pointer-events-none"
          >
            <img
              src="/images/stickers/sticker-camera.png"
              alt="Vintage camera"
              className="w-full h-auto filter drop-shadow-md"
            />
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0]/90 border border-[#55463F]/20 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B2635]" />
            <span className="font-handwriting text-lg text-[#2D1B0F] font-semibold tracking-wide">
              memories collected
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2D1B0F] tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
            Your Scrapbook
          </h2>

          <p className="font-handwriting text-2xl sm:text-3xl text-[#3D2817] font-semibold mt-2 tracking-wide drop-shadow-xs">
            a little corner filled with moments of you
          </p>

          {/* User Provided Cutout Banner as Scrapbook Collage Tape */}
          <div className="mt-6 flex justify-center">
            <div className="relative inline-block max-w-[280px] sm:max-w-xs rotate-[-1.5deg] filter drop-shadow-md">
              <img
                src="/images/stickers/happy-birthday-cutout.png"
                alt="Happy Birthday cutout collage lettering"
                className="w-full h-auto select-none opacity-95 hover:opacity-100 transition-opacity"
              />
              <div
                className="washi-tape washi-blush -top-2 left-4 w-16 rotate-[-4deg]"
                aria-hidden="true"
              />
              <div
                className="washi-tape washi-sage -bottom-2 right-4 w-16 rotate-[3deg]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* 1. FEATURED POLAROID */}
        {featuredPhoto && (
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="w-full mb-14 sm:mb-18 flex flex-col items-center"
          >
            <div
              onClick={() => setActivePhoto(featuredPhoto)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActivePhoto(featuredPhoto)
              }}
              style={{
                transform: reducedMotion ? 'none' : `rotate(${featuredPhoto.rotation}deg)`,
              }}
              className="group relative w-full max-w-sm sm:max-w-md bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl polaroid-shadow border border-[#EBE3D7] cursor-pointer hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
            >
              {/* Washi Tape */}
              <div
                className="washi-tape washi-blush -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 rotate-[-1deg]"
                aria-hidden="true"
              />

              {/* User Provided Chrome Star Sticker Accent */}
              <img
                src="/images/stickers/chrome-star.png"
                alt=""
                aria-hidden="true"
                className="absolute -top-5 -right-4 w-10 sm:w-12 h-auto filter drop-shadow-md select-none group-hover:scale-110 transition-transform"
              />

              {/* USER ACCESSORY: "आईCONIC" BADGE (Pinned to corner of featured photo) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 z-20 select-none rotate-[-6deg] group-hover:rotate-0 transition-transform">
                <img
                  src="/images/stickers/sticker-iconic.jpg"
                  alt="आईCONIC"
                  className="w-24 sm:w-30 h-auto rounded-xl shadow-md border-2 border-white"
                />
                <div
                  className="washi-tape washi-sage -top-2.5 left-2 w-14 rotate-[-6deg]"
                  aria-hidden="true"
                />
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#EBE3D7]">
                <img
                  src={featuredPhoto.src}
                  alt={featuredPhoto.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-xs font-sans text-[#55463F] shadow-md backdrop-blur-xs">
                    <Eye className="w-3.5 h-3.5" />
                    tap to view
                  </span>
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="pt-4 pb-1 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#55463F] font-semibold tracking-wide">
                  {featuredPhoto.caption}
                </p>
                {featuredPhoto.annotation && (
                  <p className="font-handwriting text-lg sm:text-xl text-[#84756F] mt-1">
                    {featuredPhoto.annotation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. ASYMMETRICAL POLAROID FLOW */}
        <div className="w-full space-y-12 sm:space-y-16">
          {otherPhotos.map((photo, index) => {
            const isEven = index % 2 === 0
            const washiClass =
              photo.tapeColor === 'sage'
                ? 'washi-sage'
                : photo.tapeColor === 'butter'
                  ? 'washi-butter'
                  : 'washi-blush'

            return (
              <motion.div
                key={photo.id}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`w-full flex ${isEven ? 'justify-start sm:pl-4' : 'justify-end sm:pr-4'}`}
              >
                <div
                  onClick={() => setActivePhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActivePhoto(photo)
                  }}
                  style={{
                    transform: reducedMotion ? 'none' : `rotate(${photo.rotation}deg)`,
                  }}
                  className="group relative w-full max-w-[280px] sm:max-w-xs bg-[#FAF6F0] p-3 sm:p-4 rounded-2xl polaroid-shadow border border-[#EBE3D7] cursor-pointer hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Washi Tape */}
                  <div
                    className={`washi-tape ${washiClass} -top-2.5 ${isEven ? 'left-6 rotate-[-3deg]' : 'right-6 rotate-[2.5deg]'} w-20 sm:w-24`}
                    aria-hidden="true"
                  />

                  {/* USER ACCESSORY: Red Pushpin on 2nd polaroid */}
                  {index === 1 && (
                    <img
                      src="/images/stickers/sticker-pin.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 sm:w-9 h-auto filter drop-shadow-md select-none rotate-[-8deg] z-20"
                    />
                  )}

                  {/* USER ACCESSORY: Crushed Coke Can on 1st side polaroid */}
                  {index === 0 && (
                    <img
                      src="/images/stickers/sticker-coke.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute -bottom-6 -right-6 w-20 sm:w-24 h-auto filter drop-shadow-md select-none rotate-[10deg] group-hover:scale-110 transition-transform z-20"
                    />
                  )}

                  {/* USER ACCESSORY: Curled Botanical Lily on 4th side polaroid */}
                  {index === 3 && (
                    <div className="absolute -bottom-8 -left-8 w-24 sm:w-32 h-auto select-none pointer-events-none z-20 rotate-[-12deg] group-hover:rotate-0 transition-transform">
                      <img
                        src="/images/stickers/sticker-lily2.png"
                        alt="Botanical lily"
                        className="w-full h-auto filter drop-shadow-md"
                      />
                    </div>
                  )}

                  {/* Decorative Stickers (User Provided Assets) */}
                  {photo.sticker === 'star' && (
                    <img
                      src="/images/stickers/chrome-star.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute -top-3 -right-3 w-8 sm:w-10 h-auto filter drop-shadow-md select-none group-hover:rotate-12 transition-transform"
                    />
                  )}
                  {photo.sticker === 'disco' && (
                    <img
                      src="/images/stickers/disco-ball.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute -bottom-4 -left-4 w-12 sm:w-14 h-auto filter drop-shadow-md select-none group-hover:scale-110 transition-transform"
                    />
                  )}

                  {/* Photo area */}
                  <div
                    className={`relative w-full overflow-hidden rounded-xl bg-[#EBE3D7] ${
                      photo.aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/5]'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-sans text-[#55463F] shadow-sm backdrop-blur-xs">
                        <Eye className="w-3 h-3" />
                        view
                      </span>
                    </div>
                  </div>

                  {/* Caption & Annotation */}
                  <div className="pt-3 pb-0.5">
                    {photo.caption && (
                      <p className="font-handwriting text-xl sm:text-2xl text-[#55463F] font-semibold leading-tight">
                        {photo.caption}
                      </p>
                    )}
                    {photo.annotation && (
                      <p className="font-handwriting text-base sm:text-lg text-[#84756F] mt-0.5">
                        {photo.annotation}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* MID-GALLERY SCRAPBOOK ACCENT NOTE & Diवा BADGE */}
        <div className="my-14 sm:my-18 relative w-full max-w-sm flex flex-col items-center select-none">
          {/* USER ACCESSORY: "Diवा" BADGE */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 relative rotate-[3deg] hover:rotate-0 transition-transform"
          >
            <img
              src="/images/stickers/sticker-diva.jpg"
              alt="Diवा badge"
              className="w-36 sm:w-44 h-auto rounded-xl shadow-md border-2 border-white/90"
            />
            <div
              className="washi-tape washi-butter -top-2 right-4 w-16 rotate-[4deg]"
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full text-center p-6 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#55463F]/25 rotate-[-1deg] shadow-sm"
          >
            <div
              className="washi-tape washi-sage -top-3 left-1/2 -translate-x-1/2 w-20 rotate-[1deg]"
              aria-hidden="true"
            />
            <Heart className="w-5 h-5 mx-auto text-[#8B2635] fill-[#8B2635] mb-2" />
            <p className="font-serif italic text-base sm:text-lg text-[#55463F]/90">
              "Here's to celebrating the quiet laughter, the sweet talks, and every day you make brighter."
            </p>
            <span className="font-handwriting text-lg text-[#84756F] block mt-1">
              — so glad to know you
            </span>
          </motion.div>

          {/* USER ACCESSORY: PARTY MONKEY MAKING HEART HANDS (Centered, low, larger, zero overlap) */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 sm:mt-12 flex justify-center items-center w-full z-20 select-none"
          >
            <div className="relative group hover:scale-105 transition-all">
              <img
                src="/images/stickers/sticker-monkey.png"
                alt="Birthday monkey making heart hands"
                className="w-36 sm:w-48 md:w-56 h-auto filter drop-shadow-xl"
              />
              <div
                className="washi-tape washi-blush -top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 rotate-[-3deg]"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Accessible Photo Lightbox */}
      <PhotoLightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </section>
  )
}
