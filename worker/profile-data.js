export const profileData = {
  bio: {
    name: "Seyed Mohammad Hejazi Hoseini",
    preferred_name: "Mohammad",
    short_intro:
      "Research Assistant and MASc student in Electrical & Computer Engineering at York University, and part-time Research Intern at Grimlock Consulting.",
    summary:
      "Works on AI reproducibility, software engineering AI agents, software engineering for AI, and AI for software engineering, with a focus on making large language model systems more reliable, traceable, and repeatable in practical settings.",
    location: "Toronto, Canada",
    birthplace: "Qom, Iran"
  },

  contact: {
    email: "smhejazihoseini@gmail.com",
    phone: "+1 416-508-0894"
  },

  links: {
    github: "https://github.com/smohammadhejazi",
    linkedin: "https://linkedin.com/in/smohammadhejazi",
    website: "https://smohammadhejazi.github.io"
  },

  research_interests: [
    "AI Reproducibility",
    "Software Engineering AI Agents",
    "Software Engineering for AI",
    "AI for Software Engineering"
  ],

  experience: [
    {
      title: "Research Intern (part-time) at Grimlock Consulting",
      dates: "Sep. 2026 - Present",
      summary:
        "Part-time remote research intern at Grimlock Consulting. Runs experiments to improve AI coding agents such as Claude Code, testing techniques that aim to raise resolve rates and cut cost on SWE-bench Verified, SWE-bench Pro, and related benchmarks. Analyzes agent trajectories and logs and delivers weekly reports with charts and metrics to show current standings and guide next steps."
    },
    {
      title: "Research Assistant",
      dates: "Jan. 2025 - Present",
      summary:
        "Research Assistant at the Lassonde School of Engineering, York University, in Toronto, supervised by Prof. Zhen Ming (Jack) Jiang. Built a reproducibility framework for LLM-powered systems that combines execution stabilization with record and replay, enabling exact replay across vLLM and llama.cpp, six open-weight LLMs, and A100/H100/H200 GPUs, and identified 11 sources of non-determinism in the LLM execution stack, three of them previously undocumented. Currently developing a process-aware framework for assessing the consistency of LLM-powered software engineering benchmarks (early stage), and previously did an exploratory study of the cost and failure modes of SWE-bench agents."
    },
    {
      title: "Teaching Assistant at York University",
      dates: "Jan. 2025 - Apr. 2026",
      summary:
        "Teaching Assistant for courses including Fundamentals of Data Structures and Design and Analysis of Algorithms, Fundamentals of Data Structures, Advanced Object Oriented Programming, and Data Structures for Data Science. Responsibilities have included grading, invigilation, lab demonstration, and tutorial leadership."
    },
    {
      title: "Teaching Assistant at Amirkabir University of Technology",
      dates: "Feb. 2022 - Jun. 2022",
      summary:
        "Teaching Assistant for Algorithm Design and Data Structures and Algorithms, supporting grading as well as assignment and class test design."
    },
    {
      title: "Smart Power Grid Internship",
      dates: "Jun. 2021 - Sep. 2021",
      summary:
        "Completed a three-month internship at Qom Province Electricity Distribution Company in Iran. Explored data analytics and machine learning applications for electric power distribution, including forecasting, anomaly detection, and equipment health monitoring, studied smart-grid infrastructure and utility technologies, and produced a technical survey on smart power grids."
    }
  ],

  education: [
    {
      institution: "York University",
      location: "Toronto, Canada",
      degree: "Master of Applied Science (MASc)",
      field: "Electrical Engineering & Computer Science",
      dates: "Jan. 2025 - In Progress"
    },
    {
      institution: "Amirkabir University of Technology",
      location: "Tehran, Iran",
      degree: "Bachelor of Science (BSc)",
      field: "Computer Engineering",
      gpa: "18.24/20 (3.89/4)",
      dates: "Sept. 2018 - Jul. 2023"
    },
    {
      institution: "Shahid Ghoddusi High School (NODET)",
      location: "Qom, Iran",
      degree: "Diploma",
      field: "Mathematics and Physics",
      gpa: "18.65/20 (4/4)",
      dates: "Sept. 2014 - Jul. 2018"
    }
  ],

  teaching_assistant_experience: [
    {
      course: "Fundamentals of Data Structures and Design and Analysis of Algorithms",
      term: "Winter 2026",
      instructor: "Prof. Jackie Wang",
      responsibilities: [
        "Grader",
        "Invigilator"
      ]
    },
    {
      course: "Fundamentals of Data Structures",
      term: "Fall 2025",
      instructor: "Prof. Andriy Pavlovych",
      responsibilities: [
        "Grader",
        "Invigilator"
      ]
    },
    {
      course: "Advanced Object Oriented Programming",
      term: "Summer 2025",
      instructor: "Prof. Jackie Wang",
      responsibilities: [
        "Lab Demonstrator",
        "Grader"
      ]
    },
    {
      course: "Fundamentals of Data Structures",
      term: "Winter 2025",
      instructor: "Prof. Ilir Dema",
      responsibilities: [
        "Teaching tutorial classes"
      ]
    },
    {
      course: "Data Structures for Data Science",
      term: "Winter 2025",
      instructor: "Prof. Chen-Wei (Jackie) Wang",
      responsibilities: [
        "Exam grading",
        "Invigilation"
      ]
    },
    {
      course: "Data Structures and Algorithms",
      term: "Spring 2022",
      instructor: "Prof. Alireza Bagheri and Sajad Shirali-Shahreza",
      responsibilities: [
        "Grading",
        "Designing assignments",
        "Designing class tests"
      ]
    },
    {
      course: "Algorithm Design",
      term: "Spring 2022",
      instructor: "Prof. Alireza Bagheri",
      responsibilities: [
        "Grading",
        "Designing assignments",
        "Designing class tests"
      ]
    }
  ],

  research_experience: [
    {
      title: "Taming Non-Reproducibility: A Multi-Layered Framework for Divergence Investigation and Reproducible Execution in LLM-Powered Systems (paper under review)",
      dates: "Jan. 2025 - Present",
      summary:
        "Research paper with supervisor Prof. Zhen Ming (Jack) Jiang, currently under review. It presents a multi-layered framework for investigating non-reproducibility and enabling exact post-hoc replay of LLM-powered executions without removing the intentional stochasticity needed during live execution. The framework combines iterative cross-stack divergence isolation, a taxonomy of eleven sources of non-determinism (three previously undocumented), and a reproducibility harness that pairs execution stabilization with coordinated record and replay. It was evaluated on four workloads with six open-weight LLMs, vLLM and llama.cpp, and A100, H100, and H200 GPUs, and achieves exact replay across all evaluated setups, whereas default runs reproduced only 58-64% of SWE-agent trajectories exactly. The work started as a Python library for reproducible and comparable LLM-agent experiments.",
      links: {
        github: "https://github.com/smohammadhejazi/llm-reproducibility"
      }
    },
    {
      title: "Process-Aware Consistency Assessment of LLM-Powered Software Engineering Benchmarks",
      dates: "2026 - Present",
      summary:
        "Early-stage follow-up research with Prof. Zhen Ming (Jack) Jiang on benchmark reliability. Instead of reporting a single pass or fail outcome per benchmark instance, it characterizes consistency using random states, normalized trajectories, and outcomes, and explores execution divergence points with divergence-guided replay instead of exhaustive repeated runs. There are no results yet."
    },
    {
      title: "Error and Cost Analysis of Software Engineering Agents on SWE-bench",
      dates: "Nov. 2025 (exploratory, not continued)",
      summary:
        "Small exploratory project, started at a professor's suggestion after the Mining Software Engineering Data course, on the cost and failure modes of SWE-bench Verified agents such as SWE-agent, mini-SWE-agent, Moatless Tools, and Nemotron-CORTEXA. It quantified performance and cost metrics from official experiment logs, including success rate, token usage, interaction depth, and cost per success, and prototyped an early-stopping technique to cut wasted cost. The project was not continued beyond these initial experiments."
    },
    {
      title: "Building a Recommendation System Including User Specific Recommendation, Similar Items, and Cold Start",
      dates: "Feb. 2022 - Feb. 2023",
      summary:
        "Bachelor thesis project involving a completed recommendation system deployed on Kubernetes, along with a paper describing the system concepts and architecture. The code was also turned into a Python library called KabirRec and later used as a service inside a larger AI-as-a-service framework.",
      links: {
        github: "https://github.com/smohammadhejazi/recommendation-as-a-service",
        pypi: "https://pypi.org/project/kabirrec/"
      }
    },
    {
      title: "Smart Power Grid Internship and Survey",
      dates: "Jun. 2021 - Sep. 2021",
      summary:
        "Internship-related work at Qom Province Electricity Distribution Company in Iran, involving data analytics and machine learning applications for electric power distribution, such as forecasting, anomaly detection, and equipment health monitoring. Also studied smart-grid infrastructure and produced a technical survey covering major smart-grid components, challenges, and opportunities for intelligent decision-making."
    },
    {
      title: "Machine Learning Applications for Data Caching in Wireless Network",
      dates: "Feb. 2021 - Jun. 2021",
      summary:
        "Course research and presentation project on machine learning techniques for caching data at the network edge to reduce latency and energy consumption."
    }
  ],

  selected_projects: [
    {
      name: "Neuroevolution in a Game",
      summary:
        "Used a neuroevolution algorithm to optimize the weights and biases of an ANN agent controlling a game character, including multiple selection algorithms, operators, and fitness functions.",
      link: "https://github.com/smohammadhejazi/neuroevolution-snail-jumper"
    },
    {
      name: "Fuzzy Expert System for Heart Disease Diagnosis",
      summary:
        "Built a fuzzy control system with fuzzification, inference, and defuzzification to diagnose patients using inputs such as age, blood sugar, and cholesterol.",
      link: "https://github.com/smohammadhejazi/fuzzy-heart-disease-diagnosis"
    },
    {
      name: "Multilayer Perceptron and Convolutional Neural Networks",
      summary:
        "Implemented an MLP with stochastic gradient descent from scratch for CIFAR-10 classification and compared it with a TensorFlow CNN.",
      link: "https://github.com/smohammadhejazi/mlp-cnn-classification"
    },
    {
      name: "AI Agents in Pac-Man",
      summary:
        "Completed three Pac-Man AI projects involving search algorithms such as BFS, DFS, UCS, and A*, adversarial methods such as Minimax and Expectiminimax, and reinforcement learning methods such as Value Iteration and Q-Learning.",
      link: "https://github.com/smohammadhejazi/ai-course-projects"
    },
    {
      name: "Parallelized Genann Library With OpenMP",
      summary:
        "Parallelized the Genann feedforward ANN library in C using OpenMP and multithreading techniques.",
      link: "https://github.com/smohammadhejazi/genann-parallel"
    },
    {
      name: "Data Mining on Twitter Data Set",
      summary:
        "Used Hadoop Distributed File System and MapReduce across clusters to analyze tweets containing #Trump or #Biden and compute country-level distributions.",
      link: "https://github.com/smohammadhejazi/mapreduce-on-twitter-dataset"
    },
    {
      name: "Online Book Store",
      summary:
        "Worked in a four-person team to design and build an online book store while following the full Scrum process.",
      link: "https://github.com/smohammadhejazi/Online-Book-Store"
    },
    {
      name: "Sorting Visualizer",
      summary:
        "Built an interactive web page to visualize sorting algorithms step by step.",
      link: "https://smohammadhejazi.github.io/sorting-visualizer/"
    },
    {
      name: "URL Shortener in Kubernetes and Docker",
      summary:
        "Built a Kubernetes-hosted API server for shortening URLs and storing them in MongoDB, designed to scale and support load balancing.",
      link: "https://github.com/smohammadhejazi/python-url-shortener"
    },
    {
      name: "Twitter Clone API Server",
      summary:
        "Developed a backend API for a Twitter-like platform supporting actions such as tweeting, following, and blocking, with PostgreSQL as the database.",
      link: "https://github.com/smohammadhejazi/twitter-clone"
    },
    {
      name: "Postman Clone",
      summary:
        "Built an HTTP client app that supports request methods, headers, body, saved responses, and image previews.",
      link: "https://github.com/smohammadhejazi/http-client"
    }
  ],

  skills: {
    programming_languages: [
      "Python",
      "Java",
      "C++",
      "C",
      "Assembly",
      "VHDL",
      "Verilog"
    ],
    web_development: [
      "JavaScript",
      "PHP",
      "HTML",
      "CSS",
      "NodeJS",
      "ReactJS"
    ],
    python_libraries: [
      "Scikit-Learn",
      "TensorFlow",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "PyTorch"
    ],
    tools: [
      "GitHub",
      "Docker",
      "Kubernetes",
      "OpenMP",
      "CUDA",
      "Wireshark",
      "Hadoop Distributed File System"
    ],
    databases: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Redis"
    ],
    engineering_software: [
      "Arduino",
      "Proteus",
      "Keil uVision",
      "ModelSim",
      "OrCAD Capture"
    ],
    miscellaneous: [
      "Linux",
      "MS Office",
      "LaTeX"
    ]
  },

  languages: [
    {
      language: "English",
      proficiency: "Proficient in all four skills",
      details: "TOEFL iBT 117 (Reading 30, Listening 30, Speaking 29, Writing 28)"
    },
    {
      language: "Persian",
      proficiency: "Native"
    }
  ],

  honors_awards: [
    {
      title: "University Honor Student",
      issuer: "Amirkabir University of Technology (Tehran Polytechnic)",
      year: "2023"
    },
    {
      title: "Top 0.8% in Nationwide University Entrance Exam for BSc in Mathematics and Engineering",
      issuer: "Iran",
      year: "2018",
      details: "Approximately 144,000 applicants"
    },
    {
      title: "Top 3% in Nationwide University Entrance Exam for BSc in Foreign Languages - English",
      issuer: "Iran",
      year: "2018",
      details: "Approximately 145,000 applicants"
    },
    {
      title: "Educated in the Iranian National Organization for Development of Exceptional Talents (NODET)",
      issuer: "Iran",
      year: "2011 - 2018"
    },
    {
      title: "English Certificate",
      issuer: "Gooyesh Academy of Foreign Languages, Iran",
      year: "2014",
      details: "Average score: 96/100"
    }
  ],

  related_courses: [
    "Neural Networks and Deep Learning (A+)",
    "Data Analytics and Visualization (A)",
    "Principles & Applications of AI (18.6/20)",
    "Principles of Computational Intelligence (18/20)",
    "Algorithm Design (20/20)",
    "Data Structures and Algorithms (18.25/20)",
    "Bachelor Thesis (19.75/20)",
    "Web Programming (20/20)",
    "Theory of Machines and Languages (20/20)",
    "Operating Systems (19.37/20)",
    "Principles of Cloud Computing (18/20)",
    "Internet of Things (20/20)"
  ],

  extra_information: {
    about_page_intro: [
      "You can call me Mohammad.",
      "I was born in Qom, Iran."
    ],
    random_facts: [
      "Learning French, slowly but surely.",
      "Works out regularly for both physical and mental health.",
      "Best 2-minute push-up record: 61. Best pull-ups in a single set: 25.",
      "Likes giving presentations.",
      "Favorite movie of all time: Redline.",
      "Favorite cartoon series of all time: SpongeBob SquarePants.",
      "Favorite video game: The Witcher 3: Wild Hunt.",
      "Used to play a lot of chess, with a peak Chess.com rating of 1740.",
      "Can make a mean pizza.",
      "Currently growing his hair, but also getting tired of it.",
      "Needs to drive a Dodge Hellcat at least once in his life.",
      "In free time, makes and edits videos on YouTube.",
      "Reached Immortal rank in Dota 2 and Emerald rank in League of Legends."
    ]
  }
};