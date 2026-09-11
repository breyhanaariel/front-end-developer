import { describe, expect, it } from 'vitest'
import { clampIllumination, moonPhaseSymbol } from './astronomy'

describe('astronomy helpers', () => {
  it('clamps illumination to a percentage', () => {
    expect(clampIllumination(104)).toBe(100)
    expect(clampIllumination(-3)).toBe(0)
    expect(clampIllumination(42.6)).toBe(43)
  })

  it('maps known moon phases to symbols', () => {
    expect(moonPhaseSymbol('Full Moon')).toBe('🌕')
    expect(moonPhaseSymbol('Unknown')).toBe('🌙')
  })
})
