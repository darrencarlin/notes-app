import classNames from "classnames";
import type { FC } from "react";

interface Props {
  title: string;
  size: "sm" | "md" | "lg";
  color?: "gray" | "white";
  uppercase?: boolean;
}

const Title: FC<Props> = ({ title, size, color = "white", uppercase }) => {
  const classnames = classNames(
    {
      "text-gray-500": color === "gray",
      "text-white": color === "white",
      "text-lg": size === "sm",
      "text-xl": size === "md",
      "text-2xl": size === "lg",
      uppercase,
    },
    "font-bold mb-4"
  );

  return <h3 className={classnames}>{title}</h3>;
};

export default Title;
