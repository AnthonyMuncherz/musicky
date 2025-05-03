import React from 'react';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Musicky</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Application Overview</h2>
          <p className="mb-4">
            Musicky is a music player application that organizes your music playback in a sequential order.
            It demonstrates a first-in, first-out approach to managing media playback, ensuring songs are
            played in the exact order they were added to the playlist.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browse songs from our curated library</li>
            <li>Upload your own music anonymously</li>
            <li>Add songs to your playlist from the library</li>
            <li>Play songs in the exact order they were added</li>
            <li>Remove songs from the playlist</li>
            <li>View your recently played tracks</li>
            <li>Intuitive player controls for a seamless listening experience</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="mb-4">
            Musicky implements a sequential processing system for music playback. When you add a song to your
            playlist, it joins at the end of the line. The player always processes songs from the beginning of 
            the list, ensuring a fair &ldquo;first come, first served&rdquo; approach to your music.
          </p>
          <p>
            This sequential processing approach is common in many media players and streaming services, ensuring
            a predictable and organized listening experience. Behind the scenes, each operation (adding songs, 
            playing the next track, removing items) follows strict ordering rules that maintain the integrity
            of your listening queue.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js for the framework</li>
            <li>React for user interface components</li>
            <li>TypeScript for type safety</li>
            <li>Custom hooks for state management</li>
            <li>Tailwind CSS for styling</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
} 