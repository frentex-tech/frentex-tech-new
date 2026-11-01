import { ProcessPage, processMetadata } from "@/components/pages/ProcessPage";

export const metadata = processMetadata("ar");

export default function Page() {
  return <ProcessPage locale="ar" />;
}
