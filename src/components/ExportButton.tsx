"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { usePDFExport } from "@/hooks/usePDFExport";

const ExportButton: React.FC = () => {
  const { exportToPDF } = usePDFExport();
  const [isExporting, setIsExporting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    setMessage(null);

    try {
      await exportToPDF();
      setMessage({
        type: "success",
        text: "¡PDF exportado exitosamente! Usa 'Guardar como PDF' en el diálogo de impresión.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al exportar PDF",
      });
    } finally {
      setIsExporting(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="export-controls">
      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isExporting ? "Exportando..." : "Exportar PDF"}
      </button>

      {message && (
        <div
          className={`mt-2 p-2 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
