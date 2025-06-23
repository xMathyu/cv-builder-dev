import React from "react";
import {
  // Programming Languages
  SiOpenjdk,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiKotlin,
  SiSharp,

  // Frontend
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiSass,
  SiHtml5,
  SiCss3,

  // Backend
  SiSpring,
  SiNodedotjs,
  SiNestjs,
  SiDotnet,
  SiFlask,
  SiDjango,

  // Databases
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiSupabase,

  // Cloud & DevOps
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiGit,
  SiJenkins,
  SiTerraform,
  SiSonarqube,

  // Testing & Tools
  SiJunit5,
  SiJest,
  SiSelenium,
  SiPostman,
  SiFigma,
  SiJira,
  SiEclipseide,

  // Other
  SiOpenai,
} from "react-icons/si";

import {
  // Generic icons from React Icons
  FaCode,
  FaCloud,
  FaTools,
  FaCog,
  FaRobot,
} from "react-icons/fa";

import {
  // Lucide icons for fallbacks
  Code2,
  TestTube,
  Brain,
} from "lucide-react";

interface TechIconProps {
  technology: string;
  size?: number;
  className?: string;
}

const techIconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; title?: string }>
> = {
  // Programming Languages
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Kotlin: SiKotlin,
  "C#": SiSharp,
  Csharp: SiSharp,

  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  NextJs: SiNextdotjs,
  Angular: SiAngular,
  "Tailwind CSS": SiTailwindcss,
  Sass: SiSass,
  HTML: SiHtml5,
  CSS: SiCss3,
  HTML5: SiHtml5,
  CSS3: SiCss3,

  // Backend
  "Spring Boot": SiSpring,
  Spring: SiSpring,
  "Node.js": SiNodedotjs,
  NodeJS: SiNodedotjs,
  NestJS: SiNestjs,
  ".Net": SiDotnet,
  dotnet: SiDotnet,
  Flask: SiFlask,
  Django: SiDjango,

  // Databases
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  RabbitMQ: SiRabbitmq,
  Supabase: SiSupabase,

  // Cloud & DevOps
  AWS: SiAmazon,
  Azure: FaCloud,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  GitHub: SiGithub,
  Git: SiGit,
  Jenkins: SiJenkins,
  Terraform: SiTerraform,
  SonarQube: SiSonarqube,

  // Testing & Tools
  JUnit: SiJunit5,
  Jest: SiJest,
  Selenium: SiSelenium,
  Postman: SiPostman,
  Figma: SiFigma,
  Jira: SiJira,
  Eclipse: SiEclipseide,

  // AI & ML
  AI: FaRobot,
  OpenAI: SiOpenai,
  "Machine Learning": Brain,
  "OpenAI API": SiOpenai,

  // Other Technologies
  WebFlux: SiSpring,
  RxJava: SiOpenjdk,
  DynamoDB: SiAmazon,
  KeyCloak: FaCog,
  "New Relic": FaCloud,
  Kluwan: FaTools,
  CheckStyle: FaCode,
  Mockito: SiJunit5,
  Karate: TestTube,
  TDD: TestTube,
  BDD: TestTube,
  Microservices: FaCode,
  Scrumban: FaCog,
  WebSockets: FaCode,
  Ionic: SiAngular,
};

const TechIcon: React.FC<TechIconProps> = ({
  technology,
  size = 24,
  className = "",
}) => {
  const IconComponent = techIconMap[technology] || Code2;

  return (
    <IconComponent
      size={size}
      className={`${className} transition-colors duration-200`}
      title={technology}
    />
  );
};

export default TechIcon;
