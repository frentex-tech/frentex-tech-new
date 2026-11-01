import type { SolutionSlug } from "./solutions";
import type { Locale } from "@/i18n/config";

export type CapabilityItem = {
  title: string;
  description: string;
  badge: string;
  icon: "platforms" | "apps" | "business" | "integration" | "automation" | "support" | "code" | "shield" | "speed" | "sync" | "cpu" | "chart";
};

export type StoryStepItem = {
  number: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
};

export type SolutionDetailEnrichment = {
  categoryLabel: string;
  architectureHeading: string;
  architectureLead: string;
  capabilitiesHeading: string;
  capabilities: CapabilityItem[];
  storySteps?: StoryStepItem[];
  outcomesHeading: string;
  outcomes: { label: string; value: string; desc: string }[];
  suitabilityTitle: string;
  deliverablesTitle: string;
  governanceTitle: string;
  relatedHeading: string;
  related: { slug: SolutionSlug; title: string; reason: string }[];
};

export function getStorySteps(enrichment: SolutionDetailEnrichment, locale: Locale, slug?: SolutionSlug): StoryStepItem[] {
  if (enrichment.storySteps && enrichment.storySteps.length > 0) {
    return enrichment.storySteps;
  }
  const isAr = locale === "ar";

  const defaultHighlights: Record<SolutionSlug, string[][]> = {
    platforms: isAr
      ? [
          ["خوادم موزعة في المملكة", "معالجة أطراف سحابية", "سرعة وصول فائقة < 30ms"],
          ["واجهات Headless مرنة", "دعم كامل للغتين RTL/LTR", "تحديثات لحظية دون كود"],
          ["بنية انعدام الثقة Zero-Trust", "حماية من هجمات DDoS", "توثيق دخول موحد SSO"],
        ]
      : [
          ["Regional Saudi Edge PoPs", "Cloud Edge Compute", "Sub-30ms Global Latency"],
          ["Headless Decoupled Mesh", "Native Dual RTL/LTR", "Instant CMS Live Sync"],
          ["Zero-Trust Security Perimeter", "Active DDoS Shield", "SAML / OAuth2 Enterprise SSO"],
        ],
    apps: isAr
      ? [
          ["استجابة 60-120fps سلسة", "استغلال عتاد الكاميرا والمستشعرات", "بصمة الوجه والإصبع الموثوقة"],
          ["قاعدة بيانات SQLite محلية", "مزامنة ثنائية ذكية", "حل تلقائي لتعارض البيانات"],
          ["تشفير محلي للبيانات AES-256", "شهادات SSL Pinning مشددة", "ربط مباشر مع الـ ERP"],
        ]
      : [
          ["Fluid 60-120 FPS Fluid Motion", "Full Camera & Sensor Integration", "Biometric Face/Touch ID"],
          ["Embedded SQLite Datastore", "Bidirectional Sync Mesh", "Deterministic Conflict Resolution"],
          ["Local AES-256 Storage", "Strict SSL Certificate Pinning", "Direct Enterprise Connectors"],
        ],
    business: isAr
      ? [
          ["مسارات اعتماد متعددة المستويات", "إدارة مركزية للمخزون والفروع", "مصفوفة صلاحيات دقيقة RBAC"],
          ["ربط فوري بمنصة فاتورة ZATCA", "توقيع رقمي وأختام مشفرة", "مطابقة محاسبية وضريبية 100%"],
          ["سجل تدقيق غير قابل للتعديل", "تنبيهات انحراف الأداء والعمليات", "تقارير مالية وتحليلية فورية"],
        ]
      : [
          ["Multi-tier Approval Workflows", "Multi-branch Inventory Sync", "Granular Role-based Access"],
          ["Direct ZATCA Phase 2 Integration", "Cryptographic Hash & Stamp", "100% Tax Reconciliation"],
          ["Immutable Audit Log Ledger", "Real-time Threshold Alerts", "Instant Executive Financial BI"],
        ],
    integration: isAr
      ? [
          ["بوابة API مركزية معتمدة", "تحديد معدل الطلبات Rate Limiting", "معايير موحدة OpenAPI 3.1"],
          ["بث أحداث Kafka عالي السعة", "بنية Zero-Loss Queue", "معالجة الرسائل لمرة واحدة بدقة"],
          ["محولات بروتوكولات مخصصة", "تحويل JSON / XML / SOAP", "إعادة محاولة آلية وسجل أخطاء"],
        ]
      : [
          ["Unified API Gateway Edge", "Token Bucket Rate Limiting", "OpenAPI 3.1 Validation"],
          ["High-throughput Kafka Stream", "Zero-Loss Queue Guarantee", "Strict Exactly-Once Delivery"],
          ["Legacy Protocol Adapters", "JSON / XML / SOAP Transformers", "Dead-Letter Auto Retry Engine"],
        ],
    automation: isAr
      ? [
          ["محرك OCR ثنائي اللغة (عربي/إنجليزي)", "استخراج الجداول بدقة 99%", "تصحيح انحناء الصفحات آليًا"],
          ["مطابقة الفواتير ثلاثية الأطراف", "فحص مالي وضريبي فوري", "كشف الفواتير المكررة والمشكوك بها"],
          ["معالجة مباشرة STP بنسبة > 85%", "إحالة ذكية للخبراء البشريين", "توثيق كامل لكافة القرارات"],
        ]
      : [
          ["Multilingual Arabic/EN OCR", "99% High-density Table Extraction", "Auto Deskew & Pre-processing"],
          ["3-Way PO & Invoice Match", "Real-time Tax Rule Validation", "Duplicate Invoice Defense"],
          ["85%+ Straight-Through STP Rate", "Human-in-the-Loop Gating", "Complete Explainable Decision Log"],
        ],
    support: isAr
      ? [
          ["فحص استباقي كل 30 ثانية", "مراقبة إقليمية (الرياض، جدة، دبي)", "جاهزية مثبتة 99.99%"],
          ["استجابة للحالات الحرجة P1 < 15 دقيقة", "إخطار مباشر عبر PagerDuty و SMS", "تحليل جذري للأسباب وتوثيق RCA"],
          ["نشر آمن للترقيات Zero-Downtime", "تحديثات أمنية أسبوعية دورية", "توافق مستمر مع التطور التقني"],
        ]
      : [
          ["30s Synthetic Regional Probes", "Multi-region Monitoring (KSA & UAE)", "99.99% Measured SLA Uptime"],
          ["< 15 Min Critical P1 Response", "Direct PagerDuty & Bridge Escalate", "Transparent Post-Mortems"],
          ["Blue/Green Zero-Downtime Deploy", "Weekly Runtime Security Patches", "Continuous Architectural Evolution"],
        ],
  };

  const currentSlugHighlights = (slug && defaultHighlights[slug]) || defaultHighlights.platforms;

  return enrichment.capabilities.slice(0, 3).map((cap, idx) => ({
    number: `0${idx + 1}`,
    badge: cap.badge,
    title: cap.title,
    description: cap.description,
    highlights: currentSlugHighlights[idx] || (isAr
      ? ["معمارية معتمدة وموثوقة", "أداء فائق مع استجابة لحظية", "أمان مؤسسي ومرونة توسع"]
      : ["Enterprise Architecture", "Sub-second Response Latency", "Strict Security & Scalability"]),
  }));
}

