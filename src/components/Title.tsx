import type { FC } from "react";

interface Props {
  title: string;
}

const Title: FC<Props> = ({ title }) => (
  <h3 className="font-bold mb-4 uppercase">{title}</h3>
);

export default Title;
