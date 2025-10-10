import React from 'react'

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Glamour Forecast</h1>
        <nav>
          <a className="mr-4 text-slate-600 hover:underline" href="#weather">Weather</a>
          <a className="mr-4 text-slate-600 hover:underline" href="#products">Products</a>
          <a className="text-slate-600 hover:underline" href="#tips">Beauty Tips</a>
        </nav>
      </div>
    </header>
  )
}
