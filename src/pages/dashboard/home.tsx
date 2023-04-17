import Layout from "@/components/layout";
import { ReactElement } from "react";
export default function DashboardHome() {
  return <div>in home</div>;
}

DashboardHome.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
