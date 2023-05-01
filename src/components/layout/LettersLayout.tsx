import type { FC, ReactNode } from "react";

const LettersLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="no-scrollbar p-4 bg-gray-900 gap-4 overflow-x-scroll flex lg:flex-col md:justify-between md:overflow-y-scroll max-h-[100dvh]">
    {children}
  </section>
);

export default LettersLayout;
