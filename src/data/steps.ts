export interface Step {
  title: string
  description: string
  image: string
}

export const steps: Step[] = [
  {
    title: 'Elige un tema',
    description: 'Selecciona el tema que mas le guste a tu pequeno: animales, aventuras, fantasia y mas.',
    image: '/assets/images/thoughtful_tailer.png',
  },
  {
    title: 'Personaliza tu cuento',
    description: 'Ajusta el nombre del protagonista, la edad y el estilo de ilustracion que prefieras.',
    image: '/assets/images/ok_tailer.png',
  },
  {
    title: 'La IA genera tu cuento',
    description: 'Nuestra inteligencia artificial crea una historia unica con texto, ilustraciones y audio.',
    image: '/assets/images/waiting_tailer.png',
  },
  {
    title: 'Lee y escucha',
    description: 'Disfruta del cuento con narracion de audio, ilustraciones hermosas y el asistente T.A.I.L.E.R.',
    image: '/assets/images/very_happy_tailer.png',
  },
]
