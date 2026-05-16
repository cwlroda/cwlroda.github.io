import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import PageHero from "../../aurora/PageHero";
import SectionHead from "../../aurora/SectionHead";
import ExperienceList from "../../aurora/widgets/ExperienceList";
import SkillBarsWidget from "../../aurora/widgets/SkillBars";
import SpeakingWidget from "../../aurora/widgets/Speaking";
import { useAur } from "../../aurora/tokens";
import { experience } from "../../portfolio";
import "../../aurora/aurora.css";

function Experience(props) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <PageHero
        kicker="01 / Experience"
        title={experience.title}
        description={experience.description}
        chips={[
          { label: experience.subtitle, color: AUR.link },
          { label: "3+ years MLE", color: AUR.ok },
        ]}
      />

      <section style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <ExperienceList />
      </section>

      <section>
        <SectionHead
          k="02"
          label="Proficiency"
          title="What I reach for."
          kicker="A self-rated snapshot across the stack I work in day to day."
        />
        <div
          style={{
            padding: "0 40px 32px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
          className="aur-stack-grid"
        >
          <SkillBarsWidget />
          <SpeakingWidget />
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}

export default Experience;
