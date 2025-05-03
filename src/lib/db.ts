import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Song } from '@/types/Song';

// Ensure the db directory exists
const DB_DIR = path.join(process.cwd(), 'db');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'musicky.db');

// This is a server-side only module
let db: Database.Database;

// Initialize database
function initializeDB() {
  if (typeof window === 'undefined') {
    if (!db) {
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
    }
    return db;
  }
  return null;
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

// DB operations for server-side only
export function getDBSongs() {
  const db = initializeDB();
  if (!db) return [];
  
  const songs = db.prepare('SELECT * FROM songs ORDER BY createdAt DESC').all();
  return songs as Song[];
}

export function getDBSongById(id: string) {
  const db = initializeDB();
  if (!db) return null;
  
  const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(id);
  return song as Song | null;
}

export function addSongToDB(song: Song, audioBuffer?: Buffer) {
  const db = initializeDB();
  if (!db) return false;
  
  const stmt = db.prepare(`
    INSERT INTO songs (id, title, artist, duration, coverUrl, audioUrl, audioData, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  try {
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
  } catch (err) {
    console.error('Error adding song to database:', err);
    return false;
  }
}

export default initializeDB; 