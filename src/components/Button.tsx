import classNames from "classnames";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

const colorMap = {
  "bg-gray-600": "text-white",
  "bg-red-600": "text-white",
  "bg-green-600": "text-white",
  "bg-blue-600": "text-white",
};

const hoverColorMap = {
  "bg-gray-600": "hover:bg-gray-700",
  "bg-red-600": "hover:bg-red-700",
  "bg-green-600": "hover:bg-green-700",
  "bg-blue-600": "hover:bg-blue-700",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  backgroundColor?: "bg-gray-600" | "bg-red-600" | "bg-green-600" | "bg-blue-600";
}

const Button: React.FC<Props> = ({
  text,
  icon,
  fullWidth,
  backgroundColor = "bg-gray-600",
  ...props
}) => {
  const hasIcon = icon ? true : false;

  const textColor = colorMap[backgroundColor];
  const hoverColor = hoverColorMap[backgroundColor];

  const classnames = classNames(
    {
      "flex items-center gap-4": hasIcon,
      "w-full": fullWidth,
    },
    `${backgroundColor} ${textColor} py-1 px-3 font-medium text-sm tracking-wider rounded ${hoverColor}`
  );

  return (
    <button {...props} className={classnames}>
      {icon} {text}
    </button>
  );
};

export default Button;
