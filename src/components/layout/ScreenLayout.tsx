import { type FC, type ReactNode } from "react";

const ScreenLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-800 p-4 lg:p-8 overflow-y-scroll no-scrollbar h-[calc(100vh-150px)] lg:h-[calc(100vh-50px)]">
    {children}
  </section>
);

export default ScreenLayout;
