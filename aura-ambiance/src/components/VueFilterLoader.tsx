// src/components/VueFilterLoader.tsx
import React, { useEffect } from 'react'

export default function VueFilterLoader() {
  useEffect(() => {
    const src = '/widgets/vue-filter.js'
    if (!(window as any).__auraVueFilterLoaded) {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => { (window as any).__auraVueFilterLoaded = true }
      document.body.appendChild(s)
    }
  }, [])

  return <div><aura-filter></aura-filter></div>
}