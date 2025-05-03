/**
 * Represents a music track in the application
 */
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
}

/**
 * Empty array for initial songs state
 */
export const sampleSongs: Song[] = []; 