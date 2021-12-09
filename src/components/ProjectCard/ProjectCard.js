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
    height: "95%",
    transition: "all 0.2s ease-in-out !important",
    ":hover": {
      transform: "scale(1.02) !important",
      color: "rgba(255, 255, 255, 1)",
      boxShadow: "0 0px 15px #e2405f !important",
    },
    "@media (max-width: 768px || min-width: 1921px)": {
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
    transition: "all 0.2s ease-in-out !important",
    ":hover": {
      transform: "scale(1.02) !important",
      color: "rgba(255, 255, 255, 1)",
      boxShadow: `0 5px 15px ${theme.accentColor}`,
    },
    "@media (max-width: 768px)": {
      justifyContent: "center",
      marginRight: "0px",
      marginBottom: "15px",
      width: "40%",
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
    transition: "all 0.2s ease-in-out !important",
    ":hover": {
      transform: "scale(1.02) !important",
      color: "rgba(255, 255, 255, 1)",
      boxShadow: `0 5px 15px ${theme.accentColor}`,
    },
    "@media (max-width: 768px)": {
      justifyContent: "center",
      marginLeft: "0px",
      marginBottom: "15px",
      width: "40%",
    },
  });

  if (repo.logo_path === "") {
    return (
      <div className="repo-card">
        <Fade bottom duration={2000} distance="40px">
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
    if (window.outerWidth <= 768) {
      return (
        <div className="repo-card">
          <Flip top duration={2000}>
            <div {...left_img}>
              <a href={repo.logo_link}>
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    transform: "scale(75%, 75%)",
                  }}
                  src={
                    require(`../../assets/images/${repo.logo_path}`)?.default
                  }
                  alt={repo.alt_name}
                />
              </a>
            </div>
          </Flip>
          <Fade bottom duration={2000} distance="40px">
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
    } else if (repo.id % 2 === 0) {
      return (
        <div className="repo-card">
          <Flip left duration={2000}>
            <div {...left_img}>
              <a href={repo.logo_link}>
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    transform: "scale(75%, 75%)",
                  }}
                  src={
                    require(`../../assets/images/${repo.logo_path}`)?.default
                  }
                  alt={repo.alt_name}
                />
              </a>
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
              <a href={repo.logo_link}>
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    transform: "scale(75%, 75%)",
                  }}
                  src={
                    require(`../../assets/images/${repo.logo_path}`)?.default
                  }
                  alt={repo.alt_name}
                />
              </a>
            </div>
          </Flip>
        </div>
      );
    }
  }
}
