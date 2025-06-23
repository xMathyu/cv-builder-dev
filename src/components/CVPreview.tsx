"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import Image from "next/image";
import TechIcon from "./TechIcon";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Award,
  Globe,
  User,
  Code,
  ExternalLink,
  Building2,
} from "lucide-react";

const CVPreview: React.FC = () => {
  const { cvData } = useCV();
  const {
    personalInfo,
    experiences,
    education,
    skills,
    projects,
    certifications,
    languages,
    theme,
    sections,
  } = cvData;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryLabels = {
    language: "Programming Languages",
    frontend: "Frontend",
    backend: "Backend",
    cloud: "Cloud & DevOps",
    database: "Databases",
    testing: "Testing",
    tool: "Tools",
    soft: "Soft Skills",
  };

  const proficiencyLabels = {
    basic: "Basic",
    conversational: "Conversational",
    professional: "Professional",
    native: "Native",
  };

  return (
    <div
      id="cv-preview"
      className="max-w-5xl mx-auto bg-white shadow-2xl min-h-screen"
      style={{ color: theme.colors.text }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left Sidebar */}
        <div
          className="text-white p-8 lg:col-span-1"
          style={{
            background: `linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        >
          {sections.showPersonalInfo && (
            <>
              {/* Profile Section */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {personalInfo.profileImage ? (
                    <Image
                      src={personalInfo.profileImage}
                      alt={personalInfo.fullName}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      className="text-6xl"
                      style={{ color: theme.colors.primary }}
                    />
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  {personalInfo.fullName}
                </h1>
                <p className="text-blue-200 text-lg">{personalInfo.title}</p>
              </div>

              {/* Contact Info */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-200">
                  Contact
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-300 mr-3" />
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm hover:text-blue-200 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  {personalInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-300 mr-3" />
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-sm hover:text-blue-200 transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-300 mr-3" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                  {personalInfo.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-5 h-5 text-blue-300 mr-3" />
                      <a
                        href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-blue-200 transition-colors"
                      >
                        {personalInfo.linkedin}
                      </a>
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center">
                      <Github className="w-5 h-5 text-blue-300 mr-3" />
                      <a
                        href={`https://github.com/${personalInfo.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-blue-200 transition-colors"
                      >
                        {personalInfo.github}
                      </a>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-blue-300 mr-3" />
                      <a
                        href={personalInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-blue-200 transition-colors"
                      >
                        {personalInfo.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Technical Skills */}
          {sections.showSkills && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-blue-200">
                Technical Skills
              </h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(
                  ([category, categorySkills]) => {
                    if (category === "soft") return null; // Show soft skills separately

                    return (
                      <div key={category}>
                        <h3 className="font-medium text-blue-200 mb-2">
                          {
                            categoryLabels[
                              category as keyof typeof categoryLabels
                            ]
                          }
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill) => {
                            return (
                              <span
                                key={skill.id}
                                className="bg-blue-700 px-2 py-1 rounded text-xs flex items-center"
                              >
                                <TechIcon
                                  technology={skill.name}
                                  size={12}
                                  className="w-3 h-3 mr-1 text-white"
                                />
                                {skill.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* Languages */}
          {sections.showLanguages && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-blue-200">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-blue-200">
                      {proficiencyLabels[language.proficiency]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.showCertifications && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-200">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start">
                    <Award className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium">{cert.name}</span>
                      <p className="text-xs text-blue-200">{cert.issuer}</p>
                      <p className="text-xs text-blue-300">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 p-8">
          {/* Career Profile */}
          {sections.showPersonalInfo && personalInfo.summary && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.primary,
                }}
              >
                Career Profile
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: theme.colors.muted }}
              >
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Professional Experience */}
          {sections.showExperience && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.primary,
                }}
              >
                Professional Experience
              </h2>

              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="mb-6 bg-gray-50 p-6 rounded-lg border-l-4"
                  style={{ borderLeftColor: theme.colors.primary }}
                >
                  {/* Company Header with Logo, Info and Date */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {experience.companyLogo ? (
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                            <Image
                              src={experience.companyLogo}
                              alt={`${experience.company} logo`}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <path d="M3 21h18V6l-3-3H6l-3 3v15Z"/>
                                      <path d="M8 21v-9h8v9"/>
                                    </svg>
                                  `;
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                            <Building2
                              className="w-6 h-6"
                              style={{ color: theme.colors.primary }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Company Info */}
                      <div className="flex-grow">
                        <h3
                          className="text-xl font-bold"
                          style={{ color: theme.colors.text }}
                        >
                          {experience.position}
                        </h3>
                        <p
                          className="text-lg font-semibold"
                          style={{ color: theme.colors.primary }}
                        >
                          {experience.company}
                        </p>
                        {experience.description && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: theme.colors.muted }}
                          >
                            {experience.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date and Location */}
                    <div
                      className="text-sm text-right ml-4 flex-shrink-0"
                      style={{ color: theme.colors.muted }}
                    >
                      <p
                        className="font-semibold"
                        style={{ color: theme.colors.primary }}
                      >
                        {experience.startDate} -{" "}
                        {experience.isCurrentJob
                          ? "Present"
                          : experience.endDate}
                      </p>
                      <p className="text-sm">{experience.location}</p>
                    </div>
                  </div>
                  <ul
                    className="space-y-2"
                    style={{ color: theme.colors.muted }}
                  >
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: theme.colors.primary }}
                        ></div>
                        <span
                          dangerouslySetInnerHTML={{ __html: achievement }}
                        />
                      </li>
                    ))}
                  </ul>
                  {experience.technologies.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs font-medium flex items-center"
                            style={{
                              backgroundColor: theme.colors.accent + "20",
                              color: theme.colors.primary,
                            }}
                          >
                            <TechIcon
                              technology={tech}
                              size={12}
                              className="w-3 h-3 mr-1"
                            />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Featured Projects */}
          {sections.showProjects && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.primary,
                }}
              >
                Recent Personal Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 flex flex-col"
                  >
                    {/* Project Header */}
                    <div className="flex items-center mb-3">
                      <Code
                        className="w-6 h-6 mr-3 flex-shrink-0"
                        style={{ color: theme.colors.primary }}
                      />
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold hover:opacity-75 transition-opacity"
                          style={{ color: theme.colors.text }}
                        >
                          {project.name}
                        </a>
                      ) : (
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme.colors.text }}
                        >
                          {project.name}
                        </h3>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs font-medium flex items-center"
                            style={{
                              backgroundColor: theme.colors.accent + "20",
                              color: theme.colors.primary,
                            }}
                          >
                            <TechIcon
                              technology={tech}
                              size={12}
                              className="w-3 h-3 mr-1"
                            />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-3 flex-grow"
                      style={{ color: theme.colors.muted }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlights.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {project.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="text-xs flex items-start"
                            style={{ color: theme.colors.muted }}
                          >
                            <div
                              className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0"
                              style={{ backgroundColor: theme.colors.primary }}
                            ></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-gray-600 text-white text-xs font-medium rounded-md hover:bg-gray-700 transition-colors"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {sections.showEducation && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.primary,
                }}
              >
                Education
              </h2>

              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-gray-50 p-6 rounded-lg border-l-4"
                  style={{ borderLeftColor: theme.colors.primary }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: theme.colors.text }}
                      >
                        {edu.degree}
                      </h3>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: theme.colors.primary }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                    <div
                      className="text-sm mt-1 md:mt-0 md:text-right"
                      style={{ color: theme.colors.muted }}
                    >
                      <p
                        className="font-semibold"
                        style={{ color: theme.colors.primary }}
                      >
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <p>{edu.location}</p>
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="mb-2" style={{ color: theme.colors.muted }}>
                      <strong>GPA:</strong> {edu.gpa}
                    </p>
                  )}
                  {edu.description && (
                    <p className="mb-2" style={{ color: theme.colors.muted }}>
                      {edu.description}
                    </p>
                  )}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <p style={{ color: theme.colors.muted }}>
                      <strong>Focus:</strong> {edu.coursework.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
