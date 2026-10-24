import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import confetti from 'canvas-confetti'
import { CELEBRANT_NAME } from '../data/scrapbookData'

interface CutoutLetter {
  file: string
  alt: string
  settledRotate: number
  delay: number
}

const ROW_1_LETTERS: CutoutLetter[] = [
  { file: 'h.png', alt: 'H', settledRotate: -2.5, delay: 0.0 },
  { file: 'a.png', alt: 'A', settledRotate: 1.5, delay: 0.05 },
  { file: 'p1.png', alt: 'P', settledRotate: -1.0, delay: 0.1 },
  { file: 'p2.png', alt: 'P', settledRotate: 2.0, delay: 0.15 },
  { file: 'y.png', alt: 'Y', settledRotate: -1.8, delay: 0.2 },
]

const ROW_2_LETTERS: CutoutLetter[] = [
  { file: 'b.png', alt: 'B', settledRotate: 1.8, delay: 0.25 },
  { file: 'i.png', alt: 'I', settledRotate: -2.0, delay: 0.29 },
  { file: 'r.png', alt: 'R', settledRotate: 1.2, delay: 0.33 },
  { file: 't.png', alt: 'T', settledRotate: -1.5, delay: 0.37 },
  { file: 'h2.png', alt: 'H', settledRotate: 2.2, delay: 0.41 },
  { file: 'd.png', alt: 'D', settledRotate: -1.2, delay: 0.45 },
  { file: 'a2.png', alt: 'A', settledRotate: 1.6, delay: 0.49 },
  { file: 'y2.png', alt: 'Y', settledRotate: -2.2, delay: 0.53 },
]

