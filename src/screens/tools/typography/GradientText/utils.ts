export const gradientPresets = [
  {
    name: "Sunset",
    stops: [
      { color: "#ff7e5f", position: 0 },
      { color: "#feb47b", position: 100 }
    ],
    direction: 45
  },
  {
    name: "Ocean",
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 }
    ],
    direction: 90
  },
  {
    name: "Aurora",
    stops: [
      { color: "#a8edea", position: 0 },
      { color: "#fed6e3", position: 50 },
      { color: "#d299c2", position: 100 }
    ],
    direction: 135
  },
  {
    name: "Fire",
    stops: [
      { color: "#ff9a9e", position: 0 },
      { color: "#fecfef", position: 50 },
      { color: "#fecfef", position: 100 }
    ],
    direction: 0
  },
  {
    name: "Cosmic",
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 25 },
      { color: "#f093fb", position: 75 },
      { color: "#f5576c", position: 100 }
    ],
    direction: 225
  },
  {
    name: "Emerald",
    stops: [
      { color: "#11998e", position: 0 },
      { color: "#38ef7d", position: 100 }
    ],
    direction: 180
  }
];

export const fontFamilies: string[] = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Poppins',
  'Playfair Display',
  'Oswald',
  'Raleway',
  'Merriweather',
  'Dancing Script'
];

export const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' }
];

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}