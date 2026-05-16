import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

export default function Donut({ title, subtitle, labels, values, colors, glow }) {
  const AUR = useAur();
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((c) => c + "cc"),
        borderColor: AUR.panel,
        borderWidth: 2,
      },
    ],
  };
  return (
    <WidgetCard title={title} subtitle={subtitle} glow={glow}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              cutout: "62%",
              animation: { duration: 1200 },
              plugins: {
                legend: { display: false },
                tooltip: {
                  bodyFont: { family: aurSans.fontFamily, size: 13 },
                  titleFont: { family: aurSans.fontFamily, size: 13 },
                },
              },
            }}
          />
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {labels.map((l, i) => (
            <li key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: colors[i],
                }}
              />
              <span style={{ ...aurSans, fontSize: 13, color: AUR.ink, fontWeight: 500 }}>{l}</span>
              <span style={{ ...aurMono, fontSize: 12, color: AUR.muted, marginLeft: "auto" }}>{values[i]}</span>
            </li>
          ))}
        </ul>
      </div>
    </WidgetCard>
  );
}
