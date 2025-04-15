import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      {children}
    </div>
  );
};

export default layout;
