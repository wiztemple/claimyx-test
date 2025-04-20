/**
 * Creates a simulation worker and provides methods to run simulations
 */
class SimulationWorkerService {
  constructor() {
    this.worker = null;
    this.isInitialized = false;
    this.pendingCallbacks = new Map();
    this.requestId = 0;
  }

  /**
   * Initialize the web worker
   * @returns {Promise} Promise that resolves when worker is initialized
   */
  init() {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        // Create the worker
        this.worker = new Worker(
          new URL("./simulation-worker.js", import.meta.url)
        );

        // Set up message handler
        this.worker.onmessage = (e) => {
          const { requestId, success, result, error } = e.data;

          if (requestId && this.pendingCallbacks.has(requestId)) {
            const { resolve, reject } = this.pendingCallbacks.get(requestId);

            if (success) {
              resolve(result);
            } else {
              reject(new Error(error));
            }

            this.pendingCallbacks.delete(requestId);
          }
        };

        this.worker.onerror = (error) => {
          console.error("Worker error:", error);
          // Handle any pending callbacks with the error
          this.pendingCallbacks.forEach(({ reject }) => {
            reject(new Error("Worker error occurred"));
          });
          this.pendingCallbacks.clear();
        };

        this.isInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Run a simulation using the worker
   * @param {Array} claims Array of claim objects
   * @param {Object} params Simulation parameters
   * @param {number} iterations Number of simulation runs
   * @returns {Promise} Promise that resolves with simulation results
   */
  runSimulation(claims, params, iterations = 2000) {
    return this.init().then(() => {
      return new Promise((resolve, reject) => {
        const requestId = ++this.requestId;

        this.pendingCallbacks.set(requestId, { resolve, reject });

        this.worker.postMessage({
          requestId,
          claims,
          params,
          iterations,
        });
      });
    });
  }

  /**
   * Clean up resources when done with the worker
   */
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.isInitialized = false;
      this.pendingCallbacks.clear();
    }
  }
}

// Singleton instance to be shared across components
let instance = null;

/**
 * Get the worker service instance (creates it if needed)
 * @returns {SimulationWorkerService} The simulation worker service
 */
export function getSimulationWorkerService() {
  if (!instance) {
    instance = new SimulationWorkerService();
  }
  return instance;
}
