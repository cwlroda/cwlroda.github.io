import React from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { DarkTheme, LightTheme, ThemeProvider } from "baseui";
import { Fade } from "react-reveal";

function ExperienceAccordion(props) {
  const theme = props.theme;

  return (
    <div className="experience-accord">
      <ThemeProvider theme={theme.name === "light" ? LightTheme : DarkTheme}>
        {props.sections.map((section) => {
          return (
            <Fade bottom duration={2000} distance="20px">
              {section["experiences"].map((experience) => {
                return (
                  <ExperienceCard experience={experience} theme={theme} />
                );
              })}
            </Fade>
          );
        })}
      </ThemeProvider>
    </div>
  );
}

export default ExperienceAccordion;
