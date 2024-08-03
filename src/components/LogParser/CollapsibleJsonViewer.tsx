import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface CollapsibleJsonViewerProps {
  data: any;
  isRoot?: boolean;
  isLast?: boolean;
}

const CollapsibleJsonViewer: React.FC<CollapsibleJsonViewerProps> = ({
  data,
  isRoot = true,
  isLast = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const getValueColor = (value: any): string => {
    if (typeof value === "string") return "#50fa7b";
    if (typeof value === "number") return "#bd93f9";
    if (typeof value === "boolean") return "#ff79c6";
    if (value === null) return "#ff5555";
    if (Array.isArray(value)) return "#f1fa8c";
    return "#f8f8f2";
  };

  const renderValue = (value: any, isLastItem: boolean) => {
    if (typeof value === "object" && value !== null) {
      return (
        <CollapsibleJsonViewer
          data={value}
          isRoot={false}
          isLast={isLastItem}
        />
      );
    }
    return (
      <span style={{ color: getValueColor(value) }}>
        {JSON.stringify(value)}
        {!isLastItem && ","}
      </span>
    );
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (typeof data !== "object" || data === null) {
    return renderValue(data, isLast);
  }

  const isArray = Array.isArray(data);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";

  return (
    <span style={{ display: "inline-block", verticalAlign: "top" }}>
      <Button
        onClick={toggleExpand}
        variant="ghost"
        size="sm"
        className="mb-1 p-0 h-auto hover:bg-transparent focus:bg-transparent active:bg-transparent"
      >
        <span className="text-white hover:text-white transition-colors">
          {isExpanded ? "▼" : "►"} {openBracket}
        </span>
      </Button>
      {isExpanded ? (
        <>
          <div style={{ marginLeft: "1rem" }}>
            {Object.entries(data).map(([key, value], index, array) => (
              <div
                key={key}
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <span style={{ color: "#ff79c6", marginRight: "0.5rem" }}>
                  {isArray ? "" : `${key}:`}
                </span>
                {renderValue(value, index === array.length - 1)}
              </div>
            ))}
          </div>
          <div>
            {closeBracket}
            {!isLast && ","}
          </div>
        </>
      ) : (
        <span>
          {closeBracket}
          {!isLast && ","}
        </span>
      )}
    </span>
  );
};

export default CollapsibleJsonViewer;
