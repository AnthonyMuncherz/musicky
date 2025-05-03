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
      className={`
        flex items-center justify-between p-4 rounded-xl
        transition-all duration-300 ease-out
        ${isPlaying 
          ? 'bg-foreground/10 shadow-lg scale-[1.01] border border-foreground/10' 
          : 'hover:bg-foreground/5 hover:scale-[1.005] hover:shadow-md border border-transparent hover:border-foreground/5'
        }
        group
      `}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 ease-out group-hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent z-10" />
          <Image 
            src={song.coverUrl} 
            alt={`${song.title} album cover`}
            fill
            sizes="(max-width: 768px) 56px, 56px"
            priority={isPlaying}
            className={`
              object-cover transition-all duration-300 ease-out
              ${isPlaying ? 'scale-105' : 'group-hover:scale-105'}
            `}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-medium text-sm truncate pr-2 flex items-center gap-2">
            {isPlaying && (
              <span className="shrink-0 w-4 h-4 flex items-center justify-center animate-pulse">
                ▶️
              </span>
            )}
            <span className="truncate">{song.title}</span>
          </h3>
          <p className="text-xs text-foreground/70 truncate">{song.artist}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-xs text-foreground/60 tabular-nums">{formatDuration(song.duration)}</span>
        
        {showControls && (
          <div className="flex gap-2">
            {!isInQueue && onAddToQueue && (
              <button 
                onClick={() => onAddToQueue(song)}
                className="
                  text-xs p-2 rounded-full 
                  hover:bg-foreground/10 active:bg-foreground/15
                  transition-all duration-200 ease-out
                  hover:scale-110 active:scale-95
                "
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
                className="
                  text-xs p-2 rounded-full 
                  hover:bg-foreground/10 active:bg-foreground/15
                  transition-all duration-200 ease-out
                  hover:scale-110 hover:rotate-90 active:scale-95
                "
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