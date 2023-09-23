import type { FC } from "react";
import { ClockLoader } from "react-spinners";

const LoadingScreen: FC = (): JSX.Element => {
  return (
    <div className="grid place-items-center h-screen w-screen bg-gray-900">
      <div className="max-w-[500px]">
        <ClockLoader color="#fff" size={75} />
      </div>
    </div>
  );
};

export default LoadingScreen;
