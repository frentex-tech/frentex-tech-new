import type { BriefContent } from "../brief";

const brief: BriefContent = {
  closeLabel: "إغلاق",
  step: "خطوة 01 / وصف احتياجك",
  title: "لنبدأ بالسؤال الصحيح.",
  note: "هذا الملخص يبقى على جهازك ولا يُرسل إلى أي جهة.",
  serviceLabel: "ما الذي تريد بناءه؟",
  services: ["موقع أو منصة", "تطبيق جوال", "نظام ERP أو CRM", "تكامل أو أتمتة", "أحتاج مساعدة في تحديد الحل"],
  challengeLabel: "ما المشكلة التي تريد حلها؟",
  challengePlaceholder: "مثل: متابعة طلبات العملاء حاليًا تتم بين رسائل وجداول...",
  usersLabel: "من سيستخدم الحل؟",
  usersPlaceholder: "مثل: فريق المبيعات والعملاء",
  submit: "تجهيز الملخص",
  resultTitle: "ملخصك جاهز.",
  download: "تنزيل الملخص",
  edit: "تعديل",
  downloadStatus: "بدأ تنزيل الملخص على جهازك. لم تُرسل أي بيانات.",
  fileName: "frentex-project-brief.txt",
  summary: ({ service, challenge, users }) =>
    `ملخص مشروع — فرينتكس / FRENTEX TECH\n\nنوع الحل: ${service}\n\nالمشكلة:\n${challenge}\n\nالمستخدمون:\n${users}\n\nأسئلة للنقاش:\n- ما الأنظمة والبيانات المتاحة؟\n- ما أول رحلة نريد إتاحتها للمستخدم؟\n- ما معايير قبول الإصدار الأول؟\n- ما النطاق والميزانية والموعد المستهدف؟\n\nتم تجهيز الملخص محليًا. لم يتم إرسال بيانات أو حجز موعد.`,
};

export default brief;
