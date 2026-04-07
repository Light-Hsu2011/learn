import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";

export { CodeBlock } from "./code-block";
export { CodeTabs } from "./code-tabs";

export const mdxComponents: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,
  CodeTabs,
};
