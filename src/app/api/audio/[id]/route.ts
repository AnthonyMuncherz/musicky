'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDBSongById } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const song = getDBSongById(id);
    
    if (!song) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      );
    }
    
    const filePath = path.join(process.cwd(), 'public', song.audioUrl);
    
    try {
      // Check if the file exists
      await fs.access(filePath);
      
      // Get file size
      const stat = await fs.stat(filePath);
      const fileSize = stat.size;
      
      // Parse Range header if present
      const range = request.headers.get('range');
      
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        
        // Validate range
        if (
          isNaN(start) || 
          isNaN(end) || 
          start >= fileSize || 
          end >= fileSize
        ) {
          return new Response('Invalid range', {
            status: 416, // Range Not Satisfiable
            headers: {
              'Content-Range': `bytes */${fileSize}`
            }
          });
        }
        
        const chunkSize = end - start + 1;
        const file = await fs.open(filePath, 'r');
        const buffer = Buffer.alloc(chunkSize);
        await file.read(buffer, 0, chunkSize, start);
        await file.close();
        
        // Create partial response
        return new Response(buffer, {
          status: 206, // Partial Content
          headers: {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(chunkSize),
            'Content-Type': 'audio/mpeg'
          }
        });
      } else {
        // Full file response
        const fileBuffer = await fs.readFile(filePath);
        
        return new Response(fileBuffer, {
          headers: {
            'Content-Length': String(fileSize),
            'Content-Type': 'audio/mpeg',
            'Accept-Ranges': 'bytes'
          }
        });
      }
    } catch (error) {
      console.error('Error reading audio file:', error);
      return NextResponse.json(
        { error: 'Audio file not accessible' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error serving audio:', error);
    return NextResponse.json(
      { error: 'Failed to serve audio' },
      { status: 500 }
    );
  }
} 