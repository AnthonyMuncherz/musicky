'use client';

import { useState, useEffect } from 'react';
import { usePlayerQueue } from '@/hooks/usePlayerQueue';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import Player from '@/components/Player';
import PlayerQueue from '@/components/PlayerQueue';
import PlayerHistory from '@/components/PlayerHistory';
import { Song } from '@/types/Song';
import Link from 'next/link';
import { getAllSongs } from '@/lib/songService';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Fetch songs from the server
  useEffect(() => {
    const loadSongs = async () => {
      setIsLoading(true);
      try {
        const fetchedSongs = await getAllSongs();
        setSongs(fetchedSongs);
      } catch (error) {
        console.error('Failed to load songs:', error);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
    
    // Add event listener for song uploads to refresh the list
    const handleSongUploaded = () => {
      loadSongs();
    };
    
    window.addEventListener('songUploaded', handleSongUploaded);
    
    return () => {
      window.removeEventListener('songUploaded', handleSongUploaded);
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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Musicky</h1>
          <p className="text-foreground/70">Your music, organized in a queue. Add songs to your playlist and enjoy!</p>
        </div>
        
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onPlayNext={playNext}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Library</h2>
              <Link
                href="/upload"
                className="px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 hover:scale-105"
              >
                Upload Music
              </Link>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-foreground/50">Loading songs...</p>
              </div>
            ) : (
              <SongList
                songs={songs}
                onAddToQueue={addToQueue}
                currentSong={currentSong}
              />
            )}
          </div>
          
          <div className="space-y-8">
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
