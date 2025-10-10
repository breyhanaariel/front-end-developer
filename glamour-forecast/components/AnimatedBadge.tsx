// (A small animated UI micro-widget — easily replaced by Svelte components later)

import React from 'react'

export default function AnimatedBadge({ text = 'Beauty Tip' }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-300 to-pink-500 text-white px-3 py-1 rounded-full shadow-md animate-pulse">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l2.9 6.3L21 9l-4.8 3.3L17.8 21 12 17.7 6.2 21l1.6-8.7L3 9l6.1-0.7L12 2z" fill="currentColor" />
      </svg>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
