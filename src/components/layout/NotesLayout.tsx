import type { FC, ReactNode } from "react";

const NotesLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-900 p-4 flex flex-col justify-between items-end lg:items-start">
    {children}
  </section>
);

export default NotesLayout;
