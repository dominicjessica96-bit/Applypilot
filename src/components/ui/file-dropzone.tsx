"use client";

import * as React from "react";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type FileDropzoneProps = {
  id?: string;
  accept?: string;
  maxSizeMb?: number;
  hint?: React.ReactNode;
  onFileSelect?: (file: File) => void;
  className?: string;
};

function FileDropzone({
  id = "cv-file",
  accept = ".pdf,.docx",
  maxSizeMb = 10,
  hint,
  onFileSelect,
  className,
}: FileDropzoneProps) {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isOver, setIsOver] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`This file is larger than ${maxSizeMb} MB. Choose a smaller file.`);
      return;
    }

    setError(null);
    setFileName(file.name);
    onFileSelect?.(file);
  }

  return (
    <div className={className}>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsOver(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-6 py-8 text-center transition-colors duration-[120ms] ease-brand focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
          isOver
            ? "border-accent bg-accent-100/60"
            : "border-line-strong bg-surface hover:bg-paper-100",
        )}
      >
        {fileName ? (
          <FileText className="size-6 text-accent-700" aria-hidden="true" />
        ) : (
          <Upload className="size-6 text-muted" aria-hidden="true" />
        )}
        <span className="mt-3 text-sm font-medium text-ink-900">
          {fileName ?? "Choose a file or drag it here"}
        </span>
        <span className="mt-1 text-sm text-muted">
          PDF or DOCX · up to {maxSizeMb} MB
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger-700">
          {error}
        </p>
      ) : null}
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export { FileDropzone };
