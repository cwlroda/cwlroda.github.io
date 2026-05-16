import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import { style } from "glamor";
import Particle from "../Particle";
import { ContactLottie } from "../../components/DisplayLottie";
import bugs from "../../assets/lottie/bugs.json";
import blog from "../../assets/lottie/blog.json";

const ContactData = contactPageData.contactSection;
const blogSection = contactPageData.blogSection;
const bugReporting = contactPageData.bugReporting;
const GreetingData = greeting.data;

function Contact(props) {
  const theme = props.theme;

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  return (
    <div className="contact-main">
      <Particle theme={props.theme} />
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <div className="contact-heading-div">
          <Fade left duration={2000} distance="10vw">
            <div className="contact-heading-img-div">
              <img
                className="profile-pic"
                src={
                  require(`../../assets/images/${ContactData["profile_image_path"]}`)
                    ?.default
                }
                alt=""
              />
            </div>
          </Fade>
          <Fade right duration={2000} distance="10vw">
            <div className="contact-heading-text-div">
              <h1
                className="contact-heading-text"
                style={{ color: theme.text }}
              >
                {ContactData["title"]}
              </h1>
              <p
                className="contact-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {ContactData["description"]}
              </p>
              <SocialMedia />
              <br />
              <br />
              <a
                {...styles}
                className="general-btn"
                href={GreetingData.resumeLink}
              >
                See my Resume
              </a>
            </div>
          </Fade>
        </div>
        <div className="blog-heading-div">
          <Fade left duration={2000} distance="10vw">
            <div className="blog-heading-text-div">
              <h1 className="blog-heading-text" style={{ color: theme.text }}>
                {blogSection["title"]}
              </h1>
              <p
                className="blog-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {blogSection["subtitle"]}
              </p>
              <div className="blogsite-btn-div">
                <a {...styles} className="general-btn" href={blogSection.link}>
                  My Medium Profile
                </a>
              </div>
              <div className="publications">
                <p
                  className="blog-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  Writer for:
                </p>
                <div className="publication">
                  <a
                    {...styles}
                    className="general-btn"
                    href="https://towardsdatascience.com/"
                  >
                    Towards Data Science
                  </a>
                  <a
                    {...styles}
                    className="general-btn"
                    href="https://medium.com/predict"
                  >
                    Predict
                  </a>
                  <a
                    {...styles}
                    className="general-btn"
                    href="https://medium.com/swlh"
                  >
                    The Startup
                  </a>
                </div>
              </div>
            </div>
          </Fade>
          <Fade right duration={2000} distance="10vw">
            <div className="blog-heading-img-div">
              <ContactLottie name="blog" animationData={blog} />
            </div>
          </Fade>
        </div>
        <div className="blog-heading-div">
          <Fade left duration={2000} distance="10vw">
            <div className="blog-heading-img-div">
              <ContactLottie name="bugs" animationData={bugs} />
            </div>
          </Fade>
          <Fade right duration={2000} distance="10vw">
            <div className="blog-heading-text-div">
              <h1 className="blog-heading-text" style={{ color: theme.text }}>
                {bugReporting["title"]}
              </h1>
              <p
                className="blog-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {bugReporting["subtitle"]}
              </p>
              <div className="blogsite-btn-div">
                <a {...styles} className="general-btn" href={bugReporting.link}>
                  Report An Issue
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Contact;
