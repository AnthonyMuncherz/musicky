'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Song } from '@/types/Song';
import Layout from '@/components/Layout';
import Player from '@/components/Player';
import { usePlayerQueue } from '@/hooks/usePlayerQueue';
import Image from 'next/image';
import Link from 'next/link';

// Constants
const SONGS_STORAGE_KEY = 'musicky_songs';

export default function TrackDetail() {
  const params = useParams();
  const id = params.id as string;
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    currentSong, 
    isPlaying, 
    addToQueue, 
    togglePlay, 
    playNext 
  } = usePlayerQueue();

  useEffect(() => {
    // Set a short delay to prevent hydration issues
    setTimeout(() => {
      setIsLoading(true);
      try {
        const storedSongs = localStorage.getItem(SONGS_STORAGE_KEY);
        if (storedSongs) {
          const songs = JSON.parse(storedSongs) as Song[];
          const foundSong = songs.find(song => song.id === id);
          if (foundSong) {
            setSong(foundSong);
          } else {
            setError('Song not found');
          }
        } else {
          setError('No songs available');
        }
      } catch (err) {
        console.error('Error loading song:', err);
        setError('Failed to load song details');
      } finally {
        setIsLoading(false);
      }
    }, 0);
  }, [id]);

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center mb-6 text-sm hover:underline transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Library
        </Link>

        {isLoading ? (
          <div className="bg-foreground/5 rounded-lg p-12 text-center animate-pulse">
            <div className="w-32 h-32 mx-auto rounded-lg bg-foreground/10 mb-6"></div>
            <div className="h-8 w-2/3 mx-auto bg-foreground/10 rounded mb-4"></div>
            <div className="h-4 w-1/3 mx-auto bg-foreground/10 rounded"></div>
          </div>
        ) : error ? (
          <div className="bg-foreground/5 rounded-lg p-12 text-center">
            <div className="text-xl font-medium mb-4 text-red-500">{error}</div>
            <p className="mb-6">The song you're looking for could not be found or loaded.</p>
            <Link
              href="/"
              className="inline-block px-5 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
            >
              Return to Library
            </Link>
          </div>
        ) : song ? (
          <div className="animate-fade-in">
            <div className="bg-foreground/5 rounded-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-64 h-64 overflow-hidden rounded-lg shrink-0">
                  <Image
                    src={song.coverUrl}
                    alt={`${song.title} album cover`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 animate-fade-in-up">{song.title}</h1>
                    <p className="text-xl text-foreground/70 mb-6 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                      {song.artist}
                    </p>
                    
                    <div className="text-sm text-foreground/60 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                      <p>Duration: {formatDuration(song.duration)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <div className="flex gap-4">
                      <button
                        onClick={() => currentSong?.id === song.id ? togglePlay() : addToQueue(song)}
                        className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 hover:scale-105 flex items-center gap-2"
                      >
                        {currentSong?.id === song.id ? (
                          isPlaying ? (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M10 9V15M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Pause
                            </>
                          ) : (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M6 4L18 12L6 20V4Z" fill="currentColor"/>
                              </svg>
                              Resume
                            </>
                          )
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M6 4L18 12L6 20V4Z" fill="currentColor"/>
                            </svg>
                            Play Now
                          </>
                        )}
                      </button>
                      
                      {currentSong?.id !== song.id && (
                        <button
                          onClick={() => addToQueue(song)}
                          className="px-6 py-3 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-all duration-200 hover:scale-105 flex items-center gap-2"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Add to Queue
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Player
              currentSong={currentSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onPlayNext={playNext}
            />
          </div>
        ) : null}
      </div>
    </Layout>
  );
} 