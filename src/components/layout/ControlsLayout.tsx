import type { FC, ReactNode } from "react";

const ControlsLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-700 p-4 flex justify-between gap-4 items-center">
    {children}
  </section>
);

export default ControlsLayout;
