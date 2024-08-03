import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CollapsibleJsonViewer from "./CollapsibleJsonViewer";

interface LogParserProps {
  filteredLogs: string[];
  onParse: () => void;
  parsedLogs: any[];
}

const draculaTheme = {
  background: "#282a36",
  currentLine: "#44475a",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff5555",
  yellow: "#f1fa8c",
};

export const LogParser: React.FC<LogParserProps> = ({
  filteredLogs,
  onParse,
  parsedLogs,
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Parse Logs</h2>
    <p className="text-center">Filtered logs: {filteredLogs.length}</p>
    <div className="flex justify-center">
      <Button onClick={onParse}>Parse to JSON</Button>
    </div>
    {parsedLogs.length > 0 && (
      <div className="w-full">
        {parsedLogs.map((log, index) => (
          <Card key={index} className="mb-4 w-full">
            <CardContent className="p-4">
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  backgroundColor: draculaTheme.background,
                  padding: "1rem",
                  borderRadius: "0.375rem",
                  color: draculaTheme.foreground,
                  overflowX: "auto",
                }}
              >
                <CollapsibleJsonViewer data={log} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);
