import { ArrowUp, Sparkles } from 'lucide-react'
import { CELEBRANT_NAME } from '../data/scrapbookData'

export function ScrapbookEnding() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative z-10 w-full py-16 sm:py-20 px-4 sm:px-6 bg-transparent border-t border-[#A88866]/40 flex flex-col items-center justify-center text-center select-none overflow-visible"
      aria-label="Scrapbook Ending"
    >
      <div className="relative max-w-sm flex flex-col items-center bg-[#FAF6F0]/90 p-6 sm:p-8 rounded-2xl border border-[#55463F]/20 shadow-md backdrop-blur-xs z-10">
        {/* Vintage Wax Seal / Stamp Emblem */}
        <div className="relative w-14 h-14 rounded-full bg-[#E9C8CE]/70 border-2 border-dashed border-[#55463F]/40 flex items-center justify-center text-[#55463F] shadow-xs mb-4">
          <Sparkles className="w-6 h-6 text-[#55463F]" />
        </div>

        {/* Closing Warm Words */}
        <p className="font-handwriting text-2xl sm:text-3xl text-[#2D1B0F] font-bold tracking-wide">
          Happy Birthday, {CELEBRANT_NAME}
        </p>

        <p className="font-serif italic text-sm sm:text-base text-[#55463F]/90 mt-1">
          Made with love & care, just for you.
        </p>

        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#55463F]/70 mt-3 font-semibold">
          Chapter One • 2026
        </p>

        {/* Back to top smooth button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FAF6F0] text-xs font-sans text-[#2D1B0F] font-medium border border-[#EBE3D7] shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#8B2635]" />
          <span>revisit the beginning</span>
        </button>
      </div>
    </footer>
  )
}
