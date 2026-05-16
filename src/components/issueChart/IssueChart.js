import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Fade } from "react-reveal";
import "./IssueChart.css";
import IssueData from "../../shared/opensource/issues.json";

class IssueChart extends Component {
  render() {
    const theme = this.props.theme;

    const data = {
      labels: ["Open", "Closed"],
      datasets: [
        {
          data: [IssueData["open"], IssueData["closed"]],
          backgroundColor: ["#28a745", "#d73a49"],
          hoverBackgroundColor: ["#28a745dd", "#d73a49dd"],
        },
      ],
    };

    return (
      <div class="issue-chart">
        <Fade right duration={2000}>
          <h2 className="issue-chart-header">Issue Distribution</h2>
          <Doughnut
            data={data}
            options={{
              padding: "0",
              margin: "0",
              responsive: true,
              maintainAspectRatio: true,
              animation: {
                duration: 4000,
              },
              borderColor: "transparent",
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: "16",
                      family: "Google Sans Regular",
                    },
                    color: theme.text,
                  },
                },
              },
            }}
          />
        </Fade>
      </div>
    );
  }
}

export default IssueChart;
