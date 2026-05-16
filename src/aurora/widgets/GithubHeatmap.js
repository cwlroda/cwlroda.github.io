import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

export default function GithubHeatmapWidget({ username = "cwlroda" }) {
  const AUR = useAur();
  const isDark = AUR.name === "dark";

  const theme = {
    light: ["#eef0fb", "#c7cdf6", "#9ba6f0", "#6d7be8", "#4f46e5"],
    dark: ["#1a1d28", "#3a3f6b", "#5c63c8", "#7c83e8", "#a5b4fc"],
  };
  const legendColors = isDark ? theme.dark : theme.light;

  return (
    <WidgetCard
      title="Contributions on GitHub"
      subtitle={`github.com/${username}`}
      glow="glowA"
    >
      <div
        style={{
          ...aurSans,
          fontSize: 13,
          color: AUR.mutedHi,
          overflowX: "auto",
        }}
      >
        <GitHubCalendar
          username={username}
          blockSize={14}
          blockMargin={4}
          fontSize={13}
          colorScheme={isDark ? "dark" : "light"}
          theme={theme}
          showTotalCount
          showColorLegend={false}
          tooltips={{
            activity: {
              text: (activity) =>
                `${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${activity.date}`,
            },
          }}
          style={{
            color: AUR.mutedHi,
            fontFamily: aurSans.fontFamily,
          }}
        />
      </div>
      <div
        style={{
          ...aurMono,
          fontSize: 11,
          color: AUR.muted,
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: "flex-end",
        }}
      >
        Less
        {legendColors.map((c, i) => (
          <span
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: c,
              border: `1px solid ${AUR.rule}`,
            }}
          />
        ))}
        More
      </div>
    </WidgetCard>
  );
}
