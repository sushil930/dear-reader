import { DiaryEntry } from '../entries';

export const entry: DiaryEntry = {
  id: "1",
  slug: "the-noise-outside",
  title: {
    en: "The Noise Outside",
    es: "El Ruido Afuera"
  },
  date: "June 25, 2025",
  mood: "Reflective",
  readTime: "4 min read",
  excerpt: {
    en: "Sometimes the world feels too loud, and I wonder if the noise is outside or within...",
    es: "A veces el mundo se siente demasiado ruidoso, y me pregunto si el ruido está afuera o adentro..."
  },
  content: {
    en: `Sometimes the world feels too loud, and I wonder if the noise is outside or within me. Today I sat by the window, watching people rush past on the sidewalk below, each carrying their own invisible weight.

There's something profound about observing life from a distance. The businessman checking his phone three times in thirty seconds. The mother adjusting her child's backpack with infinite patience. The elderly man feeding pigeons, moving with the deliberate care of someone who has learned that rushing rarely leads anywhere meaningful.

I've been thinking about the concept of noise lately—not just the audible kind, but the mental static that accompanies modern existence. The constant hum of notifications, expectations, and the endless chatter of our inner critics. When did silence become so rare?`,
    es: `A veces el mundo se siente demasiado ruidoso, y me pregunto si el ruido está afuera o dentro de mí. Hoy me senté junto a la ventana, observando a la gente pasar apresuradamente por la acera, cada uno cargando su propio peso invisible.

Hay algo profundo en observar la vida desde la distancia. El hombre de negocios revisando su teléfono tres veces`
  },
  tags: ["Mindfulness", "Modern Life", "Reflection"],
  wordCount: 450,
  isPublished: true,
  createdAt: "2025-06-25T14:00:00Z",
  updatedAt: "2025-06-25T14:00:00Z"
};
