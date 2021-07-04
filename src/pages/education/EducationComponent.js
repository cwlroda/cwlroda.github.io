import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import Modules from "../../containers/modules/Modules";
import Certifications from "../../containers/certifications/Certifications";
import EducationImg from "./EducationImg";
import { education } from "../../portfolio";
import "./EducationComponent.css";
import { Fade } from "react-reveal";
import Particle from "../Particle";

function Education(props) {
  const theme = props.theme;
  return (
    <div className="education-main">
      <Particle />
      <Header theme={props.theme} setTheme={props.setTheme} />
      <div className="basic-education">
        <Fade bottom duration={2000} distance="40px">
          <div className="heading-div">
            <div className="heading-img-div">
              <EducationImg theme={theme} />
            </div>
            <div className="heading-text-div">
              <h1 className="heading-text" style={{ color: theme.text }}>
                Education
              </h1>
              <h3 className="heading-sub-text" style={{ color: theme.text }}>
                Qualifications and Certifications
              </h3>
              <p
                className="education-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {education["description"]}
              </p>
            </div>
          </div>
        </Fade>
        <Educations theme={props.theme} />
        <br></br>
        <br></br>
        <Certifications theme={props.theme} />
        <br></br>
        <br></br>
        <Modules theme={props.theme} />
      </div>
      <Footer theme={props.theme} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Education;
