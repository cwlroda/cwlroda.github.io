/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to true if you want to use the splash screen.
  useCustomCursor: false, // Change this to false if you want the good'ol cursor
  googleTrackingID: "G-SDN08JYNZG",
};

//Home Page
const greeting = {
  title: "Hello! ",
  title2: "Wei Loon",
  logo_name: "@cwlroda",
  nickname: "Wei Loon",
  full_name: "Wei Loon Cheng",
  subTitle:
    "Back-End Developer & Machine Learning Engineer. Currently learning Front-End to be a Full-Stack Developer 🔥.",
  resumeLink:
    "https://drive.google.com/uc?export=download&id=1pGTinnif3OEzvgFd_4Tk_5PmqhKzn4sD",
  mail: "mailto:weiloon.c97@gmail.com",
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
      title: "Back-End Development",
      skills: [
        "⚡\tProficient in algorithms and optimisation techniques",
        "⚡\tDeveloping fast and reliable application backend and API integration in C, C++, and Java",
        "⚡\tLarge-scale database management using MySQL",
        "⚡\tExperience with low-level development using FPGAs",
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
          skillName: "MySQL",
          fontAwesomeClassname: "logos-mysql",
          style: {
            color: "#4479A1",
          },
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: {
            color: "#E94E32",
          },
        },
        {
          skillName: "GitHub",
          fontAwesomeClassname: "logos-github-octocat",
          style: {
            color: "#181717",
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
      ],
    },
    {
      title: "Front-End Development",
      skills: [
        "⚡\tDeveloping responsive web apps in React, F#, and Electron",
        "⚡\tSome experience with building mobile apps (iPhone & Android)",
        "⚡\tCurrently learning UI/UX",
      ],
      softwareSkills: [
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
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            color: "#F7DF1E",
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
          skillName: "NodeJS",
          fontAwesomeClassname: "logos-nodejs-icon",
          style: {
            color: "#339933",
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
    {
      title: "Cloud Infra-Architecture",
      skills: [
        "⚡\tWorked on and deployed apps to cloud platforms",
        "⚡\tHosted and managed websites with thousands of views",
        "⚡\tExperience with CI/CD",
      ],
      softwareSkills: [
        {
          skillName: "Heroku",
          fontAwesomeClassname: "simple-icons:heroku",
          style: {
            color: "#6863A6",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "logos-firebase",
          style: {
            color: "#FFCA28",
          },
        },
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
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: {
            color: "#5b77ef",
          },
        },
      ],
    },
    {
      title: "Machine/Deep Learning",
      skills: [
        "Experienced in building and training:",
        "⚡\tNLP models for text processing and generation",
        "⚡\tComputer Vision models for object/feature detection and motion tracking",
        "⚡\tLinear regression and LSTM models for data prediction",
        "⚡\tCurrently learning RL techniques",
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
          skillName: "Keras",
          fontAwesomeClassname: "simple-icons:keras",
          style: {
            color: "#D00000",
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
          skillName: "PyTorch",
          fontAwesomeClassname: "simple-icons:pytorch",
          style: {
            color: "#EE4C2C",
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
          skillName: "Google Cloud Platform",
          fontAwesomeClassname: "logos-google-cloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "MATLAB",
          fontAwesomeClassname: "vscode-icons:file-type-matlab",
          style: {
            color: "",
          },
        },
      ],
    },
  ],
};

const education = {
  description:
    "Being accredited for the things I've learnt throughout the years is a great way for me to consolidate my knowledge and skills.",
};

const degrees = {
  degrees: [
    {
      title: "ETH Zurich",
      subtitle: "Master Electrical Engineering and Information Technology",
      logo_path: "eth.png",
      alt_name: "ETH",
      duration: "Starting 2021",
      descriptions: [
        "⚡\tExchange Masters under the Department of Information Technology and Electrical Engineering",
        "⚡\tSwiss-European Mobility Programme (SEMP) Scholarship holder",
        "⚡\tTaking modules in Natural Language Processing and Computer Vision",
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
      duration: "2018 - Present",
      descriptions: [
        "⚡\tFour-year Direct Masters",
        "⚡\tOn track for a First Class Honours",
        "⚡\tUndergraduate Tutor for Information Processing (Year 2) and Software Systems (Year 2)",
        "⚡\tTop 15% in the cohort (Year 1)",
        "⚡\tAchieved the Best First Year Project (2019)",
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
  subtitle: "Internships",
  description:
    "The internships I've done not only allow me to contribute my unique ideas to the companies I've worked with, but also present valuable opportunities to pick up new and exciting technology.",
  header_image_pathz: "experience.svg",
  internships: {
    title: "Internships",
    experiences: [
      {
        title: "Robotics Research Intern",
        company: "DSO National Laboratories",
        company_url: "https://www.dso.org.sg/",
        logo_path: "dso.png",
        duration: "March 2021 - Present",
        location: "Office / Work From Home",
        description:
          "I am currently developing a distributed framework for multi-robot SLAM using C++ that is robust to scaling and robot failures. I am also integrating real-time semantic mapping and optimisation techniques for enhanced computational time.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/CSLM/",
      },
      {
        title: "Data Science & Artificial Intelligence Intern",
        company: "Home Team Science & Technology Agency",
        company_url: "https://www.htx.gov.sg/",
        logo_path: "htx.png",
        duration: "September 2020 - November 2020",
        location: "Work From Home",
        description:
          "I built an abstractive news article summariser web app using NLP techniques in Python, which achieved a ROUGE score of >80%.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/bart_summariser/",
      },
      {
        title: "Sense-Making & Surveillance Intern",
        company: "Home Team Science & Technology Agency",
        company_url: "https://www.htx.gov.sg/",
        logo_path: "htx.png",
        duration: "June 2020 - September 2020",
        location: "Office / Work From Home",
        description:
          "I spearheaded the development of a robust pose estimation deep learning model in Python to detect falls on multiple people concurrently on multiple video streams, which achieved an accuracy of 83.33% and an F1 score of 90.91%. I also trained a deep learning model for COVID-19 mask detection using Python that achieved >80% mAP.",
        color: "#C5E2EE",
        link: "https://github.com/cwlroda/falldetection_openpifpaf/",
      },
      {
        title: "Product Development Intern",
        company: "Fashion Learning Hive ",
        company_url: "https://fashive.org/",
        logo_path: "fashive.png",
        duration: "July 2019 - September 2019",
        location: "Office",
        description:
          "I revamped the company website using WordPress, HTML, CSS, and JavaScript, achieving thousands of views within the first month of launch. I also successfully developed a JavaScript API to automate data synchronisation between the website and the LMS portal.",
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
          "I assisted in optimising algorithms in C++ to enhance security systems.",
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
    "Most of my projects are either done in my free time or in various hackathons to learn more about state-of-the-art technology outside what is taught in university.",
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
        "Predicting Bitcoin prices using a multi-dimensional bi-directional LSTM and sentiment analysis of tweets. Achieved 3rd place in AIHack 2021.",
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
        "Web app promoting good eye habits through curated tips, featuring a remote eye test using speech-to-text-analysis. Finalists in Hacklytics 2021.",
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
        "Web app that personalises exercise programs for women to reduce period pain and discomfort. Won the Best Domain Award in HackViolet 2021.",
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
        "Virtual interface using Computer Vision to track multiple finger movements to simulate playing a piano without requiring external hardware.",
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
        "Item donation iOS app to help the needy and promote item re-usability. Won 3rd place in the prototype forum in Facebook Hack-A-Project 2020.",
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
        "Android app that curates time-saving recipes based on ingredients and cookware. Won 4th place in the IoT category in ICHack 2020.",
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
      name: "3DFeatNet",
      url: "https://github.com/cwlroda/3DFeatNet",
      description:
        "Optimising a weakly supervised local 3D feature detection model for better point cloud geometric registration.",
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
      id: "1",
      name: "ISSIE",
      url: "https://github.com/cwlroda/issie",
      description:
        "Fast and reliable 2D drawing library for a digital circuit design and simulation app for first year undergraduates to learn about circuits.",
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
      id: "2",
      name: "Tracify",
      url: "https://github.com/cwlroda",
      description:
        "Mobile Bluetooth tracking service informing users if they have been in close proximity with suspected/confirmed COVID-19 cases. Includes features for self-reporting and seeking medical attention.",
      languages: [],
      logo_path: "",
      logo_link: "",
      alt_name: "",
    },
    {
      id: "3",
      name: "C-MIPS-Compiler",
      url: "https://github.com/cwlroda/C-MIPS-Compiler",
      description:
        "Lightweight compiler from C89 to MIPS Assembly and translator from C to Python.",
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
      id: "4",
      name: "MIPS Simulator",
      url: "https://github.com/cwlroda/MIPS-Simulator",
      description:
        "MIPS CPU simulator that accurately executes MIPS-1 big-endian binaries using instructions specified by the MIPS ISA.",
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
      id: "5",
      name: "Dance Dance Convolution",
      url: "https://github.com/cwlroda/Dance-Dance-Convolution",
      description:
        "Interactive gesture recognition game running on an Xilinx PYNQ-Z1 FPGA, inspired by Just Dance 2019. Won the Best First Year Project in university.",
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
      id: "6",
      name: "Sudoku",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Sudoku",
      description:
        "Sudoku validity checker and solver using a backtracking algorithm.",
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
      id: "7",
      name: "2048",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/2048",
      description:
        "2048 game using the terminal as a GUI. Includes a primitive AI that plays the game using pseudorandom moves.",
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
      id: "8",
      name: "Othello",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Othello",
      description:
        "Simple two-player Othello (Reversi) using the terminal as a GUI, with undo moves and move logging.",
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
      id: "9",
      name: "Mastermind",
      url:
        "https://github.com/cwlroda/First-Year-Projects/tree/master/Mastermind",
      description:
        "AI that efficiently solves the game of Mastermind for randomly generated sequences of symbols.",
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
      id: "10",
      name: "Path-Finding Algorithms",
      url: "https://github.com/cwlroda/First-Year-Projects/tree/master/Maze",
      description:
        "Maze-solving using Random Path, Breath-First Search, and Depth-First Search algorithms.",
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
      id: "11",
      name: "EEBug",
      url: "https://github.com/cwlroda",
      description:
        "Four-wheeled rover that self-navigates towards light sources.",
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
    profile_image_path: "weiloon.png",
    description:
      "Feel free to drop me a connection request or send a message! I'm currently in Singapore (GMT+8), and I hope to reply by the next day if I'm not too occupied with work.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "Check me out on Medium, where I occasionally curate interesting posts related to my projects.",
    link: "https://medium.com/@cwlroda/ ",
    avatar_image_path: "blogs_image.svg",
  },
  bugReporting: {
    title: "Bug Reporting",
    subtitle:
      "This portfolio website was built with HTML5, CSS3, NodeJS and React. Do drop a message on my GitHub repo if you find any issues or have any cool new features you would like to be added!",
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
