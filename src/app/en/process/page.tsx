import { ProcessPage, processMetadata } from "@/components/pages/ProcessPage";

export const metadata = processMetadata("en");

export default function Page() {
  return <ProcessPage locale="en" />;
}
