import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LogFilterProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
  onFilter: () => void;
  totalLogs: number;
}

export const LogFilter: React.FC<LogFilterProps> = ({
  filterText,
  onFilterTextChange,
  onFilter,
  totalLogs,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onFilter();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Filter Logs</h2>
      <div className="flex space-x-2 justify-center">
        <Input
          type="text"
          placeholder="Enter filter text"
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="max-w-sm"
        />
        <Button onClick={onFilter}>Filter</Button>
      </div>
      <p className="text-center">Total logs: {totalLogs}</p>
    </div>
  );
};
