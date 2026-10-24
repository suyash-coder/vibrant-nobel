import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  alpha: number
  alphaSpeed: number
}

interface AmbientParticlesProps {
  count?: number
  mode?: 'dark' | 'paper'
}

export function AmbientParticles({ count = 28, mode = 'dark' }: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize)

    // Palette: warm amber, soft gold, champagne
    const darkColors = ['#F7D070', '#FFAE42', '#FFE4A0', '#E9C8CE', '#FFFFFF']
    const paperColors = ['#E9C8CE', '#A8B7A0', '#E9D59C', '#C9B8AE']

    const colors = mode === 'dark' ? darkColors : paperColors

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.3,
      vy: mode === 'dark' ? -(Math.random() * 0.4 + 0.15) : Math.random() * 0.3 + 0.1, // embers float up, petals float down
      alpha: Math.random() * 0.7 + 0.2,
      alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.alpha += p.alphaSpeed

        if (p.alpha <= 0.15 || p.alpha >= 0.85) {
          p.alphaSpeed = -p.alphaSpeed
        }

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        } else if (p.y > height + 10) {
          p.y = -10
          p.x = Math.random() * width
        }

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = mode === 'dark' ? 6 : 2
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [count, mode])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}
