'use client';

import React, { useState, useRef } from 'react';
import { Song } from '@/types/Song';
import { addUploadedSong, createPersistentAudioUrl } from '@/lib/songService';

// Simple ID generator function in case uuid is not available
const generateId = () => {
  return `song_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [coverImage, setCoverImage] = useState<string>('');

  // Handle audio file selection
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is audio
    if (!file.type.startsWith('audio/')) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please select an audio file',
      }));
      return;
    }
    
    setAudioFile(file);
    
    // Create temporary URL for the audio file
    const audioUrl = URL.createObjectURL(file);
    
    // Load audio to get duration
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setAudioDuration(Math.round(audioRef.current.duration));
        }
      };
      audioRef.current.onerror = () => {
        setUploadState(prev => ({
          ...prev,
          error: 'Could not load the audio file. Please try another one.',
        }));
      };
    }
    
    // Generate a random cover image if none selected
    if (!coverImage) {
      const randomCover = `https://source.unsplash.com/random/300x300?music,${encodeURIComponent(file.name.split('.')[0])}`;
      setCoverImage(randomCover);
    }
  };

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please select an image file for the cover',
      }));
      return;
    }
    
    // Create temporary URL for the image
    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please enter a song title',
      }));
      return;
    }
    
    if (!artist.trim()) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please enter an artist name',
      }));
      return;
    }
    
    if (!audioFile) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please select an audio file',
      }));
      return;
    }

    // Start upload process
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      success: false
    });

    try {
      // Simulate upload process with progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadState(prev => ({
          ...prev,
          progress: i
        }));
      }

      // Get persistent audio URL
      const audioUrl = createPersistentAudioUrl(audioFile);

      // Create song object
      const newSong: Song = {
        id: generateId(),
        title,
        artist,
        duration: audioDuration,
        coverUrl: coverImage || `https://source.unsplash.com/random/300x300?music`,
        audioUrl
      };

      // Add song to storage
      addUploadedSong(newSong);

      // Reset form and show success
      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true
      });
      
      setTitle('');
      setArtist('');
      setAudioFile(null);
      setCoverImage('');
      setAudioDuration(0);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: 'An error occurred during upload. Please try again.',
        success: false
      });
    }
  };

  return (
    <div className="bg-foreground/5 p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md">
      <audio ref={audioRef} className="hidden" />
      
      {uploadState.success ? (
        <div className="text-center py-8 animate-fade-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in-up">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>Upload Successful!</h3>
          <p className="text-foreground/70 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Your song has been added to the library.</p>
          <button
            onClick={() => {
              setUploadState(prev => ({ ...prev, success: false }));
            }}
            className="px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            Upload Another Song
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="animate-fade-in-up">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Song Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background hover:border-foreground/40 focus:border-foreground focus:ring-2 focus:ring-foreground/20 transition-all"
              placeholder="Enter song title"
              required
            />
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <label htmlFor="artist" className="block text-sm font-medium mb-1">
              Artist Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background hover:border-foreground/40 focus:border-foreground focus:ring-2 focus:ring-foreground/20 transition-all"
              placeholder="Enter artist name"
              required
            />
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label htmlFor="audioFile" className="block text-sm font-medium mb-1">
              Audio File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="audioFile"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background hover:border-foreground/40 focus:border-foreground focus:ring-2 focus:ring-foreground/20 transition-all"
              required
            />
            {audioFile && audioDuration > 0 && (
              <p className="text-sm text-foreground/70 mt-1">
                Duration: {Math.floor(audioDuration / 60)}:{(audioDuration % 60).toString().padStart(2, '0')}
              </p>
            )}
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
              Cover Image (optional)
            </label>
            <input
              type="file"
              id="coverImage"
              ref={coverInputRef}
              accept="image/*"
              onChange={handleCoverImageChange}
              className="w-full px-3 py-2 rounded-lg border border-foreground/20 bg-background hover:border-foreground/40 focus:border-foreground focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {coverImage && (
              <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="Cover preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>
          
          {uploadState.error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg animate-fade-in">
              {uploadState.error}
            </div>
          )}
          
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {uploadState.isUploading ? (
              <div className="space-y-4">
                <div className="w-full bg-foreground/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-foreground h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadState.progress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-foreground/70">
                  Uploading... {uploadState.progress}%
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
              >
                Upload Song
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
} 