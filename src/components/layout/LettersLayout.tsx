import type { FC, ReactNode } from "react";

const LettersLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="fixed bottom-0 left-0 w-screen no-scrollbar p-4 bg-gray-900 gap-4 overflow-x-scroll flex lg:flex-col md:justify-between md:overflow-y-scroll lg:max-h-[100dvh] lg:static lg:w-[50px]">
    {children}
  </section>
);

export default LettersLayout;
