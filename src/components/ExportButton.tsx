"use client";

import React, { useState } from "react";
import { Download, FileText, ImageIcon, Loader2 } from "lucide-react";
import { usePDFExport } from "@/hooks/usePDFExport";

interface ExportButtonProps {
  targetElementId: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  targetElementId,
  className = "",
  variant = "primary",
  size = "md",
  showProgress = true,
}) => {
  const { exportToPDF, exportToImage, exportProgress } = usePDFExport();
  const [showDropdown, setShowDropdown] = useState(false);
  const [lastMessage, setLastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleExportPDF = async (format: "a4" | "letter" = "a4") => {
    const result = await exportToPDF(targetElementId, {
      format,
      quality: 2,
      filename: "CV-Mathyu-Cardozo",
    });
    
    setLastMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    
    setTimeout(() => setLastMessage(null), 5000);
    setShowDropdown(false);
  };

  const handleExportImage = async (format: "png" | "jpeg" = "png") => {
    const result = await exportToImage(targetElementId, format);
    
    setLastMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    
    setTimeout(() => setLastMessage(null), 5000);
    setShowDropdown(false);
  };

  const getButtonClasses = () => {
    const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-6 py-3 text-base rounded-lg",
    };

    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-lg hover:shadow-xl",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-white",
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const isExporting = exportProgress.isExporting;

  return (
    <div className="relative">
      {/* Main Export Button */}
      <div className="flex">
        <button
          onClick={() => handleExportPDF()}
          disabled={isExporting}
          className={getButtonClasses()}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isExporting ? "Exporting..." : "Export PDF"}
        </button>
        
        {/* Dropdown Toggle */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={isExporting}
          className={`${getButtonClasses()} ml-0.5 px-2 border-l border-white/20`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && !isExporting && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              PDF Options
            </div>
            <button
              onClick={() => handleExportPDF("a4")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FileText className="w-4 h-4 mr-3 text-gray-400" />
              Export PDF (A4)
            </button>
            <button
              onClick={() => handleExportPDF("letter")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FileText className="w-4 h-4 mr-3 text-gray-400" />
              Export PDF (Letter)
            </button>
            
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-t border-gray-100 mt-1">
              Image Options
            </div>
            <button
              onClick={() => handleExportImage("png")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <ImageIcon className="w-4 h-4 mr-3 text-gray-400" />
              Export PNG
            </button>
            <button
              onClick={() => handleExportImage("jpeg")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <ImageIcon className="w-4 h-4 mr-3 text-gray-400" />
              Export JPEG
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && isExporting && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {exportProgress.stage}
            </span>
            <span className="text-sm text-gray-500">
              {exportProgress.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${exportProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {lastMessage && (
        <div className={`absolute top-full left-0 mt-2 w-full p-3 rounded-lg shadow-lg z-50 ${
          lastMessage.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          <div className="flex items-center">
            {lastMessage.type === "success" ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">{lastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;
