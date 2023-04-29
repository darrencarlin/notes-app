import { useAppSelector } from "@/store/hooks/redux";
import Markdown from "@/components/Markdown";

const ViewScreen = (): JSX.Element => {
  const { currentNote } = useAppSelector((state) => state.noteSlice);
  return <Markdown markdown={currentNote.body} />;
};

export default ViewScreen;
