import { useState, useCallback, useRef, useEffect } from 'react';
import { Queue } from '@/lib/Queue';
import { Song } from '@/types/Song';

interface PlayerQueueState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Queue<Song>;
  history: Song[];
}

export function usePlayerQueue() {
  // Using our Queue data structure for the playlist
  const queueRef = useRef(new Queue<Song>());
  const [history, setHistory] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Setup event listeners
    const audio = audioRef.current;
    
    const handleEnded = () => {
      playNext();
    };
    
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Add a song to the queue
  const addToQueue = useCallback((song: Song) => {
    queueRef.current.enqueue(song);
    
    // If nothing is playing, start playing the added song
    if (!currentSong) {
      playNext();
    }
  }, [currentSong]);

  // Add multiple songs to the queue
  const addMultipleToQueue = useCallback((songs: Song[]) => {
    songs.forEach(song => queueRef.current.enqueue(song));
    
    // If nothing is playing, start playing the first added song
    if (!currentSong && songs.length > 0) {
      playNext();
    }
  }, [currentSong]);

  // Play the next song in the queue
  const playNext = useCallback(() => {
    // If there's a current song, add it to history
    if (currentSong) {
      setHistory(prev => [currentSong, ...prev]);
    }
    
    // Get the next song from the queue (dequeue operation)
    const nextSong = queueRef.current.dequeue();
    setCurrentSong(nextSong || null);
    
    if (nextSong) {
      // Set the new audio source and play
      if (audioRef.current) {
        audioRef.current.src = nextSong.audioUrl;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentSong]);

  // Play/pause the current song
  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(error => console.error('Error playing audio:', error));
    }
    
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentSong]);

  // Get the current queue
  const getQueue = useCallback(() => {
    return queueRef.current.getAll();
  }, []);

  // Remove a song from the queue by index
  const removeFromQueue = useCallback((index: number) => {
    queueRef.current.removeAt(index);
  }, []);

  // Clear the queue
  const clearQueue = useCallback(() => {
    queueRef.current.clear();
  }, []);

  return {
    currentSong,
    isPlaying,
    queueItems: getQueue(),
    history,
    addToQueue,
    addMultipleToQueue,
    playNext,
    togglePlay,
    removeFromQueue,
    clearQueue
  };
} 