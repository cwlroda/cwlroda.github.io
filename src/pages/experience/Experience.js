import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Experience.css";
import { experience } from "../../portfolio.js";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import { DarkTheme, LightTheme, ThemeProvider } from "baseui";
import { Fade } from "react-reveal";
import ExperienceImg from "./ExperienceImg";

function Experience(props) {
  const theme = props.theme;
  console.log(props.setTheme);
  return (
    <div className="experience-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-experience">
        <Fade bottom duration={2000} distance="40px">
          <div className="experience-heading-div">
            <div className="experience-heading-img-div">
              <ExperienceImg theme={theme} />
            </div>
            <div className="experience-heading-text-div">
              <h1
                className="experience-heading-text"
                style={{ color: theme.text }}
              >
                {experience.title}
              </h1>
              <h3
                className="experience-heading-sub-text"
                style={{ color: theme.text }}
              >
                {experience["subtitle"]}
              </h3>
              <p
                className="experience-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {experience["description"]}
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <div>
        {experience["internships"]["experiences"].map((experience) => {
          return (
            <div className="experience-accord">
              <ThemeProvider
                theme={theme.name === "light" ? LightTheme : DarkTheme}
              >
                <Fade bottom duration={2000} distance="20px">
                  <ExperienceCard experience={experience} theme={theme} />
                </Fade>
              </ThemeProvider>
            </div>
          );
        })}
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Experience;
