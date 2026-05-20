import { useEffect, useRef, useState } from 'react'

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const skills = [
    { name: 'Astronomy', color: 'blue' },
    { name: 'Differential Calculus', color: 'purple' },
    { name: 'Integral Calculus', color: 'pink' },
    { name: 'Classical Mechanics', color: 'indigo' },
    { name: 'Java', color: 'blue' },
    { name: 'Python', color: 'purple' }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'hover:bg-blue-500/20 hover:shadow-blue-500/50',
      purple: 'hover:bg-purple-500/20 hover:shadow-purple-500/50',
      pink: 'hover:bg-pink-500/20 hover:shadow-pink-500/50',
      indigo: 'hover:bg-indigo-500/20 hover:shadow-indigo-500/50'
    }
    return colors[color]
  }

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
    <section ref={sectionRef} id="skills" className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Skills
        </h2>
        
        <div 
          className={`flex flex-wrap gap-4 justify-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`px-6 py-3 rounded-full bg-neutral-800/50 border border-neutral-700 
                transition-all duration-300 cursor-default
                hover:border-transparent hover:shadow-2xl hover:scale-110
                ${getColorClasses(skill.color)}`}
            >
              <span className="text-lg font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}