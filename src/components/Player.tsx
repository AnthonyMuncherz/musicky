import React from 'react';
import Image from 'next/image';
import { Song } from '@/types/Song';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPlayNext: () => void;
}

export default function Player({ currentSong, isPlaying, onTogglePlay, onPlayNext }: PlayerProps) {
  if (!currentSong) {
    return (
      <div className="bg-foreground/5 p-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md">
        <div className="text-center py-6 text-foreground/50 animate-fade-in">
          <p>No song is currently playing</p>
          <p className="text-sm mt-1">Add a song from the library to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-foreground/5 p-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-md overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
          <Image
            src={currentSong.coverUrl}
            alt={`${currentSong.title} album cover`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{currentSong.title}</h3>
          <p className="text-sm text-foreground/70">{currentSong.artist}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9V15M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L18 12L6 20V4Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          
          <button
            onClick={onPlayNext}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L14 12L6 20V4Z" fill="currentColor"/>
              <path d="M18 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 