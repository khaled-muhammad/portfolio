import React from "react";

type LabelProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export const MarketingLabel = ({
  children,
  className = "",
  ...props
}: LabelProps) => {
  return (
    <div
      className={`label-rounded-full gradient-outline relative z-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default MarketingLabel;
