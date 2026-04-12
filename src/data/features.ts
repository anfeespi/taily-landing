export interface Feature {
  title: string
  description: string
  iconName: 'sparkle' | 'audio' | 'palette' | 'bot' | 'child' | 'book'
}

export const features: Feature[] = [
  {
    title: 'Creación con IA',
    description: 'Historias generadas por inteligencia artificial, adaptadas a los intereses y preferencias de cada niño.',
    iconName: 'sparkle',
  },
  {
    title: 'Narración de audio',
    description: 'Cada escena incluye narración de audio profesional para una experiencia de lectura inmersiva.',
    iconName: 'audio',
  },
  {
    title: 'Ilustraciones hermosas',
    description: '7 estilos de ilustración únicos: acuarela, 3D, anime y más. Cada cuento cobra vida visualmente.',
    iconName: 'palette',
  },
  {
    title: 'Asistente T.A.I.L.E.R.',
    description: 'Un asistente de lectura con IA que acompaña a los niños, responde preguntas y fomenta la comprensión.',
    iconName: 'bot',
  },
  {
    title: 'Personalizado por edad',
    description: 'Contenido adaptado para niños de 2 a 6 años, con 3 niveles de desarrollo diferentes.',
    iconName: 'child',
  },
  {
    title: 'Descubre y colecciona',
    description: 'Explora cuentos de la comunidad y construye tu propia biblioteca de historias favoritas.',
    iconName: 'book',
  },
]
