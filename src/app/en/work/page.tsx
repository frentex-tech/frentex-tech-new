import { WorkPage, workMetadata } from "@/components/pages/WorkPage";

export const metadata = workMetadata("en");

export default function Page() {
  return <WorkPage locale="en" />;
}
