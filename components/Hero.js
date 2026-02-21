import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headline = 'WELCOME ITZ FIZZ'
const letters = headline.split('')
const stats = [
  { value: '92%', label: 'Engagement' },
  { value: '78%', label: 'Satisfaction' },
  { value: '64%', label: 'Conversion' },
]

export default function Hero() {
  const heroRef = useRef()
  const lettersRef = useRef([])
  const statsRef = useRef([])
  const graphicRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(
        lettersRef.current,
        {
          y: 24,
          opacity: 0,
          stagger: 0.03,
          ease: 'power3.out',
          duration: 0.6,
        },
        0
      )

      tl.from(
        statsRef.current,
        {
          y: 12,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.25
      )

      // Scroll-driven graphic motion
      gsap.to(graphicRef.current, {
        yPercent: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top+=200',
          scrub: 0.6,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-widest mb-6">
            <div className="flex flex-wrap" aria-hidden>
              {letters.map((ch, idx) => (
                <span
                  key={idx}
                  ref={(el) => (lettersRef.current[idx] = el)}
                  className="inline-block mr-2 opacity-0 transform"
                  style={{ letterSpacing: '0.8rem' }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </h1>

          <div className="flex gap-6 mt-6">
            {stats.map((s, i) => (
              <div key={i} ref={(el) => (statsRef.current[i] = el)} className="bg-white/80 backdrop-blur px-4 py-3 rounded shadow">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <div ref={graphicRef} className="w-64 h-64 md:w-96 md:h-96 rounded-xl shadow-2xl bg-gradient-to-br from-indigo-400 to-pink-400 transform">
            {/* Decorative SVG inside for visual */}
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" rx="18" fill="url(#g)" />
              <g transform="translate(20,20)">
                <circle cx="60" cy="60" r="40" fill="rgba(255,255,255,0.12)" />
                <circle cx="110" cy="90" r="25" fill="rgba(255,255,255,0.08)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
