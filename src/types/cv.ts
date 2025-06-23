export interface PersonalInfo {
  id: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  profileImage?: string;
  summary: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  coursework?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category:
    | "language"
    | "frontend"
    | "backend"
    | "cloud"
    | "devops"
    | "database"
    | "testing"
    | "tool"
    | "soft";
  icon?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  url?: string;
  github?: string;
  image?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  url?: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "basic" | "conversational" | "professional" | "native";
}

export interface CVTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  layout: "sidebar" | "modern" | "classic" | "minimal";
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  theme: CVTheme;
  sections: {
    showPersonalInfo: boolean;
    showExperience: boolean;
    showEducation: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showCertifications: boolean;
    showLanguages: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  theme: CVTheme;
  sections: CVData["sections"];
}
