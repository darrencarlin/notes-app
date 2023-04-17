import type { FC } from "react";
interface Props {
  children: React.ReactNode;
}

const Screen: FC<Props> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 grid-rows-[50px_1fr_50px] min-h-[100dvh] lg:grid-cols-[250px_1fr_auto] xl:grid-cols-[300px_1fr_auto] lg:grid-rows-1">
      {children}
    </main>
  );
};

export default Screen;
