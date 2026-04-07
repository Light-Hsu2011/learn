"use client";

import { useState } from "react";

interface QuizProps {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export function Quiz({ question, options, answer, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const isCorrect = selected === answer;
  const hasAnswered = selected !== null;

  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900/50">
      <p className="font-semibold text-lg mb-3 flex items-center gap-2">
        <span>🤔</span> {question}
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let style = "border-gray-200 dark:border-gray-700 hover:border-blue-400";
          if (hasAnswered) {
            if (i === answer) style = "border-green-500 bg-green-50 dark:bg-green-950/30";
            else if (i === selected) style = "border-red-500 bg-red-50 dark:bg-red-950/30";
          }

          return (
            <button
              key={i}
              onClick={() => !hasAnswered && setSelected(i)}
              disabled={hasAnswered}
              className={`w-full text-left px-4 py-2 rounded-lg border transition-colors ${style} ${
                hasAnswered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="font-mono text-sm mr-2 text-gray-400">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {hasAnswered && (
        <div
          className={`mt-3 px-4 py-2 rounded-lg text-sm ${
            isCorrect
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {isCorrect ? "✅ 正確！" : "❌ 不對喔！"}
          {explanation && <span className="ml-1">{explanation}</span>}
        </div>
      )}
    </div>
  );
}
