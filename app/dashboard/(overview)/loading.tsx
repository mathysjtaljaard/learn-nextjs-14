import { init } from "@/app/middleware";
import DashboardSkeleton from "../../ui/skeletons";
export default async function Loading() {
  return <DashboardSkeleton />;
}
