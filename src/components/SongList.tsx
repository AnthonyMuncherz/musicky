import React from 'react';
import { Song } from '@/types/Song';
import SongItem from './SongItem';

interface SongListProps {
  songs: Song[];
  onAddToQueue: (song: Song) => void;
  currentSong: Song | null;
}

export default function SongList({ songs, onAddToQueue, currentSong }: SongListProps) {
  return (
    <div className="space-y-2 py-2">
      {songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <p className="text-foreground/50 text-center">
            No songs available in your library
          </p>
          <p className="text-xs text-foreground/30 text-center mt-1">
            Upload some music to get started
          </p>
        </div>
      ) : (
        <div className="space-y-1 divide-y divide-foreground/[0.03]">
          {songs.map((song) => (
            <div key={song.id} className="pt-1 first:pt-0">
              <SongItem
                song={song}
                onAddToQueue={onAddToQueue}
                isPlaying={currentSong?.id === song.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 