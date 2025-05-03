import React from 'react';
import Layout from '@/components/Layout';

export default function AlgorithmAnalysis() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Algorithm Analysis</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Operation: Play Next Song</h2>
          <p className="mb-4">
            This operation is one of the core functionalities of our music player. It retrieves and plays
            the next song in the queue, following the First-In-First-Out principle where songs are played
            in the exact order they were added.
          </p>

          <div className="bg-foreground/5 p-6 rounded-lg my-6 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap">
{`// Play the next song in the queue
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
}, [currentSong]);`}
            </pre>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Time Complexity Analysis</h2>
          
          <h3 className="text-xl font-medium mb-3">Operation Breakdown</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>
              <strong>History Update</strong>: <code>setHistory(prev =&gt; [currentSong, ...prev])</code>
              <ul className="list-disc pl-6 mt-2">
                <li>Time Complexity: O(n) - creating a new array with spread operator</li>
                <li>This operation requires copying all elements of the previous history array</li>
              </ul>
            </li>
            <li>
              <strong>Dequeue Operation</strong>: <code>queueRef.current.dequeue()</code>
              <ul className="list-disc pl-6 mt-2">
                <li>Time Complexity: O(n) - due to array shift operation</li>
                <li>This operation uses JavaScript&apos;s <code>shift()</code> method which has O(n) complexity</li>
                <li>Each element in the array must be shifted left by one position</li>
              </ul>
            </li>
            <li>
              <strong>State Update</strong>: <code>setCurrentSong(nextSong || null)</code>
              <ul className="list-disc pl-6 mt-2">
                <li>Time Complexity: O(1) - simple variable assignment</li>
              </ul>
            </li>
            <li>
              <strong>Audio Playback</strong>: Setting source and playing audio
              <ul className="list-disc pl-6 mt-2">
                <li>Time Complexity: O(1) - these are constant time operations</li>
                <li>Setting an audio element&apos;s source is a simple property assignment</li>
                <li>The <code>play()</code> method initiates playback but doesn&apos;t depend on array size</li>
              </ul>
            </li>
          </ol>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Overall Time Complexity</h2>
          <p className="mb-4">
            The dominant operations in the algorithm are:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>The <code>dequeue</code> operation: O(n) time complexity</li>
            <li>The history update with array spread: O(n) time complexity</li>
          </ul>
          
          <p className="mb-4">
            Therefore, the overall time complexity of the <code>playNext</code> function is <strong>O(n)</strong>,
            where n is the maximum of either the queue size or history size.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Efficiency Analysis</h2>
          <p className="mb-4">
            While the time complexity is O(n), it&apos;s important to consider the actual performance in a music player context:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              In a typical music playing scenario, the queue and history sizes are relatively small
              (usually tens or at most hundreds of songs), making the O(n) operations practically efficient
              for normal usage patterns.
            </li>
            <li>
              The dequeue operation happens infrequently (only when a song finishes or the user manually
              skips), which means even with O(n) complexity, the real-world performance impact is minimal.
            </li>
            <li>
              For extremely large playlists (thousands of songs), we could consider optimizing the implementation
              to use a more efficient data structure like a linked list or a circular buffer, which would
              provide O(1) time complexity for both enqueue and dequeue operations.
            </li>
            <li>
              When handling uploaded songs, the application maintains the same sequential processing pattern.
              Uploaded songs are stored in local storage and added to the queue using the same enqueue operation,
              ensuring consistent FIFO behavior regardless of the song source.
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
          <p className="mb-4">
            The current implementation with an array-based queue has a time complexity of O(n) for the{' '}
            <code>playNext</code> operation, primarily due to the array shift operation in the dequeue method.
            This is adequate for standard music player use cases with reasonable queue sizes.
          </p>
          <p>
            For applications requiring handling of very large queues or high-frequency dequeue operations,
            an alternative implementation with O(1) time complexity for both enqueue and dequeue would be
            more suitable, though it would require a more complex data structure.
          </p>
        </section>
      </div>
    </Layout>
  );
} 