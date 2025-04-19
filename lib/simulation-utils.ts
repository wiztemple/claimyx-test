import {
  Claim,
  RevenueSimulationParams,
  SimulationResult,
} from "@/types/types";

/**
 * Run Monte Carlo simulation to forecast revenue based on claims and probabilities
 * @param claims Array of claim objects
 * @param params Probability parameters for different claim statuses
 * @param iterations Number of simulation iterations (default: 2000)
 * @returns Simulation results including percentiles and revenue statistics
 */
export function runMonteCarloSimulation(
  claims: Claim[],
  params: RevenueSimulationParams,
  iterations: number = 2000
): SimulationResult {
  const results: number[] = [];

  for (let i = 0; i < iterations; i++) {
    let totalRevenue = 0;

    for (const claim of claims) {
      let probability;

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
  }

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
    results.reduce((sum, value) => sum + value, 0) / iterations;

  const minValue = Math.min(...results);
  const maxValue = Math.max(...results);
  const bucketSize = (maxValue - minValue) / 10;
  const histogram = Array(10).fill(0);

  results.forEach((value) => {
    const bucketIndex = Math.min(
      Math.floor((value - minValue) / bucketSize),
      9
    );
    histogram[bucketIndex]++;
  });

  return {
    expectedRevenue,
    percentiles,
    histogram,
    minRevenue: minValue,
    maxRevenue: maxValue,
  };
}
