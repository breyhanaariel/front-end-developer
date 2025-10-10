// src/components/Header.tsx
import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full py-6 px-4 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/"><a className="text-2xl font-bold text-aura-500">Aura & Ambiance</a></Link>
        <nav className="text-sm text-slate-600">
          <Link href="/"><a className="mr-4 hover:underline">Shop</a></Link>
          <a className="mr-4 hover:underline" href="#about">About</a>
          <a className="hover:underline" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}