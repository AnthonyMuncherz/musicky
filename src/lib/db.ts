'use server';

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Song } from '@/types/Song';

// This file should only be imported in server components or API routes
// We check if we're on the server side
const isServer = typeof window === 'undefined';

let db: Database.Database | null = null;

// Initialize database - only call in server components
export async function initializeDB() {
  if (!isServer) {
    console.error('Database can only be initialized on the server');
    return null;
  }
  
  if (!db) {
    // Ensure the db directory exists
    const DB_DIR = path.join(process.cwd(), 'db');
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    
    const DB_PATH = path.join(DB_DIR, 'musicky.db');
    
    try {
      db = new Database(DB_PATH);
      
      // Create songs table if it doesn't exist
      db.exec(`
        CREATE TABLE IF NOT EXISTS songs (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          artist TEXT NOT NULL,
          duration INTEGER NOT NULL,
          coverUrl TEXT NOT NULL,
          audioUrl TEXT NOT NULL,
          audioData BLOB,
          createdAt INTEGER NOT NULL
        )
      `);
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return null;
    }
  }
  
  return db;
}

// Get all songs - only call in server components
export async function getDBSongs() {
  const database = await initializeDB();
  if (!database) return [];
  
  try {
    const songs = database.prepare('SELECT * FROM songs ORDER BY createdAt DESC').all();
    return songs as Song[];
  } catch (error) {
    console.error('Error getting songs from database:', error);
    return [];
  }
}

// Get song by ID - only call in server components
export async function getDBSongById(id: string) {
  const database = await initializeDB();
  if (!database) return null;
  
  try {
    const song = database.prepare('SELECT * FROM songs WHERE id = ?').get(id);
    return song as Song | null;
  } catch (error) {
    console.error('Error getting song by ID from database:', error);
    return null;
  }
}

// Add song to database - only call in server components
export async function addSongToDB(song: Song, audioBuffer?: Buffer) {
  const database = await initializeDB();
  if (!database) return false;
  
  try {
    const stmt = database.prepare(`
      INSERT INTO songs (id, title, artist, duration, coverUrl, audioUrl, audioData, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      song.id,
      song.title,
      song.artist,
      song.duration,
      song.coverUrl,
      song.audioUrl,
      audioBuffer || null,
      Date.now()
    );
    
    return true;
  } catch (error) {
    console.error('Error adding song to database:', error);
    return false;
  }
}

// Get all songs from the database
export async function getAllSongs(): Promise<Song[]> {
  const response = await fetch('/api/songs');
  const songs = await response.json();
  return songs;
}

// Get a song by ID
export async function getSongById(id: string): Promise<Song | null> {
  const response = await fetch(`/api/songs/${id}`);
  if (!response.ok) {
    return null;
  }
  const song = await response.json();
  return song;
}

export default initializeDB; 