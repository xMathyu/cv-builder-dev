"use client";

import React from "react";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import CVPreview from "./CVPreview";
import ExportButton from "./ExportButton";
import DirectExportButton from "./DirectExportButton";

const FullscreenCVView: React.FC = () => {
  const { isFullscreen, toggleFullscreen } = useUI();

  if (!isFullscreen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-100">
      {/* Fullscreen Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-51">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">CV Preview</h1>
              <span className="ml-2 text-xs text-gray-500">
                Fullscreen Mode
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Export Buttons */}
              <div className="flex items-center space-x-2">
                <ExportButton />
                <DirectExportButton />
              </div>

              {/* Close Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Exit Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen CV Content */}
      <main className="h-[calc(100vh-3rem)] overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg">
            <CVPreview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullscreenCVView;
