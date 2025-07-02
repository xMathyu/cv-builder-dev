"use client";

import React from "react";
import Link from "next/link";
import { CVProvider } from "@/context/CVContext";
import { UIProvider, useUI } from "@/context/UIContext";
import CVPreview from "@/components/CVPreview";
import ExportButton from "@/components/ExportButton";
import DirectExportButton from "@/components/DirectExportButton";
import FullscreenCVView from "@/components/FullscreenCVView";
import { Edit, Eye, Settings, Palette, Maximize, Printer } from "lucide-react";

export default function Home() {
  return (
    <UIProvider>
      <CVProvider>
        <MainContent />
        <FullscreenCVView />
      </CVProvider>
    </UIProvider>
  );
}

function MainContent() {
  const { toggleFullscreen } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
              <span className="ml-2 text-sm text-gray-500">
                by Mathyu Cardozo
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Export Buttons */}
              <div className="flex items-center space-x-2">
                <ExportButton />
                <DirectExportButton />
              </div>

              {/* Additional Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Palette className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View in Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.open('/print', '_blank')}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                  title="Vista de Impresión Tabloid"
                >
                  📄 Imprimir Tabloid
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar for future editing tools */}
          <aside className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Preview Mode
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Your CV is being displayed in real-time. You can export it to
                PDF or make edits.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium text-gray-900">
                    Professional
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Theme:</span>
                  <span className="font-medium text-gray-900">
                    Blue Professional
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium text-gray-900">Auto-fit</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Experience
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Skills
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Change Theme
                  </button>
                  <button 
                    onClick={toggleFullscreen}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Maximize className="w-4 h-4 inline mr-2" />
                    Fullscreen View
                  </button>
                  <Link
                    href="/print"
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors block"
                  >
                    <Printer className="w-4 h-4 inline mr-2" />
                    Vista para Imprimir
                  </Link>
                  <button 
                    onClick={() => window.open('/print', '_blank')}
                    className="w-full text-left p-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                  >
                    📄 Vista de Impresión Tabloid
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* CV Preview */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <CVPreview />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              CV Builder App - Built with Next.js, TypeScript, and Tailwind
              CSS
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Export to PDF, customize themes, and create professional CVs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
