import { ServicesPage, servicesMetadata } from "@/components/pages/ServicesPage";

export const metadata = servicesMetadata("ar");

export default function Page() {
  return <ServicesPage locale="ar" />;
}
