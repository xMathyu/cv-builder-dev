"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  CVData,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
} from "@/types/cv";
import { defaultCVData } from "@/data/defaultCV";

type CVAction =
  | { type: "LOAD_CV"; payload: CVData }
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<CVData["personalInfo"]> }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | {
      type: "UPDATE_EXPERIENCE";
      payload: { id: string; data: Partial<Experience> };
    }
  | { type: "DELETE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | {
      type: "UPDATE_EDUCATION";
      payload: { id: string; data: Partial<Education> };
    }
  | { type: "DELETE_EDUCATION"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<Skill> } }
  | { type: "DELETE_SKILL"; payload: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: Partial<Project> } }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "ADD_CERTIFICATION"; payload: Certification }
  | {
      type: "UPDATE_CERTIFICATION";
      payload: { id: string; data: Partial<Certification> };
    }
  | { type: "DELETE_CERTIFICATION"; payload: string }
  | { type: "ADD_LANGUAGE"; payload: Language }
  | {
      type: "UPDATE_LANGUAGE";
      payload: { id: string; data: Partial<Language> };
    }
  | { type: "DELETE_LANGUAGE"; payload: string }
  | { type: "UPDATE_THEME"; payload: CVData["theme"] }
  | { type: "UPDATE_SECTIONS"; payload: Partial<CVData["sections"]> }
  | { type: "RESET_CV" };

const cvReducer = (state: CVData, action: CVAction): CVData => {
  switch (action.type) {
    case "LOAD_CV":
      return action.payload;

    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.payload.id
            ? { ...exp, ...action.payload.data }
            : exp
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.filter(
          (exp) => exp.id !== action.payload
        ),
        updatedAt: new Date().toISOString(),
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id
            ? { ...edu, ...action.payload.data }
            : edu
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id
            ? { ...skill, ...action.payload.data }
            : skill
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.data }
            : project
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
        updatedAt: new Date().toISOString(),
      };

    case "ADD_CERTIFICATION":
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_CERTIFICATION":
      return {
        ...state,
        certifications: state.certifications.map((cert) =>
          cert.id === action.payload.id
            ? { ...cert, ...action.payload.data }
            : cert
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_CERTIFICATION":
      return {
        ...state,
        certifications: state.certifications.filter(
          (cert) => cert.id !== action.payload
        ),
        updatedAt: new Date().toISOString(),
      };

    case "ADD_LANGUAGE":
      return {
        ...state,
        languages: [...state.languages, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.map((lang) =>
          lang.id === action.payload.id
            ? { ...lang, ...action.payload.data }
            : lang
        ),
        updatedAt: new Date().toISOString(),
      };

    case "DELETE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.filter((lang) => lang.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_SECTIONS":
      return {
        ...state,
        sections: { ...state.sections, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case "RESET_CV":
      return { ...defaultCVData, id: state.id, createdAt: state.createdAt };

    default:
      return state;
  }
};

interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportToJSON: () => void;
  importFromJSON: (jsonString: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const STORAGE_KEY = "cv-builder-data";

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cvData, dispatch] = useReducer(cvReducer, defaultCVData);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch (error) {
      console.error("Failed to save CV data to localStorage:", error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "LOAD_CV", payload: parsedData });
      }
    } catch (error) {
      console.error("Failed to load CV data from localStorage:", error);
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cvData.personalInfo.fullName.replace(
      /\s+/g,
      "_"
    )}_CV.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (jsonString: string) => {
    try {
      const parsedData = JSON.parse(jsonString);
      dispatch({ type: "LOAD_CV", payload: parsedData });
    } catch (error) {
      console.error("Failed to import CV data:", error);
      throw new Error("Invalid JSON format");
    }
  };

  // Auto-save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch (error) {
      console.error("Failed to save CV data to localStorage:", error);
    }
  }, [cvData]);

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const value: CVContextType = {
    cvData,
    dispatch,
    saveToLocalStorage,
    loadFromLocalStorage,
    exportToJSON,
    importFromJSON,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
