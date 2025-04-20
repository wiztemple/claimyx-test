"use server";

import { Claim } from "@/types/types";
import { mockClaims } from "./data";

export async function fetchClaims(): Promise<Claim[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockClaims;
}
