import Image from "next/image";
import type { FC } from "react";

const LoadingScreen: FC = (): JSX.Element => {
  return (
    <div className="grid place-items-center h-screen w-screen bg-gray-900">
      <div className="max-w-[500px]">
        <Image
          src="/animation.gif"
          alt="Loading..."
          width={500}
          height={500}
          className="block"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
