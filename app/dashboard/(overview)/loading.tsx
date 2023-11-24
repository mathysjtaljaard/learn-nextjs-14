import { init } from "@/app/middleware";
import DashboardSkeleton from "../../ui/skeletons";
export default async function Loading() {
  const state = await (await init()).dbConnectionState
  console.debug('Dashboard Page - Database connection - ', state)
  return <DashboardSkeleton />;
}
