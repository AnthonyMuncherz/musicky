import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Experience Music Differently
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Welcome to Musicky, where your music journey becomes a seamless, organized experience. 
            Discover a new way to enjoy your favorite tracks with our innovative approach to music playback.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Playlist Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your music, your way. Our unique queue system ensures your songs play exactly how you want them, when you want them.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Upload & Share</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your music with the world. Upload your tracks anonymously and become part of our growing community.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your listening history and discover new favorites with our intuitive interface.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Musicky?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">✨</div>
                <div>
                  <h3 className="font-semibold mb-1">Crystal Clear Sound</h3>
                  <p className="text-gray-600 dark:text-gray-300">High-quality audio playback for the perfect listening experience.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">🎯</div>
                <div>
                  <h3 className="font-semibold mb-1">Organized Playback</h3>
                  <p className="text-gray-600 dark:text-gray-300">Never lose track of your music with our sequential playback system.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">🚀</div>
                <div>
                  <h3 className="font-semibold mb-1">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300">Instant playback and smooth transitions between tracks.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">🎨</div>
                <div>
                  <h3 className="font-semibold mb-1">Beautiful Interface</h3>
                  <p className="text-gray-600 dark:text-gray-300">Clean, modern design that puts your music first.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">🔒</div>
                <div>
                  <h3 className="font-semibold mb-1">Private & Secure</h3>
                  <p className="text-gray-600 dark:text-gray-300">Anonymous uploads and secure playback for your peace of mind.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-6 w-6 text-purple-600">💫</div>
                <div>
                  <h3 className="font-semibold mb-1">Always Evolving</h3>
                  <p className="text-gray-600 dark:text-gray-300">Regular updates and new features to enhance your experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Music Experience?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of music lovers who have already discovered the Musicky difference.
          </p>
          <a 
            href="/" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Start Listening Now
          </a>
        </div>
      </div>
    </Layout>
  );
} 