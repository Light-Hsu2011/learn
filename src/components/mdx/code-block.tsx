"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  "data-language"?: string;
  "data-theme"?: string;
  raw?: string;
}

export function CodeBlock(props: CodeBlockProps) {
  const { children, raw, ...rest } = props;
  const lang = rest["data-language"] || "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = raw ?? extractText(children);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      {lang && (
        <span className="absolute top-2 left-3 text-xs font-mono text-gray-400 select-none">
          {lang}
        </span>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre {...rest} className="rounded-lg overflow-x-auto pt-8 pb-4 px-4 bg-[#1e1e2e] text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}
