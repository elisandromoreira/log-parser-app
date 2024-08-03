import React from "react";
import { Input } from "@/components/ui/input";

interface FileUploaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  fileName,
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Upload Log File</h2>
    <div className="flex justify-center">
      <Input
        type="file"
        onChange={onFileUpload}
        accept=".log"
        className="max-w-sm"
      />
    </div>
    {fileName && <p className="text-center">File uploaded: {fileName}</p>}
  </div>
);
