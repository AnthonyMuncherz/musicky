'use server';

import { NextRequest, NextResponse } from 'next/server';
import { addSongToDB } from '@/lib/db';
import { Song } from '@/types/Song';
import path from 'path';
import { promises as fs } from 'fs';

// Ensure the uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Helper to generate a unique ID
const generateId = () => {
  return `song_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

// POST /api/upload - Upload a new song
export async function POST(request: NextRequest) {
  try {
    // Ensure the uploads directories exist
    await fs.mkdir(path.join(UPLOADS_DIR, 'audio'), { recursive: true });
    await fs.mkdir(path.join(UPLOADS_DIR, 'covers'), { recursive: true });
    
    const formData = await request.formData();
    
    // Extract fields from form data
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const duration = parseInt(formData.get('duration') as string, 10);
    const audioFile = formData.get('audioFile') as File;
    const coverFile = formData.get('coverFile') as File;
    
    if (!title || !artist || !audioFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const songId = generateId();
    
    // Create file paths for audio and cover
    const audioFileName = `${songId}${path.extname(audioFile.name)}`;
    const audioFilePath = `/uploads/audio/${audioFileName}`;
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    
    // Save audio file
    await fs.writeFile(path.join(process.cwd(), 'public', audioFilePath), audioBuffer);
    
    // Handle cover image
    let coverUrl = '';
    if (coverFile) {
      const coverFileName = `${songId}${path.extname(coverFile.name)}`;
      coverUrl = `/uploads/covers/${coverFileName}`;
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      await fs.writeFile(path.join(process.cwd(), 'public', coverUrl), coverBuffer);
    } else {
      // Use a random cover if none provided
      coverUrl = `https://source.unsplash.com/random/300x300?music,${encodeURIComponent(title)}`;
    }
    
    // Create song object
    const song: Song = {
      id: songId,
      title,
      artist,
      duration,
      coverUrl,
      audioUrl: audioFilePath
    };
    
    // Add to database
    const success = await addSongToDB(song, audioBuffer);
    
    if (success) {
      return NextResponse.json({
        message: 'Song uploaded successfully',
        song: {
          ...song,
          audioData: undefined
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to save song to database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error uploading song:', error);
    return NextResponse.json(
      { error: 'Failed to upload song' },
      { status: 500 }
    );
  }
} 