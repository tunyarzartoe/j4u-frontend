// Persistent storage service acting as a client-side database
// Ensures full real-world behavior: all registrations, applications, profile updates,
// and saved jobs survive page refreshes.

const STORAGE_KEYS = {
  JOBS: "j4u_jobs",
  COMPANIES: "j4u_companies",
  APPLICATIONS: "j4u_applications",
  SAVED_JOBS: "j4u_saved_jobs",
  USERS: "j4u_users",
  AUTH_USERS: "j4u_auth_users",
  CATEGORIES: "j4u_categories",
  LOCATIONS: "j4u_locations",
  JOB_TYPES: "j4u_job_types",
};

// Rich, realistic seed data
const SEED_LOCATIONS = [
  { id: 1, name: "Remote" },
  { id: 2, name: "Yangon" },
  { id: 3, name: "Mandalay" },
  { id: 4, name: "Singapore (Relocation)" },
  { id: 5, name: "Bangkok (Hybrid)" },
];

const SEED_JOB_TYPES = [
  { id: 1, type: "Full time" },
  { id: 2, type: "Part time" },
  { id: 3, type: "Contract" },
  { id: 4, type: "Internship" },
];

const SEED_CATEGORIES = [
  { id: 1, name: "Software Engineering" },
  { id: 2, name: "Design & UX" },
  { id: 3, name: "Product & Marketing" },
  { id: 4, name: "Data & AI" },
  { id: 5, name: "DevOps & Cloud" },
];

const SEED_COMPANIES = [
  {
    id: 1,
    name: "Stripe",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    description: "Financial infrastructure for the internet. Millions of companies use Stripe's software and APIs to accept payments and manage their businesses online.",
    phone: "+1-888-963-8955",
    email: "careers@stripe.com",
    address: "San Francisco, CA & Global Remote",
    jobOpening: 4,
    location: SEED_LOCATIONS[0],
    category: "Fintech",
  },
  {
    id: 2,
    name: "Spotify",
    logo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=120&q=80",
    description: "Unlocking human creativity by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy it.",
    phone: "+46-8-555-9000",
    email: "jobs@spotify.com",
    address: "Stockholm & Southeast Asia Hub",
    jobOpening: 3,
    location: SEED_LOCATIONS[3],
    category: "Audio & Entertainment",
  },
  {
    id: 3,
    name: "Grab",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&q=80",
    description: "Southeast Asia's leading superapp offering ride-hailing, food delivery, and digital financial services across 8 countries.",
    phone: "+65-6655-0000",
    email: "talent@grab.careers",
    address: "Yangon & Singapore HQ",
    jobOpening: 5,
    location: SEED_LOCATIONS[1],
    category: "SuperApp & Logistics",
  },
  {
    id: 4,
    name: "Linear",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    description: "The issue tracking tool built for high-performance software teams. Streamlined workflows, issue boards, and product roadmaps.",
    phone: "+1-415-555-0144",
    email: "jobs@linear.app",
    address: "Remote Worldwide",
    jobOpening: 2,
    location: SEED_LOCATIONS[0],
    category: "Developer Tools",
  },
  {
    id: 5,
    name: "KBZ Bank",
    logo: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=120&q=80",
    description: "Myanmar's largest private commercial bank, pioneering digital payments, mobile banking, and modern fintech infrastructure across the nation.",
    phone: "+95-1-230-7777",
    email: "careers@kbzbank.com",
    address: "Yangon & Mandalay, Myanmar",
    jobOpening: 3,
    location: SEED_LOCATIONS[1],
    category: "Banking & Finance",
  },
];

