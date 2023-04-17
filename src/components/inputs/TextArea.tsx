import type { FC } from "react";
import classNames from "classnames";
import { type TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: boolean;
}

const TextArea: FC<Props> = ({ height = false, ...props }) => {
  const classnames = classNames(
    {
      "h-96": height,
    },
    "w-full bg-gray-700 p-4 mb-4 resize-none"
  );

  return <textarea {...props} className={classnames} />;
};

export default TextArea;
