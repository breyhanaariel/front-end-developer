import { describe, expect, it } from 'vitest'
import { buildBeautyTip } from './recommendations'
import type { WeatherData } from '../types'

function weather(overrides: Partial<WeatherData> = {}): WeatherData {
  return {
    location: 'Orlando',
    region: 'Florida',
    country: 'United States',
    tempC: 30,
    feelsLikeC: 32,
    humidity: 78,
    uv: 7,
    windKph: 8,
    condition: 'Sunny',
    icon: '',
    ...overrides
  }
}

describe('buildBeautyTip', () => {
  it('recommends SPF and light layers in hot humid weather', () => {
    const tip = buildBeautyTip(weather())
    expect(tip.focus).toContain('high-SPF base')
    expect(tip.focus).toContain('light layers')
    expect(tip.focus).toContain('long-wear complexion')
  })

  it('adds hydration for dry weather', () => {
    const tip = buildBeautyTip(weather({ humidity: 25, tempC: 18, uv: 2 }))
    expect(tip.focus).toContain('hydrating prep')
    expect(tip.focus).toContain('daily SPF')
  })
})
