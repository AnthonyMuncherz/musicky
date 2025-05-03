/**
 * Generic Queue implementation
 * This data structure follows First-In-First-Out (FIFO) principle
 */
export class Queue<T> {
  private items: T[] = [];

  /**
   * Add an item to the end of the queue
   * @param item The item to add
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove and return the item at the front of the queue
   * @returns The first item in the queue or undefined if queue is empty
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  /**
   * View the item at the front of the queue without removing it
   * @returns The first item in the queue or undefined if queue is empty
   */
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  /**
   * Get all items in the queue without modifying it
   * @returns Array of all items in queue order
   */
  getAll(): T[] {
    return [...this.items];
  }

  /**
   * Check if the queue is empty
   * @returns True if queue has no items, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get the number of items in the queue
   * @returns The queue size
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Remove all items from the queue
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Remove a specific item from the queue by index
   * @param index The index of the item to remove
   * @returns The removed item or undefined if index is invalid
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items.splice(index, 1)[0];
  }
} 