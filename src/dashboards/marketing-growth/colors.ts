import type { Channel } from './data'

// Categorical palette, validated for colorblind separation and contrast
// (light: on white, dark: on the dark card). Order is fixed per channel,
// so a channel keeps its color when filters change. "Other" is neutral gray.
export const SERIES: Record<'light' | 'dark', Record<Channel, string>> = {
  light: { 'Paid Search': '#2a78d6', 'Paid Social': '#eb6834', Organic: '#1baf7a', Other: '#9aa1b2' },
  dark: { 'Paid Search': '#3987e5', 'Paid Social': '#d95926', Organic: '#199e70', Other: '#7c88a3' },
}
