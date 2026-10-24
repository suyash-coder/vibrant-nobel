import { motion, useReducedMotion } from 'motion/react'
import { BIRTHDAY_NOTE } from '../data/scrapbookData'

export function BirthdayNote() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative w-full overflow-hidden">
      {/* 
        SMOOTH FADE TRANSITION FROM DARK BROWN (#0F0301) INTO KRAFT PAPER
        Significantly elongated, multi-stop watercolor fade from Stage 1 into Stage 2
      */}
      <div
        className="w-full h-80 sm:h-[420px] md:h-[500px] bg-gradient-to-b from-[#0F0301] via-15%-[#0F0301] via-35%-[#1d1310] via-55%-[#3b2a22] via-75%-[#695041] via-90%-[#967963] to-[#C6A584]"
        aria-hidden="true"
      />

      <section
        className="relative z-10 w-full pb-20 sm:pb-28 pt-4 px-4 sm:px-6 flex flex-col items-center justify-center bg-transparent overflow-visible"
        aria-label="Personal Birthday Note"
      >
        {/* VINYL WITH LILY FLOWERS (User Accessory) - Left transition accent */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -30, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute -top-16 left-0 sm:left-4 z-10 select-none opacity-90 hover:opacity-100 transition-opacity"
        >
          <img
            src="/images/stickers/sticker-vinyl-flowers.png"
            alt="Vinyl with lily flowers"
            className="w-28 sm:w-40 md:w-48 h-auto filter drop-shadow-lg"
          />
        </motion.div>

        {/* SINGLE PINK LILY (User Accessory) - Right transition accent */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 30, rotate: 12 }}
          whileInView={{ opacity: 1, x: 0, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute -top-12 right-0 sm:right-6 z-10 select-none opacity-95 hover:opacity-100 transition-opacity"
        >
          <img
            src="/images/stickers/sticker-lily1.png"
            alt="Pink lily flower"
            className="w-24 sm:w-36 md:w-40 h-auto filter drop-shadow-md"
          />
        </motion.div>

        <div className="relative w-full max-w-xl mx-auto z-20">
          {/* Main Paper Journal Card */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#FAF6F0] rounded-2xl p-6 sm:p-10 polaroid-shadow border border-[#EBE3D7] overflow-visible"
          >
            {/* RED PUSHPIN (User Accessory) - Pinning the note card */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 select-none">
              <img
                src="/images/stickers/sticker-pin.png"
                alt="Push pin"
                className="w-9 sm:w-11 h-auto filter drop-shadow-md rotate-[12deg]"
              />
            </div>

            {/* Washi Tape Strips holding the note */}
            <div
              className="washi-tape washi-sage -top-3 left-8 w-24 sm:w-28 rotate-[-3deg]"
              aria-hidden="true"
            />
            <div
              className="washi-tape washi-butter -bottom-2 right-8 w-20 sm:w-24 rotate-[2deg]"
              aria-hidden="true"
            />

            {/* "ऐddie" BADGE (User Accessory) - Pinned at top right */}
            <div className="absolute -top-7 sm:-top-8 right-1 sm:-right-4 z-20 select-none">
              <div className="relative rotate-[6deg] group hover:rotate-0 transition-transform">
                <img
                  src="/images/stickers/sticker-addie.jpg"
                  alt="ऐddie badge"
                  className="w-22 sm:w-30 h-auto rounded-lg shadow-md border-2 border-white/90"
                />
                <div
                  className="washi-tape washi-blush -top-2 left-1/2 -translate-x-1/2 w-14 rotate-[-4deg]"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Handwritten Badge Label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9C8CE]/40 border border-[#E9C8CE] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8B7A0]" />
              <span className="font-handwriting text-lg text-[#55463F] font-semibold tracking-wide">
                {BIRTHDAY_NOTE.badge}
              </span>
            </div>

            {/* Refined Serif Heading */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#55463F] tracking-wide mb-6">
              {BIRTHDAY_NOTE.greeting}
            </h2>

            {/* Paragraphs in Clean, Comfortable Reading Typography */}
            <div className="space-y-4 text-base sm:text-lg text-[#55463F]/90 leading-relaxed font-sans font-normal">
              {BIRTHDAY_NOTE.paragraphs.map((p, idx) => (
                <p key={idx} className="tracking-[0.015em]">
                  {p}
                </p>
              ))}
            </div>

            {/* Delicate Botanical Doodle / Divider */}
            <div className="my-8 flex items-center justify-center gap-3 text-[#A8B7A0]/70 select-none">
              <span className="h-[1px] w-12 sm:w-20 bg-[#A8B7A0]/40" />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
                <path d="M12 3v18" />
                <path d="M3 12h18" />
              </svg>
              <span className="h-[1px] w-12 sm:w-20 bg-[#A8B7A0]/40" />
            </div>

            {/* Signoff / Closing */}
            <div className="flex flex-col items-end pt-3 pr-2 text-right">
              {BIRTHDAY_NOTE.closing && (
                <span className="font-sans text-xs sm:text-sm text-[#84756F] italic">
                  {BIRTHDAY_NOTE.closing}
                </span>
              )}
              <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#8B2635] mt-1 tracking-wider font-semibold">
                {BIRTHDAY_NOTE.signature}
              </span>
            </div>
          </motion.div>

          {/* ADORABLE DACHSHUND PUPPY IN BIRTHDAY HAT (Centered, low, larger, zero overlap) */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 sm:mt-14 mb-4 flex justify-center items-center w-full z-20 select-none"
          >
            <div className="relative group hover:scale-105 transition-all">
              <img
                src="/images/stickers/sticker-puppy.png"
                alt="Birthday puppy with flowers"
                className="w-36 sm:w-48 md:w-56 h-auto filter drop-shadow-xl"
              />
              <div
                className="washi-tape washi-sage -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 rotate-[-3deg]"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Visual Cue encouraging the user to continue scrolling into the scrapbook */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-col items-center justify-center text-center gap-1 select-none"
          >
            <span className="font-handwriting text-xl sm:text-2xl text-[#3D2817] font-semibold tracking-wide drop-shadow-xs">
              your scrapbook awaits below
            </span>
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-[#3D2817]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
