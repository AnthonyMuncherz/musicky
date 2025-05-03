import { NextResponse } from 'next/server';
import { getDBSongs } from '@/lib/db';

// GET /api/songs - Get all songs
export async function GET() {
  try {
    const songs = getDBSongs();
    
    // Remove audioData from response to reduce payload size
    const sanitizedSongs = songs.map(song => {
      const { audioData, ...sanitizedSong } = song as any;
      return sanitizedSong;
    });
    
    return NextResponse.json(sanitizedSongs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    );
  }
} 