import classNames from "classnames";
import type { FC } from "react";

interface Props {
  color?: "gray" | "white";
  children: React.ReactNode;
}

const Text: FC<Props> = ({ color = "white", children }) => {
  const classnames = classNames(
    {
      "text-gray-700": color === "gray",
      "text-white": color === "white",
    },
    "mb-4"
  );

  return <p className={classnames}>{children}</p>;
};

export default Text;
