import { ContactPage, contactMetadata } from "@/components/pages/ContactPage";

export const metadata = contactMetadata("ar");

export default function Page() {
  return <ContactPage locale="ar" />;
}
