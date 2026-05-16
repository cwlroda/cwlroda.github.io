import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import PageHero from "../../aurora/PageHero";
import SectionHead from "../../aurora/SectionHead";
import HackathonCard from "../../aurora/widgets/HackathonCard";
import ProjectArchiveCard from "../../aurora/widgets/ProjectArchiveCard";
import AuroraProjects from "../../aurora/Projects";
import { useAur, aurSans } from "../../aurora/tokens";
import { projectsHeader, hackathons, projects } from "../../portfolio";
import "../../aurora/aurora.css";

function Projects(props) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <PageHero
        kicker="01 / Projects"
        title={projectsHeader.title}
        description={projectsHeader.description}
        chips={[
          { label: `${hackathons.data.length} hackathons`, color: AUR.link },
          { label: `${projects.data.length} open-source`, color: AUR.ok },
        ]}
      />

      <AuroraProjects />

      <section>
        <SectionHead
          k="04"
          label="Hackathons"
          title="Weekend builds."
          kicker="Submissions from the hackathon era, most of them award-winning by some measure."
        />
        <div
          className="aur-proj-grid"
          style={{
            padding: "0 40px 32px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {hackathons.data.map((repo, i) => (
            <HackathonCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          k="05"
          label="Open-source"
          title="The archive."
          kicker="Personal repos and contributions worth showing."
        />
        <div
          className="aur-proj-grid"
          style={{
            padding: "0 40px 32px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {projects.data.map((repo, i) => (
            <ProjectArchiveCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
        <div
          style={{
            padding: "0 40px 80px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <a
            href={projectsHeader.link}
            target="_blank"
            rel="noopener noreferrer"
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
            More on GitHub ↗
          </a>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}

export default Projects;
