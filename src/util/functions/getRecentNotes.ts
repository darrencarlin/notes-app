import { type Note } from "@/types";

export const getRecentNotes = (notes: Note[], daysToConsider = 7, maxResults = 10): Note[] => {
    const currentDate = new Date();
    const maxAgeInMs = daysToConsider * 24 * 60 * 60 * 1000;

    const recentNotes = notes.filter((note) => {
        const date = new Date(note.lastUpdated);
        const ageInMs = currentDate.getTime() - date.getTime();
        return ageInMs <= maxAgeInMs;
    });

    recentNotes.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

    return recentNotes.slice(0, maxResults);
}
