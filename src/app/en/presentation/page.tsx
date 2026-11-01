import { PresentationPage, presentationMetadata } from "@/components/pages/PresentationPage";

export const metadata = presentationMetadata("en");

export default function Page() {
  return <PresentationPage locale="en" />;
}
