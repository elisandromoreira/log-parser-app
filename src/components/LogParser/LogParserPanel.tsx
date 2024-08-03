"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useLogFilter } from "@/hooks/useLogFilter";
import { useLogParser } from "@/hooks/useLogParser";
import { FileUploader } from "./FileUploader";
import { LogFilter } from "./LogFilter";
import { LogParser } from "./LogParser";
import Title from "@/components/ui/title";

export const LogParserPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const { file, logs, handleFileUpload } = useFileUpload();
  const { filteredLogs, filterText, setFilterText, handleFilter } =
    useLogFilter(logs);
  const { parsedLogs, handleParse } = useLogParser();

  useEffect(() => {
    if (file) {
      setActiveTab("filter");
    }
  }, [file]);

  const handleTabChange = (value: string) => {
    if (file) {
      setActiveTab(value);
    }
  };

  const handleFilterAndTab = () => {
    handleFilter();
    setActiveTab("parse");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Title text="Log Parser Application" />
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[1200px]">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" disabled={false}>
              Upload
            </TabsTrigger>
            <TabsTrigger value="filter" disabled={!file}>
              Filter
            </TabsTrigger>
            <TabsTrigger value="parse" disabled={!file}>
              Parse
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <FileUploader
              onFileUpload={handleFileUpload}
              fileName={file?.name || null}
            />
          </TabsContent>
          <TabsContent value="filter">
            <LogFilter
              filterText={filterText}
              onFilterTextChange={setFilterText}
              onFilter={handleFilterAndTab}
              totalLogs={logs.length}
            />
          </TabsContent>
          <TabsContent value="parse">
            <LogParser
              filteredLogs={filteredLogs}
              onParse={() => handleParse(filteredLogs)}
              parsedLogs={parsedLogs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LogParserPanel;
