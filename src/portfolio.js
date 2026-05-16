/* Change this file to get your personal Portfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to true if you want to use the splash screen.
  useCustomCursor: false, // Change this to false if you want the good'ol cursor
  googleTrackingID: "G-SDN08JYNZG",
};

//Home Page
const greeting = {
  data: {
    title: "Hello! ",
    title2: "Wei Loon",
    logo_name: "@cwlroda",
    nickname: "Wei Loon",
    full_name: "Wei Loon Cheng",
    subTitle:
      "Machine Learning Engineer at Datature. I work on computer vision, vision-language models, and the MLOps glue that gets them into production.",
    resumeLink:
      "https://drive.google.com/uc?export=download&id=1pGTinnif3OEzvgFd_4Tk_5PmqhKzn4sD",
    mail: "mailto:weiloon.c97@gmail.com",
    profile_image_path: "weiloon.png",
  },
};

const socialMediaLinks = {
  /* Your Social Media Link */
  github: "https://github.com/cwlroda/",
  linkedin: "https://www.linkedin.com/in/weilooncheng/",
  gmail: "weiloon.c97@gmail.com",
  twitter: "https://twitter.com/cwlroda/",
  facebook: "https://www.facebook.com/cwlroda/",
  instagram: "https://www.instagram.com/cwlroda/",
  location: "https://goo.gl/maps/3pfUkRCJY27LA7e19",
};

const skills = {
  data: [
    {
      title: "Machine Learning & Vision-Language Models",
      skills: [
        "⚡\tDesigning end-to-end MLOps pipelines for vision and vision-language models",
        "⚡\tDistributed fine-tuning with DeepSpeed, PEFT and LoRA on tight GPU budgets",
        "⚡\tInference optimisation with vLLM, TRT-LLM and NVIDIA NIM, including tensor parallelism, quantisation and dynamic batching (up to 5x throughput)",
        "⚡\tMultimodal retrieval (RAG) with dense embeddings on FAISS and Pinecone",
        "⚡\tSynthetic data generation with diffusion models and LLMs, plus automated curation with t-SNE and deduplication",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "logos-python",
          style: {
            color: "#3776AB",
          },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "simple-icons:pytorch",
          style: {
            color: "#EE4C2C",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            color: "#FF6F00",
          },
        },
        {
          skillName: "OpenCV",
          fontAwesomeClassname: "simple-icons:opencv",
          style: {
            color: "#5C3EE8",
          },
        },
        {
          skillName: "HuggingFace",
          fontAwesomeClassname: "simple-icons:huggingface",
          style: {
            color: "#FFD21E",
          },
        },
        {
          skillName: "ONNX",
          fontAwesomeClassname: "simple-icons:onnx",
          style: {
            color: "#005CED",
          },
        },
      ],
    },
    {
      title: "MLOps, Infra & Deployment",
      skills: [
        "⚡\tCI/CD pipelines that have cut time-to-production by up to 90%",
        "⚡\tContainerised model serving, GPU acceleration, and edge deployment",
        "⚡\tDeploying ML systems on AWS and GCP at scale",
        "⚡\tAgentic frameworks and orchestration baked into production products",
      ],
      softwareSkills: [
        {
          skillName: "Docker",
          fontAwesomeClassname: "logos-docker-icon",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "logos-aws",
          style: {
            color: "#aaaaaa",
          },
        },
        {
          skillName: "Google Cloud Platform",
          fontAwesomeClassname: "logos-google-cloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: {
            color: "#5b77ef",
          },
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "logos-linux-tux",
          style: {
            color: "#FCC624",
          },
        },
        {
          skillName: "Bash",
          fontAwesomeClassname: "logos-bash-icon",
          style: {
            color: "",
          },
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: {
            color: "#E94E32",
          },
        },
      ],
    },
    {
      title: "Software Engineering",
      skills: [
        "⚡\tFive-plus years across systems, backends and ML platform code",
        "⚡\tFast, reliable backends in Python, C, C++ and Java",
        "⚡\tLarge-scale database work with MySQL",
        "⚡\tComfortable going low-level when needed, including FPGAs",
      ],
      softwareSkills: [
        {
          skillName: "C",
          fontAwesomeClassname: "logos-c",
          style: {
            color: "#A8B9CC",
          },
        },
        {
          skillName: "C++",
          fontAwesomeClassname: "logos-c-plusplus",
          style: {
            color: "#00599C",
          },
        },
        {
          skillName: "Java",
          fontAwesomeClassname: "logos-java",
          style: {
            color: "#f89820",
          },
        },
        {
          skillName: "Flask",
          fontAwesomeClassname: "simple-icons:flask",
          style: {
            color: "#aaaaaa",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "logos-mysql",
          style: {
            color: "#4479A1",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "logos-nodejs-icon",
          style: {
            color: "#339933",
          },
        },
      ],
    },
    {
      title: "Web & Tooling",
      skills: [
        "⚡\tResponsive web apps in React and TypeScript",
        "⚡\tDesktop tooling in F# and Electron",
        "⚡\tA bit of mobile work in Swift",
      ],
      softwareSkills: [
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            color: "#F7DF1E",
          },
        },
        {
          skillName: "TypeScript",
          fontAwesomeClassname: "simple-icons:typescript",
          style: {
            color: "#3178C6",
          },
        },
        {
          skillName: "React",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "HTML5",
          fontAwesomeClassname: "vscode-icons:file-type-html",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "vscode-icons:file-type-css",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "F#",
          fontAwesomeClassname: "logos-fsharp",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "Electron",
          fontAwesomeClassname: "simple-icons:electron",
          style: {
            color: "#47848F",
          },
        },
        {
          skillName: "Swift",
          fontAwesomeClassname: "vscode-icons:file-type-swift",
          style: {
            color: "#FA7343",
          },
        },
      ],
    },
  ],
};

