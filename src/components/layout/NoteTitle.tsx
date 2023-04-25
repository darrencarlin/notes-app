import type { FC } from "react";

interface Props {
  title: string;
}

const NoteTitle: FC<Props> = ({ title }) => (
  <h1 className="text-2xl font-bold mb-4">{title}</h1>
);

export default NoteTitle;
