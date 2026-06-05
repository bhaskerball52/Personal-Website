import { useState, useEffect, useMemo } from 'react'

export default function Hero() {
  const roles = ['Researcher', 'Boy Scout', 'Athlete', 'Musician', 'Student']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const stars = useMemo(() => (
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      angle: Math.random() * 360,
      radius: 105 + Math.random() * 75,
      yOffset: (Math.random() - 0.5) * 110,
      size: 1 + Math.random() * 2.2,
      opacity: 0.45 + Math.random() * 0.55,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  ), [])

  const clouds = useMemo(() => ([
    { angle: 25,  radius: 55, color: '139, 92, 246', size: 230, blur: 55, opacity: 0.45 },
    { angle: 140, radius: 70, color: '59, 130, 246', size: 210, blur: 55, opacity: 0.4 },
    { angle: 250, radius: 50, color: '236, 72, 153', size: 190, blur: 50, opacity: 0.35 },
  ]), [])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const role = roles[currentRole]
    const speed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1))

        if (displayText === role) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1))

        if (displayText === '') {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <section className="flex items-start justify-center text-center px-6 pb-16 pt-32 relative">
      <div
        className="w-full max-w-4xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.85)',
          transition: 'opacity 900ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-16" style={{ fontWeight: 900 }}>
          Bhasker Vasudevan
        </h1>

        <div>
          {/* Galaxy + Profile Picture */}
          <div className="galaxy-wrapper">
            <div className="galaxy-bg-glow" />

            <div className="galaxy-orbit">
              {clouds.map((c, i) => (
                <div
                  key={`cloud-${i}`}
                  className="galaxy-cloud"
                  style={{
                    width: `${c.size}px`,
                    height: `${c.size}px`,
                    background: `radial-gradient(circle, rgba(${c.color}, ${c.opacity}), transparent 70%)`,
                    filter: `blur(${c.blur}px)`,
                    transform: `translate(-50%, -50%) rotateY(${c.angle}deg) translateZ(${c.radius}px)`,
                  }}
                />
              ))}
              {stars.map((s) => (
                <span
                  key={`star-${s.id}`}
                  className="galaxy-star"
                  style={{
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    opacity: s.opacity,
                    transform: `translate(-50%, -50%) rotateY(${s.angle}deg) translateZ(${s.radius}px) translateY(${s.yOffset}px)`,
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.duration}s`,
                  }}
                />
              ))}
            </div>

            <div className="profile-circle">
              <img
                src="/profile.jpg"
                alt="Bhasker Vasudevan"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 60%' }}
              />
            </div>
          </div>

          {/* Typing Animation */}
          <p className="text-xl text-neutral-400 mb-8 h-8">
            I am a <span className="text-blue-400">{displayText}</span>
            <span className="animate-blink">|</span>
          </p>

          {/* Bio */}
          <p className="text-neutral-300 max-w-2xl mx-auto text-base leading-relaxed mb-12">
            Bhasker is a sophomore at Homestead High School passionate about Astrophysics, Sports, and Music.
            He enjoys learning and conducting research on recent astrophysics topics, and exploring the hidden universe.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/bhaskerball52"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-400 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/bhasker-vasudevan-88247a338"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-400 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="mailto:bhaskerball52@gmail.com"
              className="text-neutral-400 hover:text-blue-400 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .galaxy-wrapper {
          position: relative;
          width: 360px;
          height: 360px;
          margin: 0 auto 2rem;
          perspective: 900px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .galaxy-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.28), transparent 65%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
        }

        .galaxy-orbit {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: galaxy-spin 14s linear infinite;
          animation-play-state: running;
          z-index: 1;
        }

        .galaxy-wrapper:hover .galaxy-orbit {
          animation-play-state: paused;
        }

        @keyframes galaxy-spin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }

        .galaxy-cloud {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        .galaxy-star {
          position: absolute;
          top: 50%;
          left: 50%;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 10px rgba(190, 210, 255, 0.4);
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: filter;
        }

        @keyframes twinkle {
          0%, 100% { filter: brightness(0.55); }
          50%      { filter: brightness(1.4); }
        }

        .profile-circle {
          position: relative;
          z-index: 5;
          width: 10rem;
          height: 10rem;
          border-radius: 9999px;
          background-color: rgb(38, 38, 38);
          border: 4px solid rgba(59, 130, 246, 0.3);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 700ms ease-out, box-shadow 700ms ease-out;
        }

        .galaxy-wrapper:hover .profile-circle {
          border-color: rgb(96, 165, 250);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.45);
        }
      `}</style>
    </section>
  )
}
