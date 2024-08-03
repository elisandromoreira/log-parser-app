"use client";

import { useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const logLines = content
          .split("\n")
          .filter((line) => line.trim() !== "");
        setLogs(logLines);
      };
      reader.readAsText(uploadedFile);
    }
  };

  return { file, logs, handleFileUpload };
};
