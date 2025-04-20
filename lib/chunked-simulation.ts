import {
  Claim,
  RevenueSimulationParams,
  SimulationResult,
} from "@/types/types";

interface ProgressData {
  current: number;
  total: number;
  percent: number;
}

interface SimulationOptions {
  iterations?: number;
  chunkSize?: number;
  onProgress?: ((data: ProgressData) => void) | null;
}

/**
 * Run Monte Carlo simulation with chunked processing to avoid UI blocking
 * @param claims Array of claim objects
 * @param params Simulation parameters containing probabilities
 * @param options Configuration options
 * @returns Promise that resolves with simulation results
 */
export function runChunkedSimulation(
  claims: Claim[],
  params: RevenueSimulationParams,
  options: SimulationOptions = {}
): Promise<SimulationResult> {
  const { iterations = 2000, chunkSize = 200, onProgress = null } = options;

  return new Promise((resolve) => {
    const results: number[] = [];
    let processedIterations = 0;

    // Process a chunk of iterations
    function processChunk() {
      const startIdx = processedIterations;
      const endIdx = Math.min(startIdx + chunkSize, iterations);

      // Process this chunk of iterations
      for (let i = startIdx; i < endIdx; i++) {
        let totalRevenue = 0;

        for (const claim of claims) {
          let probability: number;

          switch (claim.payment_status) {
            case "Pending":
              probability = params.pendingProbability / 100;
              break;
            case "Approved":
              probability = params.approvedProbability / 100;
              break;
            case "Denied":
              probability = params.deniedProbability / 100;
              break;
            default:
              probability = 0;
          }

          // Randomly determine if claim gets paid based on probability
          if (Math.random() < probability) {
            totalRevenue += claim.amount;
          }
        }

        results.push(totalRevenue);
        processedIterations++;
      }

      // Report progress if callback provided
      if (onProgress) {
        onProgress({
          current: processedIterations,
          total: iterations,
          percent: Math.floor((processedIterations / iterations) * 100),
        });
      }

      // If we've processed all iterations, finish up
      if (processedIterations >= iterations) {
        finishSimulation();
      } else {
        // Schedule next chunk with setTimeout to yield to the main thread
        setTimeout(processChunk, 0);
      }
    }

    // Process results and resolve the promise
    function finishSimulation() {
      // Sort results for percentile calculations
      results.sort((a, b) => a - b);

      const percentiles = [
        results[Math.floor(iterations * 0.05)],
        results[Math.floor(iterations * 0.1)],
        results[Math.floor(iterations * 0.25)],
        results[Math.floor(iterations * 0.5)],
        results[Math.floor(iterations * 0.75)],
        results[Math.floor(iterations * 0.9)],
        results[Math.floor(iterations * 0.95)],
      ];

      const expectedRevenue =
        results.reduce((sum, value) => sum + value, 0) / results.length;

      const minValue = Math.min(...results);
      const maxValue = Math.max(...results);
      const bucketSize = (maxValue - minValue) / 10 || 1; // Avoid division by zero
      const histogram = Array(10).fill(0);

      results.forEach((value) => {
        const bucketIndex = Math.min(
          Math.floor((value - minValue) / bucketSize),
          9
        );
        histogram[bucketIndex]++;
      });

      resolve({
        expectedRevenue,
        percentiles,
        histogram,
        minRevenue: minValue,
        maxRevenue: maxValue,
      });
    }

    // Start processing the first chunk
    processChunk();
  });
}
