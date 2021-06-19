/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to true if you want to use the splash screen.
  useCustomCursor: false, // Change this to false if you want the good'ol cursor
  googleTrackingID: "G-SDN08JYNZG",
};

//Home Page
const greeting = {
  title: "Hello! 👋",
  title2: "Wei Loon",
  logo_name: "@cwlroda",
  nickname: "Wei Loon",
  full_name: "Wei Loon Cheng",
  subTitle:
    "Back-End Developer & Machine Learning Engineer with 3.5 years of experience. Currently learning Front-End to be a Full-Stack Developer 🔥.",
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
};

const skills = {
  data: [
    {
      title: "Back-End Development",
      skills: [
        "⚡ Proficient in algorithms and optimisation techniques",
        "⚡ Developing fast and reliable application backend and API integration in C, C++, and Java",
        "⚡ Large-scale database management using MySQL",
        "⚡ Experience with low-level development using FPGAs",
      ],
      softwareSkills: [
        {
          skillName: "C",
          fontAwesomeClassname: "simple-icons:c",
          style: {
            color: "#A8B9CC",
          },
        },
        {
          skillName: "C++",
          fontAwesomeClassname: "simple-icons:cplusplus",
          style: {
            color: "#00599C",
          },
        },
        {
          skillName: "Java",
          fontAwesomeClassname: "simple-icons:java",
          style: {
            color: "#f89820",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "simple-icons:mysql",
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
          skillName: "Linux",
          fontAwesomeClassname: "simple-icons:linux",
          style: {
            color: "#FCC624",
          },
        },
      ],
    },
    {
      title: "Front-End Development",
      skills: [
        "⚡ Developing responsive web apps in React, F#, and Electron",
        "⚡ Some experience with building mobile apps (iPhone & Android)",
        "⚡ Currently learning UI/UX",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
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
          fontAwesomeClassname: "simple-icons:nodejs",
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
          fontAwesomeClassname: "simple-icons:swift",
          style: {
            color: "#FA7343",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      skills: [
        "⚡ Worked on and deployed apps to cloud platforms",
        "⚡ Hosted and managed websites with thousands of views",
        "⚡ Experience with CI/CD",
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
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
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
      title: "Machine Learning",
      skills: [
        "Experienced in building and training:",
        "⚡ NLP models for text processing and generation",
        "⚡ Computer Vision models for object detection and motion tracking",
        "⚡ Linear regression and LSTM models for data prediction",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#3776AB",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "simple-icons:tensorflow",
          style: {
            color: "#FF6F00",
          },
        },
        {
          skillName: "Pytorch",
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
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
      ],
    },
  ],
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
        "⚡ Exchange Masters under the Department of Information Technology and Electrical Engineering",
        "⚡ Swiss-European Mobility Programme (SEMP) Scholarship holder",
        "⚡ Taking modules in Natural Language Processing and Computer Vision",
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
        "⚡ Four-year Direct Masters",
        "⚡ On track for a First Class Honours",
        "⚡ Undergraduate Tutor for Information Processing (Year 2) and Software Systems (Year 2)",
        "⚡ Top 15% in the cohort (Year 1)",
        "⚡ Achieved the Best First Year Project (2019)",
      ],
      website_link:
        "https://www.imperial.ac.uk/study/ug/courses/electrical-engineering-department/electrical-and-electronic-engineering-year-abroad/",
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
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Internships",
  description:
    "The internships I've done allows me not only to contribute my unique ideas to the companies I've worked with, but also allow me to learn new and exciting technology.",
  header_image_pathz: "experience.svg",
  sections: [
    {
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
          link: "https://github.com/cwlroda/",
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
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "Most of my projects are either done in my free time or in various hackathons to learn more about state-of-the-art technology outside what is taught in university.",
  avatar_image_path: "projects_image.svg",
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
      alt_name: "AI Hack 2021",
    },
    {
      id: "1",
      name: "blinkr",
      url: "https://github.com/cwlroda/blinkr",
      description:
        "Web app that promotes good eye habits through curated tips and a remote eye test using speech-to-text-analysis. Entered final round presentations in Hacklytics 2021.",
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
          iconifyClass: "logos-nodejs",
        },
      ],
      logo_path: "hacklytics.png",
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
          iconifyClass: "logos-nodejs",
        },
        {
          name: "Firebase",
          iconifyClass: "logos-firebase",
        },
      ],
      logo_path: "hackviolet.png",
      alt_name: "HackViolet 2021",
    },
    {
      id: "3",
      name: "Virtualso Piano",
      url: "https://github.com/cwlroda/virtual-piano",
      description:
        "Virtual interface that uses Computer Vision to track multiple finger movements to simulate playing a piano without requiring any external hardware.",
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
          iconifyClass: "logos-swift",
        },
        {
          name: "Firebase",
          iconifyClass: "logos-firebase",
        },
      ],
      logo_path: "hackaproject.png",
      alt_name: "Facebook Hack-A-Project 2020",
    },
    {
      id: "5",
      name: "Dinner-Dash",
      url: "https://github.com/cwlroda/Dinner-Dash",
      description:
        "Interactive Android app that curates time-saving recipes based on specific ingredients and cookware. Won 4th placing in the IoT category in ICHack 2020.",
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
      alt_name: "",
    },
    {
      id: "2",
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
      alt_name: "",
    },
    {
      id: "3",
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
      alt_name: "",
    },
    {
      id: "4",
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
      alt_name: "",
    },
    {
      id: "5",
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
      id: "6",
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
      alt_name: "",
    },
    {
      id: "7",
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
      alt_name: "",
    },
    {
      id: "8",
      name: "Mastermind",
      url:
        "https://github.com/cwlroda/First-Year-Projects/tree/master/Mastermind",
      description:
        "AI that efficiently solves the game of Mastermind for randomly generated sequences of symbols for up to length 15 and 15 unique symbols.",
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
      id: "9",
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
      "Feel free to drop me a connection request or send a message! I hope to reply by the next day if I'm not too occupied with work.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "Check me out on Medium, where I occasionally curate posts related to my projects.",
    link: "https://medium.com/@cwlroda/ ",
    avatar_image_path: "blogs_image.svg",
  },
};

export {
  settings,
  greeting,
  socialMediaLinks,
  skills,
  degrees,
  certifications,
  experience,
  projectsHeader,
  hackathons,
  projects,
  contactPageData,
};
