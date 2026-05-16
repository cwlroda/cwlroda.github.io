import React from "react";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import PageHero from "../../aurora/PageHero";
import SectionHead from "../../aurora/SectionHead";
import GithubHeatmapWidget from "../../aurora/widgets/GithubHeatmap";
import ActivityWidget from "../../aurora/widgets/Activity";
import Donut from "../../aurora/widgets/Donut";
import PullRequestCard from "../../aurora/widgets/PullRequestCard";
import IssueCard from "../../aurora/widgets/IssueCard";
import { useAur } from "../../aurora/tokens";
import pullRequestsData from "../../shared/opensource/pull_requests.json";
import issuesData from "../../shared/opensource/issues.json";
import "../../aurora/aurora.css";

function Stats(props) {
  const AUR = useAur();

  const prValues = [
    pullRequestsData.open,
    pullRequestsData.merged,
    pullRequestsData.closed,
  ];
  const issueValues = [issuesData.open || 0, issuesData.closed || 0];

  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <PageHero
        kicker="01 / Stats"
        title="Numbers and contributions."
        description="A live read-out of what's been pushed, opened, and closed across the repos I work on. Numbers update from GitHub on each build."
        chips={[
          { label: `${pullRequestsData.merged} merged PRs`, color: AUR.link },
          { label: `${issuesData.closed} issues closed`, color: AUR.ok },
        ]}
      />

      <section>
        <SectionHead
          k="02"
          label="Contributions"
          title="A year of GitHub."
          kicker="Daily activity heatmap, pulled live from the GitHub GraphQL API."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <GithubHeatmapWidget username="cwlroda" />
        </div>
      </section>

      <section>
        <SectionHead
          k="03"
          label="Distribution"
          title="Where PRs and issues land."
          kicker="Open / merged / closed split."
        />
        <div
          className="aur-stack-grid"
          style={{
            padding: "0 40px 32px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <Donut
            title="Pull requests"
            subtitle="Open · merged · closed"
            labels={["Open", "Merged", "Closed"]}
            values={prValues}
            colors={["#34d399", "#a5b4fc", "#f87171"]}
            glow="glowA"
          />
          <Donut
            title="Issues"
            subtitle="Open · closed"
            labels={["Open", "Closed"]}
            values={issueValues}
            colors={["#34d399", "#7a8090"]}
            glow="glowC"
          />
        </div>
      </section>

      <section>
        <SectionHead
          k="04"
          label="Recent activity"
          title="Live feed."
          kicker="The most recent commits, posts and completions across my accounts."
        />
        <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <ActivityWidget />
        </div>
      </section>

      <section>
        <SectionHead
          k="05"
          label="Pull requests"
          title="Some PRs worth showing."
          kicker="The most recent merges and reviews from across the repos I contribute to."
        />
        <div
          className="aur-proj-grid"
          style={{
            padding: "0 40px 32px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {pullRequestsData.data.map((pr) => (
            <PullRequestCard key={pr.id} pullRequest={pr} />
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          k="06"
          label="Issues"
          title="And some open issues."
          kicker="Tickets I've raised or am tracking."
        />
        <div
          className="aur-proj-grid"
          style={{
            padding: "0 40px 80px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {issuesData.data.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}

export default Stats;
