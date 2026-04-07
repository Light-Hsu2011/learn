"use client";

import { useState } from "react";

interface CodeTabsProps {
  children: React.ReactNode;
}

interface TabInfo {
  label: string;
  content: React.ReactNode;
}

export function CodeTabs({ children }: CodeTabsProps) {
  const tabs = extractTabs(children);
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return <>{children}</>;

  return (
    <div className="my-6 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex bg-[#1e1e2e] border-b border-gray-700">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-mono transition-colors ${
              i === active
                ? "text-white bg-[#2d2d3f] border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}

function extractTabs(children: React.ReactNode): TabInfo[] {
  const tabs: TabInfo[] = [];
  const items = Array.isArray(children) ? children : [children];

  for (const child of items.flat()) {
    if (!child || typeof child !== "object" || !("props" in child)) continue;

    const el = child as React.ReactElement<Record<string, unknown>>;

    // Each child should be a div wrapping a code block with data-language
    // Or directly a pre/CodeBlock with data-language
    const lang = findLanguage(el);
    if (lang) {
      tabs.push({ label: formatLabel(lang), content: child });
    }
  }

  return tabs;
}

function findLanguage(el: React.ReactElement<Record<string, unknown>>): string | null {
  if (el.props?.["data-language"]) return el.props["data-language"] as string;
  if (el.props?.className && typeof el.props.className === "string") {
    const match = el.props.className.match(/language-(\w+)/);
    if (match) return match[1];
  }
  // Check children recursively
  const children = el.props?.children;
  if (children && typeof children === "object" && "props" in (children as object)) {
    return findLanguage(children as React.ReactElement<Record<string, unknown>>);
  }
  return null;
}

const labelMap: Record<string, string> = {
  csharp: "C#",
  cs: "C#",
  typescript: "TypeScript",
  ts: "TypeScript",
  python: "Python",
  py: "Python",
  java: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
};

function formatLabel(lang: string): string {
  return labelMap[lang.toLowerCase()] || lang;
}
