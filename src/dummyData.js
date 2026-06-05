export const locations = [
  { id: 1, name: "Remote" },
  { id: 2, name: "Yangon" },
  { id: 3, name: "Mandalay" },
  { id: 4, name: "Bagan" },
];

export const jobTypes = [
  { id: 1, type: "Full time" },
  { id: 2, type: "Part time" },
  { id: 3, type: "Contract" },
];

export const categories = [
  { id: 1, name: "Software Engineering" },
  { id: 2, name: "Design" },
  { id: 3, name: "Marketing" },
];

export const companies = [
  {
    id: 1,
    logo: "https://via.placeholder.com/80x80.png?text=Google",
    name: "Google",
    description: "Innovating search, cloud and AI solutions for every business.",
    phone: "+1-800-800-1234",
    email: "careers@google.com",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    jobOpening: 14,
    location: locations[0],
  },
  {
    id: 2,
    logo: "https://via.placeholder.com/80x80.png?text=Amazon",
    name: "Amazon",
    description: "Building customer-first ecommerce, cloud, and logistics experiences.",
    phone: "+1-800-555-0199",
    email: "jobs@amazon.com",
    address: "410 Terry Ave N, Seattle, WA",
    jobOpening: 9,
    location: locations[1],
  },
  {
    id: 3,
    logo: "https://via.placeholder.com/80x80.png?text=Facebook",
    name: "Meta",
    description: "Connecting billions through social platforms and immersive experiences.",
    phone: "+1-800-123-4567",
    email: "careers@meta.com",
    address: "1 Hacker Way, Menlo Park, CA",
    jobOpening: 11,
    location: locations[2],
  },
];

export const jobPosts = [
  {
    id: 1,
    title: "Frontend Developer",
    descriptions: "Build beautiful interfaces with React and modern web technologies.",
    requirement: "2+ years of React experience, strong CSS skills.",
    skills: ["Javascript", "React", "HTML", "CSS"],
    salary: "USD 90,000 - 110,000",
    deadLine: "2026-12-31",
    publishedOn: "2026-06-01",
    vancy: 3,
    company: companies[0],
    category: categories[0],
    location: locations[0],
    jobTypes: jobTypes[0],
  },
  {
    id: 2,
    title: "Backend Developer",
    descriptions: "Develop APIs and services using Node.js and cloud infrastructure.",
    requirement: "Experience with REST APIs, databases, and server-side logic.",
    skills: ["Node.js", "Express", "MongoDB"],
    salary: "USD 85,000 - 105,000",
    deadLine: "2026-10-15",
    publishedOn: "2026-05-22",
    vancy: 2,
    company: companies[1],
    category: categories[0],
    location: locations[1],
    jobTypes: jobTypes[1],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    descriptions: "Design intuitive digital products and craft visual experiences.",
    requirement: "Portfolio of web/mobile designs, experience with Figma or Sketch.",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    salary: "USD 70,000 - 90,000",
    deadLine: "2026-11-30",
    publishedOn: "2026-06-05",
    vancy: 1,
    company: companies[2],
    category: categories[1],
    location: locations[2],
    jobTypes: jobTypes[2],
  },
];

export const users = [
  {
    id: 1,
    username: "admin@j4u.com",
    fullname: "Admin User",
    phone: "+1-202-555-0110",
    address: "Admin Street 1",
    role: "ROLE_ADMIN",
  },
  {
    id: 2,
    username: "user@j4u.com",
    fullname: "Regular User",
    phone: "+1-202-555-0190",
    address: "User Lane 2",
    role: "ROLE_USER",
  },
];

export const authUsers = [
  {
    username: "admin@j4u.com",
    password: "admin123",
    user: users[0],
    roleList: ["ROLE_ADMIN"],
    token: "admin-token",
  },
  {
    username: "user@j4u.com",
    password: "user123",
    user: users[1],
    roleList: ["ROLE_USER"],
    token: "user-token",
  },
];
