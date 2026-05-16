import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuroraNav from "../../aurora/Nav";
import AuroraFooter from "../../aurora/Footer";
import { useAur, aurSans } from "../../aurora/tokens";
import { HiDownload } from "react-icons/hi";
import { resumes, defaultResumeId } from "./resumeData";
import "../../aurora/aurora.css";
import "./Resume.css";

function Bullets({ items }) {
  return (
    <ul>
      {items.map((item, idx) => {
        if (typeof item === "string") {
          return <li key={idx}>{item}</li>;
        }
        return (
          <li key={idx}>
            {item.heading ? <strong>{item.heading}</strong> : null}
            {item.heading && item.body ? " " : null}
            {item.body}
          </li>
        );
      })}
    </ul>
  );
}

function EntryHeader({ left, right }) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="resume-left-col">
            <h3>{left}</h3>
          </td>
          <td className="resume-right-col resume-date-location">{right}</td>
        </tr>
      </tbody>
    </table>
  );
}

function ResumeDocument({ resume, innerRef }) {
  return (
    <div className="resume-page" ref={innerRef}>
      <h1>{resume.header.name}</h1>
      <div className="resume-subtitle">{resume.header.subtitle}</div>

      <div className="resume-contact">
        {resume.header.contact.map((c, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 ? " | " : null}
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {c.text}
              </a>
            ) : (
              c.text
            )}
          </React.Fragment>
        ))}
      </div>

      {resume.summary ? (
        <>
          <h2>Professional Summary</h2>
          <p>{resume.summary}</p>
        </>
      ) : null}

      {resume.skills && resume.skills.length > 0 ? (
        <>
          <h2>Technical Skills &amp; Core Competencies</h2>
          <div className="resume-skills">
            {resume.skills.map((s, idx) => (
              <div className="resume-skills-row" key={idx}>
                <span className="resume-skills-category">{s.category}:</span>{" "}
                {s.items}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {resume.experience && resume.experience.length > 0 ? (
        <>
          <h2>Professional Experience</h2>
          {resume.experience.map((job, idx) => (
            <div
              className="resume-entry"
              key={idx}
              style={idx > 0 ? { marginTop: "10px" } : undefined}
            >
              <EntryHeader
                left={job.company}
                right={`${job.location} | ${job.period}`}
              />
              {job.title ? (
                <div className="resume-job-title">{job.title}</div>
              ) : null}
              {job.bullets && job.bullets.length > 0 ? (
                <Bullets items={job.bullets} />
              ) : null}
            </div>
          ))}
        </>
      ) : null}

      {resume.education && resume.education.length > 0 ? (
        <>
          <h2>Education</h2>
          {resume.education.map((edu, idx) => (
            <div
              className="resume-entry"
              key={idx}
              style={idx > 0 ? { marginTop: "10px" } : undefined}
            >
              <EntryHeader
                left={edu.school}
                right={`${edu.location} | ${edu.period}`}
              />
              {edu.degree ? (
                <div className="resume-job-title">{edu.degree}</div>
              ) : null}
              {edu.bullets && edu.bullets.length > 0 ? (
                <Bullets items={edu.bullets} />
              ) : null}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

function Resume(props) {
  const AUR = useAur();
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const resumeRef = useRef(null);

  const resumeKey =
    paramId && Object.prototype.hasOwnProperty.call(resumes, paramId)
      ? paramId
      : defaultResumeId;
  const resume = resumes[resumeKey];
  const versionIds = Object.keys(resumes);
  const showSwitcher = versionIds.length > 1;

  // Use the browser's native print pipeline so the PDF gets vector text,
  // selectable copy, working hyperlinks, and proper page breaks — identical
  // to the user pressing Ctrl-P and choosing "Save as PDF". The temporary
  // document.title swap nudges Chrome's default save filename.
  const handleDownload = () => {
    const previousTitle = document.title;
    const stem = (resume.filename || "resume.pdf").replace(/\.pdf$/i, "");
    document.title = stem;
    window.print();
    setTimeout(() => {
      document.title = previousTitle;
    }, 100);
  };

  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={props.setTheme} />
      <div
        className="resume-toolbar"
        style={{
          background: AUR.navBackdrop,
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          borderBottom: `1px solid ${AUR.rule}`,
        }}
      >
        <div className="resume-toolbar-inner">
          <div className="resume-toolbar-title" style={{ color: AUR.inkBold }}>
            Resume · {resume.header.name}
          </div>
          <div className="resume-toolbar-actions">
            {showSwitcher ? (
              <select
                value={resumeKey}
                onChange={(e) => {
                  const next = e.target.value;
                  navigate(
                    next === defaultResumeId ? "/resume" : `/resume/${next}`
                  );
                }}
                className="resume-version-select"
                style={{
                  ...aurSans,
                  background: AUR.panel,
                  color: AUR.ink,
                  border: `1px solid ${AUR.rule}`,
                }}
                aria-label="Switch resume version"
              >
                {versionIds.map((k) => (
                  <option key={k} value={k}>
                    {resumes[k].label || k}
                  </option>
                ))}
              </select>
            ) : null}
            <button
              type="button"
              onClick={handleDownload}
              className="resume-download-btn"
              style={{
                ...aurSans,
                background: AUR.inkBold,
                color: AUR.inkInverse,
                border: `1px solid ${AUR.inkBold}`,
              }}
              aria-label="Download resume as PDF"
            >
              <HiDownload size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="resume-stage">
        <ResumeDocument resume={resume} innerRef={resumeRef} />
      </div>

      <AuroraFooter />
    </div>
  );
}

export default Resume;
