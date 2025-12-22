import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source - use CDN for pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

export interface FileContent {
  name: string;
  type: string;
  content: string;
  size: number;
  pages?: number;
}

export const useFileReader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readTextFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Dosya okunamadı'));
      };
      reader.readAsText(file);
    });
  }, []);

  const readPDFFile = useCallback(async (file: File): Promise<{ text: string; pages: number }> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    let fullText = '';

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += `\n--- Sayfa ${i} ---\n${pageText}`;
    }

    return { text: fullText.trim(), pages: numPages };
  }, []);

  const readFile = useCallback(async (file: File): Promise<FileContent | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const fileType = file.type;
      const fileName = file.name;
      const fileSize = file.size;

      // Check file size (max 10MB)
      if (fileSize > 10 * 1024 * 1024) {
        throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
      }

      let content = '';
      let pages: number | undefined;

      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        const pdfResult = await readPDFFile(file);
        content = pdfResult.text;
        pages = pdfResult.pages;
      } else if (
        fileType === 'text/plain' ||
        fileType === 'text/markdown' ||
        fileType === 'application/json' ||
        fileType === 'text/csv' ||
        fileType === 'text/html' ||
        fileType === 'text/css' ||
        fileType === 'application/javascript' ||
        fileType === 'application/xml' ||
        fileName.endsWith('.txt') ||
        fileName.endsWith('.md') ||
        fileName.endsWith('.json') ||
        fileName.endsWith('.csv') ||
        fileName.endsWith('.html') ||
        fileName.endsWith('.css') ||
        fileName.endsWith('.js') ||
        fileName.endsWith('.ts') ||
        fileName.endsWith('.tsx') ||
        fileName.endsWith('.jsx') ||
        fileName.endsWith('.py') ||
        fileName.endsWith('.java') ||
        fileName.endsWith('.c') ||
        fileName.endsWith('.cpp') ||
        fileName.endsWith('.h') ||
        fileName.endsWith('.xml') ||
        fileName.endsWith('.yaml') ||
        fileName.endsWith('.yml') ||
        fileName.endsWith('.sql') ||
        fileName.endsWith('.sh') ||
        fileName.endsWith('.bat') ||
        fileName.endsWith('.ps1') ||
        fileName.endsWith('.log') ||
        fileName.endsWith('.env') ||
        fileName.endsWith('.gitignore') ||
        fileName.endsWith('.dockerignore')
      ) {
        content = await readTextFile(file);
      } else {
        throw new Error(`Desteklenmeyen dosya türü: ${fileType || fileName.split('.').pop()}`);
      }

      setIsLoading(false);
      return {
        name: fileName,
        type: fileType || 'unknown',
        content,
        size: fileSize,
        pages,
      };
    } catch (err: any) {
      setError(err.message || 'Dosya okuma hatası');
      setIsLoading(false);
      return null;
    }
  }, [readTextFile, readPDFFile]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getSupportedFormats = (): string[] => {
    return [
      'PDF (.pdf)',
      'Metin (.txt)',
      'Markdown (.md)',
      'JSON (.json)',
      'CSV (.csv)',
      'HTML (.html)',
      'CSS (.css)',
      'JavaScript (.js, .jsx)',
      'TypeScript (.ts, .tsx)',
      'Python (.py)',
      'Java (.java)',
      'C/C++ (.c, .cpp, .h)',
      'XML (.xml)',
      'YAML (.yaml, .yml)',
      'SQL (.sql)',
      'Shell (.sh, .bat, .ps1)',
      'Log (.log)',
      'Config (.env, .gitignore)',
    ];
  };

  return {
    readFile,
    isLoading,
    error,
    formatFileSize,
    getSupportedFormats,
  };
};

export default useFileReader;