export const solutionDetailsData: Record<Locale, Record<SolutionSlug, SolutionDetailEnrichment>> = {
  ar: {
    platforms: {
      categoryLabel: "البنية السحابية والتجربة الرقمية",
      architectureHeading: "هيكلية برمجية للمواقع والمنصات المؤسسية",
      architectureLead: "بنية موزعة تجمع سرعة التصفح اللحظية، وتوافق تام مع محركات البحث، وأمان معتمد لإدارة بوابات الشركاء والعملاء.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "بوابات متعددة اللغات (عربي / إنجليزي)",
          description: "تصميم مخصص للاتجاهين RTL و LTR مع الحفاظ التام على هوية العلامة التجارية وسلاسة القراءة.",
          badge: "RTL & LTR Native",
          icon: "platforms",
        },
        {
          title: "أداء فائق واستجابة لحظية",
          description: "توليد مسبق للصفحات وشبكات توزيع محتوى محلية لضمان سرعة تحميل لا تتجاوز أجزاء من الثانية.",
          badge: "Sub-second TTFB",
          icon: "speed",
        },
        {
          title: "إدارة محتوى وصلاحيات دقيقة",
          description: "لوحة تحكم مرنة تتيح لفرق العمل تحديث المحتوى وتوزيع الصلاحيات دون الحاجة لتعديل الكود البرمجي.",
          badge: "Headless CMS & RBAC",
          icon: "shield",
        },
        {
          title: "تكامل سلس مع البوابات والأنظمة الداخلية",
          description: "ربط فوري عبر واجهات برمجية آمنة مع قواعد البيانات وأنظمة الـ CRM وقنوات الدفع الوطنية.",
          badge: "Secure API Connect",
          icon: "sync",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "جاهزية البنية", value: "99.9%", desc: "استقرار وثبات عبر مراكز بيانات محلية وسحابية" },
        { label: "سرعة الاستجابة", value: "< 400ms", desc: "متوسط سرعة استجابة الخوادم وتوليد الواجهات" },
        { label: "سهولة الوصول", value: "WCAG AA", desc: "التزام كامل بمعايير سهولة التصفح الشامل" },
      ],
      suitabilityTitle: "متى تكون المنصة الحل الأمثل؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع المنصة",
      related: [
        {
          slug: "apps",
          title: "تطبيقات الجوال",
          reason: "لتوفير تجربة أصيلة ومباشرة على أجهزة المستخدمين عبر iOS و Android.",
        },
        {
          slug: "integration",
          title: "التكاملات والأنظمة المخصصة",
          reason: "لربط المنصة بقواعد بياناتك المركزية وأنظمة الفواتير وبوابات الشركاء.",
        },
      ],
    },
    apps: {
      categoryLabel: "التطبيقات الذكية وتجربة الأجهزة",
      architectureHeading: "تطبيقات موثوقة لأجهزة iOS و Android",
      architectureLead: "بنية برمجية موحدة تجمع كفاءة الأداء الأصيل، والعمل دون اتصال، والتزامن الذكي لفرق الميدان والعملاء.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "أداء أصيل وتجربة مستخدم عالية",
          description: "بناء تطبيقات بمعدل 60 إطار في الثانية مع حركات انتقالية طبيعية واستجابة فورية للمس.",
          badge: "60 FPS Native Feel",
          icon: "apps",
        },
        {
          title: "العمل دون اتصال والمزامنة الذكية",
          description: "تخزين البيانات محليًا داخل الجهاز عبر SQLite، مع رفع التعديلات تلقائيًا بمجرد عودة الاتصال.",
          badge: "Offline-First Engine",
          icon: "sync",
        },
        {
          title: "أمان متقدم وحماية البيانات الحيوية",
          description: "تكامل كامل مع البصمة وFaceID، وتشفير التخزين المحلي، وحماية الاتصال بالخوادم عبر SSL Pinning.",
          badge: "Biometric & Encrypted",
          icon: "shield",
        },
        {
          title: "لوحات تحكم للمشرفين والفرق الميدانية",
          description: "أدوات مخصصة لمتابعة المهام الميدانية، والتحقق الجغرافي للمواقع، وإرسال الإشعارات المباشرة.",
          badge: "Geo-tagging & Push",
          icon: "code",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "التوافق", value: "iOS & Android", desc: "تغطية شاملة لأحدث إصدارات الأجهزة" },
        { label: "الاستقرار", value: "99.8%", desc: "معدل تشغيل خالي من التوقفات المفاجئة" },
        { label: "حجم التطبيق", value: "محسّن وسريع", desc: "تنزيل فوري واستهلاك اقتصادي للبيانات" },
      ],
      suitabilityTitle: "متى يكون تطبيق الجوال هو القرار الصائب؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع التطبيق",
      related: [
        {
          slug: "platforms",
          title: "المواقع وبوابات الأعمال",
          reason: "لتوفير بوابة ويب مركزية تكمل تجربة التطبيق وتسمح بالتسجيل والإدارة عبر المتصفح.",
        },
        {
          slug: "business",
          title: "أنظمة CRM وERP",
          reason: "لربط طلبات التطبيق وسجل العملاء مباشرة مع دورة المبيعات والمخزون.",
        },
      ],
    },
    business: {
      categoryLabel: "إدارة العمليات والموارد المؤسسية",
      architectureHeading: "توحيد العمليات بين المبيعات، المخزون، والمالية",
      architectureLead: "بنية مركزية تقضي على تكرار البيانات وتشتت الأدوات، وتربط دورة العمل من الفرصة الأولى حتى التسليم والتحصيل.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "مسار فرص ومبيعات واضح (CRM)",
          description: "تتبع كل عميل متوقع، وتسجيل الاتصالات، ومتابعة عروض الأسعار ونسب الإغلاق في لوحة تفاعلية.",
          badge: "Pipeline & Opportunity",
          icon: "business",
        },
        {
          title: "إدارة المخزون والمشتريات (ERP)",
          description: "متابعة دقيقة للأرصدة في المستودعات، وتنبيهات إعادة الطلب التلقائية، وسجل كامل لحركة الأصناف.",
          badge: "Real-time Ledger",
          icon: "chart",
        },
        {
          title: "سير موافقات مخصص ومسؤوليات واضحة",
          description: "بناء مسارات اعتماد متسلسلة للطلبات والخصومات مع سجل تدقيق يوضح من اعتمد كل خطوة ومتى.",
          badge: "Approval Hierarchy",
          icon: "shield",
        },
        {
          title: "تقارير تشغيلية ولوحات قياس تنفيذية",
          description: "استخراج مؤشرات الأداء اللحظية، وتوقع الإيرادات، ومراقبة هوامش الربح دون الحاجة لتصدير إكسل يدويًا.",
          badge: "Automated Reporting",
          icon: "speed",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "دقة البيانات", value: "100%", desc: "مصدر واحد موحد لكافة العمليات والإيرادات" },
        { label: "زمن الاعتماد", value: "-60%", desc: "تسريع دورة الموافقات الإدارية والمالية" },
        { label: "الامتثال", value: "متوافق", desc: "سجلات تدقيق كاملة تلبي متطلبات الحوكمة" },
      ],
      suitabilityTitle: "متى تحتاج شركتك إلى نظام CRM وERP؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع أنظمة الأعمال",
      related: [
        {
          slug: "integration",
          title: "التكاملات والأنظمة المخصصة",
          reason: "لربط نظام الـ ERP بنظام الفوترة الإلكترونية (زاتكا) أو البنوك وشركات الشحن.",
        },
        {
          slug: "automation",
          title: "الأتمتة والذكاء الاصطناعي",
          reason: "لأتمتة إدخال الفواتير والمستندات واستخراج البيانات مباشرة إلى الـ ERP.",
        },
      ],
    },
    integration: {
      categoryLabel: "الربط التقني وتدفق البيانات",
      architectureHeading: "بوابة تكامل موحدة وعقود ربط برمجية آمنة",
      architectureLead: "بنية وساطة تقنية موثوقة تضمن تدفق البيانات بين الأنظمة القديمة، والتطبيقات الحديثة، والخدمات الحكومية والسحابية.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "وساطة ومعالجة رسائل آمنة (Integration Bus)",
          description: "تحويل هياكل البيانات بين البروتوكولات المختلفة (REST, GraphQL, SOAP, Webhooks) بأمان وموثوقية.",
          badge: "Protocol Transformer",
          icon: "integration",
        },
        {
          title: "معالجة الأخطاء وإعادة المحاولة الذكية",
          description: "قوائم انتظار متطورة تعيد محاولة إرسال الطلبات في حال انقطاع الأنظمة الخارجية دون فقدان البيانات.",
          badge: "Circuit Breaker & Retry",
          icon: "sync",
        },
        {
          title: "تكامل مع زاتكا وبوابات الدفع الوطنية",
          description: "ربط متكامل مع متطلبات الفوترة الإلكترونية، وشركات الدفع (مدى، آبل باي)، وشركات الخدمات اللوجستية.",
          badge: "Zatca & Gateway Ready",
          icon: "shield",
        },
        {
          title: "سجلات تدقيق ومراقبة لحظية لحركة الـ API",
          description: "لوحة تحكم فورية ترصد معدل استهلاك الـ API، وسرعة الاستجابة، وتنبّه فور حدوث أي خطأ في الربط.",
          badge: "Telemetry & Logs",
          icon: "code",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "وقت المعالجة", value: "< 50ms", desc: "متوسط تحويل الرسائل وتوجيه البيانات" },
        { label: "فقدان البيانات", value: "0%", desc: "ضمان تسليم الحزم عبر قوائم انتظار آمنة" },
        { label: "التشفير", value: "TLS 1.3", desc: "تشفير كامل للبيانات أثناء النقل والتخزين" },
      ],
      suitabilityTitle: "متى تحتاج المؤسسة إلى حلول التكامل والربط؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع التكاملات",
      related: [
        {
          slug: "business",
          title: "أنظمة CRM وERP",
          reason: "لضمان تدفق بيانات المبيعات والمخزون بين الأنظمة الميدانية والمركزية.",
        },
        {
          slug: "automation",
          title: "الأتمتة والذكاء الاصطناعي",
          reason: "لتفعيل محفزات الأحداث وتمرير البيانات تلقائيًا لنماذج الذكاء الاصطناعي.",
        },
      ],
    },
    automation: {
      categoryLabel: "الذكاء الاصطناعي وأتمتة العمليات",
      architectureHeading: "أتمتة ذكية بمراجعة بشرية واضحة (Human-in-the-Loop)",
      architectureLead: "نظام يختزل الساعات المستهلكة في المهام اليدوية المتكررة، ويحوّل المستندات والبيانات غير المنظمة إلى إجراءات تنفيذية دقيقة.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "استخراج البيانات من المستندات والفواتير",
          description: "نماذج قراءة ذكية (OCR) تستخرج أرقام الفواتير، والضرائب، والبنود من ملفات PDF والصور بدقة متناهية.",
          badge: "Intelligent Document OCR",
          icon: "automation",
        },
        {
          title: "بوابة تقييم الثقة والتحقق البشري",
          description: "تنفيذ العمليات المؤكدة تلقائيًا، وتحويل الحالات غير الواضحة مباشرة إلى فريقك للمراجعة بضغطة زر.",
          badge: "Confidence Scoring Gate",
          icon: "shield",
        },
        {
          title: "مساعدات معرفية داخلية آمنة",
          description: "محركات بحث ذكية تجيب على استفسارات فريقك من واقع أدلة العمل وسياسات الشركة دون مشاركة البيانات خارجيًا.",
          badge: "Private Knowledge Assistant",
          icon: "cpu",
        },
        {
          title: "أتمتة دورات التدقيق والتصنيف",
          description: "تصنيف التذاكر الواردة والطلبات وتوجيهها للموظف المختص فورًا بناءً على محتوى الرسالة وسياقها.",
          badge: "Contextual Routing",
          icon: "speed",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "توفير الوقت", value: "-75%", desc: "اختزال وقت معالجة الفواتير والمستندات" },
        { label: "دقة الاستخراج", value: "98%+", desc: "نسبة التعرف الدقيق على الحقول الأساسية" },
        { label: "خصوصية البيانات", value: "100%", desc: "عزل كامل لبياناتك ونماذج ذكاء اصطناعي خاصة" },
      ],
      suitabilityTitle: "متى تكون الأتمتة والذكاء الاصطناعي هي الحل المناسب؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع الأتمتة",
      related: [
        {
          slug: "business",
          title: "أنظمة CRM وERP",
          reason: "لترحيل نتائج الأتمتة والمستندات المفحوصة مباشرة إلى الحسابات والمخازن.",
        },
        {
          slug: "integration",
          title: "التكاملات والأنظمة المخصصة",
          reason: "لاستقبال المستندات من البريد أو الأنظمة السحابية وتوجيه النتائج عبر API.",
        },
      ],
    },
    support: {
      categoryLabel: "المراقبة التشغيلية واستدامة الأنظمة",
      architectureHeading: "مراقبة استباقية وتطوير مستمر يواكب نمو العمل",
      architectureLead: "خطة تشغيل متكاملة تتجاوز الصيانة التقليدية: رصد استباقي للثغرات، وتحسين مستمر للأداء، وتطوير خصائص تواكب احتياج عملائك.",
      capabilitiesHeading: "القدرات الهندسية الأساسية",
      capabilities: [
        {
          title: "مراقبة صحة الخوادم والخدمات لحظيًا",
          description: "أجهزة استشعار تفحص سلامة قواعد البيانات ومعدل استجابة الـ API وتكتشف الأعطال قبل أن يشعر بها المستخدم.",
          badge: "Proactive Telemetry",
          icon: "support",
        },
        {
          title: "اتفاقيات مستوى خدمة محددة (SLA)",
          description: "التزام خطي بأزمنة الاستجابة، وتصنيف معتمد للحوادث (طارئ، هام، روتيني) مع فريق فني مخصص.",
          badge: "Guaranteed SLA Response",
          icon: "shield",
        },
        {
          title: "نسخ احتياطي مجدول واختبارات استعادة",
          description: "حفظ النسخ الاحتياطية دوريًا في بيئات معزولة مع إجراء تجارب استعادة منتظمة للتأكد من جاهزيتها.",
          badge: "Verified Disaster Recovery",
          icon: "sync",
        },
        {
          title: "إصدارات تطويرية وتحديثات دورية",
          description: "ساعات عمل مخصصة شهريًا لإضافة ميزات جديدة، وتحسين الكود، وتحديث مكتبات الأمان بشكل مستمر.",
          badge: "Sprint-based Evolution",
          icon: "code",
        },
      ],
      outcomesHeading: "معايير الجودة التقنية",
      outcomes: [
        { label: "استقرار الخوادم", value: "99.98%", desc: "متوسط معدل التوفر الفعلي للأنظمة المدعومة" },
        { label: "الاستجابة للبلاغات", value: "أقل من 60 دقيقة", desc: "للحالات الحرجة المؤثرة على العمل" },
        { label: "فحوصات الأمان", value: "أسبوعية", desc: "مراجعة استباقية للثغرات والتحديثات الأمنية" },
      ],
      suitabilityTitle: "متى تحتاج مؤسستك لعقد تطوير ودعم مستمر؟",
      deliverablesTitle: "مخرجات هندسية متفق عليها",
      governanceTitle: "معايير نحددها مع فريقك أولًا",
      relatedHeading: "حلول تكتمل مع الدعم المستمر",
      related: [
        {
          slug: "platforms",
          title: "المواقع وبوابات الأعمال",
          reason: "لضمان سرعة التصفح وتحديث الأمان وتحسين تجربة الزوار دوريًا.",
        },
        {
          slug: "apps",
          title: "تطبيقات الجوال",
          reason: "لتحديث التطبيق باستمرار تماشيًا مع تحديثات أنظمة iOS و Android ومتاجر التطبيقات.",
        },
      ],
    },
  },
  en: {
    platforms: {
      categoryLabel: "Cloud Architecture & Digital Experience",
      architectureHeading: "Enterprise Web Architecture & Digital Portals",
      architectureLead: "A distributed system combining instant sub-second response times, native search optimization, and enterprise security for customer and partner portals.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "Native Bilingual Portals (Arabic & English)",
          description: "Purpose-built RTL and LTR layouts that preserve typographic balance and brand elegance across languages.",
          badge: "RTL & LTR Native",
          icon: "platforms",
        },
        {
          title: "Ultra-Fast Edge Performance",
          description: "Prerendered static content combined with localized edge CDN distribution ensuring sub-second page loads.",
          badge: "Sub-second TTFB",
          icon: "speed",
        },
        {
          title: "Granular Content & Access Management",
          description: "Intuitive administrative control allowing business teams to update content with strict role-based access control.",
          badge: "Headless CMS & RBAC",
          icon: "shield",
        },
        {
          title: "Enterprise System & Payment Integrations",
          description: "Secure, authenticated API bridges connecting your portal directly to core databases, CRMs, and payment gateways.",
          badge: "Secure API Connect",
          icon: "sync",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "System Availability", value: "99.9%", desc: "High availability across regional and cloud nodes" },
        { label: "Response Latency", value: "< 400ms", desc: "Average server response time and page rendering" },
        { label: "Accessibility", value: "WCAG AA", desc: "Strict adherence to universal accessibility standards" },
      ],
      suitabilityTitle: "When is a Digital Platform the right fit?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "apps",
          title: "Mobile Apps",
          reason: "To deliver a native, on-device mobile experience across iOS and Android.",
        },
        {
          slug: "integration",
          title: "Integrations & Custom Systems",
          reason: "To synchronize platform user data with central ERP and billing infrastructure.",
        },
      ],
    },
    apps: {
      categoryLabel: "Mobile Engineering & Device Experience",
      architectureHeading: "Resilient Native Mobile Apps for iOS & Android",
      architectureLead: "A unified mobile engineering architecture delivering 60 FPS fluidity, offline-first reliability, and background sync for field operatives and customers.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "Fluid Native Performance",
          description: "High-frame-rate user interfaces with native touch gestures and instant transitions across iOS and Android.",
          badge: "60 FPS Native Feel",
          icon: "apps",
        },
        {
          title: "Offline-First SQLite Architecture",
          description: "Transactions and field reports execute locally and seamlessly synchronize once network connectivity resumes.",
          badge: "Offline-First Engine",
          icon: "sync",
        },
        {
          title: "Biometric Security & Encrypted Storage",
          description: "Secure Enclave integration with FaceID / TouchID, AES-256 local storage encryption, and SSL pinning.",
          badge: "Biometric & Encrypted",
          icon: "shield",
        },
        {
          title: "Operations Cockpit & Geo-Verification",
          description: "Operational tools with GPS geofencing, real-time dispatch, and targeted transactional push notifications.",
          badge: "Geo-tagging & Push",
          icon: "code",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "Platform Scope", value: "iOS & Android", desc: "Full compatibility with modern OS releases" },
        { label: "Crash-Free Rate", value: "99.8%", desc: "Rigorous automated device regression testing" },
        { label: "App Size", value: "Optimized", desc: "Fast installation and low cellular bandwidth footprint" },
      ],
      suitabilityTitle: "When does a Mobile App fit best?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "platforms",
          title: "Websites & Digital Platforms",
          reason: "To provide a desktop web portal complementary to the mobile experience.",
        },
        {
          slug: "business",
          title: "ERP & CRM Systems",
          reason: "To feed field orders and customer engagements straight into enterprise operations.",
        },
      ],
    },
    business: {
      categoryLabel: "Enterprise Operations & ERP Architecture",
      architectureHeading: "Unified Operations: CRM, Inventory & Approvals",
      architectureLead: "A centralized business system eliminating fragmented spreadsheets and disjointed tools, aligning sales, stock, and accounting.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "Visual Sales Pipeline & CRM",
          description: "Track leads, quotes, and contract milestones in an interactive kanban board with win probability metrics.",
          badge: "Pipeline & Opportunity",
          icon: "business",
        },
        {
          title: "Real-Time Inventory & Procurement Ledger",
          description: "Multi-warehouse stock visibility, automated minimum threshold purchase orders, and item ledger audits.",
          badge: "Real-time Ledger",
          icon: "chart",
        },
        {
          title: "Multi-Tier Approval Hierarchy",
          description: "Configurable workflow gates for discounts and purchase orders with verifiable audit logs and SLA timers.",
          badge: "Approval Hierarchy",
          icon: "shield",
        },
        {
          title: "Executive Dashboards & Forecasting",
          description: "Real-time revenue metrics, inventory turnover rates, and operational cash flow forecasts without manual export.",
          badge: "Automated Reporting",
          icon: "speed",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "Data Integrity", value: "100%", desc: "Single source of operational truth across all units" },
        { label: "Approval Cycle", value: "-60%", desc: "Faster internal purchase and discount authorizations" },
        { label: "Compliance", value: "Audited", desc: "Complete role-based access logs and governance records" },
      ],
      suitabilityTitle: "When does your business need ERP & CRM?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "integration",
          title: "Integrations & Custom Systems",
          reason: "To connect ERP transactions directly with ZATCA e-invoicing and corporate banks.",
        },
        {
          slug: "automation",
          title: "Automation & AI",
          reason: "To parse supplier invoices and auto-populate inventory batches without manual entry.",
        },
      ],
    },
    integration: {
      categoryLabel: "System Interoperability & API Bus",
      architectureHeading: "Enterprise Integration Gateway & Data Bus",
      architectureLead: "A fault-tolerant middleware backbone enabling continuous, bidirectional data exchange across legacy cores, cloud services, and government APIs.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "High-Throughput Enterprise Message Bus",
          description: "Intelligent protocol translation across REST, GraphQL, Webhooks, and Event Streams with zero data loss.",
          badge: "Protocol Transformer",
          icon: "integration",
        },
        {
          title: "Circuit Breakers & Exponential Retries",
          description: "Resilient queuing architecture that buffers requests during downstream outages and retries gracefully.",
          badge: "Circuit Breaker & Retry",
          icon: "sync",
        },
        {
          title: "ZATCA & Payment Gateway Connectivity",
          description: "Turnkey compliance with ZATCA Phase 2 E-Invoicing, Mada/Apple Pay endpoints, and national logistics APIs.",
          badge: "Zatca & Gateway Ready",
          icon: "shield",
        },
        {
          title: "Real-Time Telemetry & API Observability",
          description: "Live dashboard tracking throughput, latency percentiles, error rates, and security token expirations.",
          badge: "Telemetry & Logs",
          icon: "code",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "Transit Latency", value: "< 50ms", desc: "Average payload validation and routing duration" },
        { label: "Message Delivery", value: "100%", desc: "Zero data drop guarantee via persistent message queues" },
        { label: "Transport Security", value: "TLS 1.3", desc: "End-to-end payload signing and encryption" },
      ],
      suitabilityTitle: "When do you need System Integrations?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "business",
          title: "ERP & CRM Systems",
          reason: "To automate synchronization between frontline sales and backoffice financial ledgers.",
        },
        {
          slug: "automation",
          title: "Automation & AI",
          reason: "To feed incoming multi-system events directly into intelligent processing pipelines.",
        },
      ],
    },
    automation: {
      categoryLabel: "Intelligent Process Automation & AI",
      architectureHeading: "AI-Augmented Workflows with Human Oversight",
      architectureLead: "Targeted automation eliminating repetitive manual toil, transforming unstructured files into verified enterprise transactions with human-in-the-loop governance.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "Intelligent Document Parsing (OCR & NLP)",
          description: "Extract line items, tax numbers, and dates from unstructured PDFs and scans with high certainty.",
          badge: "Intelligent Document OCR",
          icon: "automation",
        },
        {
          title: "Confidence Gates & Human Escalation",
          description: "Straight-through automation for high-confidence records; ambiguous edge cases route to team review instantly.",
          badge: "Confidence Scoring Gate",
          icon: "shield",
        },
        {
          title: "Secure Private Knowledge Assistants",
          description: "Internal contextual search answering employee inquiries from verified company policies without public data leak.",
          badge: "Private Knowledge Assistant",
          icon: "cpu",
        },
        {
          title: "Automated Ticket Triage & Routing",
          description: "Semantic classification directing incoming customer requests to the exact department with context prepended.",
          badge: "Contextual Routing",
          icon: "speed",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "Processing Speed", value: "-75%", desc: "Reduction in routine manual document entry cycles" },
        { label: "Extraction Accuracy", value: "98%+", desc: "Benchmark accuracy for structured enterprise forms" },
        { label: "Privacy Boundary", value: "Zero Leak", desc: "Private model inference without training on customer data" },
      ],
      suitabilityTitle: "When does Automation & AI fit?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "business",
          title: "ERP & CRM Systems",
          reason: "To inject parsed invoices and verified customer tickets directly into operational records.",
        },
        {
          slug: "integration",
          title: "Integrations & Custom Systems",
          reason: "To pull unstructured inputs from email and cloud storage via standardized API triggers.",
        },
      ],
    },
    support: {
      categoryLabel: "System Observability & Reliability",
      architectureHeading: "Proactive Telemetry & Continuous Evolution",
      architectureLead: "A disciplined engineering partnership beyond break-fix support: proactive uptime monitoring, regular vulnerability audits, and scheduled feature sprints.",
      capabilitiesHeading: "Core Engineering Capabilities",
      capabilities: [
        {
          title: "Proactive Telemetry & Health Monitoring",
          description: "Synthetic health pings monitoring API response times and database query health before users experience degradation.",
          badge: "Proactive Telemetry",
          icon: "support",
        },
        {
          title: "Guaranteed SLA Response Tiers",
          description: "Contractual response commitments with structured escalation paths for critical, high, and routine requests.",
          badge: "Guaranteed SLA Response",
          icon: "shield",
        },
        {
          title: "Automated Backups & Disaster Drills",
          description: "Daily immutable backups stored in isolated offsite storage with recurring quarterly recovery drills.",
          badge: "Verified Disaster Recovery",
          icon: "sync",
        },
        {
          title: "Sprint-Based Feature Evolution",
          description: "Dedicated monthly engineering allocation for platform enhancements, security patches, and library updates.",
          badge: "Sprint-based Evolution",
          icon: "code",
        },
      ],
      outcomesHeading: "Technical Quality Standards",
      outcomes: [
        { label: "Observed Uptime", value: "99.98%", desc: "Historical availability across supported client stacks" },
        { label: "Incident Response", value: "< 60 mins", desc: "For critical business-impeding production events" },
        { label: "Security Cadence", value: "Weekly", desc: "Continuous vulnerability and package dependency audits" },
      ],
      suitabilityTitle: "When does Continuous Support fit?",
      deliverablesTitle: "Agreed Engineering Deliverables",
      governanceTitle: "Governance & Prerequisites Defined First",
      relatedHeading: "Complementary Solutions",
      related: [
        {
          slug: "platforms",
          title: "Websites & Digital Platforms",
          reason: "To maintain search performance, edge cache health, and continuous security patches.",
        },
        {
          slug: "apps",
          title: "Mobile Apps",
          reason: "To maintain app store compliance with annual iOS and Android operating system upgrades.",
        },
      ],
    },
  },
};