const SEED_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer (React)",
    descriptions: "We are seeking an experienced Frontend Engineer to build high-performance web applications using React, TypeScript, and modern state architectures. You will lead UI development for financial products viewed by millions.",
    requirement: "4+ years building complex web apps with React. Deep understanding of web performance, accessibility, and modern CSS frameworks.",
    skills: ["React", "TypeScript", "Redux Toolkit", "Next.js", "CSS Modules"],
    salary: "$95,000 - $125,000 / year",
    deadLine: "2026-11-30",
    publishedOn: "2026-09-24",
    vancy: 2,
    company: SEED_COMPANIES[0],
    category: SEED_CATEGORIES[0],
    location: SEED_LOCATIONS[0],
    jobTypes: SEED_JOB_TYPES[0],
  },
  {
    id: 2,
    title: "Full Stack Engineer (Node.js & React)",
    descriptions: "Join our consumer experience squad to design and implement end-to-end features connecting riders, drivers, and merchant partners across Southeast Asia.",
    requirement: "Strong background in Node.js, distributed microservices, Redis caching, and reactive React client state.",
    skills: ["Node.js", "React", "PostgreSQL", "Kafka", "Docker"],
    salary: "$80,000 - $105,000 / year",
    deadLine: "2026-12-15",
    publishedOn: "2026-09-26",
    vancy: 3,
    company: SEED_COMPANIES[2],
    category: SEED_CATEGORIES[0],
    location: SEED_LOCATIONS[1],
    jobTypes: SEED_JOB_TYPES[0],
  },
  {
    id: 3,
    title: "Product Designer (Design Systems)",
    descriptions: "Craft intuitive, accessible user interfaces and evolve our cross-platform design system utilized across mobile and web interfaces.",
    requirement: "Strong portfolio demonstrating typography, component systems in Figma, user research, and interaction design.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing"],
    salary: "$75,000 - $95,000 / year",
    deadLine: "2026-11-20",
    publishedOn: "2026-09-28",
    vancy: 1,
    company: SEED_COMPANIES[1],
    category: SEED_CATEGORIES[1],
    location: SEED_LOCATIONS[3],
    jobTypes: SEED_JOB_TYPES[0],
  },
  {
    id: 4,
    title: "Cloud & DevOps Specialist",
    descriptions: "Ensure high availability and reliability for mission-critical core banking services. Implement automated CI/CD pipelines, Kubernetes orchestration, and monitoring.",
    requirement: "Hands-on experience with AWS/GCP, Terraform, Kubernetes clusters, Docker containerization, and Prometheus/Grafana.",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
    salary: "$70,000 - $90,000 / year",
    deadLine: "2026-10-31",
    publishedOn: "2026-09-29",
    vancy: 2,
    company: SEED_COMPANIES[4],
    category: SEED_CATEGORIES[4],
    location: SEED_LOCATIONS[1],
    jobTypes: SEED_JOB_TYPES[0],
  },
  {
    id: 5,
    title: "Senior Product Manager",
    descriptions: "Own the product roadmap for developer workflow integrations. Work directly with engineering, design, and customers to drive adoption and satisfaction.",
    requirement: "3+ years product management experience in SaaS or developer platforms. Data-driven approach to feature prioritization.",
    skills: ["Product Roadmap", "User Stories", "Agile", "Analytics", "SaaS"],
    salary: "$110,000 - $140,000 / year",
    deadLine: "2026-12-01",
    publishedOn: "2026-09-30",
    vancy: 1,
    company: SEED_COMPANIES[3],
    category: SEED_CATEGORIES[2],
    location: SEED_LOCATIONS[0],
    jobTypes: SEED_JOB_TYPES[0],
  },
  {
    id: 6,
    title: "Mobile App Developer (Flutter / React Native)",
    descriptions: "Help build the next generation of mobile banking experiences for millions of everyday smartphone users across Myanmar.",
    requirement: "Experience shipping iOS/Android apps with Flutter or React Native. Knowledge of biometric security, push notifications, and offline caching.",
    skills: ["Flutter", "Dart", "React Native", "REST APIs", "Mobile Security"],
    salary: "$55,000 - $75,000 / year",
    deadLine: "2026-11-15",
    publishedOn: "2026-09-22",
    vancy: 2,
    company: SEED_COMPANIES[4],
    category: SEED_CATEGORIES[0],
    location: SEED_LOCATIONS[2],
    jobTypes: SEED_JOB_TYPES[0],
  },
];

