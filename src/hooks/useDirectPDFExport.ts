import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useDirectPDFExport = () => {
  const exportToPDF = useCallback(async (): Promise<void> => {
    try {
      const cvElement = document.getElementById("cv-preview");
      if (!cvElement) {
        throw new Error("CV preview element not found");
      }

      // Wait for all images to load
      const images = cvElement.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue even if image fails
              }
            })
        )
      );

      // Create a temporary style element to override OKLCH colors
      const tempStyle = document.createElement("style");
      tempStyle.textContent = `
        /* Override OKLCH colors with RGB equivalents for html2canvas */
        #cv-preview * {
          /* Common Tailwind color overrides */
          --tw-text-opacity: 1 !important;
          --tw-bg-opacity: 1 !important;
          --tw-border-opacity: 1 !important;
        }
        
        /* Force specific color overrides */
        #cv-preview .text-white { color: #ffffff !important; }
        #cv-preview .text-gray-900 { color: #111827 !important; }
        #cv-preview .text-gray-800 { color: #1f2937 !important; }
        #cv-preview .text-gray-700 { color: #374151 !important; }
        #cv-preview .text-gray-600 { color: #4b5563 !important; }
        #cv-preview .text-gray-500 { color: #6b7280 !important; }
        #cv-preview .text-blue-600 { color: #2563eb !important; }
        #cv-preview .text-blue-700 { color: #1d4ed8 !important; }
        
        #cv-preview .bg-white { background-color: #ffffff !important; }
        #cv-preview .bg-gray-50 { background-color: #f9fafb !important; }
        #cv-preview .bg-gray-100 { background-color: #f3f4f6 !important; }
        #cv-preview .bg-gray-900 { background-color: #111827 !important; }
        #cv-preview .bg-blue-600 { background-color: #2563eb !important; }
        #cv-preview .bg-blue-700 { background-color: #1d4ed8 !important; }
        #cv-preview .bg-green-600 { background-color: #16a34a !important; }
        #cv-preview .bg-green-700 { background-color: #15803d !important; }
        
        #cv-preview .border-gray-200 { border-color: #e5e7eb !important; }
        #cv-preview .border-gray-300 { border-color: #d1d5db !important; }
        #cv-preview .border-blue-600 { border-color: #2563eb !important; }
      `;
      document.head.appendChild(tempStyle);

      // Prepare the element for capture
      const originalStyles = new Map<Element, string>();

      // Hide export buttons temporarily
      const exportButtons = cvElement.querySelectorAll(
        ".export-controls, button"
      );
      exportButtons.forEach((btn) => {
        const button = btn as HTMLElement;
        originalStyles.set(button, button.style.display);
        button.style.display = "none";
      });

      // Force desktop layout temporarily
      const gridElements = cvElement.querySelectorAll(
        ".grid-cols-1, .lg\\:grid-cols-3"
      );
      gridElements.forEach((el) => {
        const element = el as HTMLElement;
        originalStyles.set(element, element.style.cssText);
        element.style.display = "grid";
        element.style.gridTemplateColumns = "35% 65%";
        element.style.gap = "0";
        element.style.width = "100%";
      });

      // Force column spans
      const col1Elements = cvElement.querySelectorAll(".lg\\:col-span-1");
      col1Elements.forEach((el) => {
        const element = el as HTMLElement;
        originalStyles.set(element, element.style.cssText);
        element.style.gridColumn = "1 / 2";
        element.style.width = "100%";
      });

      const col2Elements = cvElement.querySelectorAll(".lg\\:col-span-2");
      col2Elements.forEach((el) => {
        const element = el as HTMLElement;
        originalStyles.set(element, element.style.cssText);
        element.style.gridColumn = "2 / 3";
        element.style.width = "100%";
      });

      // Create canvas with high quality settings
      const canvas = await html2canvas(cvElement, {
        useCORS: true,
        allowTaint: false,
        background: "#ffffff",
        logging: false,
        width: cvElement.scrollWidth,
        height: cvElement.scrollHeight,
      });

      // Restore original styles
      originalStyles.forEach((style, element) => {
        const htmlElement = element as HTMLElement;
        if (style) {
          htmlElement.style.cssText = style;
        } else {
          htmlElement.style.display = "";
        }
      });

      // Remove temporary style
      document.head.removeChild(tempStyle);

      // Calculate PDF dimensions
      const imgWidth = 11 * 72; // 11 inches in points (72 points per inch)
      const imgHeight = 14 * 72; // 14 inches in points

      // Calculate scaling to fit the content
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Scale to fit width, maintaining aspect ratio
      const scale = Math.min(imgWidth / canvasWidth, imgHeight / canvasHeight);
      const scaledWidth = canvasWidth * scale;
      const scaledHeight = canvasHeight * scale;

      // Center the content on the page
      const xOffset = (imgWidth - scaledWidth) / 2;
      const yOffset = (imgHeight - scaledHeight) / 2;

      // Create PDF with custom size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [imgWidth, imgHeight], // 11x14 inches in points
      });

      // Add the canvas to the PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `CV_Mathyu_${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }, []);

  return { exportToPDF };
};
