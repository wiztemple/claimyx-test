import { fetchClaims } from "@/lib/server";
import { Dashboard } from "./components/dashboard";

export default async function DashboardPage() {
  const claims = await fetchClaims();
  return <Dashboard claims={claims} />;
}
