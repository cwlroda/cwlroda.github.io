import React from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import "./ProjectCard.css";
import { Fade, Flip } from "react-reveal";
import { style } from "glamor";

export default function ProjectCard({ repo, theme }) {
  function openRepoinNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  const styles = style({
    color: "rgb(88, 96, 105)",
    backgroundColor: "rgb(255, 255, 255)",
    width: "90%",
    margin: "10px",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
    padding: "2rem",
    cursor: "pointer",
    borderRadius: "7px",
    height: "100%",
    transition: "all 0.2s ease-in-out",
    ":hover": {
      boxShadow: `${theme.imageDark} 0 2px 15px`,
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  });

  const left_img = style({
    width: "220px",
    height: "auto",
    borderRadius: " 50%",
    padding: "10px",
    border: `1px solid ${theme.accentColor}`,
    marginRight: "50px",
    boxShadow: `0px 0px 5px ${theme.accentColor}`,
    transition: "all 0.2s ease-in-out",
    ":hover": {
      color: "rgba(255, 255, 255, 1)",
      boxShadow: `0 5px 15px ${theme.accentColor}`,
    },
    "@media (max-width: 768px)": {
      marginLeft: "50px",
      marginBottom: "15px",
      width: "175px",
    },
  });

  const right_img = style({
    width: "220px",
    height: "auto",
    borderRadius: " 50%",
    padding: "10px",
    border: `1px solid ${theme.accentColor}`,
    marginLeft: "50px",
    boxShadow: `0px 0px 5px ${theme.accentColor}`,
    transition: "all 0.2s ease-in-out",
    ":hover": {
      color: "rgba(255, 255, 255, 1)",
      boxShadow: `0 5px 15px ${theme.accentColor}`,
    },
    "@media (max-width: 768px)": {
      marginLeft: "50px",
      marginBottom: "15px",
      width: "175px",
    },
  });

  if (repo.logo_path === "") {
    return (
      <div className="repo-card">
        <Fade right duration={2000} distance="40px">
          <div
            {...styles}
            key={repo.id}
            onClick={() => openRepoinNewTab(repo.url)}
            style={{ backgroundColor: theme.projectCard }}
          >
            <div className="repo-name-div">
              <p className="repo-name" style={{ color: theme.text }}>
                {repo.name}
              </p>
            </div>
            <p className="repo-description" style={{ color: theme.text }}>
              {repo.description}
            </p>
            <div className="repo-details">
              <ProjectLanguages logos={repo.languages} />
            </div>
          </div>
        </Fade>
      </div>
    );
  } else {
    if (repo.id % 2 === 0) {
      return (
        <div className="repo-card">
          <Flip left duration={2000}>
            <div {...left_img}>
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(75%, 75%)",
                }}
                src={require(`../../assets/images/${repo.logo_path}`)}
                alt={repo.alt_name}
              />
            </div>
          </Flip>
          <Fade right duration={2000} distance="40px">
            <div
              {...styles}
              key={repo.id}
              onClick={() => openRepoinNewTab(repo.url)}
              style={{ backgroundColor: theme.projectCard }}
            >
              <div className="repo-name-div">
                <p className="repo-name" style={{ color: theme.text }}>
                  {repo.name}
                </p>
              </div>
              <p className="repo-description" style={{ color: theme.text }}>
                {repo.description}
              </p>
              <div className="repo-details">
                <ProjectLanguages logos={repo.languages} />
              </div>
            </div>
          </Fade>
        </div>
      );
    } else {
      return (
        <div className="repo-card">
          <Fade left duration={2000} distance="40px">
            <div
              {...styles}
              key={repo.id}
              onClick={() => openRepoinNewTab(repo.url)}
              style={{ backgroundColor: theme.projectCard }}
            >
              <div className="repo-name-div">
                <p className="repo-name" style={{ color: theme.text }}>
                  {repo.name}
                </p>
              </div>
              <p className="repo-description" style={{ color: theme.text }}>
                {repo.description}
              </p>
              <div className="repo-details">
                <ProjectLanguages logos={repo.languages} />
              </div>
            </div>
          </Fade>
          <Flip right duration={2000}>
            <div {...right_img}>
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(75%, 75%)",
                }}
                src={require(`../../assets/images/${repo.logo_path}`)}
                alt={repo.alt_name}
              />
            </div>
          </Flip>
        </div>
      );
    }
  }
}
