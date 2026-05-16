import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { AurChip, AurPh } from "./primitives";
import SectionHead from "./SectionHead";

// `glow` is a theme key (resolved at render time) so washes flip when the
// theme toggles.
const projects = [
  {
    span: 2,
    glow: "glowA",
    kind: "SIDE PROJECT, LIVE",
    year: "2026",
    name: "Snail's Trail",
    desc:
      "A daily word game for Wikipedia obsessives. You're dropped on a random article and have to hop, link by link, to a target article in ten moves or fewer. Behind the scenes there's an on-device embedding model ranking which links bring you closer, so the suggestions stay snappy without a backend.",
    stack: ["React", "TypeScript", "Embeddings", "Vite"],
  },
  {
    span: 2,
    glow: "glowB",
    kind: "WORK, DATATURE",
    year: "2022 to Now",
    name: "Nexus",
    desc:
      "Datature's flagship platform for training, evaluating and deploying computer vision models without writing code. Drag-and-drop training workflows around FasterRCNN and YOLOX, IntelliBrush for AI-assisted labelling of masks, polygons and boxes, and managed cloud-API deployment with load balancing.",
    stack: ["PyTorch", "FastAPI", "Docker", "AWS"],
  },
  {
    span: 2,
    glow: "glowC",
    kind: "WORK, DATATURE",
    year: "2025 to Now",
    name: "Vi",
    desc:
      "Our VLMOps platform for fine-tuning and deploying vision-language models. Supports phrase grounding, VQA, chain-of-thought and VLA labels, with (Q)LoRA and SFT training on anything from T4 to B200, plus evaluation on F1, IoU, BLEU and BERTScore. Ships through a local SDK or NVIDIA NIM containers with OpenAI-compatible APIs.",
    stack: ["Qwen-VL", "vLLM", "NIM", "QLoRA"],
  },
  {
    glow: "glowD",
    kind: "WORK, DATATURE",
    year: "2023 to Now",
    name: "Multimodal RAG & Retrieval",
    desc:
      "Image-retrieval pipelines powering production workloads. Dense embeddings indexed in FAISS or Pinecone, served alongside vLLM and TRT-LLM. Tensor parallelism plus dynamic batching pushed throughput up to 5x.",
    stack: ["FAISS", "Pinecone", "vLLM"],
  },
  {
    glow: "glowA",
    kind: "WORK, DATATURE",
    year: "2024",
    name: "Synthetic Data Pipeline",
    desc:
      "Multimodal synthetic data generation mixing diffusion models with LLMs, plus t-SNE and uniqueness-score curation to cut the manual labelling bill.",
    stack: ["Diffusion", "LLMs", "t-SNE"],
  },
  {
    glow: "glowB",
    kind: "WORK, DATATURE",
    year: "2024",
    name: "Edge Deployment Stack",
    desc:
      "Customisable container framework for real-time inference on edge devices, with an agentic orchestrator wired into our products.",
    stack: ["Docker", "ONNX", "Agentic"],
  },
  {
    glow: "glowC",
    kind: "OPEN SOURCE, DATATURE",
    year: "2023",
    name: "Portal",
    desc:
      "Open-source viewer for loading deep neural networks and running them on images and videos. I contribute to it.",
    stack: ["TypeScript", "React"],
  },
  {
    glow: "glowB",
    kind: "MSC THESIS, ETH",
    year: "2022",
    name: "Resilient ML Inference Serving",
    desc:
      "Wrote a custom scheduler for ML inference serving on AWS. Multi-node throughput came out roughly twice what we had before.",
    stack: ["Python", "AWS", "Distributed"],
  },
  {
    glow: "glowC",
    kind: "SEMESTER, ETH",
    year: "2022",
    name: "Scalabel 3D Annotation",
    desc:
      "A point-cloud annotation tool in TypeScript and Three.js. Annotators ended up about 67% faster on the same datasets.",
    stack: ["TS", "Three.js"],
  },
  {
    glow: "glowB",
    kind: "RESEARCH, DSO",
    year: "2021",
    name: "DH3D 3D Descriptors",
    desc:
      "Plugged a hierarchical local + global 3D descriptor model into a multi-robot collaborative SLAM stack. Two of the pipeline stages came out 40x and 20x faster.",
    stack: ["Python", "TF"],
  },
  {
    glow: "glowC",
    kind: "PRODUCTION, HTX",
    year: "2020",
    name: "Fall Detection",
    desc:
      "Multi-person pose estimation running across several CCTV feeds at once to flag falls in real time. 83% precision and F1 of 91.",
    stack: ["Python", "OpenPifPaf"],
  },
  {
    glow: "glowD",
    kind: "NLP, HTX",
    year: "2020",
    name: "BART Summariser",
    desc:
      "Abstractive news summariser fine-tuned on BART. Cleared ROUGE 0.80 on the production corpus.",
    stack: ["Python", "BART"],
  },
  {
    glow: "glowA",
    kind: "AIHACK 2021, 3RD",
    year: "2021",
    name: "BITweets",
    desc:
      "Bi-directional LSTM that predicts Bitcoin prices, with Twitter sentiment piped in as a side-channel. Took third at AIHack.",
    stack: ["Python", "TF"],
  },
  {
    glow: "glowB",
    kind: "WINNER, HACKVIOLET",
    year: "2021",
    name: "em.",
    desc:
      "Personalised exercise plans aimed at easing period pain. Won the Best Domain Award at HackViolet.",
    stack: ["Wix", "Node"],
  },
  {
    glow: "glowC",
    kind: "BEST 1ST-YEAR, ICL",
    year: "2019",
    name: "Dance Dance Convolution",
    desc:
      "A rhythm game inspired by Just Dance, running on an Xilinx PYNQ-Z1 FPGA with on-board CNN gesture recognition. Picked up Best First Year Project at Imperial.",
    stack: ["C++", "Python", "FPGA"],
  },
];

function ProjectCard({ name, kind, year, desc, stack, span = 1, glow }) {
  const AUR = useAur();
  return (
    <div
      className="aur-proj-card"
      style={{
        gridColumn: `span ${span}`,
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AurPh
        h={span === 2 ? 260 : 180}
        label={name.toLowerCase()}
        glow={AUR[glow]}
      />
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              ...aurMono,
              fontSize: 10,
              color: AUR.muted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {kind}
          </span>
          <span style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
            {year}
          </span>
        </div>
        <h3
          style={{
            ...aurSans,
            fontSize: span === 2 ? 24 : 19,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            margin: 0,
            color: AUR.inkBold,
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            ...aurSans,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: AUR.mutedHi,
            margin: 0,
            flex: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginTop: 8,
          }}
        >
          {stack.map((t) => (
            <AurChip key={t} color={AUR.mutedHi}>
              {t}
            </AurChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AuroraProjects() {
  const AUR = useAur();
  return (
    <section>
      <SectionHead
        k="03"
        label="Projects"
        title="Things I've built."
        kicker="A working subset. Production ML at Datature, a couple of master's theses, side projects on weekends, and the odd hackathon."
      />
      <div
        className="aur-proj-grid"
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
      <div
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...aurSans, fontSize: 14, color: AUR.mutedHi }}>
          + more in the archive
        </span>
        <a
          href="/projects"
          style={{
            ...aurSans,
            fontSize: 14,
            fontWeight: 500,
            color: AUR.link,
            textDecoration: "none",
          }}
        >
          View all projects →
        </a>
      </div>
    </section>
  );
}
