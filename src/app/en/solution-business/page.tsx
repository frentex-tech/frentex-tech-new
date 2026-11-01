import { SolutionPage, solutionMetadata } from "@/components/pages/SolutionPage";

export const metadata = solutionMetadata("en", "business");

export default function Page() {
  return <SolutionPage locale="en" slug="business" />;
}