const SEED_USERS = [
  {
    id: 1,
    username: "admin@j4u.com",
    fullname: "Alexander Wright",
    headline: "Engineering Director & Platform Admin",
    bio: "Passionate about building scalable technical systems and connecting exceptional talents with opportunity.",
    phone: "+1-202-555-0110",
    address: "San Francisco, CA",
    role: "ROLE_ADMIN",
    skills: ["System Architecture", "React", "Team Leadership", "Hiring"],
    experience: [
      {
        company: "Stripe",
        role: "Lead Platform Engineer",
        period: "2021 - Present",
        description: "Led developer experience and internal architecture teams.",
      },
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "M.S. Computer Science",
        period: "2016 - 2018",
      },
    ],
  },
  {
    id: 2,
    username: "user@j4u.com",
    fullname: "Sarah Lin",
    headline: "Frontend Developer & UI Specialist",
    bio: "Frontend engineer with 3+ years creating responsive, accessible React applications. Looking for exciting remote or hybrid opportunities.",
    phone: "+95-9-555-0190",
    address: "Yangon, Myanmar",
    role: "ROLE_USER",
    skills: ["React", "JavaScript (ES6+)", "TypeScript", "Redux", "Tailwind CSS", "Figma"],
    experience: [
      {
        company: "Nexus Digital Agency",
        role: "Frontend Developer",
        period: "2023 - Present",
        description: "Built client portals, interactive dashboards, and responsive marketing websites using React.",
      },
      {
        company: "TechCorp Labs",
        role: "Junior Web Developer",
        period: "2021 - 2023",
        description: "Maintained legacy client apps and implemented accessible UI components.",
      },
    ],
    education: [
      {
        institution: "University of Information Technology (Yangon)",
        degree: "B.C.Sc. Computer Science",
        period: "2017 - 2021",
      },
    ],
  },
];

const SEED_AUTH_USERS = [
  {
    username: "admin@j4u.com",
    password: "admin123",
    user: SEED_USERS[0],
    roleList: ["ROLE_ADMIN"],
    token: "admin-token-secure-1",
  },
  {
    username: "user@j4u.com",
    password: "user123",
    user: SEED_USERS[1],
    roleList: ["ROLE_USER"],
    token: "user-token-secure-2",
  },
];

// Initial seed applications so the user sees a working real-world dashboard immediately!
const SEED_APPLICATIONS = [
  {
    id: 1,
    userId: 2,
    userEmail: "user@j4u.com",
    applicantName: "Sarah Lin",
    phone: "+95-9-555-0190",
    jobId: 1,
    jobTitle: "Senior Frontend Engineer (React)",
    companyName: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    salary: "$95,000 - $125,000 / year",
    location: "Remote",
    status: "Under Review",
    appliedDate: "2026-09-28",
    experienceYears: "3-5 years",
    portfolioUrl: "https://github.com/sarahlin",
    resumeName: "Sarah_Lin_Frontend_Resume.pdf",
    coverLetter: "I am passionate about building modern web applications with React. Stripe's financial infrastructure platform has always inspired me, and I'd love to contribute my frontend expertise to your developer experience squads.",
  },
];

// Helper to initialize or retrieve storage item
const getStorageItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
};

const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("LocalStorage write error:", e);
  }
};

