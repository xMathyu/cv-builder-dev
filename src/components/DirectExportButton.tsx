"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useDirectPDFExport } from "@/hooks/useDirectPDFExport";

const DirectExportButton: React.FC = () => {
  const { exportToPDF } = useDirectPDFExport();
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
        text: "¡PDF generado y descargado exitosamente! Se ha creado un PDF de 11x14 pulgadas con todo el contenido en una sola página.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al generar PDF",
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
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isExporting ? "Generando PDF..." : "Descargar PDF Directo"}
      </button>

      {message && (
        <div
          className={`mt-2 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default DirectExportButton;
