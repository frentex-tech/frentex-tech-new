import type { PresentationContent } from "../pages";

const presentation: PresentationContent = {
  meta: {
    title: "المراجع وفكرة التصميم | Frentex Tech",
    description: "Frentex Tech حلول برمجية للشركات والمؤسسات في السعودية.",
  },
  intro: {
    eyebrow: "CLIENT PRESENTATION / REFERENCES",
    title: "ما الذي ألهم منهجنا؟",
    lead: "مراجع لعرض خدمات الشركات وطريقة التسليم. أخذنا مبادئ الوضوح وتنظيم المحتوى، وطوّرنا تصميم Frentex Tech ونماذجه الأصلية.",
  },
  references: [
    { name: "إجادة", note: "مرجع إقليمي لعرض حلول الأعمال وفئات الخدمات.", href: "https://www.ejada.com/en/home" },
    {
      name: "ScienceSoft",
      note: "وضوح إدارة التنفيذ والمراحل والنطاق والتغيير.",
      href: "https://www.scnsoft.com/software-development/about/how-we-work",
    },
    {
      name: "Netguru",
      note: "تنظيم خدمات التطوير من الاكتشاف حتى الصيانة.",
      href: "https://www.netguru.com/services/web-development",
    },
    {
      name: "thoughtbot",
      note: "بدء المنتج بفهم المستخدم والمشكلة والاحتياج.",
      href: "https://thoughtbot.com/playbook/strategy/customer-discovery",
    },
    { name: "Work & Co", note: "مرجع لطريقة عرض الأعمال والمنتجات الرقمية.", href: "https://www.work.co/clients/" },
    { name: "Ramotion", note: "مرجع لتقديم الهوية وتجارب المنتجات بصريًا.", href: "https://www.ramotion.com/work/" },
  ],
  referenceLink: "افتح المرجع ↗",
  closing: {
    title: "كيف ترجمنا ذلك إلى Frentex Tech؟",
    paragraphs: [
      "لغة تخاطب المؤسسة وصاحب القرار، خدمات بمخرجات وحدود واضحة، مراحل تسليم قابلة للمراجعة، ونماذج تفاعلية تشرح الحلول بصدق.",
      "لا تمثل هذه المراجع شراكات أو عملاء للشركة. نماذج مدار وسير ورصيد تجارب توضيحية أصلية.",
    ],
    action: "شاهد موقع Frentex Tech ↖",
  },
};

export default presentation;
