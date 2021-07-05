import React from "react";
import ModuleLanguages from "../moduleLanguages/ModuleLanguages";
import "./ModuleCard.css";
import { Fade } from "react-reveal";
import { style } from "glamor";

export default function ModuleCard({ module, theme }) {
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
    "@media (max-width: 768px)": {
      width: "100%",
    },
  });

  return (
    <div className="module-card">
      <Fade bottom duration={2000} distance="40px">
        <div
          {...styles}
          key={module.id}
          onClick={() => openRepoinNewTab(module.url)}
          style={{ backgroundColor: theme.projectCard }}
        >
          <div className="module-name-div">
            <p className="module-name" style={{ color: theme.text }}>
              {module.name}
            </p>
          </div>
          <p className="module-description" style={{ color: theme.text }}>
            {module.description}
          </p>
          <div className="module-details">
            <ModuleLanguages logos={module.languages} />
          </div>
        </div>
      </Fade>
    </div>
  );
}
