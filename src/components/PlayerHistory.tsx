import React from 'react';
import { Song } from '@/types/Song';
import SongItem from './SongItem';

interface PlayerHistoryProps {
  history: Song[];
  onAddToQueue: (song: Song) => void;
}

export default function PlayerHistory({ history, onAddToQueue }: PlayerHistoryProps) {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
      
      <div className="bg-foreground/5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-sm">
        {history.length === 0 ? (
          <div className="text-center py-10 px-4 text-foreground/50 animate-fade-in">
            <p>No songs played yet</p>
            <p className="text-sm mt-1">Songs you've played will appear here</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {history.map((song, index) => (
              <div key={`${song.id}_${index}`} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <SongItem
                  song={song}
                  onAddToQueue={onAddToQueue}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 