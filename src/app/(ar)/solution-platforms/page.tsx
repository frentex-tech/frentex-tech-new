import { SolutionPage, solutionMetadata } from "@/components/pages/SolutionPage";

export const metadata = solutionMetadata("ar", "platforms");

export default function Page() {
  return <SolutionPage locale="ar" slug="platforms" />;
}
