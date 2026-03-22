export interface Feature {
  title: string
  description: string
  iconName: 'sparkle' | 'audio' | 'palette' | 'bot' | 'child' | 'book'
}

export const features: Feature[] = [
  {
    title: 'Creacion con IA',
    description: 'Historias generadas por inteligencia artificial, adaptadas a los intereses y preferencias de cada nino.',
    iconName: 'sparkle',
  },
  {
    title: 'Narracion de audio',
    description: 'Cada escena incluye narracion de audio profesional para una experiencia de lectura inmersiva.',
    iconName: 'audio',
  },
  {
    title: 'Ilustraciones hermosas',
    description: '7 estilos de ilustracion unicos: acuarela, 3D, anime, y mas. Cada cuento cobra vida visualmente.',
    iconName: 'palette',
  },
  {
    title: 'Asistente T.A.I.L.E.R.',
    description: 'Un asistente de lectura con IA que acompana a los ninos, responde preguntas y fomenta la comprension.',
    iconName: 'bot',
  },
  {
    title: 'Personalizado por edad',
    description: 'Contenido adaptado para ninos de 2 a 6 anos, con 3 niveles de desarrollo diferentes.',
    iconName: 'child',
  },
  {
    title: 'Descubre y colecciona',
    description: 'Explora cuentos de la comunidad y construye tu propia biblioteca de historias favoritas.',
    iconName: 'book',
  },
]
