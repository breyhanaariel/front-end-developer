// src/components/Footer.tsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-sm text-slate-600">
        © {new Date().getFullYear()} Aura & Ambiance — Portfolio demo
      </div>
    </footer>
  )
}