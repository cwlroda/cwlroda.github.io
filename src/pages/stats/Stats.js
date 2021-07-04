import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Fade } from "react-reveal";
import "./Stats.css";
import ReactTooltip from "react-tooltip";
import GitHubCalendar from "react-github-calendar";
import Particle from "../Particle";
import PullRequestChart from "../../components/pullRequestChart/PullRequestChart.js";
import IssueChart from "../../components/issueChart/IssueChart.js";
import PullRequestCard from "../../components/pullRequestCard/PullRequestCard";
import pullRequestsData from "../../shared/opensource/pull_requests.json";
import IssueCard from "../../components/issueCard/IssueCard";
import issuesData from "../../shared/opensource/issues.json";

function Stats(props) {
  const theme = props.theme;

  const colourTheme = {
    background: "transparent",
    grade0: "#778899",
  };

  return (
    <div className="stats-main">
      <Particle />
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="github-stats-div">
        <Fade bottom duration={2000} distance="40px">
          <h1 className="github-stats-header" style={{ color: theme.text }}>
            GitHub Stats
          </h1>
          <div className="contributions">
            <GitHubCalendar
              username="cwlroda"
              blockSize={22}
              blockMargin={5}
              theme={colourTheme}
              fontSize={16}
              showTotalCount={false}
            >
              <ReactTooltip delayShow={50} html />
            </GitHubCalendar>
          </div>
        </Fade>
      </div>
      <div className="os-charts-body-div">
        <PullRequestChart />
        <IssueChart />
      </div>
      <div className="pull-requests-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="pull-requests-header" style={{ color: theme.text }}>
            Pull Requests
          </h1>
        </Fade>
      </div>
      <div className="pull-request-body-div">
        {pullRequestsData["data"].map((pullRequest) => {
          return <PullRequestCard pullRequest={pullRequest} />;
        })}
      </div>
      <div className="issues-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="issues-header" style={{ color: theme.text }}>
            Issues
          </h1>
        </Fade>
      </div>
      <div className="issues-body-div">
        {issuesData["data"].map((issue) => {
          return <IssueCard issue={issue} />;
        })}
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Stats;
