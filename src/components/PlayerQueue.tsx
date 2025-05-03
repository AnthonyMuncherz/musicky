import React from 'react';
import { Song } from '@/types/Song';
import SongItem from './SongItem';

interface PlayerQueueProps {
  queue: Song[];
  currentSong: Song | null;
  onRemove: (index: number) => void;
}

export default function PlayerQueue({ queue, currentSong, onRemove }: PlayerQueueProps) {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-4">Current Queue</h2>
      
      <div className="bg-foreground/5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-sm">
        {queue.length === 0 ? (
          <div className="text-center py-10 px-4 text-foreground/50 animate-fade-in">
            <p>Your queue is empty</p>
            <p className="text-sm mt-1">Add songs from the library to start playing</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {queue.map((song, index) => (
              <div key={`${song.id}_${index}`} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <SongItem
                  song={song}
                  isInQueue={true}
                  onRemove={() => onRemove(index)}
                  isPlaying={currentSong?.id === song.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 