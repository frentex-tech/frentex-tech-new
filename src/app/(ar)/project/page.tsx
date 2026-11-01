import { ProjectPage, projectMetadata, projectViewport } from "@/components/pages/ProjectPage";

export const metadata = projectMetadata("ar");
export const viewport = projectViewport;

export default function Page() {
  return <ProjectPage locale="ar" />;
}
