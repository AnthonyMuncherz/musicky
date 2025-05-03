import { Song, sampleSongs } from '@/types/Song';

/**
 * Get all songs (only user uploaded songs now)
 */
export function getAllSongs(): Song[] {
  // Only return uploaded songs
  return getUploadedSongs();
}

/**
 * Get only user uploaded songs
 */
export function getUploadedSongs(): Song[] {
  if (typeof window === 'undefined') {
    // Return empty array when running on server
    return [];
  }
  
  const storedSongs = localStorage.getItem('uploadedSongs');
  if (!storedSongs) {
    return [];
  }
  
  try {
    return JSON.parse(storedSongs);
  } catch (error) {
    console.error('Error parsing uploaded songs:', error);
    return [];
  }
}

/**
 * Add a new uploaded song
 */
export function addUploadedSong(song: Song): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  const uploadedSongs = getUploadedSongs();
  uploadedSongs.push(song);
  
  localStorage.setItem('uploadedSongs', JSON.stringify(uploadedSongs));
  
  // Dispatch a custom event to notify about the new upload
  const event = new CustomEvent('songUploaded');
  window.dispatchEvent(event);
}

/**
 * Get a specific song by ID
 */
export function getSongById(id: string): Song | undefined {
  const allSongs = getUploadedSongs();
  return allSongs.find(song => song.id === id);
}

/**
 * Create a persistent audio URL for uploaded songs
 * This is needed because object URLs from uploaded files are not persistent
 */
export function createPersistentAudioUrl(file: File): string {
  // In a real app, this would upload to a server and return a URL
  // For this demo, we'll create a data URL
  return URL.createObjectURL(file);
} 