import { Song } from '@/types/Song';

/**
 * Get all songs from the server
 */
export async function getAllSongs(): Promise<Song[]> {
  try {
    const response = await fetch('/api/songs');
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}

/**
 * Get only user uploaded songs
 */
export async function getUploadedSongs(): Promise<Song[]> {
  return getAllSongs();
}

/**
 * Get a specific song by ID
 */
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`/api/songs/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching song:', error);
    return null;
  }
}

/**
 * Create a persistent audio URL for uploaded songs
 * This is needed because object URLs from uploaded files are not persistent
 */
export function createPersistentAudioUrl(file: File): string {
  // In a real app with SQLite, we don't need this function anymore as
  // we store the files on disk with persistent paths
  return URL.createObjectURL(file);
}

/**
 * Upload a new song
 */
export async function uploadSong(formData: FormData): Promise<{ success: boolean; song?: Song; error?: string }> {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to upload song'
      };
    }
    
    return {
      success: true,
      song: data.song
    };
  } catch (error) {
    console.error('Error uploading song:', error);
    return {
      success: false,
      error: 'Failed to upload song'
    };
  }
} 