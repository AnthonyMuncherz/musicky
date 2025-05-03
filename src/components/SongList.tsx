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
    <div className="space-y-1">
      {songs.length === 0 ? (
        <p className="text-center text-foreground/50 py-8">No songs available</p>
      ) : (
        songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onAddToQueue={onAddToQueue}
            isPlaying={currentSong?.id === song.id}
          />
        ))
      )}
    </div>
  );
} 