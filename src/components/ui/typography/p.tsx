import React from "react";

type Props = {
  children: React.ReactNode;
};

const TypographyP = (props: Props) => {
  return (
    <p className="leading-loose [&:not(:first-child)]:mt-6">{props.children}</p>
  );
};

export default TypographyP;
