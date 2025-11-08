// src/components/NavBar.tsx
export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10 text-white">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
        <a href="#home" className="font-semibold">JPV</a>
        <a href="#links" className="text-white/80 hover:text-white">Links</a>
        <a href="#about" className="text-white/80 hover:text-white">Sobre mí</a>
        <a href="#projects" className="text-white/80 hover:text-white">Proyectos</a>
        <a href="#contact" className="ml-auto rounded bg-cyan-400/90 text-black px-3 py-1.5 hover:bg-cyan-300">
          Contacto
        </a>
      </nav>
    </header>
  );
}
