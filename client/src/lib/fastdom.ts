/**
 * FastDOM - Eliminates forced reflows by batching DOM reads and writes
 * This prevents layout thrashing and improves performance
 *
 * Usage:
 * fastdom.measure(() => {
 *   const height = element.offsetHeight; // Read
 *   return height;
 * }).then(height => {
 *   fastdom.mutate(() => {
 *     element.style.height = height + 'px'; // Write
 *   });
 * });
 */

type Task = () => void;
type MeasureTask<T> = () => T;

class FastDOM {
  private measureQueue: Array<() => void> = [];
  private mutateQueue: Array<() => void> = [];
  private isScheduled = false;

  /**
   * Schedule a DOM read operation
   */
  measure<T>(fn: MeasureTask<T>): Promise<T> {
    return new Promise((resolve) => {
      this.measureQueue.push(() => {
        const result = fn();
        resolve(result);
      });
      this.scheduleFlush();
    });
  }

  /**
   * Schedule a DOM write operation
   */
  mutate(fn: Task): Promise<void> {
    return new Promise((resolve) => {
      this.mutateQueue.push(() => {
        fn();
        resolve();
      });
      this.scheduleFlush();
    });
  }

  /**
   * Clear all pending operations
   */
  clear(): void {
    this.measureQueue = [];
    this.mutateQueue = [];
  }

  private scheduleFlush(): void {
    if (!this.isScheduled) {
      this.isScheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  private flush(): void {
    // Execute all read operations first
    const measures = this.measureQueue.slice();
    this.measureQueue = [];

    measures.forEach((measure) => measure());

    // Then execute all write operations
    const mutations = this.mutateQueue.slice();
    this.mutateQueue = [];

    mutations.forEach((mutate) => mutate());

    this.isScheduled = false;

    // If new tasks were added during flush, schedule another flush
    if (this.measureQueue.length > 0 || this.mutateQueue.length > 0) {
      this.scheduleFlush();
    }
  }
}

export const fastdom = new FastDOM();

/**
 * React hook for FastDOM operations
 */
export function useFastDOM() {
  return {
    measure: fastdom.measure.bind(fastdom),
    mutate: fastdom.mutate.bind(fastdom),
    clear: fastdom.clear.bind(fastdom),
  };
}

/**
 * Batch multiple DOM operations
 */
export async function batchDOM<T>(
  reads: Array<() => any>,
  writes: Array<(results: any[]) => void>
): Promise<T[]> {
  const results: any[] = [];

  // Execute all reads
  for (const read of reads) {
    const result = await fastdom.measure(read);
    results.push(result);
  }

  // Execute all writes with read results
  for (const write of writes) {
    await fastdom.mutate(() => write(results));
  }

  return results;
}
