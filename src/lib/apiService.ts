import { Song } from '@/types/Song';

// LocalStorage key for songs
const SONGS_STORAGE_KEY = 'musicky_songs';

/**
 * Get all songs from local storage
 */
export function getAllSongs(): Song[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const songs = localStorage.getItem(SONGS_STORAGE_KEY);
    if (!songs) {
      return [];
    }
    return JSON.parse(songs) as Song[];
  } catch (error) {
    console.error('Error parsing songs from localStorage:', error);
    return [];
  }
}

/**
 * Get a specific song by ID from local storage
 */
export function getSongById(id: string): Song | null {
  const songs = getAllSongs();
  return songs.find(song => song.id === id) || null;
}

/**
 * Save a song to local storage
 */
export function saveSong(song: Song): boolean {
  try {
    const songs = getAllSongs();
    
    // Check if song already exists
    const existingIndex = songs.findIndex(s => s.id === song.id);
    
    if (existingIndex >= 0) {
      // Update existing song
      songs[existingIndex] = song;
    } else {
      // Add new song
      songs.push(song);
    }
    
    // Save to localStorage
    localStorage.setItem(SONGS_STORAGE_KEY, JSON.stringify(songs));
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('songUploaded'));
    
    return true;
  } catch (error) {
    console.error('Error saving song to localStorage:', error);
    return false;
  }
}

/**
 * Generate a unique ID for a new song
 */
export function generateSongId(): string {
  return `song_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

/**
 * Create a blob URL from a file
 */
export function createBlobUrl(file: File): string {
  return URL.createObjectURL(file);
} 