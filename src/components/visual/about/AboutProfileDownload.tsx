import type { Locale } from "@/i18n/config";
import { defaultLocale, localeSettings } from "@/i18n/config";
import { ArrowText } from "@/components/visual/icons";
import { asset } from "@/lib/site";

interface AboutProfileDownloadProps {
  locale: Locale;
  downloadLabel: string;
}

export function AboutProfileDownload({ locale, downloadLabel }: AboutProfileDownloadProps) {
  const isAr = locale === "ar";

  return (
    <section className="about-download-section">
      <div className="wrap">
        <div className="about-download-card">
          {/* Left / Document Preview Side */}
          <div className="download-card-visual" aria-hidden="true" dir="ltr">
            <div className="doc-preview-sheet">
              <div className="doc-sheet-header">
                <span className="doc-pdf-badge">PDF DOSSIER</span>
                <span className="doc-version-tag">2026 EDITION</span>
              </div>
              <div className="doc-sheet-body">
                <div className="doc-frentex-mark">F</div>
                <div className="doc-title-text">FRENTEX TECH</div>
                <div className="doc-subtitle-text">COMPANY PROFILE & CAPABILITIES</div>
                <div className="doc-line-skeleton">
                  <span className="doc-line w-full" />
                  <span className="doc-line w-short" />
                </div>
              </div>
              <div className="doc-sheet-footer">
                <span className="doc-secure-badge">✓ VERIFIED OFFICIAL DOCUMENT</span>
              </div>
            </div>
          </div>

          {/* Right / Copy & Action Side */}
          <div className="download-card-content">
            <span className="section-eyebrow">
              {isAr ? "الملف التعريفي للشركة" : "Corporate Overview & Dossier"}
            </span>
            <h2>
              {isAr
                ? "اطلع على إمكانياتنا الهندسية ومنهجيتنا بالتفصيل"
                : "Explore Our Full Engineering Scope & Capabilities"}
            </h2>
            <p>
              {isAr
                ? "يتضمن الملف التعريفي الشامل لشركة Frentex Tech نظرة مفصلة على نطاق حلولنا البرمجية، معايير الحوكمة، دراسات النماذج التفاعلية، ومواصفات التسليم المؤسسي."
                : "Download the complete Frentex Tech company profile for an in-depth view of our architecture frameworks, governance standards, and enterprise delivery methodology."}
            </p>

            <div className="download-action-row">
              <a
                className="button primary about-doc-btn"
                href={asset("/downloads/frentex-company-profile.pdf")}
                hrefLang={locale === defaultLocale ? undefined : localeSettings[defaultLocale].lang}
                download
              >
                <ArrowText text={downloadLabel} />
              </a>

              <div className="download-meta-chips">
                <span className="meta-chip">PDF • 2.4 MB</span>
                <span className="meta-chip">{isAr ? "النسخة المعتمدة" : "Official Edition"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
