'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDBSongById } from '@/lib/db';
import { Song } from '@/types/Song';

// GET /api/songs/[id] - Get a song by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const song = await getDBSongById(id);
    
    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }
    
    // Remove audioData from response to reduce payload size
    const { ...sanitizedSong } = song as Song;
    
    return NextResponse.json(sanitizedSong);
  } catch (error) {
    console.error('Error fetching song:', error);
    return NextResponse.json(
      { error: 'Failed to fetch song' },
      { status: 500 }
    );
  }
} 