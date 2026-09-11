import type { BeautyTip, WeatherData } from '../types'

export function buildBeautyTip(weather: WeatherData): BeautyTip {
  const focus: string[] = []

  if (weather.uv >= 6) focus.push('high-SPF base')
  else focus.push('daily SPF')

  if (weather.humidity >= 70) focus.push('light layers', 'humidity-resistant finish')
  else if (weather.humidity <= 35) focus.push('hydrating prep', 'cream textures')
  else focus.push('balanced skin prep')

  if (weather.tempC >= 29) focus.push('long-wear complexion')
  if (weather.tempC <= 10) focus.push('barrier-supporting moisturizer')

  const condition = weather.condition.toLowerCase()
  if (condition.includes('rain') || condition.includes('drizzle')) {
    focus.push('water-resistant eye makeup')
  }

  return {
    title:
      weather.humidity >= 70
        ? 'Keep it light and locked in'
        : weather.humidity <= 35
          ? 'Layer hydration before color'
          : 'Balanced-weather beauty day',
    summary:
      'For ' +
      weather.location +
      ', prioritize ' +
      focus.slice(0, 3).join(', ') +
      '. Adjust to your skin type and comfort.',
    focus
  }
}