export function CinematicOpening() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasBalloonsDropped, setHasBalloonsDropped] = useState(false)
  const [wished, setWished] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return
          const container = containerRef.current
          const containerTop = container.offsetTop
          const containerHeight = container.offsetHeight
          const viewportHeight = window.innerHeight

          const scrollDistance = containerHeight - viewportHeight
          if (scrollDistance <= 0) return

          const scrolled = window.scrollY - containerTop
          const progress = Math.max(0, Math.min(1, scrolled / scrollDistance))

          setScrollProgress(progress)

          // Balloons only drop once cake is substantially revealed (scrollProgress >= 0.54)
          if (progress >= 0.54) {
            setHasBalloonsDropped(true)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 1. Initial Prompt: Visible at scroll=0, fades out smoothly by 0.16
  const promptOpacity = Math.max(0, Math.min(1, (0.16 - scrollProgress) / 0.1))

  // 2. Whole Screen Dark Color: Shifts smoothly from pitch black (#000000) to dark brown hex #0F0301 (rgb 15, 3, 1)
  // Perfectly matches the deep background of the cake image
  const bgProg = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.44))
  const rBg = Math.round(0 + 15 * bgProg)
  const gBg = Math.round(0 + 3 * bgProg)
  const bBg = Math.round(0 + 1 * bgProg)
  const currentBgColor = `rgb(${rBg}, ${gBg}, ${bBg})`

  // 3. Cake Appearance: Starts fading in slowly at 0.22, fully visible by 0.52
  const cakeOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.22) / 0.3))
  const cakeScale = 0.94 + 0.06 * cakeOpacity

  // 4. Name & Flourish: Reveals after cake & balloons drop (0.58 to 0.78)
  const nameProgress = Math.max(0, Math.min(1, (scrollProgress - 0.58) / 0.2))
  const nameOpacity = nameProgress
  const nameY = (1 - nameProgress) * 16

  // 5. Wish Prompt Opacity (0.68 to 0.85)
  const wishOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.17))

  const handleMakeWish = (e: React.MouseEvent) => {
    e.stopPropagation()
    setWished(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#F7D070', '#FFAE42', '#FFE4A0', '#E9C8CE', '#FFFFFF'],
      disableForReducedMotion: true,
      scalar: 0.95,
    })
  }

  return (
    <section
      ref={containerRef}
      style={{ backgroundColor: currentBgColor }}
      className="relative w-full h-[340vh] transition-colors duration-150"
      aria-label="Cinematic Birthday Opening"
    >
      {/* Sticky Cinematic Viewport */}
      <div
        style={{ backgroundColor: currentBgColor }}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-between py-2 sm:py-4 px-3 sm:px-4 transition-colors duration-150"
      >
        {/* 1. INITIAL SCROLL PROMPT */}
        <div
          style={{
            opacity: promptOpacity,
            pointerEvents: promptOpacity > 0.1 ? 'auto' : 'none',
            display: promptOpacity <= 0 ? 'none' : 'flex',
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-100"
        >
          <div className="flex flex-col items-center gap-3 select-none">
            <span className="font-handwriting text-2xl sm:text-3xl text-[#FAF6F0]/85 tracking-widest lowercase">
              scroll
            </span>
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="text-[#FAF6F0]/50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* TOP: "HAPPY BIRTHDAY" USER CUTOUT LETTER TILES */}
        <div className="relative z-20 w-full max-w-sm flex flex-col items-center pt-1 select-none">
          {/* Flanking User-Provided Chrome Star Balloons */}
          <motion.img
            src="/images/stickers/chrome-star.png"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.5, y: -40 }}
            animate={
              hasBalloonsDropped || reducedMotion
                ? { opacity: 0.95, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.5, y: -40 }
            }
            transition={{ delay: 0.45, duration: 0.7, type: 'spring' }}
            className="pointer-events-none absolute -left-6 sm:-left-10 -top-2 w-9 sm:w-11 h-auto filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)] animate-gentle-float"
          />
          <motion.img
            src="/images/stickers/chrome-star.png"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.5, y: -40 }}
            animate={
              hasBalloonsDropped || reducedMotion
                ? { opacity: 0.95, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.5, y: -40 }
            }
            transition={{ delay: 0.55, duration: 0.7, type: 'spring' }}
            className="pointer-events-none absolute -right-6 sm:-right-10 -top-1 w-8 sm:w-10 h-auto filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)] animate-gentle-float [animation-delay:1.5s]"
          />

          {/* Row 1: HAPPY */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            {ROW_1_LETTERS.map((item, idx) => (
              <motion.div
                key={`r1-${idx}`}
                initial={{ y: -200, opacity: 0, rotate: item.settledRotate * 3 }}
                animate={
                  hasBalloonsDropped || reducedMotion
                    ? { y: 0, opacity: 1, rotate: item.settledRotate }
                    : { y: -200, opacity: 0, rotate: item.settledRotate * 3 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 130,
                  damping: 12,
                  mass: 0.75,
                  delay: reducedMotion ? 0 : item.delay,
                }}
                className="relative flex flex-col items-center"
              >
                <img
                  src={`/images/letters/${item.file}`}
                  alt={item.alt}
                  className="w-7 sm:w-9 md:w-10 h-auto filter drop-shadow-[0_5px_12px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            ))}
          </div>

          {/* Row 2: BIRTHDAY */}
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-1">
            {ROW_2_LETTERS.map((item, idx) => (
              <motion.div
                key={`r2-${idx}`}
                initial={{ y: -220, opacity: 0, rotate: item.settledRotate * 3 }}
                animate={
                  hasBalloonsDropped || reducedMotion
                    ? { y: 0, opacity: 1, rotate: item.settledRotate }
                    : { y: -220, opacity: 0, rotate: item.settledRotate * 3 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 130,
                  damping: 12,
                  mass: 0.75,
                  delay: reducedMotion ? 0 : item.delay,
                }}
                className="relative flex flex-col items-center"
              >
                <img
                  src={`/images/letters/${item.file}`}
                  alt={item.alt}
                  className="w-6.5 sm:w-8.5 md:w-9.5 h-auto filter drop-shadow-[0_5px_12px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* MIDDLE: THE CAKE PHOTO (Soft feathered mask so edges melt invisibly into #0F0301 dark brown) */}
        <div
          style={{
            opacity: cakeOpacity,
            transform: `scale(${cakeScale})`,
            display: cakeOpacity <= 0.01 ? 'none' : 'flex',
          }}
          className="relative z-20 flex flex-col items-center justify-center my-auto transition-all duration-100"
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              maskImage:
                'radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, rgba(0,0,0,0.85) 75%, transparent 98%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, rgba(0,0,0,0.85) 75%, transparent 98%)',
            }}
          >
            <img
              src="/images/cake.jpg"
              alt="Birthday cake with glowing candles and lily flower"
              className="w-72 sm:w-96 md:w-[420px] max-h-[46dvh] object-contain filter contrast-[1.04] brightness-[1.02]"
              style={{
                mixBlendMode: 'lighten',
                WebkitMaskImage: 'radial-gradient(ellipse at center, #000 55%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse at center, #000 55%, transparent 100%)',
              }}
              loading="eager"
            />
          </div>

          {/* Tap cake Easter egg button */}
          <button
            style={{
              opacity: wishOpacity,
              display: wishOpacity <= 0.05 ? 'none' : 'inline-flex',
            }}
            onClick={handleMakeWish}
            aria-label="Tap to make a wish"
            className="mt-1.5 items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/35 text-amber-200/90 text-xs font-sans tracking-wide cursor-pointer hover:bg-amber-900/60 transition-colors shadow-sm"
          >
            <span className="text-amber-400">✨</span>
            <span>{wished ? 'wish sent into the stars' : 'tap to make a wish'}</span>
          </button>
        </div>

        {/* BOTTOM: CELEBRANT NAME (ANUSHREE) */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            display: nameOpacity <= 0.05 ? 'none' : 'block',
          }}
          className="relative z-20 pb-1 text-center select-none transition-all duration-100"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.20em] sm:tracking-[0.26em] text-[#FAF6F0] drop-shadow-[0_2px_24px_rgba(255,215,0,0.45)] leading-tight">
            {CELEBRANT_NAME}
          </h1>
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#E9D59C] mt-1 tracking-wider opacity-95">
            may all your quiet wishes come true
          </p>

          {/* Soft Downward Indicator */}
          <div className="mt-2 flex flex-col items-center gap-0.5 opacity-60">
            <span className="font-handwriting text-xs sm:text-sm text-[#FAF6F0]/60 tracking-wider">
              scroll for your note & scrapbook ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
