import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Fade } from "react-reveal";
import { projectsHeader, hackathons, projects } from "../../portfolio.js";
import "./Projects.css";
import { style } from "glamor";
import Particle from "../Particle";
import { ProjectLottie } from "../../components/DisplayLottie";
import proj from "../../assets/lottie/project.json";

function Projects(props) {
  const theme = props.theme;

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  return (
    <div className="projects-main">
      <Particle theme={props.theme} />
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-projects">
        <Fade bottom duration={2000} distance="40px">
          <div className="projects-heading-div">
            <div className="projects-heading-img-div">
              <ProjectLottie name="proj" animationData={proj} />
            </div>
            <div className="projects-heading-text-div">
              <h1
                className="projects-heading-text"
                style={{ color: theme.text }}
              >
                {projectsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {projectsHeader["description"]}
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <div className="projects-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="projects-header" style={{ color: theme.text }}>
            Hackathons
          </h1>
        </Fade>
      </div>
      <div className="hackathon-cards-div-main">
        {hackathons.data.map((repo) => {
          return <ProjectCard repo={repo} theme={theme} />;
        })}
      </div>
      <div className="projects-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="projects-header" style={{ color: theme.text }}>
            Open-Source
          </h1>
        </Fade>
      </div>
      <div className="repo-cards-div-main">
        {projects.data.map((repo) => {
          return <ProjectCard repo={repo} theme={theme} />;
        })}
      </div>
      <a {...styles} className="general-btn" href={projectsHeader.link}>
        More Projects (Github)
      </a>
      <div className="space"></div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Projects;
