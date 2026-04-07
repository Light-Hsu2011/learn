import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { ELI5 } from "./eli5";
import { Quiz } from "./quiz";
import { Callout } from "./callout";

export { CodeBlock } from "./code-block";
export { CodeTabs } from "./code-tabs";
export { ELI5 } from "./eli5";
export { Quiz } from "./quiz";
export { Callout } from "./callout";

export const mdxComponents: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,
  CodeTabs,
  ELI5,
  Quiz,
  Callout,
};
