export interface DiaryEntry {
  id: string;
  slug: string;
  title: {
    en: string;
    es?: string;
  };
  date: string;
  mood: string;
  readTime: string;
  excerpt: {
    en: string;
    es?: string;
  };
  content: {
    en: string;
    es?: string;
  };
  tags: string[];
  wordCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

// Dynamically import all entry files
const entryModules = import.meta.glob('./entries/*.ts');

export async function loadAllEntries(): Promise<DiaryEntry[]> {
  const entries: DiaryEntry[] = [];
  for (const path in entryModules) {
    const module: any = await entryModules[path]();
    entries.push(module.entry);
  }
  return entries;
}

// Placeholder for sampleEntries, will be loaded asynchronously by components
export let sampleEntries: DiaryEntry[] = [];

export const getEntryBySlug = (slug: string): DiaryEntry | undefined => {
  return sampleEntries.find(entry => entry.slug === slug);
};

export const getRelatedEntries = (allEntries: DiaryEntry[], currentEntry: DiaryEntry, limit: number = 2): DiaryEntry[] => {
  return allEntries
    .filter(entry => entry.id !== currentEntry.id)
    .slice(0, limit);
};
