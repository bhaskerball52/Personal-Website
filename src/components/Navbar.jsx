export default function Navbar() {
  return (
  <nav className="fixed top-0 w-full z-50 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
  <div className="max-w-5xl mx-auto flex justify-between px-6 py-4 text-sm">
  <span className="font-semibold">BV</span>
  <div className="flex gap-6 text-neutral-400">
  <a href="#about" className="hover:text-white">about</a>
  <a href="#projects" className="hover:text-white">projects</a>
  <a href="#contact" className="hover:text-white">contact</a>
  </div>
  </div>
  </nav>
  )
  }