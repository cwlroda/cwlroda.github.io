import React from "react";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import { Fade } from "react-reveal";
import { modules } from "../../portfolio.js";
import "./Modules.css";

function Modules(props) {
  const theme = props.theme;

  return (
    <div className="modules-main">
      <div className="modules-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="projects-header" style={{ color: theme.text }}>
            Modules
          </h1>
        </Fade>
      </div>
      <div>
        {modules.groups.map((group) => {
          return (
            <div className="group-main">
              <div className="group-header-div">
                <Fade bottom duration={2000} distance="20px">
                  <h2 className="group-header" style={{ color: theme.text }}>
                    {group.title}
                  </h2>
                </Fade>
              </div>
              <div className="group-cards-div-main">
                {group.data.map((module) => {
                  return <ModuleCard module={module} theme={theme} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Modules;
