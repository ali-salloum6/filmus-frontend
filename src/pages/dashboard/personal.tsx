import Layout from "@/components/layout";
import { ReactElement } from "react";
export default function Personal() {
  return <div>personal</div>;
}
Personal.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
