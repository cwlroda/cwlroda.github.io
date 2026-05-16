import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import AuroraContact from "../../aurora/Contact";
import PageHero from "../../aurora/PageHero";
import SectionHead from "../../aurora/SectionHead";
import LocationWidget from "../../aurora/widgets/Location";
import NewsletterWidget from "../../aurora/widgets/Newsletter";
import { useAur, aurSans, aurMono } from "../../aurora/tokens";
import { contactPageData, greeting } from "../../portfolio";
import "../../aurora/aurora.css";

const blogSection = contactPageData.blogSection;
const bugReporting = contactPageData.bugReporting;

function Contact(props) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <PageHero
        kicker="01 / Contact"
        title={contactPageData.contactSection.title}
        description={contactPageData.contactSection.description}
        chips={[
          { label: "● Open to chat", color: AUR.ok },
          { label: "Singapore · GMT+8", color: AUR.link },
        ]}
      />

      <section>
        <SectionHead
          k="02"
          label="Channels"
          title="Where to reach me."
          kicker="Email is fastest. Everything else routes back here eventually."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="aur-stack-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 16,
            }}
          >
            <div
              style={{
                position: "relative",
                background: AUR.panel,
                border: `1px solid ${AUR.rule}`,
                borderRadius: 16,
                padding: 28,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 320,
                  height: 320,
                  top: -160,
                  right: -160,
                  background: `radial-gradient(circle, ${AUR.glowA} 0%, transparent 65%)`,
                  filter: "blur(50px)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    ...aurMono,
                    fontSize: 11,
                    color: AUR.mutedHi,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                  }}
                >
                  ✉ Direct lines
                </div>
                <h3
                  style={{
                    ...aurSans,
                    fontSize: 26,
                    fontWeight: 600,
                    color: AUR.inkBold,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Send me a note.
                </h3>
                <p
                  style={{
                    ...aurSans,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: AUR.mutedHi,
                    marginTop: 12,
                  }}
                >
                  Happy to talk about VLMs, vision pipelines, MLOps, or anything
                  that pushes models from a notebook into production. I usually
                  reply within a working day.
                </p>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={greeting.data.mail}
                    style={{
                      ...aurSans,
                      fontSize: 14,
                      fontWeight: 500,
                      padding: "12px 20px",
                      borderRadius: 10,
                      background: AUR.inkBold,
                      color: AUR.inkInverse,
                      textDecoration: "none",
                    }}
                  >
                    Email me →
                  </a>
                  <a
                    href={greeting.data.resumeLink}
                    style={{
                      ...aurSans,
                      fontSize: 14,
                      fontWeight: 500,
                      padding: "12px 20px",
                      borderRadius: 10,
                      background: AUR.panelHi,
                      color: AUR.ink,
                      textDecoration: "none",
                      border: `1px solid ${AUR.rule}`,
                    }}
                  >
                    Download résumé
                  </a>
                </div>
              </div>
            </div>

            <LocationWidget />
          </div>
        </div>
      </section>

      <AuroraContact />

      <section>
        <SectionHead
          k="03"
          label="Writing & feedback"
          title="The slower channels."
          kicker="Newsletter for occasional long-form, GitHub issues for bugs and ideas on this site, Medium for everything else."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <NewsletterWidget />
        </div>

        <div
          style={{
            padding: "16px 40px 80px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
          className="aur-stack-grid"
        >
          <a
            href={blogSection.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 24,
              textDecoration: "none",
              color: AUR.ink,
              overflow: "hidden",
              display: "block",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 260,
                height: 260,
                top: -130,
                right: -130,
                background: `radial-gradient(circle, ${AUR.glowC} 0%, transparent 65%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
                position: "relative",
              }}
            >
              ✎ Writing
            </div>
            <h3
              style={{
                ...aurSans,
                fontSize: 20,
                fontWeight: 600,
                color: AUR.inkBold,
                letterSpacing: "-0.015em",
                margin: 0,
                position: "relative",
              }}
            >
              {blogSection.title}
            </h3>
            <p
              style={{
                ...aurSans,
                fontSize: 14,
                lineHeight: 1.6,
                color: AUR.mutedHi,
                marginTop: 8,
                position: "relative",
              }}
            >
              {blogSection.subtitle}
            </p>
            <div
              style={{
                ...aurSans,
                fontSize: 13,
                color: AUR.link,
                fontWeight: 500,
                marginTop: 16,
                position: "relative",
              }}
            >
              My Medium profile →
            </div>
          </a>

          <a
            href={bugReporting.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 24,
              textDecoration: "none",
              color: AUR.ink,
              overflow: "hidden",
              display: "block",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 260,
                height: 260,
                top: -130,
                right: -130,
                background: `radial-gradient(circle, ${AUR.glowD} 0%, transparent 65%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
                position: "relative",
              }}
            >
              ⚠ Site feedback
            </div>
            <h3
              style={{
                ...aurSans,
                fontSize: 20,
                fontWeight: 600,
                color: AUR.inkBold,
                letterSpacing: "-0.015em",
                margin: 0,
                position: "relative",
              }}
            >
              {bugReporting.title}
            </h3>
            <p
              style={{
                ...aurSans,
                fontSize: 14,
                lineHeight: 1.6,
                color: AUR.mutedHi,
                marginTop: 8,
                position: "relative",
              }}
            >
              {bugReporting.subtitle}
            </p>
            <div
              style={{
                ...aurSans,
                fontSize: 13,
                color: AUR.link,
                fontWeight: 500,
                marginTop: 16,
                position: "relative",
              }}
            >
              Open a GitHub issue →
            </div>
          </a>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}

export default Contact;
