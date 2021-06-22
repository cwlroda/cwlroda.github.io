import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Fade } from "react-reveal";
import { projectsHeader, hackathons, projects } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import { style } from "glamor";
import ReactTooltip from "react-tooltip";
import GitHubCalendar from "react-github-calendar";

function Projects(props) {
  const theme = props.theme;

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  const colourTheme = {
    background: "transparent",
    grade0: "#778899",
  };

  return (
    <div className="projects-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-projects">
        <Fade bottom duration={2000} distance="40px">
          <div className="projects-heading-div">
            <div className="projects-heading-img-div">
              <ProjectsImg theme={theme} />
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
      <br></br>
      <br></br>
      <br></br>
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
      <a {...styles} className="general-btn" href="https://github.com/cwlroda">
        More Projects (Github)
      </a>
      <br />
      <br />
      <div className="github-stats-div">
        <h1 className="projects-header" style={{ color: theme.text }}>
          GitHub Stats
        </h1>
        <div className="contributions">
          <GitHubCalendar
            username="cwlroda"
            blockSize={22}
            blockMargin={5}
            theme={colourTheme}
            fontSize={16}
            showTotalCount={false}
          >
            <ReactTooltip delayShow={50} html />
          </GitHubCalendar>
        </div>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Projects;
