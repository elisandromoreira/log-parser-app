"use client";

import { useState, useCallback } from "react";

export const useLogParser = () => {
  const [parsedLogs, setParsedLogs] = useState<any[]>([]);

  const handleParse = useCallback((logs: string[]) => {
    const parsed = logs
      .map((log) => {
        try {
          return JSON.parse(log);
        } catch (error) {
          console.error("Error parsing log:", log);
          return null;
        }
      })
      .filter((log) => log !== null);
    setParsedLogs(parsed);
  }, []);

  return { parsedLogs, handleParse };
};
