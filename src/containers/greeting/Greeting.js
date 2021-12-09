import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";
import { Fade } from "react-reveal";
import { useHistory } from "react-router-dom";
import { style } from "glamor";
import Typewriter from "./Typewriter";

export default function Greeting(props) {
  const theme = props.theme;
  const history = useHistory();
  const GreetingData = greeting.data;

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text">
                {GreetingData.title}
                <span className="wave" role="img" aria-hidden="true">
                  👋🏻
                </span>
              </h1>
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText }}
              >
                <span>I'm </span>
                <span style={{ color: theme.accentColor }}>
                  {GreetingData.full_name}.{" "}
                </span>
                <br></br>
                <div className="typewriter">
                  <Typewriter />
                </div>
                {/* {GreetingData.subTitle} */}
              </p>
              <SocialMedia />
              <div className="portfolio-repo-btn-div">
                <button
                  {...styles}
                  className="button"
                  onClick={() => {
                    history.push("/contact");
                  }}
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            <img
              src={
                require(`../../assets/images/${GreetingData.profile_image_path}`)
                  ?.default
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}
