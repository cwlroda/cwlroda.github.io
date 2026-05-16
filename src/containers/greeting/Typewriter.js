import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Back-End Developer",
          "Front-End Developer",
          "Deep Learning Engineer",
          "Open Source Contributor",
          "Hackathon Enthusiast",
          "College Student",
          "Problem Solver",
        ],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 35,
        pauseFor: 2000,
      }}
    />
  );
}

export default Type;
