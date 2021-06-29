import React from "react";
import "./Modules.css";
import { Fade } from "react-reveal";

function Modules(props) {
  const theme = props.theme;
  return (
    <div className="main" id="modules">
      <div className="modules-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="modules-header" style={{ color: theme.text }}>
            Modules
          </h1>
        </Fade>
      </div>
      <div className="modules-body-div">
        <Fade bottom duration={2000} distance="20px">
          <img
            className="modules-img"
            src={require(`../../assets/images/modules_${theme.name}.png`)}
            alt=""
          />
        </Fade>
      </div>
    </div>
  );
}

export default Modules;
