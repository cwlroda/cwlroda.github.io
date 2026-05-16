import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import SectionHead from "./SectionHead";

const groups = [
  {
    h: "VLM / LLM Training & Serving",
    glow: "glowA",
    items: [
      "vLLM",
      "TRT-LLM",
      "NVIDIA NIM",
      "DeepSpeed",
      "PEFT / LoRA",
      "HuggingFace",
      "ONNX",
      "Quantisation",
    ],
  },
  {
    h: "Machine Learning / CV",
    glow: "glowB",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "NumPy",
      "scikit-learn",
      "Diffusion Models",
      "t-SNE / PCA",
      "Jupyter",
    ],
  },
  {
    h: "Retrieval & Data Systems",
    glow: "glowC",
    items: [
      "FAISS",
      "Pinecone",
      "Dense Embeddings",
      "Multimodal RAG",
      "Synthetic Data",
      "Agentic Workflows",
      "MySQL",
      "Data Curation",
    ],
  },
  {
    h: "Infra / MLOps",
    glow: "glowD",
    items: [
      "Docker",
      "AWS",
      "GCP",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Bash",
      "Git",
    ],
  },
  {
    h: "Languages & Frameworks",
    glow: "glowA",
    items: [
      "Python",
      "TypeScript",
      "React",
      "Node.js",
      "Flask",
      "C / C++",
      "Java",
      "F#",
    ],
  },
];

export default function AuroraStack() {
  const AUR = useAur();
  return (
    <section>
      <SectionHead
        k="04"
        label="Stack"
        title="Tools I reach for."
        kicker="What ends up open in my editor most days, grouped by domain."
      />
      <div
        className="aur-stack-grid"
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {groups.map((g) => (
          <div
            key={g.h}
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                top: -120,
                right: -120,
                background: `radial-gradient(circle, ${
                  AUR[g.glow]
                } 0%, transparent 65%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.mutedHi,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                position: "relative",
              }}
            >
              {g.h}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                position: "relative",
              }}
            >
              {g.items.map((s) => (
                <span
                  key={s}
                  style={{
                    ...aurSans,
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: AUR.panelHi,
                    color: AUR.ink,
                    border: `1px solid ${AUR.ruleHi}`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
