export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl font-bold hover:text-blue-400 transition-colors duration-300"
        >
          BV
        </a>
        <div className="flex gap-8">
          <a 
            href="#projects" 
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}