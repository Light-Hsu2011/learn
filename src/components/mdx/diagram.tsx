interface DiagramNode {
  id: string;
  label: string;
  type?: "default" | "highlight" | "muted";
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

interface DiagramProps {
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
  direction?: "horizontal" | "vertical";
  data?: string;
}

const nodeStyles = {
  default: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200",
  highlight: "bg-blue-50 dark:bg-blue-950/50 border-blue-400 dark:border-blue-500 text-blue-800 dark:text-blue-200",
  muted: "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500",
};

export function Diagram({ nodes: nodesProp, edges: edgesProp, direction = "horizontal", data }: DiagramProps) {
  const parsed = data ? JSON.parse(data) : {};
  const nodes: DiagramNode[] = nodesProp ?? parsed.nodes ?? [];
  const edges: DiagramEdge[] = edgesProp ?? parsed.edges ?? [];
  if (nodes.length === 0) return null;
  const isH = direction === "horizontal";

  return (
    <div className="my-6 overflow-x-auto">
      <div
        className={`flex ${isH ? "flex-row" : "flex-col"} items-center gap-2 min-w-fit p-4`}
      >
        {nodes.map((node, i) => {
          const edge = edges.find((e) => e.from === node.id);
          const style = nodeStyles[node.type ?? "default"];

          return (
            <div key={node.id} className={`flex ${isH ? "flex-row" : "flex-col"} items-center gap-2`}>
              <div
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium text-center whitespace-nowrap ${style}`}
              >
                {node.label}
              </div>
              {i < nodes.length - 1 && (
                <div className={`flex ${isH ? "flex-row" : "flex-col"} items-center gap-1`}>
                  {edge?.label && (
                    <span className="text-xs text-gray-400">{edge.label}</span>
                  )}
                  <span className="text-gray-400 text-lg">{isH ? "→" : "↓"}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
