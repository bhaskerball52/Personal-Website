import { useEffect, useRef, useState } from 'react'

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="pt-8 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Projects
        </h2>
        
        <div
          className={`grid md:grid-cols-2 gap-6 max-w-5xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <a
            href="https://github.com/bhaskerball52/dark-matter-project"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-neutral-900/50 rounded-xl p-8 border border-neutral-700 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                Dark Matter in Galaxies
              </h3>
              <p className="text-neutral-400">
                Research project analyzing dark matter distribution and effects in galactic systems
              </p>
            </div>
          </a>

          <a
            href="https://hidden-universe-7ond.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-neutral-900/50 rounded-xl p-8 border border-neutral-700 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                Hidden Universe
              </h3>
              <p className="text-neutral-400">
                Stunning 3D simulations of deep space objects such as Dark Matter and Black Holes with hand motion detection and interactive controls
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}