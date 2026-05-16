import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import PageHero from "../../aurora/PageHero";
import SectionHead from "../../aurora/SectionHead";
import Degrees from "../../aurora/widgets/Degrees";
import CertificationsWidget from "../../aurora/widgets/Certifications";
import ModulesWidget from "../../aurora/widgets/Modules";
import AwardsWidget from "../../aurora/widgets/Awards";
import { useAur } from "../../aurora/tokens";
import { education } from "../../portfolio";
import "../../aurora/aurora.css";

function Education(props) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <PageHero
        kicker="01 / Education"
        title="Schools, modules, and the odd certificate."
        description={education.description}
        chips={[
          { label: "MEng · Imperial College London", color: AUR.link },
          { label: "Joint MSc · ETH Zürich", color: AUR.ok },
        ]}
      />

      <section style={{ padding: "0 40px 64px", maxWidth: 1280, margin: "0 auto" }}>
        <Degrees />
      </section>

      <section>
        <SectionHead
          k="02"
          label="Awards"
          title="Recognition along the way."
          kicker="Hackathon placings, scholarships, and the occasional course prize."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <AwardsWidget />
        </div>
      </section>

      <section>
        <SectionHead
          k="03"
          label="Certifications"
          title="Credentials worth keeping."
          kicker="Mostly cloud-ML coursework, a few extras."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <CertificationsWidget />
        </div>
      </section>

      <section>
        <SectionHead
          k="04"
          label="Coursework"
          title="The fuller module list."
          kicker="What I actually sat exams on, grouped by area."
        />
        <div style={{ padding: "0 40px 80px", maxWidth: 1280, margin: "0 auto" }}>
          <ModulesWidget />
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}

export default Education;