// Initialize default seed data if absent
export const initStorage = () => {
  getStorageItem(STORAGE_KEYS.JOBS, SEED_JOBS);
  getStorageItem(STORAGE_KEYS.COMPANIES, SEED_COMPANIES);
  getStorageItem(STORAGE_KEYS.USERS, SEED_USERS);
  getStorageItem(STORAGE_KEYS.AUTH_USERS, SEED_AUTH_USERS);
  getStorageItem(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
  getStorageItem(STORAGE_KEYS.SAVED_JOBS, [1]); // Job 1 saved by default
  getStorageItem(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  getStorageItem(STORAGE_KEYS.LOCATIONS, SEED_LOCATIONS);
  getStorageItem(STORAGE_KEYS.JOB_TYPES, SEED_JOB_TYPES);
};

// Storage Service API
export const storageService = {
  // Jobs
  getJobs: () => getStorageItem(STORAGE_KEYS.JOBS, SEED_JOBS),
  saveJob: (job) => {
    const jobs = storageService.getJobs();
    const existingIndex = jobs.findIndex((j) => j.id === job.id);
    let updated;
    if (existingIndex !== -1) {
      jobs[existingIndex] = { ...jobs[existingIndex], ...job };
      updated = jobs[existingIndex];
    } else {
      const nextId = Math.max(0, ...jobs.map((j) => j.id)) + 1;
      updated = { ...job, id: nextId };
      jobs.unshift(updated);
    }
    setStorageItem(STORAGE_KEYS.JOBS, jobs);
    return updated;
  },
  deleteJob: (jobId) => {
    const jobs = storageService.getJobs().filter((j) => j.id !== jobId);
    setStorageItem(STORAGE_KEYS.JOBS, jobs);
    return jobs;
  },

  // Companies
  getCompanies: () => getStorageItem(STORAGE_KEYS.COMPANIES, SEED_COMPANIES),
  saveCompany: (company) => {
    const companies = storageService.getCompanies();
    const index = companies.findIndex((c) => c.id === company.id);
    let updated;
    if (index !== -1) {
      companies[index] = { ...companies[index], ...company };
      updated = companies[index];
    } else {
      const nextId = Math.max(0, ...companies.map((c) => c.id)) + 1;
      updated = { ...company, id: nextId };
      companies.push(updated);
    }
    setStorageItem(STORAGE_KEYS.COMPANIES, companies);
    return updated;
  },

  // Applications
  getApplications: () => getStorageItem(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS),
  submitApplication: (applicationData) => {
    const applications = storageService.getApplications();
    const nextId = Math.max(0, ...applications.map((a) => a.id)) + 1;
    const newApp = {
      ...applicationData,
      id: nextId,
      status: "Submitted",
      appliedDate: new Date().toISOString().split("T")[0],
    };
    applications.unshift(newApp);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, applications);
    return newApp;
  },
  withdrawApplication: (appId) => {
    const applications = storageService.getApplications().filter((a) => a.id !== appId);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, applications);
    return applications;
  },

  // Saved Jobs (Favorites)
  getSavedJobIds: () => getStorageItem(STORAGE_KEYS.SAVED_JOBS, [1]),
  toggleSavedJob: (jobId) => {
    const saved = storageService.getSavedJobIds();
    const isSaved = saved.includes(jobId);
    const updated = isSaved ? saved.filter((id) => id !== jobId) : [...saved, jobId];
    setStorageItem(STORAGE_KEYS.SAVED_JOBS, updated);
    return updated;
  },

  // Users & Auth
  getUsers: () => getStorageItem(STORAGE_KEYS.USERS, SEED_USERS),
  getAuthUsers: () => getStorageItem(STORAGE_KEYS.AUTH_USERS, SEED_AUTH_USERS),
  registerUser: (userData) => {
    const users = storageService.getUsers();
    const authUsers = storageService.getAuthUsers();
    const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;

    const newUser = {
      id: nextId,
      username: userData.username,
      fullname: userData.fullname || `${userData.firstname} ${userData.lastname}`,
      phone: userData.phone || "",
      address: userData.address || "Yangon, Myanmar",
      headline: userData.headline || "Job Candidate",
      bio: "Excited to connect with new career opportunities on J4U.",
      role: "ROLE_USER",
      skills: ["Problem Solving", "Communication"],
      experience: [],
      education: [],
    };

    const newAuth = {
      username: userData.username,
      password: userData.password,
      user: newUser,
      roleList: ["ROLE_USER"],
      token: `token-user-${nextId}-${Date.now()}`,
    };

    users.push(newUser);
    authUsers.push(newAuth);

    setStorageItem(STORAGE_KEYS.USERS, users);
    setStorageItem(STORAGE_KEYS.AUTH_USERS, authUsers);

    return { user: newUser, auth: newAuth };
  },

  updateUserProfile: (updatedUser) => {
    const users = storageService.getUsers();
    const authUsers = storageService.getAuthUsers();

    const uIndex = users.findIndex((u) => u.id === updatedUser.id || u.username === updatedUser.username);
    if (uIndex !== -1) {
      users[uIndex] = { ...users[uIndex], ...updatedUser };
      setStorageItem(STORAGE_KEYS.USERS, users);
    }

    const aIndex = authUsers.findIndex((a) => a.username === updatedUser.username);
    if (aIndex !== -1) {
      authUsers[aIndex].user = { ...authUsers[aIndex].user, ...updatedUser };
      setStorageItem(STORAGE_KEYS.AUTH_USERS, authUsers);
    }

    return updatedUser;
  },

  getCategories: () => getStorageItem(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES),
  getLocations: () => getStorageItem(STORAGE_KEYS.LOCATIONS, SEED_LOCATIONS),
  getJobTypes: () => getStorageItem(STORAGE_KEYS.JOB_TYPES, SEED_JOB_TYPES),
};

// Initialize on first module load
initStorage();
