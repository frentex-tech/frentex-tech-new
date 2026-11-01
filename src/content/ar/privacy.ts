import type { PrivacyContent } from "../pages";

const privacy: PrivacyContent = {
  meta: {
    title: "خصوصية الموقع | Frentex Tech",
    description: "كيف تعمل نماذج الموقع والاتصال.",
  },
  intro: {
    eyebrow: "WEBSITE PRIVACY",
    title: "معلومات واضحة عن استخدام الموقع.",
    lead: "آخر تحديث: 16 أكتوبر 2026",
  },
  sections: [
    {
      title: "الملخص والنماذج",
      body: "تعمل النماذج التفاعلية وملخص المشروع داخل متصفحك. لا يرسل هذا الموقع ما تدخله إلى خادم للشركة، ولا يحتفظ به بعد إعادة تحميل الصفحة. الملف الذي تنزله يبقى على جهازك.",
    },
    {
      title: "الاتصال وروابط الخارج",
      body: "عند فتح WhatsApp أو الاتصال هاتفيًا تنتقل إلى الخدمة المختارة؛ تنطبق سياساتها على استخدامك لها. شارك فقط المعلومات اللازمة لبدء النقاش، وتجنب إرسال أسرار أو بيانات حساسة في الملخص الأولي.",
    },
    {
      title: "الاستضافة",
      body: "الموقع مستضاف على GitHub Pages. قد يعالج مزود الاستضافة معلومات الاتصال التقنية وفق سياسته. لا نضيف أدوات إعلانات أو تحليلات إلى هذه النسخة، والخطوط مستضافة مع الموقع.",
    },
  ],
  hostingPolicy: {
    label: "سياسة خصوصية GitHub ↗",
    href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
  },
  inquiries: { title: "استفسارات الموقع", before: "للاستفسار عن المعلومات المنشورة: ", after: "." },
};

export default privacy;
