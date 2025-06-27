
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
  imageUrl?: string; // Optional image URL for the entry
}

export const sampleEntries: DiaryEntry[] = [
  {
    "id": "1",
    "slug": "the-noise-outside",
    "title": "The Noise Outside",
    "date": "June 25, 2025",
    "mood": "Reflective",
    "readTime": "4 min read",
    "excerpt": "Sometimes the world feels too loud, and I wonder if the noise is outside or within...",
    "content": `Sometimes the world feels too loud, and I wonder if the noise is outside or within me. Today I sat by the window, watching people rush past on the sidewalk below, each carrying their own invisible weight.\n\nThere's something profound about observing life from a distance. The businessman checking his phone three times in thirty seconds. The mother adjusting her child's backpack with infinite patience. The elderly man feeding pigeons, moving with the deliberate care of someone who has learned that rushing rarely leads anywhere meaningful.\n\nI've been thinking about the concept of noise lately—not just the audible kind, but the mental static that accompanies modern existence. The constant hum of notifications, expectations, and the endless chatter of our inner critics. When did silence become so rare?\n\nIn psychology, they call it \"cognitive load\"—the amount of mental effort being used in working memory. But I think there's something more poetic at play here. We've become afraid of quiet spaces, of the gaps between thoughts where we might actually encounter ourselves.\n\nThe irony is that in trying to fill every moment with stimulation, we've created a different kind of emptiness. A hollow fullness, if such a thing exists. We're overstimulated yet undernourished, constantly consuming yet never quite satisfied.\n\nToday, I practiced sitting with the discomfort of silence. No music, no podcast, no mental to-do list. Just me and the space between one breath and the next. It was terrifying and beautiful in equal measure.\n\nPerhaps the noise outside is just a reflection of the noise within. And maybe, just maybe, learning to quiet one will help silence the other.`,
    "tags": ["Psychology", "Mindfulness", "Self-Reflection", "Modern Life"],
    "wordCount": 267,
    "isPublished": true,
    "createdAt": "2025-06-25T10:30:00Z",
    "updatedAt": "2025-06-25T10:30:00Z",
  },
  {
    "id": "2",
    "slug": "on-feeling-everything",
    "title": "On Feeling Everything",
    "date": "June 22, 2025",
    "mood": "Nostalgic",
    "readTime": "6 min read",
    "excerpt": "There's a particular ache that comes with feeling too much, too often...",
    "content": `There's a particular ache that comes with feeling too much, too often. It's not quite sadness, not quite joy—it's the weight of being fully human in a world that often rewards numbness.\n\nI've always been what people call \"sensitive.\" As a child, I cried at commercials featuring lonely animals. I felt the mood of every room I entered. I absorbed the emotions of others like a sponge, often forgetting where they ended and I began.\n\nFor years, I saw this as a weakness. In a culture that prizes emotional regulation and \"keeping it together,\" feeling everything seemed like a design flaw. But I'm beginning to understand that perhaps it's actually a superpower disguised as a burden.\n\nThe highly sensitive among us are the canaries in the coal mine of human experience. We feel the shifts before they become visible. We notice the micro-expressions, the subtle changes in energy, the unspoken truths that hover in the space between words.\n\nBut with great sensitivity comes great responsibility. Learning to distinguish between what's ours and what belongs to others. Developing boundaries that protect without isolating. Finding ways to honor our emotional reality without drowning in it.\n\nI'm learning that feeling everything doesn't mean I have to fix everything. That witnessing suffering doesn't require me to absorb it. That compassion can exist without losing myself in the process.\n\nToday I choose to see my sensitivity not as a burden to overcome, but as a gift to be stewarded wisely.`,
    "tags": ["Emotional Intelligence", "Sensitivity", "Self-Acceptance", "Boundaries"],
    "wordCount": 245,
    "isPublished": true,
    "createdAt": "2025-06-22T14:15:00Z",
    "updatedAt": "2025-06-22T14:15:00Z"
  },
  {
    "id": "3",
    "slug": "the-space-between-thoughts",
    "title": "The Space Between Thoughts",
    "date": "June 20, 2025",
    "mood": "Still",
    "readTime": "3 min read",
    "excerpt": "In the quiet moments between one thought and the next, I found something unexpected...",
    "content": `In the quiet moments between one thought and the next, I found something unexpected: peace.\n\nIt's easy to get caught up in the narrative our minds create. The endless story of who we are, what we need, where we're going wrong. But in meditation today, I discovered these gaps—tiny spaces of pure awareness that exist between the mental chatter.\n\nThese moments are like clearings in a dense forest of thought. Brief openings where the sky becomes visible, where we remember that we are not our thoughts but the space in which they arise.\n\nThe mystics have written about this for centuries, but experiencing it firsthand is entirely different. It's not dramatic or earth-shattering. It's simply... quiet. A gentle recognition that beneath all the mental noise, something vast and peaceful already exists.\n\nI'm beginning to understand that meditation isn't about stopping thoughts—it's about recognizing the spaces between them. These gaps have always been there, waiting patiently for us to notice.\n\nWhat strikes me most is how natural this feels. As if I'm not learning something new but remembering something I've always known. Coming home to a part of myself that never left.\n\nIn a world obsessed with doing, perhaps the most radical act is simply being. Existing in the space between thoughts, where all possibilities live.`,
    "tags": ["Meditation", "Mindfulness", "Consciousness", "Inner Peace"],
    "wordCount": 210,
    "isPublished": true,
    "createdAt": "2025-06-20T09:45:00Z",
    "updatedAt": "2025-06-20T09:45:00Z"
  },
  {
    "id": "4",
    "slug": "the-art-of-noticing",
    "title": "The Art of Noticing",
    "date": "June 18, 2025",
    "mood": "Observant",
    "readTime": "5 min read",
    "excerpt": "Today, I practiced the art of noticing. Not searching for anything profound, but simply seeing what was there...",
    "content": `Today, I practiced the art of noticing. Not searching for anything profound, but simply seeing what was there. The way the light filtered through the leaves of the ficus tree in my living room, casting dancing shadows on the wall. The intricate web a spider had woven overnight in the corner of the window frame. The faint scent of rain on dry pavement from a brief morning shower.\n\nWe move through our days so quickly, our minds already on the next task, the next destination. We see, but we do not notice. We hear, but we do not listen. This constant forward momentum robs us of the present moment, the only one we ever truly have.\n\nNoticing is a form of mindfulness, a gentle anchor to the here and now. It requires no special equipment, no designated time. It can be practiced anywhere, at any moment. It is the simple act of paying attention.\n\nI noticed the way my cat's fur felt beneath my hand, the rhythmic purr that vibrated through her body. I noticed the complex flavor of my morning coffee, the warmth of the mug in my hands. Each small observation was a tiny island of peace in the stream of my thoughts.\n\nThis practice doesn't erase the worries or the to-do lists, but it puts them in their place. It reminds me that life is not just a series of problems to be solved, but a collection of moments to be experienced. And many of those moments, I'm discovering, are quietly beautiful.`,
    "tags": ["Mindfulness", "Daily Life", "Observation", "Gratitude"],
    "wordCount": 280,
    "isPublished": true,
    "createdAt": "2025-06-18T11:00:00Z",
    "updatedAt": "2025-06-18T11:00:00Z",
  },
  {
    "id": "5",
    "slug": "a-letter-to-my-younger-self",
    "title": "A Letter to My Younger Self",
    "date": "June 15, 2025",
    "mood": "Nostalgic",
    "readTime": "7 min read",
    "excerpt": "If I could send a letter back in time, what would I tell the younger version of me?",
    "content": `To the one who is still figuring it all out,\n\nI see you. I see your anxieties, your hopes, your fierce and fragile heart. You are trying so hard to get it right, to follow the map you think leads to happiness. I want to tell you to be kinder to yourself. The path is not linear, and the detours are where you will find the most important parts of your story.\n\nDon't be so afraid of making mistakes. They are not failures; they are lessons. Each stumble will teach you something about resilience, about grace, about the strength you don't yet know you possess. The things you worry about so much right now, they will fade. The opinions of others, the pressure to conform, the fear of not being enough—they will lose their power over you.\n\nI want you to know that your sensitivity is not a flaw. It is your greatest gift. It allows you to connect, to empathize, to create. Don't let the world dull your edges. Protect that soft heart, but don't hide it away.\n\nFall in love, get your heart broken, and learn that you can heal yourself. Trust your intuition; it knows where you need to go. Spend more time with people who make you feel seen and less time with those who make you feel small.\n\nAnd most importantly, please don't wait for someone else's permission to be yourself. You are already whole, already worthy. The life you are meant to live is the one that feels most true to you, not the one that looks best from the outside.\n\nBe patient. You will get there. And when you do, you'll look back and understand that every single moment, even the painful ones, was a necessary part of the journey.\n\nWith love,\nMe`,
    "tags": ["Self-Reflection", "Growth", "Compassion", "Life Lessons"],
    "wordCount": 320,
    "isPublished": true,
    "createdAt": "2025-06-15T16:30:00Z",
    "updatedAt": "2025-06-15T16:30:00Z"
  },
  {
    "id": "6",
    "slug": "the-comfort-of-a-rainy-day",
    "title": "The Comfort of a Rainy Day",
    "date": "June 12, 2025",
    "mood": "Cozy",
    "readTime": "4 min read",
    "excerpt": "There's a unique permission that comes with a rainy day—a chance to slow down, turn inward, and just be.",
    "content": `The world outside is awash in gray. Rain streaks down the windowpanes, blurring the edges of the neighborhood into a soft watercolor painting. There's a unique permission that comes with a day like this. The frantic energy of the world seems to pause, and a collective sigh of relief settles over everything.\n\nA rainy day is an invitation to slow down. The pressure to be productive, to be outside, to be constantly doing, dissolves with the steady drumming on the roof. It's a day for cozy blankets, warm drinks, and the company of a good book or your own thoughts.\n\nI find a deep comfort in the sound of the rain. It's a natural white noise that washes away the mental clutter. It speaks of renewal, of quenching thirst, of the quiet, persistent work of nature. It reminds me that not all growth is loud and sunny; some of it happens in the cool, dark, and damp.\n\nToday, I gave myself over to the mood of the day. I lit a candle, made a pot of tea, and watched the world drink. I didn't try to accomplish anything grand. My only goal was to be present, to listen to the rhythm of the rain, and to feel the simple contentment of being warm and dry in a storm.\n\nThese are the moments that recharge the soul. Not the grand adventures or the major achievements, but the quiet, unassuming pockets of peace that we allow ourselves to inhabit. The rainy days are a gift, a reminder that it's okay to rest, to reflect, and to simply be.`,
    "tags": ["Comfort", "Weather", "Stillness", "Home"],
    "wordCount": 275,
    "isPublished": true,
    "createdAt": "2025-06-12T08:00:00Z",
    "updatedAt": "2025-06-12T08:00:00Z",
  },
  {
    "id": "7",
    "slug": "wandering-through-old-bookstores",
    "title": "Wandering Through Old Bookstores",
    "date": "June 10, 2025",
    "mood": "Curious",
    "readTime": "5 min read",
    "excerpt": "To step into an old bookstore is to step into a different dimension, where time slows and stories whisper from the shelves.",
    "content": `There is a certain kind of magic that lives only in the dusty aisles of old bookstores. It's a quiet, patient magic, one that doesn't shout for attention but waits to be discovered. To step inside is to leave the rush of the modern world behind and enter a sanctuary of stories.\n\nThe air smells of aging paper, ink, and a hint of leather—a perfume for the soul. Light slants through tall windows, illuminating floating dust motes like tiny, wandering stars. The only sound is the gentle creak of floorboards and the soft rustle of turning pages.\n\nI love to wander without a specific title in mind, letting my fingers graze the spines of books that have lived many lives. Each one is a time capsule, a portal to another mind, another era. Who owned this book before me? What passages did they underline? What thoughts did it inspire in them?\n\nIn a world of algorithms and personalized recommendations, there is a profound joy in the serendipity of a physical bookstore. Finding a book you never knew you were looking for. Discovering an author whose name is new to you. It's a conversation with the past and a gift to your future self.\n\nToday, I found a slim volume of poetry tucked away in a forgotten corner. Its pages were yellowed, its cover worn soft with time. Reading it felt like sharing a secret with a long-lost friend. These are the treasures that old bookstores hold—not just books, but connections that transcend time.`,
    "tags": ["Books", "Reading", "Discovery", "History"],
    "wordCount": 290,
    "isPublished": true,
    "createdAt": "2025-06-10T13:20:00Z",
    "updatedAt": "2025-06-10T13:20:00Z"
  },
  {
    "id": "8",
    "slug": "the-language-of-trees",
    "title": "The Language of Trees",
    "date": "June 07, 2025",
    "mood": "Grounded",
    "readTime": "6 min read",
    "excerpt": "If you listen closely, the trees have much to teach us about resilience, patience, and community.",
    "content": `I spent the afternoon in the woods, leaning against the trunk of an ancient oak. In the stillness, I began to feel the forest not just as a collection of individual trees, but as a single, interconnected being. If you listen closely, they have much to teach us.\n\nTrees teach us about resilience. They bend in the wind, lose their leaves in the winter, and bear the scars of storms, yet they continue to reach for the sky. They show us that it is possible to be both strong and flexible, to weather hardship and continue to grow.\n\nThey teach us about patience. A tree does not hurry its growth. It follows the slow, deliberate rhythm of the seasons, trusting in the process. In our fast-paced world, this is a vital lesson. True growth cannot be rushed; it unfolds in its own time.\n\nAnd they teach us about community. Beneath the forest floor, a complex network of roots and fungi connects the trees, allowing them to share nutrients and send warning signals. They support each other, the stronger helping the weaker. They are a perfect model of a thriving, interdependent community.\n\nStanding among these silent giants, I felt a sense of being grounded, of being part of something much larger and older than myself. My own worries and anxieties seemed to shrink in perspective. The trees don't speak in words, but in a language of presence, of being, of deep, unwavering connection to the earth. It's a language I am only just beginning to understand.`,
    "tags": ["Nature", "Trees", "Connection", "Environment"],
    "wordCount": 295,
    "isPublished": true,
    "createdAt": "2025-06-07T15:00:00Z",
    "updatedAt": "2025-06-07T15:00:00Z",
  },
  {
    "id": "9",
    "slug": "on-the-courage-to-be-a-beginner",
    "title": "On the Courage to Be a Beginner",
    "date": "June 05, 2025",
    "mood": "Hopeful",
    "readTime": "5 min read",
    "excerpt": "There is a unique freedom in being a beginner, in the space where you are not expected to know all the answers.",
    "content": `We live in a culture that celebrates expertise. We admire the masters, the virtuosos, the people who have reached the pinnacle of their craft. But in doing so, we often forget the beauty and courage of being a beginner.\n\nTo be a beginner is to be vulnerable. It's to admit that you don't know, to be willing to make mistakes, to look clumsy and awkward. It requires setting aside your ego and embracing the discomfort of the learning process. This is an act of profound courage.\n\nI started learning to play the guitar recently. My fingers are clumsy on the frets, the chords buzz, and the rhythm is often unsteady. It is a humbling experience. But there is also a unique freedom in it. As a beginner, there is no pressure to be perfect. The only expectation is to try.\n\nIn this space of not-knowing, there is so much room for curiosity and play. Every small bit of progress is a victory. The first clean chord, the first recognizable melody—these are moments of pure joy. It's a reminder that the journey is just as important, if not more so, than the destination.\n\nEmbracing the beginner's mind is a skill that applies to so much more than just new hobbies. It's about approaching life with a sense of openness and wonder, being willing to unlearn and relearn, and finding joy in the process of becoming. It's about remembering that at some point, every master was once a courageous beginner.`,
    "tags": ["Learning", "Growth", "Vulnerability", "New Beginnings"],
    "wordCount": 290,
    "isPublished": true,
    "createdAt": "2025-06-05T18:00:00Z",
    "updatedAt": "2025-06-05T18:00:00Z"
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
