import type { FC, ReactNode } from "react";

const ControlsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="flex items-center justify-between gap-4 p-4 bg-gray-700">
      {children}
    </section>
  );
};

export default ControlsLayout;
