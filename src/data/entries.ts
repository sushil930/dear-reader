
export interface DiaryEntry {
  id: string;
  slug: string;
  title: string;
  date: string;
  mood: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  wordCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const sampleEntries: DiaryEntry[] = [
  {
    id: "1",
    slug: "the-noise-outside",
    title: "The Noise Outside",
    date: "June 25, 2025",
    mood: "Reflective",
    readTime: "4 min read",
    excerpt: "Sometimes the world feels too loud, and I wonder if the noise is outside or within...",
    content: `Sometimes the world feels too loud, and I wonder if the noise is outside or within me. Today I sat by the window, watching people rush past on the sidewalk below, each carrying their own invisible weight.

There's something profound about observing life from a distance. The businessman checking his phone three times in thirty seconds. The mother adjusting her child's backpack with infinite patience. The elderly man feeding pigeons, moving with the deliberate care of someone who has learned that rushing rarely leads anywhere meaningful.

I've been thinking about the concept of noise lately—not just the audible kind, but the mental static that accompanies modern existence. The constant hum of notifications, expectations, and the endless chatter of our inner critics. When did silence become so rare?

In psychology, they call it "cognitive load"—the amount of mental effort being used in working memory. But I think there's something more poetic at play here. We've become afraid of quiet spaces, of the gaps between thoughts where we might actually encounter ourselves.

The irony is that in trying to fill every moment with stimulation, we've created a different kind of emptiness. A hollow fullness, if such a thing exists. We're overstimulated yet undernourished, constantly consuming yet never quite satisfied.

Today, I practiced sitting with the discomfort of silence. No music, no podcast, no mental to-do list. Just me and the space between one breath and the next. It was terrifying and beautiful in equal measure.

Perhaps the noise outside is just a reflection of the noise within. And maybe, just maybe, learning to quiet one will help silence the other.`,
    tags: ["Psychology", "Mindfulness", "Self-Reflection", "Modern Life"],
    wordCount: 267,
    isPublished: true,
    createdAt: "2025-06-25T10:30:00Z",
    updatedAt: "2025-06-25T10:30:00Z"
  },
  {
    id: "2",
    slug: "on-feeling-everything",
    title: "On Feeling Everything",
    date: "June 22, 2025",
    mood: "Nostalgic",
    readTime: "6 min read",
    excerpt: "There's a particular ache that comes with feeling too much, too often...",
    content: `There's a particular ache that comes with feeling too much, too often. It's not quite sadness, not quite joy—it's the weight of being fully human in a world that often rewards numbness.

I've always been what people call "sensitive." As a child, I cried at commercials featuring lonely animals. I felt the mood of every room I entered. I absorbed the emotions of others like a sponge, often forgetting where they ended and I began.

For years, I saw this as a weakness. In a culture that prizes emotional regulation and "keeping it together," feeling everything seemed like a design flaw. But I'm beginning to understand that perhaps it's actually a superpower disguised as a burden.

The highly sensitive among us are the canaries in the coal mine of human experience. We feel the shifts before they become visible. We notice the micro-expressions, the subtle changes in energy, the unspoken truths that hover in the space between words.

But with great sensitivity comes great responsibility. Learning to distinguish between what's ours and what belongs to others. Developing boundaries that protect without isolating. Finding ways to honor our emotional reality without drowning in it.

I'm learning that feeling everything doesn't mean I have to fix everything. That witnessing suffering doesn't require me to absorb it. That compassion can exist without losing myself in the process.

Today I choose to see my sensitivity not as a burden to overcome, but as a gift to be stewarded wisely.`,
    tags: ["Emotional Intelligence", "Sensitivity", "Self-Acceptance", "Boundaries"],
    wordCount: 245,
    isPublished: true,
    createdAt: "2025-06-22T14:15:00Z",
    updatedAt: "2025-06-22T14:15:00Z"
  },
  {
    id: "3",
    slug: "the-space-between-thoughts",
    title: "The Space Between Thoughts",
    date: "June 20, 2025",
    mood: "Still",
    readTime: "3 min read",
    excerpt: "In the quiet moments between one thought and the next, I found something unexpected...",
    content: `In the quiet moments between one thought and the next, I found something unexpected: peace.

It's easy to get caught up in the narrative our minds create. The endless story of who we are, what we need, where we're going wrong. But in meditation today, I discovered these gaps—tiny spaces of pure awareness that exist between the mental chatter.

These moments are like clearings in a dense forest of thought. Brief openings where the sky becomes visible, where we remember that we are not our thoughts but the space in which they arise.

The mystics have written about this for centuries, but experiencing it firsthand is entirely different. It's not dramatic or earth-shattering. It's simply... quiet. A gentle recognition that beneath all the mental noise, something vast and peaceful already exists.

I'm beginning to understand that meditation isn't about stopping thoughts—it's about recognizing the spaces between them. These gaps have always been there, waiting patiently for us to notice.

What strikes me most is how natural this feels. As if I'm not learning something new but remembering something I've always known. Coming home to a part of myself that never left.

In a world obsessed with doing, perhaps the most radical act is simply being. Existing in the space between thoughts, where all possibilities live.`,
    tags: ["Meditation", "Mindfulness", "Consciousness", "Inner Peace"],
    wordCount: 210,
    isPublished: true,
    createdAt: "2025-06-20T09:45:00Z",
    updatedAt: "2025-06-20T09:45:00Z"
  }
];

export const getEntryBySlug = (slug: string): DiaryEntry | undefined => {
  return sampleEntries.find(entry => entry.slug === slug);
};

export const getRelatedEntries = (currentEntry: DiaryEntry, limit: number = 2): DiaryEntry[] => {
  return sampleEntries
    .filter(entry => entry.id !== currentEntry.id)
    .slice(0, limit);
};
