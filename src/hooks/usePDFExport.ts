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
    documentTitle: " ", // Space character to minimize header
    onBeforePrint: async () => {
      await preloadImages();
      // Add a small delay to ensure DOM updates are rendered
      await new Promise((resolve) => setTimeout(resolve, 200));
    },
    suppressErrors: true,
    pageStyle: `
      @page {
        size: 11in 14in;
        margin: 0.1in;
        /* Completely remove headers and footers */
        @top-left-corner { content: ""; }
        @top-left { content: ""; }
        @top-center { content: ""; }
        @top-right { content: ""; }
        @top-right-corner { content: ""; }
        @bottom-left-corner { content: ""; }
        @bottom-left { content: ""; }
        @bottom-center { content: ""; }
        @bottom-right { content: ""; }
        @bottom-right-corner { content: ""; }
      }
      
      @media print {
        /* Aggressive header/footer removal */
        @page :first {
          @top-left { content: ""; }
          @top-center { content: ""; }
          @top-right { content: ""; }
          @bottom-left { content: ""; }
          @bottom-center { content: ""; }
          @bottom-right { content: ""; }
        }
        
        /* Hide all potential header/footer content */
        html::before, html::after,
        body::before, body::after {
          display: none !important;
          content: none !important;
        }
        
        /* Remove browser default headers/footers */
        html {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
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
        
        /* CRITICAL: Force the grid layout to use desktop layout with better proportions */
        .grid-cols-1 {
          grid-template-columns: 35% 65% !important;
          display: grid !important;
          gap: 0 !important;
          width: 100% !important;
        }
        
        /* Ensure responsive classes work as desktop with percentage-based layout */
        .lg\\:grid-cols-3 {
          grid-template-columns: 35% 65% !important;
          display: grid !important;
          gap: 0 !important;
          width: 100% !important;
        }
        
        /* Force column spans with percentage widths */
        .lg\\:col-span-1 {
          grid-column: 1 / 2 !important;
          width: 100% !important;
          max-width: none !important;
        }
        
        .lg\\:col-span-2 {
          grid-column: 2 / 3 !important;
          width: 100% !important;
          max-width: none !important;
          padding-right: 0 !important;
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
        
        /* Ensure text sizes remain consistent but optimized for larger page */
        .text-3xl { font-size: 1.6rem !important; }
        .text-2xl { font-size: 1.3rem !important; }
        .text-xl { font-size: 1.1rem !important; }
        .text-lg { font-size: 1rem !important; }
        .text-base { font-size: 0.9rem !important; }
        .text-sm { font-size: 0.8rem !important; }
        .text-xs { font-size: 0.7rem !important; }
        
        /* Ensure padding/margins are preserved but optimized for larger page */
        .p-8 { padding: 0.6rem !important; }
        .p-6 { padding: 0.5rem !important; }
        .mb-8 { margin-bottom: 0.4rem !important; }
        .mb-6 { margin-bottom: 0.3rem !important; }
        .mb-4 { margin-bottom: 0.2rem !important; }
        .mb-2 { margin-bottom: 0.15rem !important; }
        
        /* Optimize the main content area - ultra minimal padding */
        .lg\\:col-span-2 .p-8 {
          padding: 0.4rem 0.3rem 0.4rem 0.4rem !important;
        }
        
        /* Optimize sidebar padding */
        .lg\\:col-span-1 .p-8 {
          padding: 0.4rem !important;
        }
        
        /* Profile image specific - smaller for single page */
        .w-32 { width: 5rem !important; }
        .h-32 { height: 5rem !important; }
        
        /* Ensure proper spacing - ultra compact for single page */
        .space-y-3 > * + * { margin-top: 0.2rem !important; }
        .space-y-2 > * + * { margin-top: 0.15rem !important; }
        .space-y-4 > * + * { margin-top: 0.25rem !important; }
        
        /* Flex gap alternatives - ultra compact */
        .gap-2 { gap: 0.15rem !important; }
        .gap-3 { gap: 0.2rem !important; }
        .gap-4 { gap: 0.25rem !important; }
        
        /* Force full width usage - remove any centering or max-width constraints */
        .container, .max-w-full, .max-w-screen-xl, .max-w-7xl, .max-w-6xl, .max-w-5xl {
          max-width: none !important;
          width: 100% !important;
          margin: 0 !important;
        }
        
        /* Remove any auto margins that create centering */
        .mx-auto, .ml-auto, .mr-auto {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        
        /* Ensure all divs use full available space */
        div {
          box-sizing: border-box !important;
        }
        
        /* Specific spacing fixes for CV sections - ultra compact for single page */
        section {
          margin-bottom: 0.3rem !important;
        }
        
        /* Reduce spacing in experience and education cards */
        .bg-gray-50 {
          margin-bottom: 0.2rem !important;
          padding: 0.4rem !important;
        }
        
        /* Compact list items */
        li {
          margin-bottom: 0.1rem !important;
          line-height: 1.2 !important;
        }
        
        /* Reduce spacing in skill tags */
        .flex-wrap > * {
          margin-bottom: 0.1rem !important;
        }
        
        /* Compact borders between sections */
        .border-b-2 {
          margin-bottom: 0.2rem !important;
          padding-bottom: 0.15rem !important;
        }
        
        /* Force single page - prevent page breaks */
        * {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Scale down if content is too long but less aggressive with larger page */
        #cv-preview {
          transform-origin: top left;
          transform: scale(0.95);
          width: 105.26% !important;
        }
        
        /* Compact skill tags and technology items */
        .bg-blue-700, .text-xs {
          padding: 0.1rem 0.3rem !important;
          font-size: 0.6rem !important;
        }
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