const education = {
  description:
    "A quick run-down of where I studied and what I picked up along the way.",
};

const degrees = {
  degrees: [
    {
      title: "ETH Zurich",
      subtitle:
        "Joint Master's in Information Technology & Electrical Engineering",
      logo_path: "eth.png",
      alt_name: "ETH",
      duration: "2021 to 2022",
      descriptions: [
        "⚡\tSwiss-European Mobility Programme (SEMP) scholarship holder",
        "⚡\tMaster's thesis on resilient ML inference serving (AWS), roughly doubled multi-node throughput",
        "⚡\tSemester thesis: a 3D point-cloud annotation tool in TypeScript and Three.js (+67% throughput)",
        "⚡\tFinal GPA 5.33 / 6.00",
      ],
      website_link:
        "https://ethz.ch/en/studies/master/degree-programmes/engineering-sciences/electrical-engineering-and-information-technology.html",
    },
    {
      title: "Imperial College London",
      subtitle:
        "MEng Electronic and Information Engineering with a Year Abroad",
      logo_path: "imperial.png",
      alt_name: "ICL",
      duration: "2018 to 2022",
      descriptions: [
        "⚡\tFirst Class Honours, in the top 10% of the cohort",
        "⚡\tUndergraduate tutor for Information Processing and Software Systems",
        "⚡\tBest First Year Project (2019) for Dance Dance Convolution",
        "⚡\tIEEE Associate Member",
      ],
      website_link:
        "https://www.imperial.ac.uk/study/ug/courses/electrical-engineering-department/electrical-and-electronic-engineering-year-abroad/",
    },
  ],
};

