interface EdgeItem {
  src: string
  alt: string
  flipX?: boolean
  widthClass: string
  rotateClass?: string
}

const BASE_LEFT_CYCLE: EdgeItem[] = [
  {
    src: '/images/stickers/edge-pressed-flowers.png',
    alt: 'Pressed coral flowers',
    widthClass: 'w-24 sm:w-36 md:w-48 lg:w-56',
    rotateClass: 'rotate-[1deg]',
  },
  {
    src: '/images/stickers/edge-iloveyou.png',
    alt: 'i love you ribbon',
    widthClass: 'w-22 sm:w-34 md:w-44 lg:w-50',
    rotateClass: 'rotate-[-2deg]',
  },
  {
    src: '/images/stickers/edge-lilies.png',
    alt: 'Pink lilies border',
    flipX: true,
    widthClass: 'w-26 sm:w-40 md:w-52 lg:w-60',
    rotateClass: 'rotate-[0.5deg]',
  },
  {
    src: '/images/stickers/edge-disco.png',
    alt: 'Disco balls column',
    flipX: true,
    widthClass: 'w-20 sm:w-32 md:w-42 lg:w-46',
    rotateClass: 'rotate-[-1deg]',
  },
]

const BASE_RIGHT_CYCLE: EdgeItem[] = [
  {
    src: '/images/stickers/edge-disco.png',
    alt: 'Disco balls column',
    widthClass: 'w-20 sm:w-32 md:w-42 lg:w-46',
    rotateClass: 'rotate-[1deg]',
  },
  {
    src: '/images/stickers/edge-lilies.png',
    alt: 'Pink lilies border',
    widthClass: 'w-26 sm:w-40 md:w-52 lg:w-60',
    rotateClass: 'rotate-[-0.5deg]',
  },
  {
    src: '/images/stickers/edge-iloveyou.png',
    alt: 'i love you ribbon',
    widthClass: 'w-22 sm:w-34 md:w-44 lg:w-50',
    rotateClass: 'rotate-[2deg]',
  },
  {
    src: '/images/stickers/edge-pressed-flowers.png',
    alt: 'Pressed coral flowers',
    flipX: true,
    widthClass: 'w-24 sm:w-36 md:w-48 lg:w-56',
    rotateClass: 'rotate-[-1deg]',
  },
]

// 10 repetitions = 40 items per edge, providing unbroken, dense coverage for up to ~8000px height
const REPETITION_COUNT = 10

const ALL_LEFT_ITEMS = Array.from({ length: REPETITION_COUNT }, () => BASE_LEFT_CYCLE).flat()
const ALL_RIGHT_ITEMS = Array.from({ length: REPETITION_COUNT }, () => BASE_RIGHT_CYCLE).flat()

export function ContinuousEdgeBorders() {
  return (
    <div
      className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 
        LEFT EDGE CONTINUOUS COLUMN
        Starts right below the elongated dark brown fade gradient (top-72 sm:top-[380px] md:top-[460px]) and flows all the way to the bottom
      */}
      <div className="absolute top-72 sm:top-[380px] md:top-[460px] bottom-0 left-0 flex flex-col items-start justify-start w-28 sm:w-44 md:w-56 lg:w-64">
        {ALL_LEFT_ITEMS.map((item, idx) => (
          <div
            key={`left-border-${idx}`}
            className={`relative ${item.widthClass} ${idx > 0 ? '-mt-6 sm:-mt-10 md:-mt-14' : ''} ${
              item.rotateClass || ''
            } ${item.flipX ? 'scale-x-[-1]' : ''} opacity-95 transition-transform`}
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-auto filter drop-shadow-md"
            />
          </div>
        ))}
      </div>

      {/* 
        RIGHT EDGE CONTINUOUS COLUMN
        Starts right below the elongated dark brown fade gradient (top-72 sm:top-[380px] md:top-[460px]) and flows all the way to the bottom
      */}
      <div className="absolute top-72 sm:top-[380px] md:top-[460px] bottom-0 right-0 flex flex-col items-end justify-start w-28 sm:w-44 md:w-56 lg:w-64">
        {ALL_RIGHT_ITEMS.map((item, idx) => (
          <div
            key={`right-border-${idx}`}
            className={`relative ${item.widthClass} ${idx > 0 ? '-mt-6 sm:-mt-10 md:-mt-14' : ''} ${
              item.rotateClass || ''
            } ${item.flipX ? 'scale-x-[-1]' : ''} opacity-95 transition-transform`}
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-auto filter drop-shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
