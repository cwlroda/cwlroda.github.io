// Resume content lives here, separated from the rendering component so editing
// the resume never requires touching JSX. To add a new version, add another
// entry to `resumes` keyed by a URL-friendly id. The page picks up
// `#/resume/<id>` automatically and shows a version picker when more than one
// entry exists.
//
// Bullet shape:
//   { heading: "Section name:", body: "..." }  -> heading is bolded
//   { body: "..." }                            -> no bold prefix
//   "plain string"                             -> equivalent to { body }
//
// Contact entries are { text, href? }. If href is set, the entry renders as a
// link; otherwise as plain text.

const datatureExperience = {
  company: "Datature",
  location: "Singapore",
  period: "Nov 2022 - Present",
  title: "Machine Learning Engineer",
  bullets: [
    {
      heading: "MLOps & Pipeline Architecture:",
      body: "Architected and deployed end-to-end MLOps and CI/CD pipelines for vision models across the manufacturing, agriculture, and healthcare sectors, effectively reducing time-to-production by up to 90%.",
    },
    {
      heading: "Distributed Training & VLMs:",
      body: "Engineered distributed fine-tuning workflows for vision-language models utilizing DeepSpeed and LoRA via PEFT, enabling efficient VQA and grounding workloads on constrained GPU infrastructure.",
    },
    {
      heading: "Inference Optimization:",
      body: "Deployed large-scale VLMs and LLMs using vLLM, TRT-LLM, and NVIDIA NIM, boosting inference throughput by up to 5x through advanced tensor parallelism, quantization, and dynamic batching techniques.",
    },
    {
      heading: "Multimodal RAG & Vector Retrieval:",
      body: "Built high-performance image retrieval systems leveraging dense embeddings and vector databases (FAISS, Pinecone), significantly improving query latency and overall retrieval quality.",
    },
    {
      heading: "Synthetic Data & Automated Curation:",
      body: "Designed multimodal synthetic data pipelines combining diffusion models and LLMs to enhance dataset robustness and minimize manual labeling. Automated large-scale dataset curation utilizing t-SNE visualization, deduplication, and image uniqueness scoring.",
    },
    {
      heading: "Edge Deployment & Agentic Frameworks:",
      body: "Developed edge deployment containers featuring highly customizable workflows for real-time inference. Created agentic frameworks and orchestration systems integrated with internal products to automate AI-assisted operations.",
    },
    {
      heading: "Research to Production:",
      body: "Spearheaded critical R&D initiatives that directly contributed to revenue growth by productizing novel research concepts. Conducted embedding analysis (PCA, SVD) to identify system failure modes and drive targeted data collection.",
    },
  ],
};

const dsoExperience = {
  company: "DSO National Laboratories",
  location: "Singapore",
  period: "Mar 2021 - Sep 2021",
  title: "Robotics Research Intern",
  bullets: [
    {
      heading: "System Optimization:",
      body: "Optimized a multi-robot collaborative SLAM system utilizing advanced algorithmic methods, delivering massive inference acceleration of 40x and 20x across two major system stages.",
    },
  ],
};

const htxExperience = {
  company: "Home Team Science & Technology Agency (HTX)",
  location: "Singapore",
  period: "Jun 2020 - Nov 2020",
  title: "Data Science & Artificial Intelligence Intern",
  bullets: [
    {
      heading: "NLP Integration:",
      body: "Built an abstractive text summarization web application leveraging state-of-the-art NLP models, achieving ROUGE scores exceeding 80 on stringent evaluation datasets.",
    },
    {
      heading: "Computer Vision Pipelines:",
      body: "Spearheaded the development of a multi-subject, multi-stream fall detection CNN, achieving 83.3% precision and 90.9% F1 score. Trained and deployed a specialized CNN for mask detection (>80% mAP) to support public-safety enforcement during the COVID-19 pandemic.",
    },
  ],
};

const ethEducation = {
  school: "ETH Zurich",
  location: "Zurich, Switzerland",
  period: "Sep 2021 - Sep 2022",
  degree:
    "Joint Master's in Information Technology & Electrical Engineering",
  bullets: [
    {
      heading: "Awards:",
      body: "SEMP Scholarship Recipient.",
    },
    {
      heading: "Master Thesis (Cloud Distributed Systems):",
      body: "Engineered a resilient ML inference serving system on AWS featuring a custom scheduler, effectively doubling multi-node throughput.",
    },
    {
      heading: "Semester Thesis (3D Supervision):",
      body: "Developed a high-performance 3D point cloud annotation tool utilizing TypeScript and Three.js, increasing annotation throughput by 67%.",
    },
  ],
};

const imperialEducation = {
  school: "Imperial College London",
  location: "London, UK",
  period: "Sep 2018 - Sep 2022",
  degree: "Master's in Electronic & Information Engineering",
  bullets: [
    {
      heading: "Honours:",
      body: "First Class Honours; ranked in the top 10% of the cohort.",
    },
  ],
};

const defaultResume = {
  id: "default",
  label: "ML Engineer",
  filename: "Wei_Loon_Cheng_Resume.pdf",
  header: {
    name: "Wei Loon Cheng",
    subtitle:
      "Machine Learning Engineer | Computer Vision | Vision-Language Models | MLOps | Scalable AI",
    contact: [
      { text: "+65 9109 9230" },
      { text: "weiloon.c97@gmail.com", href: "mailto:weiloon.c97@gmail.com" },
      { text: "Singapore" },
      {
        text: "linkedin.com/in/weilooncheng",
        href: "https://www.linkedin.com/in/weilooncheng/",
      },
    ],
  },
  summary:
    "Machine Learning Engineer with 3+ years of specialized MLOps experience and 5+ years in software engineering. Expert in computer vision, vision-language models (VLMs), multimodal retrieval, and architecting production-grade AI systems. Proven track record in orchestrating distributed training, optimizing model inference, and designing robust workflows that accelerate the transition of cutting-edge research into highly scalable, revenue-generating deployments.",
  skills: [
    {
      category: "Languages & Frameworks",
      items: "Python, PyTorch, TensorFlow, ONNX, OpenCV, Flask, Bash, Linux",
    },
    {
      category: "LLM/VLM & Training Infra",
      items:
        "DeepSpeed, PEFT, LoRA, vLLM, TRT-LLM, HuggingFace Transformers, distributed training, tensor parallelism, quantization, dynamic batching",
    },
    {
      category: "ML Systems & Deployment",
      items:
        "Docker, AWS, GCP, CI/CD, model serving, inference optimization, GPU acceleration, scalable AI deployment",
    },
    {
      category: "Retrieval & Data Systems",
      items:
        "RAG pipelines, vector search, FAISS, Pinecone, dense embeddings, multimodal retrieval, data curation",
    },
    {
      category: "Applied AI & Domains",
      items:
        "Computer Vision, Vision-Language Models, Multimodal AI, Synthetic Data Generation, Agentic Workflows",
    },
  ],
  experience: [datatureExperience, dsoExperience, htxExperience],
  education: [ethEducation, imperialEducation],
};

export const resumes = {
  default: defaultResume,
};

export const defaultResumeId = "default";
