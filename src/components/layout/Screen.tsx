interface Props {
  children: React.ReactNode;
}

const Screen: React.FC<Props> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 grid-rows-[40px_auto_40px] sm:grid-rows-none sm:grid-cols-[300px_1fr_60px] h-screen">
      {children}
    </main>
  );
};

export default Screen;
