import { SolutionPage, solutionMetadata } from "@/components/pages/SolutionPage";

export const metadata = solutionMetadata("ar", "support");

export default function Page() {
  return <SolutionPage locale="ar" slug="support" />;
}
