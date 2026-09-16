export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  references: ReferenceItem[];
}

export interface ResumeRecord {
  id: number;
  title: string;
  template: string;
  accent_color: string;
  personal_info: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  references_data: ReferenceItem[];
  created_at: string;
  updated_at: string;
}

export const COLOR_PRESETS = [
  { name: 'Navy', value: '#1e3a5f' },
  { name: 'Royal Blue', value: '#1d4ed8' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Forest', value: '#166534' },
  { name: 'Burgundy', value: '#881337' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Charcoal', value: '#374151' },
  { name: 'Amber', value: '#b45309' },
  { name: 'Slate', value: '#475569' },
];

export const TEMPLATES = [
  { id: 'classic', name: 'Classic', description: 'Traditional and professional' },
  { id: 'modern', name: 'Modern', description: 'Clean two-column sidebar' },
  { id: 'executive', name: 'Executive', description: 'Bold and impactful' },
  { id: 'minimal', name: 'Minimal', description: 'Elegant and simple' },
];

export const generateId = () => Math.random().toString(36).substring(2, 11);

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alexandra Chen',
    title: 'Senior Software Engineer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexchen.dev',
    linkedin: 'linkedin.com/in/alexchen',
    github: 'github.com/alexchen',
  },
  summary: 'Results-driven senior software engineer with 8+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean architecture, performance optimization, and mentoring junior developers. Proven track record of delivering high-impact projects that drive business growth.',
  experience: [
    {
      id: generateId(),
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Led migration of monolithic application to microservices architecture, reducing deployment time by 70%\n• Mentored team of 5 junior developers, improving team velocity by 40%\n• Designed and implemented real-time data pipeline processing 2M+ events daily\n• Reduced API response times by 60% through query optimization and caching strategies',
    },
    {
      id: generateId(),
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2019-03',
      endDate: '2021-12',
      current: false,
      description: '• Built customer-facing dashboard serving 50K+ monthly active users\n• Implemented CI/CD pipeline reducing release cycles from weeks to hours\n• Developed RESTful APIs and GraphQL endpoints for mobile and web clients\n• Collaborated with product team to define technical requirements and roadmap',
    },
    {
      id: generateId(),
      company: 'Digital Agency Co.',
      position: 'Frontend Developer',
      startDate: '2017-06',
      endDate: '2019-02',
      current: false,
      description: '• Developed responsive web applications for 20+ client projects\n• Introduced component-based architecture using React, improving code reusability by 50%\n• Optimized website performance achieving 95+ Lighthouse scores across all projects',
    },
  ],
  education: [
    {
      id: generateId(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      gpa: '3.8/4.0',
    },
  ],
  skills: [
    { id: generateId(), category: 'Languages', items: 'TypeScript, JavaScript, Python, Go, SQL' },
    { id: generateId(), category: 'Frontend', items: 'React, Next.js, Vue.js, Tailwind CSS, HTML5/CSS3' },
    { id: generateId(), category: 'Backend', items: 'Node.js, Express, PostgreSQL, MongoDB, Redis' },
    { id: generateId(), category: 'DevOps & Tools', items: 'AWS, Docker, Kubernetes, CI/CD, Git' },
  ],
  projects: [
    {
      id: generateId(),
      name: 'OpenSource Dashboard',
      description: 'Built an open-source analytics dashboard with real-time data visualization, supporting 10K+ GitHub stars and active community contributions.',
      technologies: 'React, D3.js, Node.js, PostgreSQL',
      link: 'github.com/alexchen/os-dashboard',
    },
    {
      id: generateId(),
      name: 'TaskFlow CLI',
      description: 'Developed a command-line project management tool in Go with Git integration, adopted by 500+ developers worldwide.',
      technologies: 'Go, Cobra, SQLite',
      link: 'github.com/alexchen/taskflow',
    },
  ],
  certifications: [
    { id: generateId(), name: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2024-03' },
    { id: generateId(), name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', date: '2023-08' },
  ],
  languages: [
    { id: generateId(), name: 'English', proficiency: 'Native' },
    { id: generateId(), name: 'Mandarin', proficiency: 'Fluent' },
    { id: generateId(), name: 'Spanish', proficiency: 'Conversational' },
  ],
  references: [
    {
      id: generateId(),
      name: 'Michael Roberts',
      position: 'VP of Engineering',
      company: 'TechCorp Inc.',
      email: 'm.roberts@techcorp.com',
      phone: '+1 (555) 987-6543',
    },
  ],
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  references: [],
};
