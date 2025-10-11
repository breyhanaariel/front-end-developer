// src/components/CartWidgetLoader.tsx
import React, { useEffect } from 'react'

export default function CartWidgetLoader() {
  useEffect(() => {
    const src = '/widgets/svelte-cart.js'
    if (!(window as any).__auraCartLoaded) {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => { (window as any).__auraCartLoaded = true }
      document.body.appendChild(s)
    }
  }, [])

  return <div><aura-cart></aura-cart></div>
}