import React from "react";

type Props = {
  children: React.ReactNode;
};

const TypographyH2 = (props: Props) => {
  return (
    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
};

export default TypographyH2;
