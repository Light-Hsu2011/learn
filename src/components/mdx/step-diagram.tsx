interface Step {
  title: string;
  description?: string;
  icon?: string;
}

interface StepDiagramProps {
  steps: Step[];
}

export function StepDiagram({ steps }: StepDiagramProps) {
  return (
    <div className="my-6 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {step.icon ?? i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 h-8 bg-blue-200 dark:bg-blue-800" />
            )}
          </div>

          {/* Content */}
          <div className="pb-6">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {step.title}
            </p>
            {step.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {step.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
