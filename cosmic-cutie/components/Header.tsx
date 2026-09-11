export default function Header() {
  return (
    <header className="border-b border-white/10 bg-cosmic-night text-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <a href="/" className="text-xl font-bold text-pink-300">Cosmic Cutie</a>
        <nav aria-label="Primary navigation" className="flex gap-4 text-sm text-indigo-100/80">
          <a className="hover:text-white" href="#dashboard">Dashboard</a>
          <a className="hover:text-white" href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">Data source</a>
        </nav>
      </div>
    </header>
  )
}
