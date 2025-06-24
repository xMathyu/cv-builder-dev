import { useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const usePDFExport = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Preload all images to ensure they are available during printing
  const preloadImages = useCallback(async (): Promise<void> => {
    const images =
      document.querySelectorAll<HTMLImageElement>("#cv-preview img");

    const imagePromises = Array.from(images).map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete && img.naturalHeight !== 0) {
          resolve();
          return;
        }

        const testImg = new Image();
        testImg.crossOrigin = "anonymous";

        testImg.onload = () => resolve();
        testImg.onerror = () => {
          console.warn(`Failed to load image: ${img.src}`);
          resolve(); // Resolve anyway to not block the export
        };

        // Handle relative URLs
        if (img.src.startsWith("/")) {
          testImg.src = `${window.location.origin}${img.src}`;
        } else {
          testImg.src = img.src;
        }
      });
    });

    await Promise.all(imagePromises);
  }, []);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "CV",
    onBeforePrint: async () => {
      await preloadImages();
      // Add a small delay to ensure DOM updates are rendered
      await new Promise((resolve) => setTimeout(resolve, 200));
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      
      @media print {
        body {
          margin: 0;
          padding: 0;
          background: white !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Hide export controls */
        .export-controls, [class*="export"], button {
          display: none !important;
        }
        
        /* Make the CV container use full width without centering */
        #cv-preview {
          max-width: none !important;
          margin: 0 !important;
          width: 100% !important;
          box-shadow: none !important;
          min-height: auto !important;
        }
        
        /* CRITICAL: Force the grid layout to use desktop layout */
        .grid-cols-1 {
          grid-template-columns: 1fr 2fr !important;
          display: grid !important;
        }
        
        /* Ensure responsive classes work as desktop */
        .lg\\:grid-cols-3 {
          grid-template-columns: 1fr 2fr !important;
          display: grid !important;
        }
        
        /* Force column spans */
        .lg\\:col-span-1 {
          grid-column: 1 / 2 !important;
        }
        
        .lg\\:col-span-2 {
          grid-column: 2 / 3 !important;
        }
        
        /* Ensure all images are visible and maintain aspect ratio */
        img {
          display: block !important;
          max-width: 100% !important;
          height: auto !important;
          break-inside: avoid;
        }
        
        /* Force all colors and gradients to print */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Preserve all layouts */
        .grid {
          display: grid !important;
        }
        
        .flex {
          display: flex !important;
        }
        
        /* Prevent page breaks in important sections */
        .mb-6, .mb-8 {
          break-inside: avoid;
        }
        
        /* Remove mobile styles that might interfere */
        .sm\\:*, .md\\:* {
          all: unset !important;
        }
        
        /* Ensure text sizes remain consistent */
        .text-3xl { font-size: 1.875rem !important; }
        .text-2xl { font-size: 1.5rem !important; }
        .text-xl { font-size: 1.25rem !important; }
        .text-lg { font-size: 1.125rem !important; }
        .text-base { font-size: 1rem !important; }
        .text-sm { font-size: 0.875rem !important; }
        .text-xs { font-size: 0.75rem !important; }
        
        /* Ensure padding/margins are preserved */
        .p-8 { padding: 2rem !important; }
        .p-6 { padding: 1.5rem !important; }
        .mb-8 { margin-bottom: 2rem !important; }
        .mb-6 { margin-bottom: 1.5rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-2 { margin-bottom: 0.5rem !important; }
        
        /* Profile image specific */
        .w-32 { width: 8rem !important; }
        .h-32 { height: 8rem !important; }
        
        /* Ensure proper spacing */
        .space-y-3 > * + * { margin-top: 0.75rem !important; }
        .space-y-2 > * + * { margin-top: 0.5rem !important; }
        .space-y-4 > * + * { margin-top: 1rem !important; }
        
        /* Flex gap alternatives */
        .gap-2 { gap: 0.5rem !important; }
        .gap-3 { gap: 0.75rem !important; }
        .gap-4 { gap: 1rem !important; }
      }
    `,
  });

  const exportToPDF = useCallback(async () => {
    try {
      // Set the contentRef to the CV element before printing
      const cvElement = document.getElementById("cv-preview");
      if (cvElement) {
        contentRef.current = cvElement as HTMLDivElement;
      }

      await handlePrint();
    } catch (error) {
      console.error("Failed to export PDF:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }, [handlePrint]);

  return { exportToPDF };
};
