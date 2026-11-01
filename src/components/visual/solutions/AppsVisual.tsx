"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface AppsVisualProps {
  locale: Locale;
}

export function AppsVisual({ locale }: AppsVisualProps) {
  const isAr = locale === "ar";
  const [appMode, setAppMode] = useState<"customer" | "field" | "manager">("customer");
  const [isOffline, setIsOffline] = useState(false);
  const [syncedCount, setSyncedCount] = useState(14);

  const modes = [
    { id: "customer", name: isAr ? "تطبيق العملاء" : "Customer App", icon: "👤" },
    { id: "field", name: isAr ? "الفرق الميدانية" : "Field Operations", icon: "🛠️" },
    { id: "manager", name: isAr ? "لوحة الإدارة" : "Executive View", icon: "📊" },
  ] as const;

  return (
    <div className="tech-visual-card apps-visual-root">
      {/* Top Header Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-device-badge">iOS & Android Native Runtime</span>
        </div>
        <div className="tech-toolbar-status">
          <button
            type="button"
            className={`offline-toggle-btn ${isOffline ? "offline" : "online"}`}
            onClick={() => setIsOffline(!isOffline)}
            aria-label={isAr ? "تبديل حالة الاتصال بالإنترنت" : "Toggle Network State"}
          >
            <span className="network-dot" />
            <span>{isOffline ? (isAr ? "وضع دون اتصال (SQLite)" : "Offline Mode (SQLite)") : (isAr ? "متصل بالخادم (Synced)" : "Online (Synced)")}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Layout: Device on one side, telemetry and features on the other */}
      <div className="apps-showcase-grid">
        {/* Phone Frame Device */}
        <div className="phone-mockup-wrapper">
          <div className="phone-device-frame">
            {/* Top Speaker / Dynamic Island */}
            <div className="phone-top-island">
              <span className="camera-lens" />
            </div>

            {/* Mobile Status Bar */}
            <div className="phone-status-bar">
              <span className="phone-time">9:41</span>
              <div className="phone-icons">
                <span className="phone-signal">5G</span>
                <span className="phone-battery">100%</span>
              </div>
            </div>

            {/* In-App Screen Content */}
            <div className="phone-screen-content">
              {/* App Bar */}
              <div className="app-internal-header">
                <div className="app-avatar-box">
                  <span className="app-avatar-dot" />
                  <span className="app-user-name">{isAr ? "فرينتكس تك" : "Frentex App"}</span>
                </div>
                <div className="app-header-badges">
                  {isOffline ? (
                    <span className="app-badge offline-badge">{isAr ? "مخزن محلياً" : "Cached"}</span>
                  ) : (
                    <span className="app-badge live-badge">{isAr ? "مباشر" : "Live"}</span>
                  )}
                </div>
              </div>

              {/* Mode Screen 1: Customer View */}
              {appMode === "customer" && (
                <div className="screen-mode-content animate-fade-in">
                  <div className="mobile-metric-card">
                    <small>{isAr ? "حالة الخدمة الحالية" : "Active Service Request"}</small>
                    <div className="mobile-request-status">
                      <strong>#REQ-8941</strong>
                      <span className="status-pill active-pill">{isAr ? "قيد التنفيذ" : "In Progress"}</span>
                    </div>
                    <div className="mobile-progress-bar">
                      <div className="progress-fill" style={{ width: "70%" }} />
                    </div>
                  </div>

                  <div className="mobile-action-list">
                    <div className="mobile-action-item">
                      <span className="item-icon">📦</span>
                      <div>
                        <strong>{isAr ? "تسليم البوابة الرقمية" : "Portal Milestone"}</strong>
                        <p>{isAr ? "تم إكمال اختبارات القبول" : "UAT verified successfully"}</p>
                      </div>
                      <span className="item-check">✓</span>
                    </div>
                    <div className="mobile-action-item">
                      <span className="item-icon">🔐</span>
                      <div>
                        <strong>{isAr ? "التحقق الثنائي للموظفين" : "Biometric Auth Setup"}</strong>
                        <p>{isAr ? "مفعل عبر FaceID" : "Protected by FaceID"}</p>
                      </div>
                      <span className="item-check">✓</span>
                    </div>
                  </div>

                  <div className="mobile-push-preview">
                    <span className="push-bell">🔔</span>
                    <div>
                      <small>{isAr ? "إشعار فوري جديد" : "Push Notification"}</small>
                      <p>{isAr ? "تم توثيق الدفعة بنجاح وإرسال السند." : "Payment verified & receipt generated."}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode Screen 2: Field Operations View */}
              {appMode === "field" && (
                <div className="screen-mode-content animate-fade-in">
                  <div className="mobile-field-header">
                    <div>
                      <small>{isAr ? "مهمة ميدانية نشطة" : "Assigned Field Task"}</small>
                      <h4>{isAr ? "فحص وتركيب الخوادم" : "Server Rack Inspection"}</h4>
                    </div>
                    <span className="gps-pill">📍 GPS {isAr ? "موثق" : "Locked"}</span>
                  </div>

                  <div className="field-checklist">
                    <div className="check-row done">
                      <span className="check-box">✓</span>
                      <span>{isAr ? "التحقق من اتصال الشبكة" : "Network continuity test"}</span>
                    </div>
                    <div className="check-row done">
                      <span className="check-box">✓</span>
                      <span>{isAr ? "مطابقة الأرقام التسلسلية" : "Hardware serial audit"}</span>
                    </div>
                    <div className="check-row pending">
                      <span className="check-box">○</span>
                      <span>{isAr ? "توقيع محضر الاستلام الإلكتروني" : "Sign digital handover"}</span>
                    </div>
                  </div>

                  {isOffline ? (
                    <div className="offline-field-notice">
                      <span className="warn-icon">⚡</span>
                      <div>
                        <strong>{isAr ? "العمل دون اتصال مفعّل" : "Offline Storage Active"}</strong>
                        <p>{isAr ? "3 إجراءات بانتظار المزامنة" : "3 actions queued for auto-sync"}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="mobile-btn-submit"
                      onClick={() => setSyncedCount(syncedCount + 1)}
                    >
                      {isAr ? "رفع التقرير الآن ↖" : "Upload Report Now ↗"}
                    </button>
                  )}
                </div>
              )}

              {/* Mode Screen 3: Manager Dashboard */}
              {appMode === "manager" && (
                <div className="screen-mode-content animate-fade-in">
                  <div className="manager-kpi-row">
                    <div className="kpi-mini-card">
                      <small>{isAr ? "الطلبات النشطة" : "Active Orders"}</small>
                      <strong>142</strong>
                    </div>
                    <div className="kpi-mini-card">
                      <small>{isAr ? "نسبة الإنجاز" : "SLA Compliance"}</small>
                      <strong>99.4%</strong>
                    </div>
                  </div>

                  <div className="manager-approval-card">
                    <div className="approval-head">
                      <span>{isAr ? "موافقة عاجلة مطلوبة" : "Pending Approval"}</span>
                      <strong className="amount-badge">24,500 SAR</strong>
                    </div>
                    <p>{isAr ? "أمر شراء رخص برمجية لفريق الرياض" : "Software licenses for Riyadh tech unit"}</p>
                    <div className="approval-buttons">
                      <button type="button" className="app-btn-approve">{isAr ? "اعتماد بالبصمة ✓" : "Approve (Bio) ✓"}</button>
                      <button type="button" className="app-btn-reject">{isAr ? "مراجعة" : "Review"}</button>
                    </div>
                  </div>
                </div>
              )}

              {/* App Bottom Navigation Bar */}
              <div className="phone-bottom-nav">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`nav-tab-item ${appMode === m.id ? "active" : ""}`}
                    onClick={() => setAppMode(m.id)}
                  >
                    <span className="tab-icon">{m.icon}</span>
                    <span className="tab-label">{m.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Highlights Beside Device */}
        <div className="apps-tech-telemetry">
          <div className="telemetry-intro">
            <span className="telemetry-pill">{isAr ? "هندسة التطبيقات الأصيلة" : "Native Mobile Architecture"}</span>
            <h3>{isAr ? "أداء فائق واستجابة دون انقطاع" : "High-Performance Offline-First Engineering"}</h3>
            <p>
              {isAr
                ? "نبني تطبيقات لا تتوقف عند غياب إشارة الإنترنت. هيكلية SQLite المحلية تضمن استمرار العمل الميداني وإتمام الطلبات ومزامنة التغييرات تلقائيًا وبأمان تشفير تام."
                : "Applications engineered for continuous field reliability. A local SQLite persistence layer keeps frontline workflows active offline, auto-syncing payloads once connected."}
            </p>
          </div>

          <div className="tech-spec-cards">
            <div className="spec-card">
              <div className="spec-icon-wrap">⚡</div>
              <div>
                <strong>{isAr ? "العمل دون اتصال (Offline-First)" : "Local Offline Persistence"}</strong>
                <p>{isAr ? "حفظ التعديلات في قاعدة بيانات داخل الجهاز ومزامنتها تلقائيًا." : "Zero downtime for field teams with automated background sync."}</p>
              </div>
            </div>
            <div className="spec-card">
              <div className="spec-icon-wrap">🛡️</div>
              <div>
                <strong>{isAr ? "حماية وتشفير متكامل (Biometric Security)" : "Hardware Security & Biometrics"}</strong>
                <p>{isAr ? "تسجيل دخول ببصمة الوجه / الإصبع وتشفير محلي للبيانات." : "FaceID/TouchID integration with hardware enclave encryption."}</p>
              </div>
            </div>
            <div className="spec-card">
              <div className="spec-icon-wrap">🔄</div>
              <div>
                <strong>{isAr ? "تزامن لحظي متعدد الأجهزة" : "Cross-Platform State Sync"}</strong>
                <p>{isAr ? "تحديث مباشر لحالة العمليات بين الهاتف ولوحة تحكم الإدارة." : "Real-time WebSockets keep managers and operatives aligned."}</p>
              </div>
            </div>
          </div>

          <div className="interactive-mode-bar">
            <span>{isAr ? "جرّب التبديل بين واجهات التطبيق:" : "Switch simulated user interface:"}</span>
            <div className="mode-btn-group">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`btn-mode-select ${appMode === m.id ? "active" : ""}`}
                  onClick={() => setAppMode(m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
