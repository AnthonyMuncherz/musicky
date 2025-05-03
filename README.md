# Musicky

Musicky is a web-based music player application that demonstrates sequential processing of media content. This Next.js application showcases how modern web technologies can be used to create a responsive and user-friendly music player.

## Application Description

Musicky is a music streaming application that focuses on ordered playlist management. It allows users to:

- Browse a library of available songs
- Upload your own music anonymously
- Add songs to a play queue in a specified order
- Play songs in the exact sequence they were added (First-In-First-Out)
- Remove songs from the queue
- Track recently played songs

The application implements a sequential processing pattern that ensures songs are played in the order they were added, maintaining a fair "first come, first served" approach to media playback.

## Key Operations

The application includes several core operations:

1. **Add to Queue**: Adds a song to the end of the playlist
2. **Play Next**: Removes the song at the front of the queue and plays it
3. **Remove from Queue**: Removes a specific song from the queue
4. **Peek Current**: Displays the currently playing song without removing it from the queue
5. **View History**: Shows recently played songs

## Data Organization

Musicky organizes songs in a linear, sequential structure that follows these principles:

- New songs are always added to the end of the playlist
- Songs are always played from the beginning of the playlist
- When a song finishes playing, it's removed from the playlist and the next song begins

This approach ensures a predictable and fair playback experience. The implementation uses a sequential data management pattern where elements are processed in the exact order they were received.

## Technical Implementation

The main algorithmic operations of the application include:

```typescript
// Adding a song to the queue - O(1) time complexity
function addToQueue(song) {
  playlist.push(song);
}

// Playing the next song - O(n) time complexity
function playNext() {
  const nextSong = playlist.shift();
  if (nextSong) {
    // Play the song
    history.unshift(nextSong);
  }
}

// Viewing the current song without removing it - O(1) time complexity
function peekCurrent() {
  return playlist[0];
}

// Removing a song from the queue - O(n) time complexity
function removeFromQueue(index) {
  playlist.splice(index, 1);
}
```

## Technology Stack

- **Frontend**: Next.js 15, React 19
- **Languages**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Media Playback**: HTML5 Audio API

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/musicky.git
   ```

2. Install dependencies
   ```
   cd musicky
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Key Learnings

This project demonstrates several important concepts:

1. **Sequential Processing**: How to implement ordered, sequential processing of items
2. **State Management**: Using React hooks for complex state management
3. **Media Control**: Controlling audio playback in the browser
4. **Component Design**: Creating reusable, modular components

## Performance Considerations

The application's main operations have the following performance characteristics:

- Adding songs to the queue: O(1) - constant time operation
- Playing the next song: O(n) - linear time due to array shifting
- Removing a song from the queue: O(n) - linear time due to array splicing
- Viewing the current song: O(1) - constant time operation

## Further Improvements

Future enhancements could include:

- User authentication for personalized playlists
- Cloud storage for user-uploaded songs
- Improved search and filtering options
- Playlist saving and sharing features
- Optimizing performance for larger song libraries

## License

MIT
