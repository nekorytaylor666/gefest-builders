import React from "react";

type Props = {
  children: React.ReactNode;
};

const TypographyH3 = (props: Props) => {
  return (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  );
};

export default TypographyH3;
