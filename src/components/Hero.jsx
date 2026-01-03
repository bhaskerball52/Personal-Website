import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const roles = ['Athlete', 'Boy Scout', 'Researcher', 'Musician', 'Student']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const scrollAccumulator = useRef(0)
  const isAnimating = useRef(true)

  const name = "Bhasker Vasudevan"
  const letters = name.split('')

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating.current) {
        e.preventDefault()
        
        // Accumulate scroll with sensitivity adjustment
        scrollAccumulator.current += e.deltaY * 0.8
        
        // Clamp between 0 and max (allows scrolling backwards)
        scrollAccumulator.current = Math.max(0, Math.min(scrollAccumulator.current, 2000))
        
        // Convert to progress (0-1)
        const progress = scrollAccumulator.current / 2000
        setAnimationProgress(progress)
        
        // Animation completes at 100%
        if (progress >= 0.99) {
          isAnimating.current = false
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  useEffect(() => {
    if (animationProgress < 0.9) return

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
  }, [displayText, isDeleting, currentRole, roles, animationProgress])

  const getLetterStyle = (index) => {
    const isSpace = letters[index] === ' '
    const totalLetters = letters.filter(l => l !== ' ').length
    const letterIndex = letters.slice(0, index).filter(l => l !== ' ').length
    
    // Each letter gets a slight delay
    const letterDelay = letterIndex * 0.02
    const adjustedProgress = Math.max(0, Math.min(1, (animationProgress - letterDelay) * 1.2))
    
    // Start position - scattered around screen
    const angle = (letterIndex / totalLetters) * 360
    const distance = 1000
    const startX = Math.cos(angle * Math.PI / 180) * distance
    const startY = Math.sin(angle * Math.PI / 180) * distance
    const startZ = -500 + (Math.sin(letterIndex * 7.89) * 800)
    
    // Ultra smooth easing function (ease-in-out-cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    const easedProgress = easeInOutCubic(adjustedProgress)
    
    // Phase 1: Flying in and getting huge (0-0.5)
    const flyProgress = Math.min(easedProgress / 0.5, 1)
    const currentX = startX * (1 - flyProgress)
    const currentY = startY * (1 - flyProgress)
    const currentZ = startZ * (1 - flyProgress)
    
    // Phase 2: Shrinking to normal (0.5-1.0)
    const shrinkProgress = Math.max(0, (easedProgress - 0.5) / 0.5)
    
    // Scale progression: 0.2 -> 5 -> 1
    let scale
    if (easedProgress < 0.5) {
      scale = 0.2 + (4.8 * flyProgress) // 0.2 to 5
    } else {
      scale = 5 - (4 * shrinkProgress) // 5 to 1
    }
    
    // Smoother rotation with easing
    const rotation = 720 * (1 - easeInOutCubic(flyProgress))
    
    // Opacity - make fully opaque very early
    const opacity = easedProgress < 0.15 ? easedProgress * 6.67 : 1
    
    // Glow effect
    const glowIntensity = flyProgress * (1 - shrinkProgress)
    
    return {
      transform: `
        translate3d(${currentX}px, ${currentY}px, ${currentZ}px)
        rotateX(${rotation}deg)
        rotateY(${rotation * 1.2}deg)
        rotateZ(${rotation * 0.8}deg)
        scale(${scale})
      `,
      opacity: opacity,
      display: isSpace ? 'inline-block' : 'inline-block',
      width: isSpace ? '0.5em' : 'auto',
      zIndex: Math.round(1000 + currentZ),
      textShadow: glowIntensity > 0 ? `
        0 0 20px rgba(59, 130, 246, ${glowIntensity * 0.8}),
        0 0 40px rgba(139, 92, 246, ${glowIntensity * 0.6}),
        0 0 60px rgba(236, 72, 153, ${glowIntensity * 0.4}),
        3px 3px 8px rgba(0, 0, 0, 1),
        -2px -2px 4px rgba(139, 92, 246, 0.5),
        2px 2px 4px rgba(59, 130, 246, 0.5)
      ` : `
        3px 3px 8px rgba(0, 0, 0, 0.8),
        -2px -2px 4px rgba(139, 92, 246, 0.4),
        2px 2px 4px rgba(59, 130, 246, 0.4)
      `,
      filter: glowIntensity > 0.3 ? `brightness(${1 + glowIntensity * 0.5}) contrast(1.1)` : 'brightness(1.1) contrast(1.05)',
      transition: 'none',
      WebkitFontSmoothing: 'subpixel-antialiased',
      MozOsxFontSmoothing: 'auto',
      fontWeight: '900',
      textRendering: 'optimizeSpeed',
      imageRendering: 'pixelated',
      WebkitTransform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateX(${rotation}deg) rotateY(${rotation * 1.2}deg) rotateZ(${rotation * 0.8}deg) scale(${scale})`
    }
  }

  const contentOpacity = animationProgress > 0.85 ? (animationProgress - 0.85) / 0.15 : 0

  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pb-64 relative">
      <div className="w-full max-w-4xl">
        {/* 3D Name Animation */}
        <div 
          className="perspective-container mb-8"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 50%',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold preserve-3d" style={{ fontWeight: 900, position: 'relative' }}>
            {letters.map((letter, index) => (
              <span
                key={index}
                className="inline-block letter-3d"
                style={getLetterStyle(index)}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Rest of content */}
        <div 
          style={{
            opacity: contentOpacity,
            transform: `scale(${0.9 + contentOpacity * 0.1})`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            pointerEvents: animationProgress > 0.9 ? 'auto' : 'none'
          }}
        >
          {/* Profile Picture */}
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-neutral-800 border-4 border-blue-500/30 overflow-hidden group cursor-pointer transition-all duration-700 ease-out hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/40">
            <img 
              src="/profile.jpg" 
              alt="Bhasker Vasudevan"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 60%' }}
            />
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

        {/* Progress indicator */}
        {animationProgress < 0.99 && animationProgress > 0.01 && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 opacity-70">
            <p className="text-neutral-400 text-sm mb-2">
              {Math.round(animationProgress * 100)}%
            </p>
            <div className="w-32 h-1 bg-neutral-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-100"
                style={{ width: `${animationProgress * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Initial scroll hint */}
        {animationProgress <= 0.01 && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 opacity-70">
            <p className="text-neutral-400 text-sm mb-2">Scroll to begin</p>
            <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .letter-3d {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-font-smoothing: subpixel-antialiased;
          -moz-osx-font-smoothing: auto;
          paint-order: stroke fill;
          isolation: isolate;
          image-rendering: -webkit-optimize-contrast;
          text-rendering: optimizeSpeed;
        }
        
        /* GPU acceleration for smoother animations */
        .perspective-container {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          image-rendering: -webkit-optimize-contrast;
        }
        
        h1 {
          image-rendering: -webkit-optimize-contrast;
          text-rendering: optimizeSpeed;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  )
}