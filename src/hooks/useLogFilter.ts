"use client";

import { useState, useCallback } from "react";

export const useLogFilter = (logs: string[]) => {
  const [filteredLogs, setFilteredLogs] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");

  const handleFilter = useCallback(() => {
    const filtered = logs.filter((log) =>
      log.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [logs, filterText]);

  return { filteredLogs, filterText, setFilterText, handleFilter };
};
