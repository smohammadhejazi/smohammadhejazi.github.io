export const profileData = {
    bio: {
      name: "Seyed Mohammad Hejazi Hoseini",
      short_intro:
        "Research Assistant and MASc student in Electrical & Computer Engineering at York University.",
      summary:
        "Works on AI reproducibility, LLM inference, and software engineering agents, with a focus on making large language model systems more reliable, traceable, and repeatable in practical settings.",
      location: "Toronto, Canada"
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
      "LLM Inference",
      "Software Engineering Agents",
      "Software Engineering for AI",
      "AI for Software Engineering"
    ],
  
    experience: [
      {
        title: "Research Assistant",
        dates: "Jan. 2025 - Present",
        summary:
          "Research Assistant at the Lassonde School of Engineering, York University, in Toronto. Developing a reproducibility framework for inference engines such as llama.cpp and vLLM, and working on error analysis and cost prediction for software engineering agents."
      },
      {
        title: "Teaching Assistant at York University",
        dates: "Jan. 2025 - Present",
        summary:
          "Teaching Assistant for courses including Fundamentals of Data Structures and Design and Analysis of Algorithms, Fundamentals of Data Structures, Advanced Object Oriented Programming, and Data Structures for Data Science. Responsibilities have included grading, invigilation, lab demonstration, and tutorial leadership."
      },
      {
        title: "Teaching Assistant at Amirkabir University of Technology",
        dates: "Feb. 2022 - Jun. 2022",
        summary:
          "Teaching Assistant for Algorithm Design and Data Structures and Algorithms, supporting assessment design and grading."
      },
      {
        title: "Smart Power Grid Internship",
        dates: "Jul. 2021 - Sep. 2021",
        summary:
          "Completed an internship at Qom Province Electricity Distribution Company in Iran. Explored data analytics and machine learning applications for electric power distribution, studied smart-grid infrastructure and related technologies, and produced a technical survey on smart power grids and their major components."
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
        term: "Winter 2025",
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
        title: "LLM Reproducibility using Llama.cpp and vLLM",
        dates: "Jan. 2025 - Present",
        summary:
          "Research on reproducibility challenges in modern large language model inference, including evaluation pipelines, retrieval-augmented generation, and agentic workflows. The work builds a framework that improves repeatability in practical experiments involving llama.cpp, vLLM, and related tooling.",
        links: {
          github: "https://github.com/smohammadhejazi/llm-reproducibility"
        }
      },
      {
        title: "Error and Cost Analysis of Software Engineering Agents on SWE-bench",
        dates: "Nov. 2025 - Present",
        summary:
          "Research project analyzing the computational cost and failure modes of software engineering agents on SWE-bench Verified. The work studies success rate, token usage, interaction depth, cost-per-success, and early-run cost prediction for cost-aware deployment."
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
        title: "A Survey on Smart Power Grid",
        dates: "Jul. 2021 - Sep. 2021",
        summary:
          "Internship-related work at Qom Province Electricity Distribution Company in Iran, involving smart-grid technologies and data-driven applications in electric power distribution, and resulting in a technical survey on smart power grids and their key components."
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
          "Used neuroevolution to optimize the weights and biases of an ANN agent controlling a game character, including multiple selection algorithms, operators, and fitness functions.",
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
          "Implemented an MLP with stochastic gradient descent from scratch for CIFAR-10 classification, and compared it with a TensorFlow CNN.",
        link: "https://github.com/smohammadhejazi/mlp-cnn-classification"
      },
      {
        name: "AI Agents in Pac-Man",
        summary:
          "Completed multiple Pac-Man AI projects involving search algorithms such as BFS, DFS, UCS, and A*, adversarial algorithms such as Minimax and Expectiminimax, and reinforcement learning methods such as Value Iteration and Q-Learning.",
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
    ]
  };
  