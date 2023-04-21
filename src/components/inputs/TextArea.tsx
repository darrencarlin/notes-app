import type { FC, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

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
