import React from 'react';
import Image from 'next/image';
import { Song } from '@/types/Song';

interface SongItemProps {
  song: Song;
  onAddToQueue?: (song: Song) => void;
  onRemove?: () => void;
  isPlaying?: boolean;
  showControls?: boolean;
  isInQueue?: boolean;
}

export default function SongItem({ 
  song, 
  onAddToQueue, 
  onRemove, 
  isPlaying = false,
  showControls = true,
  isInQueue = false
}: SongItemProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ease-in-out ${
        isPlaying 
          ? 'bg-foreground/10 shadow-md scale-[1.01]' 
          : 'hover:bg-foreground/5 hover:scale-[1.005] hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 overflow-hidden rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105">
          <Image 
            src={song.coverUrl} 
            alt={`${song.title} album cover`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm">
            {isPlaying && (
              <span className="mr-2 inline-block animate-pulse">▶️</span>
            )}
            {song.title}
          </h3>
          <p className="text-xs text-foreground/70">{song.artist}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-xs text-foreground/60">{formatDuration(song.duration)}</span>
        
        {showControls && (
          <div className="flex gap-2">
            {!isInQueue && onAddToQueue && (
              <button 
                onClick={() => onAddToQueue(song)}
                className="text-xs p-2 rounded-full hover:bg-foreground/10 transition-all duration-200 ease-in-out hover:scale-110"
                title="Add to queue"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            
            {isInQueue && onRemove && (
              <button 
                onClick={onRemove}
                className="text-xs p-2 rounded-full hover:bg-foreground/10 transition-all duration-200 ease-in-out hover:scale-110 hover:rotate-90"
                title="Remove from queue"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 