import type { FC, ReactNode } from "react";

const NotesLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="z-10 flex flex-col items-end justify-between p-4 bg-gray-900 lg:items-start">
    {children}
  </section>
);

export default NotesLayout;
