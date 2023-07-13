import type { FC, ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

const colorMap = {
  none: "text-gray-600",
  "bg-gray-600": "text-white",
  "bg-red-600": "text-white",
  "bg-green-600": "text-white",
  "bg-blue-600": "text-white",
  "bg-orange-600": "text-white",
};

const hoverColorMap = {
  none: "hover:border-gray-400",
  "bg-gray-600": "hover:bg-gray-700",
  "bg-red-600": "hover:bg-red-700",
  "bg-green-600": "hover:bg-green-700",
  "bg-blue-600": "hover:bg-blue-700",
  "bg-orange-600": "hover:bg-orange-700",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  backgroundColor?:
    | "none"
    | "bg-gray-600"
    | "bg-red-600"
    | "bg-green-600"
    | "bg-blue-600"
    | "bg-orange-600";
}

const Button: FC<Props> = ({
  text,
  icon,
  fullWidth,
  backgroundColor = "none",
  ...props
}) => {
  const hasIcon = !!icon;
  const textColor = colorMap[backgroundColor];
  const hoverColor = hoverColorMap[backgroundColor];

  const classnames = classNames(
    {
      "border-2 border-gray-300": backgroundColor === "none",
      "flex items-center gap-2": hasIcon,
      "w-full": fullWidth,
    },
    `group ${backgroundColor} ${textColor} p-2 md:py-1 md:px-2  font-medium text-sm tracking-wider rounded ${hoverColor} hover:shadow-md transition-all duration-100 ease-in-out min-h-[28px]`
  );

  return (
    <button {...props} className={classnames}>
      {text} {icon}
    </button>
  );
};

export default Button;
