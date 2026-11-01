import { SolutionPage, solutionMetadata } from "@/components/pages/SolutionPage";

export const metadata = solutionMetadata("ar", "integration");

export default function Page() {
  return <SolutionPage locale="ar" slug="integration" />;
}
