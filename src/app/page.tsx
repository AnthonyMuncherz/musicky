'use client';

import { useState, useEffect } from 'react';
import { usePlayerQueue } from '@/hooks/usePlayerQueue';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import Player from '@/components/Player';
import PlayerQueue from '@/components/PlayerQueue';
import PlayerHistory from '@/components/PlayerHistory';
import { getUploadedSongs } from '@/lib/songService';
import { Song } from '@/types/Song';
import Link from 'next/link';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  
  // Get only uploaded songs
  useEffect(() => {
    setSongs(getUploadedSongs());
    
    // Add event listener for storage changes to update songs when uploads happen
    const handleStorageChange = () => {
      setSongs(getUploadedSongs());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Create a custom event listener to listen for new uploads
    window.addEventListener('songUploaded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('songUploaded', handleStorageChange);
    };
  }, []);
  
  const {
    currentSong,
    isPlaying,
    queueItems,
    history,
    addToQueue,
    playNext,
    togglePlay,
    removeFromQueue
  } = usePlayerQueue();

  return (
    <Layout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <h1 className="text-3xl font-bold animate-fade-in-up">Musicky</h1>
        <p className="text-foreground/70 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Your music, organized in a queue. Add songs to your playlist and enjoy!
        </p>
        
        <Player 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          onTogglePlay={togglePlay} 
          onPlayNext={playNext}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Library</h2>
              <Link
                href="/upload"
                className="text-sm px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-all duration-200 hover:scale-105 hover:shadow-sm"
              >
                Upload Music
              </Link>
            </div>
            {songs.length === 0 ? (
              <div className="bg-foreground/5 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Your library is empty</h3>
                <p className="text-foreground/70 mb-6">Start by uploading your favorite music tracks</p>
                <Link
                  href="/upload"
                  className="inline-block px-5 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 hover:scale-105"
                >
                  Upload Your First Song
                </Link>
              </div>
            ) : (
              <SongList 
                songs={songs} 
                onAddToQueue={addToQueue} 
                currentSong={currentSong}
              />
            )}
          </div>
          
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <PlayerQueue 
              queue={queueItems} 
              currentSong={currentSong} 
              onRemove={removeFromQueue}
            />
            
            <PlayerHistory 
              history={history} 
              onAddToQueue={addToQueue}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
