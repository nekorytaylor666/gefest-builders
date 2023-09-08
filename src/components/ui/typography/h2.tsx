import React from "react";

type Props = {
  children: React.ReactNode;
};

const TypographyH2 = (props: Props) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {props.children}
    </h2>
  );
};

export default TypographyH2;
