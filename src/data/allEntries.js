// Dynamically import all entry files
const entryModules = import.meta.glob('./entries/*.ts');
export async function loadAllEntries() {
    const entries = [];
    for (const path in entryModules) {
        const module = await entryModules[path]();
        entries.push(module.entry);
    }
    return entries;
}
// Placeholder for sampleEntries, will be loaded asynchronously by components
export let sampleEntries = [];
export const getEntryBySlug = (slug) => {
    return sampleEntries.find(entry => entry.slug === slug);
};
export const getRelatedEntries = (allEntries, currentEntry, limit = 2) => {
    return allEntries
        .filter(entry => entry.id !== currentEntry.id)
        .slice(0, limit);
};
