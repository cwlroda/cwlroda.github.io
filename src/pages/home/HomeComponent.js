import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraHero from "../../aurora/Hero";
import AuroraWork from "../../aurora/Work";
import AuroraProjects from "../../aurora/Projects";
import AuroraStack from "../../aurora/Stack";
import AuroraEducation from "../../aurora/Education";
import AuroraContact from "../../aurora/Contact";
import AuroraFooter from "../../aurora/Footer";
import { useAur } from "../../aurora/tokens";
import "../../aurora/aurora.css";
import "./HomeComponent.css";

function Home(props) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <AuroraHero />
      <AuroraWork />
      <AuroraProjects />
      <AuroraStack />
      <AuroraEducation />
      <AuroraContact />
      <AuroraFooter />
    </div>
  );
}

export default Home;
