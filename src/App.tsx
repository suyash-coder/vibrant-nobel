import { CinematicOpening } from './components/CinematicOpening'
import { BirthdayNote } from './components/BirthdayNote'
import { PhotoScrapbook } from './components/PhotoScrapbook'
import { ContinuousEdgeBorders } from './components/ContinuousEdgeBorders'

export function App() {
  return (
    <main className="relative w-full min-h-screen bg-black text-[#55463F] overflow-x-clip selection:bg-[#E9C8CE] selection:text-[#55463F]">
      {/* STAGE 1: CINEMATIC OPENING (Completely dark, no edge borders) */}
      <CinematicOpening />

      {/* 
        STAGES 2 & 3: THE SCRAPBOOK WORLD AFTER THE NOTE
        Both edges are fully covered from top to bottom by ContinuousEdgeBorders
      */}
      <div
        className="relative w-full bg-[#C6A584] overflow-hidden"
        style={{
          backgroundImage: "url('/images/scrapbook-bg.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '420px auto',
        }}
      >
        <ContinuousEdgeBorders />

        {/* STAGE 2: PERSONAL BIRTHDAY MESSAGE */}
        <BirthdayNote />

        {/* STAGE 3: PINTEREST PHOTO SCRAPBOOK */}
        <PhotoScrapbook />
      </div>
    </main>
  )
}

export default App
