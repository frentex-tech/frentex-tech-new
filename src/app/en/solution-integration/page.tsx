import { SolutionPage, solutionMetadata } from "@/components/pages/SolutionPage";

export const metadata = solutionMetadata("en", "integration");

export default function Page() {
  return <SolutionPage locale="en" slug="integration" />;
}