const modules = {
  groups: [
    {
      title: "Hardware & Low-level Programming",
      data: [
        {
          id: "0",
          name: "Analysis of Circuits",
          url:
            "https://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-01&s=J3#start",
          description:
            "Analysis and modelling of electrical circuit behaviour in the frequency domain.",
          languages: [],
        },
        {
          id: "1",
          name: "Feedback Systems",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-21&s=I2#start",
          description:
            "Analysis and modelling of linear and non-linear feedback control systems.",
          languages: [],
        },
        {
          id: "2",
          name: "Digital Electronics",
          url:
            "https://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-01&s=J3#start",
          description: "Analysis and synthesis of synchronous digital systems.",
          languages: [
            {
              name: "Verilog",
              iconifyClass: "vscode-icons:file-type-verilog",
            },
          ],
        },
        {
          id: "3",
          name: "Computer Architecture",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-13&s=I2#start",
          description:
            "Analysis of how computers work and microprocessor design through assembly instructions to the hardware.",
          languages: [
            {
              name: "Assembly",
              iconifyClass: "simple-icons:assemblyscript",
            },
          ],
        },
        {
          id: "4",
          name: "Language Processors",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-15&s=I2#start",
          description:
            "Design and implementation of language processors and compilers.",
          languages: [
            {
              name: "C",
              iconifyClass: "logos-c",
            },
            {
              name: "C++",
              iconifyClass: "vscode-icons:file-type-cpp3",
            },
            {
              name: "Python",
              iconifyClass: "logos-python",
            },
          ],
        },
      ],
    },
    {
      title: "Software Engineering",
      data: [
        {
          id: "0",
          name: "Introduction to Computing",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-07&s=I2#start",
          description:
            "Basic principles of software engineering, program design and implementation.",
          languages: [
            {
              name: "C++",
              iconifyClass: "vscode-icons:file-type-cpp3",
            },
          ],
        },
        {
          id: "1",
          name: "Algorithms & Data Structures",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-08&s=I2#start",
          description:
            "Building of abstract data types and algorithms such as lookup and sorting.",
          languages: [
            {
              name: "C++",
              iconifyClass: "vscode-icons:file-type-cpp3",
            },
          ],
        },
        {
          id: "2",
          name: "Algorithms & Complexity",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-10C&s=I2",
          description:
            "Performance analysis and heuristics of algorithmic problems on lists and graphs",
          languages: [
            {
              name: "Python",
              iconifyClass: "logos-python",
            },
          ],
        },
        {
          id: "3",
          name: "Object-Oriented Programming",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-12&s=I2#start",
          description:
            "Designing of abstract and reusable software component using classes.",
          languages: [
            {
              name: "C++",
              iconifyClass: "vscode-icons:file-type-cpp3",
            },
          ],
        },
        {
          id: "4",
          name: "Software Architecture",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=ELEC50003&s=I2#start",
          description:
            "Full product design process from high level goals to detailed design.",
          languages: [],
        },
        {
          id: "5",
          name: "Databases",
          url:
            "https://www.imperial.ac.uk/computing/current-students/courses/40007/",
          description:
            "Modelling of relational databases and normalisation of relation schemas.",
          languages: [
            {
              name: "MySQL",
              iconifyClass: "logos-mysql",
            },
          ],
        },
        {
          id: "6",
          name: "Computer Networks & Distributed Systems",
          url:
            "http://www.imperial.ac.uk/computing/current-students/courses/70041/",
          description:
            "Principles and designing of networks, computer security and distributed system architecture.",
          languages: [
            {
              name: "Java",
              iconifyClass: "logos-java",
            },
          ],
        },
        {
          id: "7",
          name: "High Level Programming",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE3-22&s=J3#start",
          description:
            "Developing and testing large-scale applications using modern functional programming.",
          languages: [
            {
              name: "F#",
              iconifyClass: "logos-fsharp",
            },
          ],
        },
      ],
    },
    {
      title: "Machine Learning & AI",
      data: [
        {
          id: "0",
          name: "Artifical Intelligence",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE3-16&s=J3#start",
          description:
            "Developing algorithms for problem-solving search and automated reasoning in different logics.",
          languages: [
            {
              name: "SWI-Prolog",
              iconifyClass: "vscode-icons:file-type-prolog",
            },
          ],
        },
        {
          id: "1",
          name: "Machine Learning",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE3-23&s=J3#start",
          description:
            "Modelling learning and inference problems with big data.",
          languages: [],
        },
        {
          id: "2",
          name: "Deep Learning",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE3-25&s=J3#start",
          description:
            "Developing approaches for learning with deep neural networks.",
          languages: [
            {
              name: "Python",
              iconifyClass: "logos-python",
            },
            {
              name: "Tensorflow",
              iconifyClass: "logos-tensorflow",
            },
          ],
        },
        {
          id: "3",
          name: "Computer Vision",
          url:
            "http://www.imperial.ac.uk/computing/current-students/courses/60006",
          description:
            "Developing algorithms for feature and object detection in images.",
          languages: [
            {
              name: "Python",
              iconifyClass: "logos-python",
            },
            {
              name: "Tensorflow",
              iconifyClass: "logos-tensorflow",
            },
            {
              name: "PyTorch",
              iconifyClass: "logos-pytorch",
            },
          ],
        },
        {
          id: "4",
          name: "Image Analysis & Computer Vision",
          url: "https://people.ee.ethz.ch/~cvcourse/",
          description:
            "Image formation, perception and analysis, and deep learning and AI-based approaches to computer vision.",
          languages: [
            {
              name: "Python",
              iconifyClass: "logos-python",
            },
            {
              name: "Tensorflow",
              iconifyClass: "logos-tensorflow",
            },
          ],
        },
        {
          id: "5",
          name: "Theory of Robotics and Mechatronics",
          url:
            "http://www.imperial.ac.uk/computing/current-students/courses/60019",
          description:
            "Theoretical fundamentals of robotics, including perception, manipulation, and cognition.",
          languages: [
            {
              name: "MATLAB",
              iconifyClass: "vscode-icons:file-type-matlab",
            },
          ],
        },
        {
          id: "6",
          name: "Robotics",
          url:
            "http://www.imperial.ac.uk/computing/current-students/courses/60019",
          description:
            "Developing algorithms for Simultaneous Localisation and Mapping.",
          languages: [
            {
              name: "Lua",
              iconifyClass: "logos-lua",
            },
          ],
        },
      ],
    },
    {
      title: "Signal Processing",
      data: [
        {
          id: "0",
          name: "Signals & Linear Systems",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-05&s=J3#start",
          description: "Modelling signals in time and frequency domains.",
          languages: [],
        },
        {
          id: "1",
          name: "Communication Systems",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-04&s=J3#start",
          description:
            "Analysis of random processes, noise modelling, and performance of analog and digital communication systems.",
          languages: [],
        },
      ],
    },
    {
      title: "Mathematics",
      data: [
        {
          id: "0",
          name: "Complex Variables",
          url:
            "https://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-08A&s=I2#start",
          description:
            "Evaluating complex and improper integrals and Laplace transforms.",
          languages: [],
        },
        {
          id: "1",
          name: "Probability & Statistics",
          url:
            "https://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE2-08B&s=I2#start",
          description: "Set and estimation theory for statistical analysis.",
          languages: [],
        },
        {
          id: "2",
          name: "Linear Algebra",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-10A&s=I1",
          description: "Analysis of vector and matrix operations.",
          languages: [],
        },
        {
          id: "3",
          name: "Numerical Analysis",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-10A&s=I1",
          description:
            "Solving ordinary and partial differential equations involving scalar and vector fields.",
          languages: [
            {
              name: "MATLAB",
              iconifyClass: "vscode-icons:file-type-matlab",
            },
          ],
        },
        {
          id: "4",
          name: "Operations Research",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=CO343&s=J3#start",
          description:
            "Solving optimisation problems using linear and integer programming.",
          languages: [
            {
              name: "MATLAB",
              iconifyClass: "vscode-icons:file-type-matlab",
            },
          ],
        },
      ],
    },
    {
      title: "Engineering Design",
      data: [
        {
          id: "0",
          name: "Engineering Design & Practice",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-13&s=I2#start",
          description:
            "Analysis of approaches to the design, creation and operation of systems and products.",
          languages: [],
        },
        {
          id: "1",
          name: "User-Centered Information Systems",
          url:
            "http://intranet.ee.ic.ac.uk/electricalengineering/eecourses_t4/course_content.asp?c=EE1-12&s=I2#start",
          description:
            "Analysis of interaction and visualisation techniques in the domain of Human-Computer Interaction.",
          languages: [],
        },
      ],
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Intro to ML: Image Processing",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs1.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Intro to ML: Language Processing",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs2.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Intermediate ML: Tensorflow on GCP",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs3.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Google Cloud Solutions II: Data and Machine Learning",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs4.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Integrate with Machine Learning APIs",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs5.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Advanced ML: ML Infrastructure",
      subtitle: "Google Cloud Platform | Qwiklabs",
      logo_path: "qwiklabs6.png",
      certificate_link:
        "https://www.qwiklabs.com/public_profiles/40e5ddb5-b0b0-458d-ac11-62dde889a1ed",
      alt_name: "Google Cloud Platform | Qwiklabs",
      color_code: "#C5E2EE",
    },
    {
      title: "Programming Foundations: Design Patterns",
      subtitle: "LinkedIn",
      logo_path: "linkedin.png",
      certificate_link:
        "http://www.linkedin.com/learning/programming-foundations-design-patterns-2",
      alt_name: "LinkedIn",
      color_code: "#C5E2EE",
    },
    {
      title: "HackerRank",
      subtitle: "",
      logo_path: "hackerrank.svg",
      certificate_link: "https://www.hackerrank.com/weiloon_c97",
      alt_name: "HackerRank",
      color_code: "#C5E2EE",
    },
    {
      title: "LeetCode",
      subtitle: "",
      logo_path: "leetcode.png",
      certificate_link: "https://leetcode.com/weilooncheng/",
      alt_name: "LeetCode",
      color_code: "#C5E2EE",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Roles & Internships",
  description:
    "Three years as a Machine Learning Engineer at Datature, with a research stint at DSO and a couple of DSAI internships at HTX before that. Most of the through-line is taking interesting research and turning it into something teams can actually run in production.",
  header_image_pathz: "experience.svg",
  internships: {
    title: "Roles & Internships",
    experiences: [
      {
        title: "Machine Learning Engineer",
        company: "Datature",
        company_url: "https://www.datature.io/",
        logo_path: "datature.png",
        duration: "November 2022 to Present",
        location: "Singapore",
        description:
          "I work across Datature's two products. Nexus (since 2022) is our no-code computer vision platform for training, evaluating and deploying detection, segmentation and classification models. Vi (since 2025) is the newer VLMOps stack for fine-tuning and deploying vision-language models like Qwen-VL, InternVL and Llama 4. Day to day that covers (Q)LoRA training on DeepSpeed, inference serving with vLLM, TRT-LLM and NVIDIA NIM (up to 5x throughput), multimodal RAG on FAISS and Pinecone, synthetic data pipelines, and edge deployment containers wired into agentic workflows. The CI/CD work alone has trimmed time-to-production by up to 90% on customer projects in manufacturing, agriculture and healthcare.",
        color: "#C5E2EE",
        link: "https://www.datature.io/",
      },
      {
        title: "Robotics Research Intern",
        company: "DSO National Laboratories",
        company_url: "https://www.dso.org.sg/",
        logo_path: "dso.png",
        duration: "March 2021 to September 2021",
        location: "Office / Work From Home",
        description:
          "Spent the internship profiling and rewriting the hot paths in a multi-robot collaborative SLAM system. Two of the pipeline stages came out 40x and 20x faster than where they started.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/CSLM/",
      },
      {
        title: "Data Science & Artificial Intelligence Intern",
        company: "Home Team Science & Technology Agency",
        company_url: "https://www.htx.gov.sg/",
        logo_path: "htx.png",
        duration: "September 2020 to November 2020",
        location: "Work From Home",
        description:
          "Built an abstractive news summariser web app on top of BART. ROUGE came in above 0.80 on the evaluation set, which was nice.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/bart_summariser/",
      },
      {
        title: "Sense-Making & Surveillance Intern",
        company: "Home Team Science & Technology Agency",
        company_url: "https://www.htx.gov.sg/",
        logo_path: "htx.png",
        duration: "June 2020 to September 2020",
        location: "Office / Work From Home",
        description:
          "Led the build of a multi-person, multi-stream fall-detection CNN in Python (83.3% precision, F1 of 90.9). Also trained and deployed a COVID-19 mask-detection CNN above 80% mAP, used to help with public-safety enforcement during the pandemic.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/falldetection_openpifpaf/",
      },
      {
        title: "Product Development Intern",
        company: "Fashion Learning Hive ",
        company_url: "https://fashive.org/",
        logo_path: "fashive.png",
        duration: "July 2019 to September 2019",
        location: "Office",
        description:
          "Rebuilt the company website from scratch with WordPress, HTML, CSS and JavaScript. It picked up thousands of views in the first month. I also wrote a small JavaScript API to keep course data in sync between the website and the LMS portal.",
        color: "#C5E2EE",
        link: "https://fashive.org/",
      },
      {
        title: "Product Optimisation Intern",
        company: "Trek 2000",
        company_url: "https://www.trek2000.com.sg/",
        logo_path: "trek.png",
        duration: "June 2013",
        location: "Office",
        description:
          "My first taste of industry as a school-age intern. Mostly tightening up C++ algorithms in their embedded security products.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/",
      },
    ],
  },
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "A mix of work projects, weekend builds and the odd hackathon. Most of these started as an excuse to try something new outside of the day job.",
  avatar_image_path: "projects_image.svg",
  link: "https://github.com/cwlroda/",
};

const hackathons = {
  data: [
    {
      id: "0",
      name: "BITweets",
      url: "https://github.com/cwlroda/btc-predictor",
      description:
        "A weekend punt at predicting Bitcoin prices with a multi-dimensional bidirectional LSTM, fed by tweet sentiment as a side signal. Came third at AIHack 2021.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Jupyter Notebook",
          iconifyClass: "logos-jupyter",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
      ],
      logo_path: "aihack.png",
      logo_link: "https://2021.aihack.org/",
      alt_name: "AI Hack 2021",
    },
    {
      id: "1",
      name: "blinkr",
      url: "https://github.com/cwlroda/blinkr",
      description:
        "A small web app nudging people into better screen habits, with a remote eye test that uses speech-to-text instead of an in-person chart. Made the Hacklytics 2021 finals.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "HTML5",
          iconifyClass: "vscode-icons:file-type-html",
        },
        {
          name: "CSS3",
          iconifyClass: "vscode-icons:file-type-css",
        },
        {
          name: "NodeJS",
          iconifyClass: "logos-nodejs-icon",
        },
      ],
      logo_path: "hacklytics.png",
      logo_link: "https://hacklytics.io/",
      alt_name: "Hacklytics 2021",
    },
    {
      id: "2",
      name: "em.",
      url: "https://github.com/cwlroda/em",
      description:
        "A web app that builds personalised exercise plans for women, aimed at easing period pain and discomfort. Picked up the Best Domain Award at HackViolet 2021.",
      languages: [
        {
          name: "Wix",
          iconifyClass: "logos-wix",
        },
        {
          name: "NodeJS",
          iconifyClass: "logos-nodejs-icon",
        },
        {
          name: "Firebase",
          iconifyClass: "logos-firebase",
        },
      ],
      logo_path: "hackviolet.png",
      logo_link: "https://www.hackviolet.com/",
      alt_name: "HackViolet 2021",
    },
    {
      id: "3",
      name: "Virtualso Piano",
      url: "https://github.com/cwlroda/virtual-piano",
      description:
        "Play a piano with nothing but your webcam. Computer vision tracks all ten fingers in real time and maps their motion to notes, so any flat surface works as a keyboard.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
      ],
      logo_path: "hacksheffield.png",
      logo_link: "https://hs6.hacksheffield.com/",
      alt_name: "hackSheffield 6",
    },
    {
      id: "4",
      name: "Don8te",
      url: "https://github.com/cwlroda/Hack-A-Project-20",
      description:
        "An iOS app that matches donors with people who actually need the things they're giving away. Took third in the prototype forum at Facebook Hack-A-Project 2020.",
      languages: [
        {
          name: "Swift",
          iconifyClass: "vscode-icons:file-type-swift",
        },
        {
          name: "Firebase",
          iconifyClass: "logos-firebase",
        },
      ],
      logo_path: "hackaproject.png",
      logo_link:
        "https://www.facebook.com/facebooklondon/posts/2024153967670042",
      alt_name: "Facebook Hack-A-Project 2020",
    },
    {
      id: "5",
      name: "Dinner-Dash",
      url: "https://github.com/cwlroda/Dinner-Dash",
      description:
        "An Android app that picks quick recipes from what's in your fridge and the cookware you actually own. Came fourth in the IoT category at ICHack 2020.",
      languages: [
        {
          name: "Java",
          iconifyClass: "logos-java",
        },
        {
          name: "Android Studio",
          iconifyClass: "mdi-android-studio",
        },
      ],
      logo_path: "ichack.png",
      logo_link: "https://20.ichack.org/",
      alt_name: "IC Hack 2020",
    },
  ],
};

