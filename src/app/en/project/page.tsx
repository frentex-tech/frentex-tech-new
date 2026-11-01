import { ProjectPage, projectMetadata, projectViewport } from "@/components/pages/ProjectPage";

export const metadata = projectMetadata("en");
export const viewport = projectViewport;

export default function Page() {
  return <ProjectPage locale="en" />;
}
