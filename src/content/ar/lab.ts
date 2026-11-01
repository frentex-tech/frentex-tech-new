import type { LabContent } from "../lab";

const lab: LabContent = {
  eyebrow: "مختبر فرينتكس",
  title: ["شاهد الفكرة.", "ثم جرّبها بنفسك."],
  intro: "نماذج أصلية صمّمناها وطوّرنا تفاعلاتها لهذه النسخة. كل نموذج يشرح مشكلة وحلًا، ويتيح تجربة جزء من رحلة المستخدم.",
  disclosure: "نماذج توضيحية ببيانات تجريبية، وليست مشاريع عملاء.",
  filterLabel: "تصفية نماذج الأعمال",
  filters: {
    all: "كل النماذج",
    crm: "إدارة العملاء",
    erp: "أنظمة الأعمال",
    ops: "التشغيل والأتمتة",
  },
  // The lab has three cards, one per category, so a filter shows either all of them or one.
  status: (visible, total) => (visible === total ? "٣ نماذج تفاعلية" : "نموذج تفاعلي واحد"),
  crm: {
    linkLabel: "استكشف نموذج مدار لإدارة المبيعات",
    label: "CRM / SALES EXPERIENCE",
    title: "مدار — رحلة مبيعات أوضح",
    body: "من أول فرصة إلى الاتفاق، في لوحة يمكن للفريق متابعتها.",
  },
  ops: {
    linkLabel: "استكشف نموذج سير للطلبات الداخلية",
    label: "WORKFLOW / INTERNAL TOOLS",
    title: "سير — طلب لا يضيع بين الرسائل",
    body: "استلام ومراجعة وقرار، مع سجل واضح لكل خطوة.",
  },
  erp: {
    linkLabel: "استكشف نموذج رصيد للمخزون والمشتريات",
    label: "BUSINESS SYSTEMS / ERP CONCEPT",
    title: "رصيد — رؤية مشتركة للمخزون",
    body: "تابع الكميات وحدّد الاحتياج وأنشئ طلب شراء تجريبيًا.",
  },
};

export default lab;