const projects = {
  data: [
    {
      id: "0",
      name: "Nexus (Datature)",
      url: "https://datature.io/product/train",
      description:
        "Datature's no-code computer vision platform for training, evaluating and deploying detection, segmentation and classification models. Drag-and-drop training workflows around FasterRCNN and YOLOX, IntelliBrush for AI-assisted labelling of masks, polygons and boxes, and managed cloud-API deployment with load balancing.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "PyTorch",
          iconifyClass: "logos-pytorch",
        },
        {
          name: "Docker",
          iconifyClass: "logos-docker-icon",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "1",
      name: "Vi (Datature)",
      url: "https://vi.datature.com",
      description:
        "Datature's VLMOps platform for fine-tuning and deploying vision-language models. Supports phrase grounding, VQA, chain-of-thought and VLA labels, with (Q)LoRA and SFT training on anything from T4 to B200, plus NF4 quantisation. Ships through a local SDK or NVIDIA NIM containers with OpenAI-compatible APIs.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "PyTorch",
          iconifyClass: "logos-pytorch",
        },
        {
          name: "Docker",
          iconifyClass: "logos-docker-icon",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "2",
      name: "Snail's Trail",
      url: "https://cwlroda.github.io/snailstrail/",
      description:
        "A daily word game for Wikipedia obsessives. You're dropped on a random article and have to hop, link by link, to a target article in ten moves or fewer. Behind the scenes there's a small embedding model running in the browser to rank which links bring you closer, so the suggestions stay snappy without a backend.",
      languages: [
        {
          name: "React",
          iconifyClass: "logos-react",
        },
        {
          name: "Typescript",
          iconifyClass: "logos-typescript-icon",
        },
        {
          name: "Vite",
          iconifyClass: "logos-vitejs",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "3",
      name: "Datature Portal",
      url: "https://github.com/datature/portal",
      description:
        "Open-source viewer for loading deep neural networks and running them against images and videos. I contribute to it.",
      languages: [
        {
          name: "Typescript",
          iconifyClass: "logos-typescript-icon",
        },
        {
          name: "React",
          iconifyClass: "logos-react",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "4",
      name: "Scalabel",
      url: "https://github.com/scalabel/scalabel",
      description:
        "Built out the 3D point-cloud annotation workflow on Scalabel, an open-source labelling platform used by research groups including Berkeley DeepDrive. The goal was making 3D labels feel as quick to place as 2D ones.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Typescript",
          iconifyClass: "logos-typescript-icon",
        },
        {
          name: "React",
          iconifyClass: "logos-react",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "5",
      name: "DH3D",
      url: "https://github.com/cwlroda/DH3D",
      description:
        "Plugged a hierarchical 3D local and global descriptor model into a multi-robot collaborative SLAM stack. Did wonders for cross-robot loop-closure precision.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "MATLAB",
          iconifyClass: "vscode-icons:file-type-matlab",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "6",
      name: "3DFeatNet",
      url: "https://github.com/cwlroda/3DFeatNet",
      description:
        "Tuning a weakly-supervised 3D feature detector for point-cloud registration on the Oxford RobotCar dataset. Lots of careful sweeps to squeeze out accuracy without ground-truth correspondences.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "MATLAB",
          iconifyClass: "vscode-icons:file-type-matlab",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "7",
      name: "ISSIE",
      url: "https://github.com/cwlroda/issie",
      description:
        "Wrote a fast 2D drawing library for ISSIE, a digital-circuit design and simulation app that Imperial uses to teach first-year undergrads. The trick was keeping it smooth with hundreds of wires on screen.",
      languages: [
        {
          name: "F#",
          iconifyClass: "logos-fsharp",
        },
        {
          name: "React",
          iconifyClass: "logos-react",
        },
        {
          name: "Electron",
          iconifyClass: "logos-electron",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "8",
      name: "Tracify",
      url: "https://github.com/cwlroda",
      description:
        "A Bluetooth-based contact-tracing prototype from early COVID. It warned people who had been near suspected or confirmed cases, with a self-reporting flow and links to medical help.",
      languages: [],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "9",
      name: "C-MIPS-Compiler",
      url: "https://github.com/cwlroda/C-MIPS-Compiler",
      description:
        "A small compiler that translates C89 down to MIPS assembly, plus a sister tool that goes from C to Python. Built as a coursework project, kept around because compiler internals are too fun to delete.",
      languages: [
        {
          name: "C",
          iconifyClass: "logos-c",
        },
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "10",
      name: "MIPS Simulator",
      url: "https://github.com/cwlroda/MIPS-Simulator",
      description:
        "A MIPS-1 big-endian CPU simulator that runs binaries instruction by instruction, following the ISA spec faithfully enough to debug homework with.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
        {
          name: "Bash Script",
          iconifyClass: "logos-bash-icon",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "11",
      name: "Dance Dance Convolution",
      url: "https://github.com/cwlroda/Dance-Dance-Convolution",
      description:
        "A rhythm game inspired by Just Dance, running on an Xilinx PYNQ-Z1 FPGA with a CNN doing gesture recognition right on the board. Won Best First Year Project at Imperial.",
      languages: [
        {
          name: "C",
          iconifyClass: "logos-c",
        },
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "12",
      name: "Sudoku",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Sudoku",
      description:
        "A Sudoku validator and solver built around a basic backtracking search. The kind of project that's a rite of passage in any algorithms course.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
      ],
      logo_path: "",
      alt_name: "",
    },
    {
      id: "13",
      name: "2048",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/2048",
      description:
        "A terminal-only clone of 2048 with a side mode where a small AI plays itself using pseudorandom moves. Surprisingly entertaining to watch lose.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "14",
      name: "Othello",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Othello",
      description:
        "Two-player Othello (Reversi) in the terminal, with undo support and a move log so you can replay your worst losses.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "15",
      name: "Mastermind",
      url:
        "https://github.com/cwlroda/First-Year-Projects/tree/master/Mastermind",
      description:
        "An AI that plays Mastermind. It guesses, narrows the search space against the feedback, and tends to find the answer in only a handful of turns.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "16",
      name: "Path-Finding Algorithms",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Maze",
      description:
        "A small playground for maze-solving algorithms: random walks, breadth-first search and depth-first search, all running on the same grid for an honest comparison.",
      languages: [
        {
          name: "C++",
          iconifyClass: "vscode-icons:file-type-cpp3",
        },
      ],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "17",
      name: "EEBug",
      url: "https://github.com/cwlroda",
      description:
        "A four-wheeled rover that hunts light sources, built as part of a hands-on EE module. Mostly an exercise in keeping the wiring tidy.",
      languages: [],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "contact.png",
    description:
      "Feel free to drop me a connection request or send a message! I'm based in Singapore (GMT +8), and I usually reply within a working day.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I write the occasional post over on Medium, usually about something I've been building or learning recently.",
    link: "https://medium.com/@cwlroda/ ",
    avatar_image_path: "blogs_image.svg",
  },
  bugReporting: {
    title: "Bug Reporting",
    subtitle:
      "This site is just HTML, CSS, Node and React. If you spot a bug or have an idea for something to add, open an issue on the repo and I'll take a look.",
    link: "https://github.com/cwlroda/cwlroda.github.io/issues",
  },
};

export {
  settings,
  greeting,
  socialMediaLinks,
  skills,
  education,
  degrees,
  modules,
  certifications,
  experience,
  projectsHeader,
  hackathons,
  projects,
  contactPageData,
};
