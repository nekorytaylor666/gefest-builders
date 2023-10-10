import React from "react";

type Props = {
  children: React.ReactNode;
};

const TypographyBlockCode = (props: Props) => {
  return (
    <CodeEditor className="relative rounded p-4 font-mono text-sm font-semibold text-green-500 break-all w-full bg-muted">
      <code>{props.children}</code>
    </CodeEditor>
  );
};

export default TypographyBlockCode;
