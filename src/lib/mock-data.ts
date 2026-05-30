export interface Candidate {
  id: number;
  name: string;
  role: string;
  location: string;
  techStack: string;
  skills: string;
  experience: string;
  languages: string;
  lastActive: string;
  introduction: string;
  trustScore: number;
  verificationStages: {
    id: string;
    title: string;
    status: 'verified' | 'pending' | 'locked' | 'input_required';
    date: string | null;
  }[];
  projects: {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
  }[];
  urls: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  workExperience: {
    company: string;
    role: string;
    duration: string;
  }[];
}

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Frontend Engineer",
    location: "San Francisco, CA / Remote",
    techStack: "React, TypeScript, Tailwind, Next.js",
    skills: "UI/UX, Performance, Accessibility",
    experience: "3+ Years",
    languages: "English, Spanish",
    lastActive: "2 days ago",
    introduction: "I'm a passionate Frontend Engineer with 3+ years of experience building scalable web applications. I specialize in React and Next.js, with a strong focus on user experience and accessibility.",
    trustScore: 85,
    verificationStages: [
      { id: "identity", title: "Identity Verification", status: "verified", date: "May 10, 2026" },
      { id: "employment", title: "Employment History", status: "verified", date: "May 12, 2026" },
      { id: "education", title: "Education Credentials", status: "verified", date: "May 15, 2026" },
      { id: "resume", title: "Resume / CV", status: "verified", date: "May 15, 2026" }
    ],
    projects: [
      { id: 1, title: "E-commerce Dashboard", description: "A high-performance dashboard for managing e-commerce stores.", link: "https://github.com/alexrivera/ecommerce", image: "/projects/project1.png" },
      { id: 2, title: "Fintech App UI", description: "Mobile-first UI for a fintech application using Tailwind.", link: "https://github.com/alexrivera/fintech", image: "/projects/project2.png" }
    ],
    urls: {
      linkedin: "https://linkedin.com/in/alexrivera",
      github: "https://github.com/alexrivera",
      portfolio: "https://alexrivera.dev"
    },
    workExperience: [
      { company: "TechCorp Inc.", role: "Frontend Engineer", duration: "2023 - Present" },
      { company: "StartupX", role: "Junior Developer", duration: "2021 - 2023" }
    ]
  },
  {
    id: 2,
    name: "Sam Chen",
    role: "Backend Developer",
    location: "New York, NY / Remote",
    techStack: "Python, Django, PostgreSQL, AWS",
    skills: "API Design, System Architecture",
    experience: "5+ Years",
    languages: "English, Mandarin",
    lastActive: "1 day ago",
    introduction: "Backend specialist with deep expertise in Python, Django, and database optimization. Experienced in designing resilient cloud architectures on AWS.",
    trustScore: 92,
    verificationStages: [
      { id: "identity", title: "Identity Verification", status: "verified", date: "Apr 20, 2026" },
      { id: "employment", title: "Employment History", status: "verified", date: "Apr 25, 2026" },
      { id: "education", title: "Education Credentials", status: "pending", date: null },
      { id: "resume", title: "Resume / CV", status: "verified", date: "Apr 20, 2026" }
    ],
    projects: [
      { id: 3, title: "Scalable API Service", description: "RESTful API handling 10k req/s using Django and Redis.", link: "https://github.com/samchen/api", image: "/projects/project3.png" }
    ],
    urls: {
      linkedin: "https://linkedin.com/in/samchen",
      github: "https://github.com/samchen",
      portfolio: ""
    },
    workExperience: [
      { company: "DataFlow", role: "Backend Developer", duration: "2021 - Present" },
      { company: "WebSystems", role: "Software Engineer", duration: "2018 - 2021" }
    ]
  },
  {
    id: 3,
    name: "Jordan Taylor",
    role: "Full Stack Developer",
    location: "Austin, TX / On-site",
    techStack: "Next.js, Node.js, MongoDB, Docker",
    skills: "Cloud Infrastructure, Agile",
    experience: "4+ Years",
    languages: "English",
    lastActive: "5 hours ago",
    introduction: "Full-stack developer bridging the gap between elegant UIs and robust backend systems. Advocate for clean code and test-driven development.",
    trustScore: 78,
    verificationStages: [
      { id: "identity", title: "Identity Verification", status: "verified", date: "May 01, 2026" },
      { id: "employment", title: "Employment History", status: "pending", date: null },
      { id: "education", title: "Education Credentials", status: "verified", date: "May 05, 2026" },
      { id: "resume", title: "Resume / CV", status: "verified", date: "May 01, 2026" }
    ],
    projects: [],
    urls: {
      linkedin: "https://linkedin.com/in/jordantaylor",
      github: "https://github.com/jordantaylor",
      portfolio: ""
    },
    workExperience: [
      { company: "AgileSoft", role: "Full Stack Developer", duration: "2022 - Present" },
      { company: "Digital Agency", role: "Web Developer", duration: "2019 - 2022" }
    ]
  },
  {
    id: 4,
    name: "Casey Smith",
    role: "Mobile Engineer",
    location: "London, UK / Remote",
    techStack: "React Native, Swift, Kotlin, Firebase",
    skills: "App Deployment, Animations",
    experience: "Fresher",
    languages: "English, French",
    lastActive: "Just now",
    introduction: "Recent graduate with a strong foundation in mobile development. Passionate about building fluid, performant apps for iOS and Android.",
    trustScore: 60,
    verificationStages: [
      { id: "identity", title: "Identity Verification", status: "verified", date: "May 28, 2026" },
      { id: "education", title: "Education Credentials", status: "verified", date: "May 29, 2026" },
      { id: "resume", title: "Resume / CV", status: "verified", date: "May 28, 2026" }
    ],
    projects: [
      { id: 4, title: "Fitness Tracker App", description: "React Native app with Firebase backend and local notifications.", link: "https://github.com/caseysmith/fitness", image: "/projects/project4.png" }
    ],
    urls: {
      linkedin: "https://linkedin.com/in/caseysmith",
      github: "https://github.com/caseysmith",
      portfolio: "https://casey.dev"
    },
    workExperience: []
  }
];
